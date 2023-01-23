import AppController from 'components/controller/appController';
import createCarField from './carField/createCarField';

export default async function fillCarsDisplay(
  controller: AppController
): Promise<void> {
  const [cars] = await controller.getCars();

  const wrapper = document.getElementsByClassName(
    'cars-display'
  )[0] as HTMLElement;
  wrapper?.replaceChildren(
    ...cars.map((car) => createCarField(controller, car))
  );
}
