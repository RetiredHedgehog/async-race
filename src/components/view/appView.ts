import AppController from 'components/controller/appController';
import fillCarsDisplay from './carsDisplay/fillCarsDisplay';
import Controls from './controls/controls';

import updateCarCounter from './updateCarCounter';

export default class AppView {
  root: HTMLElement;
  controls: Controls;

  constructor() {
    this.root =
      document.getElementsByTagName('body')[0] ||
      document.appendChild(document.createElement('body'));
    this.controls = new Controls();
  }

  init(controller: AppController) {
    this.controls.drawInputs(controller, this.root);

    const wrapper = document.createElement('div');
    wrapper.classList.add('garage-view');

    const wrapperHeading = document.createElement('div');
    wrapperHeading.classList.add('garage-view__heading');

    const title = document.createElement('h2');
    title.classList.add('garage-view__title');
    title.innerText = 'Garage';

    const amount = document.createElement('p');
    amount.classList.add('garage-view__amount');
    amount.innerText = '(...)';

    wrapperHeading.append(title, amount);

    const wrapperCarDisplay = document.createElement('div');
    wrapperCarDisplay.classList.add('cars-display');

    wrapper.append(wrapperHeading, wrapperCarDisplay);

    const buttonGetCars = document.createElement('button');
    buttonGetCars.classList.add('btn', 'btn-get-cars');
    buttonGetCars.innerText = 'Get cars';

    const getCars = async () => {
      await updateCarCounter(controller);
      fillCarsDisplay(controller);
    }

    buttonGetCars.addEventListener('click', getCars);

    const buttonGenerateCars = document.createElement('button');
    buttonGenerateCars.classList.add('btn', 'btn-generate-cars');
    buttonGenerateCars.innerText = 'Generate cars';

    const generateCars = async () => {
      await controller.createCars();
      fillCarsDisplay(controller);
      await updateCarCounter(controller);
    }

    buttonGenerateCars.addEventListener('click', generateCars);

    this.root.append(buttonGetCars, buttonGenerateCars, wrapper);
    updateCarCounter(controller);
    fillCarsDisplay(controller);
  }
}
