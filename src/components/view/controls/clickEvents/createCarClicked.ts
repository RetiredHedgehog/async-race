import AppController from 'components/controller/appController';
import fillCarsDisplay from '../../carsDisplay/fillCarsDisplay';
import updateCarCounter from '../../updateCarCounter';
export default function createCarClicked(controller: AppController) {
  return async function curriedCreateCarClicked(event: Event) {
    const target = event.target as HTMLButtonElement;
    const form = target.closest('.input-form');

    const name = (<HTMLInputElement>(
      form?.getElementsByClassName('input-form__input_text')[0]
    )).value;

    const color = (<HTMLInputElement>(
      form?.getElementsByClassName('input-form__input_color')[0]
    )).value;

    if (!(name && color)) {
      return;
    }

    await controller.createCar(name, color);
    fillCarsDisplay(controller);
    updateCarCounter(controller);
  };
}
