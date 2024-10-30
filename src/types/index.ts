export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number;
}

export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IOrderContacts {
	phone: string;
	email: string;
}

export interface IOrderInputs {
	payment: string;
	address: string;
	phone: string;
	email: string;
}

export interface IOrder extends IOrderForm, IOrderContacts {
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppState {
	catalog: IProduct[];
	noPriceitems: string[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}
