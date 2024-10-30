import { Component } from '../base/Component';

export interface ICardData {
	title: string;
	category?: string;
	image?: string;
	price: number;
	categoryClass?: string;
	description?: string;
	index?: number;
}

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICardData> {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id() {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title() {
		return this._title.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: number | null) {
		if (!value) {
			this.setText(this._price, 'бесценно');
		} else {
			this.setText(this._price, value + ' синапсов');
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set categoryClass(value: string) {
		let className = '';
		switch (value) {
			case 'софт-скил':
				className = 'card__category_soft';
				break;
			case 'другое':
				className = 'card__category_other';
				break;
			case 'дополнительное':
				className = 'card__category_additional';
				break;
			case 'кнопка':
				className = 'card__category_button';
				break;
			case 'хард-скил':
				className = 'card__category_hard';
		}

		this._category.classList.add(className);
	}
}

export class CardCatalog extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);

		this._title = container.querySelector('.card__title');
		this._category = container.querySelector('.card__category');
		this._image = container.querySelector('.card__image');
		this._price = container.querySelector('.card__price');
		this._button = container.querySelector('.gallery__item');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}
}

export class CardPreview extends Card {
	constructor(
		container: HTMLElement,
		inBasket: boolean,
		actions?: ICardActions
	) {
		super(container, actions);

		this._title = container.querySelector('.card__title');
		this._category = container.querySelector('.card__category');
		this._image = container.querySelector('.card__image');
		this._price = container.querySelector('.card__price');
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button');

		this.updateButtonText(inBasket);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}
		}
	}

	updateButtonText(isInBasket: boolean) {
		if (isInBasket) {
			this.setText(this._button, 'Удалить');
		} else {
			this.setText(this._button, 'В корзину');
		}
	}
}

export class CardBasket extends Card {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);

		this._title = container.querySelector('.card__title');
		this._price = container.querySelector('.card__price');
		this._button = container.querySelector('.card__button');
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set index(value: number) {
		this.setText(this._index, value + 1);
	}
}
