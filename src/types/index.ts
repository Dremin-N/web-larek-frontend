export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
}

export type Payment = 'cash' | 'card' | '';

export interface IOrderForm {
	payment: Payment;
	address: string;
}

export interface IOrderContactsForm extends IOrderForm{
	email: string;
	phone: string;
}

export interface IOrder extends IOrderContactsForm {
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppState {
  catalog: IProduct[];
  basket: string[];
  preview: string | null;
  order: IOrder | null;
  loading: boolean;
}