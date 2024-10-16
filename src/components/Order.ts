import { Form } from './common/Form';
import { IOrderForm, IOrderContactsForm, Payment } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set payment(value: Payment) {}

	set address(value: string) {}
}

export class OrderContacts extends Form<IOrderContactsForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {}

	set email(value: string) {}
}