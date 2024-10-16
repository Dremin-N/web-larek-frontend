import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
	valid: boolean;
}

export class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});
	}

    // Следит за изменениями в форме
    protected onInputChange(field: keyof T, value: string) {}

    // Блокирует/Разблокирует кнопку в форме
    set valid(value: boolean) {}

}
