import { Form } from './common/Form';
import { IOrderForm, Payment } from '../types';
import { EventEmitter, IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set payment(value: Payment) {}

	set address(value: string) {}

	set phone(value: string) {}

	set email(value: string) {}

	// Метод для переключения на следующую форму
	showForm(container: HTMLTemplateElement) {}
}
