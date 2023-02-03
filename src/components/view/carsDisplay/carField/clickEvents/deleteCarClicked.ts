import AppController from 'components/controller/appController';
import { Car } from 'components/Interfaces/car';
import updateCarCounter from '../../../updateCarCounter';
import fillCarsDisplay from '../../fillCarsDisplay';

export default async function deleteCarClicked(
  controller: AppController,
  car: Car
) {
  await controller.deleteCar(car.id);
  fillCarsDisplay(controller);
  updateCarCounter(controller);
}
