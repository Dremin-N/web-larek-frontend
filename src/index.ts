import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { CatalogAPI } from './components/CatalogApi';
import { API_URL, CDN_URL } from './utils/constants';
import { CardCatalog, CardPreview, CardBasket } from './components/common/Card';
import { Page } from './components/Page';
import { AppState, CatalogItem } from './components/AppData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import {
	IOrder,
	IOrderContacts,
	IOrderForm,
	IOrderInputs,
	IProduct,
} from './types';
import { Basket } from './components/common/Basket';
import { Contacts, Order } from './components/Order';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new CatalogAPI(CDN_URL, API_URL);
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		events.emit('order:success');
	},
});

events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			categoryClass: item.category,
			category: item.category,
			price: item.price,
		});
	});
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('preview:changed', (item: IProduct) => {
	const showItem = (item: IProduct) => {
		const card = new CardPreview(
			cloneTemplate(cardPreviewTemplate),
			appData.getOrderedItems().includes(item),
			{
				onClick: () => {
					events.emit('order:changed', item);
					events.emit('preview:changed', item);
				},
			}
		);
		modal.render({
			content: card.render({
				title: item.title,
				image: item.image,
				description: item.description,
				categoryClass: item.category,
				category: item.category,
				price: item.price,
			}),
		});
	};

	if (item) {
		api
			.getProductItem(item.id)
			.then(() => {
				showItem(item);
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		modal.close();
	}
});

// Изменения в корзине
events.on('order:changed', (item: IProduct) => {
	appData.toggleOrderedItem(item.id);
	appData.getTotal();
	page.counter = appData.order.items.length;
});

// Открытие корзины
events.on('basket:open', () => {
	const cards = appData.getOrderedItems().map((item, index) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('order:changed', item);
				events.emit('basket:open');
			},
		});

		return card.render({
			title: item.title,
			index: index,
			price: item.price,
		});
	});
	modal.render({
		content: basket.render({
			total: appData.order.total,
			selected: appData.order.total,
			items: cards,
		}),
	});
});

events.on('order:open', () => {
	appData.deleteNonBuyItems(appData.noPriceItems);
	modal.render({
		content: order.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('update:payment', () => {
	appData.order.payment = order._selectedPayment;
});

events.on('orderErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

events.on('contactsErrors:change', (errors: Partial<IOrderContacts>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	/^(order|contacts)\..*:change/,
	(data: { field: keyof IOrderInputs; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('contacts:submit', () => {
	api
		.orderProducts(appData.order)
		.then((res) => {
			modal.render({
				content: success.render({
					total: res.total,
				}),
			});
			appData.clearOrder();
			page.counter = 0;
		})
		.catch((err) => console.error(err));
});

events.on('order:success', () => {
	modal.close();
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем список товаров с сервера
api
	.getproductList()
	.then((products) => {
		appData.setCatalog(products);
		appData.setNonBuyItems(products);
	})
	.catch((err) => console.error(err));
