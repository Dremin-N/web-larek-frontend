import { Form } from './Form';
import { IOrderContacts, IOrderForm } from '../../types';
import { EventEmitter, IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Order extends Form<IOrderForm> {
	protected _tabs: HTMLButtonElement[];
	public _selectedPayment: string;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._tabs = Array.from(
			this.container.querySelectorAll('.order__buttons button')
		) as HTMLButtonElement[];
		this._tabs.forEach((button) => {
			button.addEventListener('click', (e) => this.onTabClick(e as MouseEvent));
		});
	}

	protected onTabClick(e: MouseEvent) {
		const target = e.currentTarget as HTMLButtonElement;
		this._selectedPayment = target.name;

		this.updateTabs();
	}

	protected updateTabs() {
		this._tabs.forEach((button) => {
			button.classList.toggle(
				'button_alt-active',
				button.name === this._selectedPayment
			);
		});
		this.events.emit('update:payment');
	}
}

export class Contacts extends Form<IOrderContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}
}
