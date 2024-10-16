import { Model } from './base/Model';
import {
	FormErrors,
	IAppState,
	IProduct,
	IOrder,
	IOrderForm,
	IOrderResult,
} from '../types';

export type CatalogChangeEvent = {
	catalog: IProduct[];
};


export class AppState extends Model<IAppState> {
	basket: string[];
	catalog: IProduct[];
	loading: boolean;
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		items: [],
	};
	preview: string | null;
	formErrors: FormErrors = {};

    // Добавляет/убирает товар из корзины
    toggleOrderedItem() {}

    // Очищает корзину
    clearBasket() {}

    // получает общую сумму заказа
    getTotal() {}

    // Устанавливает список товаров в каталог
    setCatalog(items: IProduct[]) {}

    // Устанавливает товар в режим превью
    setPreview(item: IProduct) {}

    // Устанавливает значения полей заказа
    setOrderField() {}

    // Валидирует поля формы
    validateOrder() {}
}
