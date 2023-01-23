import AppController from 'components/controller/appController';
import fillCarsDisplay from '../../carsDisplay/fillCarsDisplay';

export default function updateCarClicked(controller: AppController) {
  return async function curriedUpdateCarClicked(event: Event) {
    const target = event.target as HTMLButtonElement;
    const form = target.closest('.input-form') as HTMLElement;

    const name = (<HTMLInputElement>(
      form?.getElementsByClassName('input-form__input_text')[0]
    )).value;

    const color = (<HTMLInputElement>(
      form?.getElementsByClassName('input-form__input_color')[0]
    )).value;

    const id = Number(
      (<HTMLInputElement>(
        form?.getElementsByClassName('input-form__input_id')[0]
      )).value
    );

    if (!(name && color && id)) {
      return;
    }

    await controller.updateCar(id, name, color);
    fillCarsDisplay(controller);
  };
}
