import AppController from 'components/controller/appController';

export default async function updateCarCounter(
  controller: AppController
): Promise<void> {
  const carsCounter = document.getElementsByClassName(
    'garage-view__amount'
  )[0] as HTMLElement;
  const [, totalCount] = await controller.getCars();
  carsCounter.innerText = `(${totalCount})`;
}
