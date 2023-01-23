import AppController from 'components/controller/appController';
import { Car } from 'components/Interfaces/car';
import updateCarClicked from './clickEvents/updateCarClicked';
import deleteCarClicked from './clickEvents/deleteCarClicked';

export default function createCarField(
  controller: AppController,
  car: Car
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.classList.add('car__wrapper');

  const image = document.createElement('img');
  image.alt = 'car icon';
  image.style.backgroundColor = car.color;

  const name = document.createElement('h2');
  name.innerText = car.name;

  const buttonDeleteCar = document.createElement('button');
  buttonDeleteCar.innerText = 'delete car';
  buttonDeleteCar.addEventListener('click', async () => {
    deleteCarClicked(controller, car);
  });

  const buttonUpdateCar = document.createElement('button');
  buttonUpdateCar.innerText = 'copy update info';
  buttonUpdateCar.addEventListener('click', async () => {
    updateCarClicked(controller, car);
  });

  wrapper.append(buttonDeleteCar, buttonUpdateCar, name, image);
  return wrapper;
}
