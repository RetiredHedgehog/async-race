import AppController from 'components/controller/appController';
import { Car } from 'components/Interfaces/car';

export default async function updateCarClicked(
  controller: AppController,
  car: Car
) {
  (<HTMLInputElement>(
    document?.getElementsByClassName('input-form__input_text')[1]
  )).value = car.name;

  (<HTMLInputElement>(
    document?.getElementsByClassName('input-form__input_color')[1]
  )).value = car.color;

  (<HTMLInputElement>(
    document?.getElementsByClassName('input-form__input_id')[0]
  )).value = `${car.id}`;
}
