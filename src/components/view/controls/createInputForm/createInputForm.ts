import AppController from 'components/controller/appController';

export default function createInputForm(
  controller: AppController,
  inputPlaceholder: string,
  buttonText: string,
  cb: (this: HTMLButtonElement, ev: MouseEvent) => void
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.classList.add('input-form');

  const inputText = document.createElement('input');
  inputText.classList.add('input-form__input_text');
  inputText.type = 'text';
  inputText.placeholder = inputPlaceholder;

  const inputColor = document.createElement('input');
  inputColor.classList.add('input-form__input_color');
  inputColor.type = 'color';
  inputColor.value = '#ffffff';

  const button = document.createElement('button');
  button.classList.add('btn', 'input-form__btn');
  button.innerText = buttonText;
  button.addEventListener('click', cb);

  wrapper.append(inputText, inputColor, button);
  return wrapper;
}
