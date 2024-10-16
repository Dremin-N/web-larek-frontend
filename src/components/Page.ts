import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
	}

	// Устанавливаем число для корзины
	set counter(value: number) {}

	// Отображаем каталог
	set catalog(items: HTMLElement[]) {}

	// Блокируем/разблокируем скролл при открытии/закрытии попапа
	set locked(value: boolean) {}
}
