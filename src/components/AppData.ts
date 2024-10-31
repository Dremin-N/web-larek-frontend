import { Model } from './base/Model';
import {
	FormErrors,
	IAppState,
	IProduct,
	IOrder,
	IOrderForm,
	IOrderResult,
	IOrderInputs,
} from '../types';
import { CardCatalog } from './view/Card';

export class AppState extends Model<IAppState> {
	noPriceItems: string[];
	catalog: IProduct[];
	basket: HTMLElement[] = [];
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

	// Добавляет/убирает товар из корзины
	toggleOrderedItem(id: string) {
		const inBasket = this.order.items.indexOf(id);
		if (inBasket === -1) {
			this.order.items.push(id);
		} else {
			this.order.items.splice(inBasket, 1);
		}
	}

	// Очищаем корзину и заказ
	clearOrder() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
	}

	// Получаем товары в корзине
	getOrderedItems() {
		return this.order.items.map((item) =>
			this.catalog.find((product) => product.id === item)
		);
	}

	// Обновляет общую сумму заказа
	setTotal() {
		this.order.total = this.order.items.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}

	// Устанавливает список товаров для каталога
	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	// Устанавливает товар в режим превью
	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	// Получаем массив из id бесценных товаров
	setNonBuyItems(items: IProduct[]) {
		this.noPriceItems = items
			.filter((item) => !item.price)
			.map((item) => item.id);
	}

	// Убрать из заказа бесценные товары
	deleteNonBuyItems(items: string[]) {
		for (let i = this.order.items.length - 1; i >= 0; i--) {
			if (items.includes(this.order.items[i])) {
				this.order.items.splice(i, 1);
			}
		}
	}

	// Устанавливает значения полей заказа
	setOrderField(field: keyof IOrderInputs, value: string) {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	// Валидирует поля формы 1 этап
	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('orderErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	// Валидирует поля формы 2 этап
	validateContacts() {
		const phoneRegEx = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+)/;
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		} else if (!emailRegex.test(this.order.email)) {
			errors.email = 'Введен некорректный email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else if (!phoneRegEx.test(this.order.phone)) {
			errors.phone = 'Введите корректный номер для РФ';
		}

		this.formErrors = errors;
		this.events.emit('contactsErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
