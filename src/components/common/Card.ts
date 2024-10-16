import { Component } from '../base/Component';

export interface ICardData {
	title: string;
	category?: string;
	image?: string;
	price: number;
	description?: string;
	index?: number;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICardData> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
	}

	set id(value: string) {}

	set title(value: string) {}

	set category(value: string) {}

	set image(value: string) {}

	set price(value: number) {}
}

export class CardCatalog extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
	}
}

export class CardPreview extends Card {
	protected _description?: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
	}

	set description(value: string) {}
}

export class CardBasket extends Card {
	protected _index: number;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
	}

	set index(value: number) {}
}
