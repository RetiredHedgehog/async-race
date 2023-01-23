import AppController from 'components/controller/appController';
import createCarClicked from './clickEvents/createCarClicked';
import createInputForm from './createInputForm/createInputForm';
import updateCarClicked from './clickEvents/updateCarClicked';

export default class Controls {
  drawInputs(controller: AppController, root: HTMLElement) {
    const formCreateCar = createInputForm(
      controller,
      'car name',
      'create car',
      createCarClicked(controller)
    );

    const formUpdateCar = createInputForm(
      controller,
      'car name',
      'update car',
      updateCarClicked(controller)
    );

    const inputId = document.createElement('input');
    inputId.classList.add('input-form__input_id');
    inputId.type = 'input';
    inputId.placeholder = 'car id';
    formUpdateCar.prepend(inputId);

    root.append(formCreateCar, formUpdateCar);
  }
}
