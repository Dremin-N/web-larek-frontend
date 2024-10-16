import {Component} from "../base/Component";
import { EventEmitter } from "../base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor (container: HTMLElement, protected events: EventEmitter) {
        super(container)
    }

    // Задаем список товаров в корзине
    set items(items: HTMLElement[]) {

    }

    // Устанавливаем общую сумму товаров
    set total(value: number) {

    }

    // В зависимости от наличия товаров меняется отображение кнопки оформить
    set selected(items: string[]) {

    }
}