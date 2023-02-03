import { Car } from 'components/Interfaces/car';
import buildURL from '../apiURLBuilder';

type Params = {
  [key: string]: string
};

const garageURL =  'garage';
const buildGarageURL = (function (baseUrl: string = '') {
  return function({params, path}: {params?: Params, path?: string} = {params: {}, path: ''}) {
    const fullUrl = baseUrl + (path ? `/${path}` : '');

    return buildURL(fullUrl, params);
  }
})(garageURL);

const requestsGarage = {
  async getCars(params: Params): Promise<[Car[], number]> {
    const responce = await fetch(
      buildGarageURL({params}), {
      method: 'GET',
    });

    const cars: Car[] | [] =
      (await responce.json().then((data) => data)) || [];
    const totalCount = Number(responce.headers.get('X-Total-Count')) || cars.length;

    return [cars, totalCount];
  },

  async getCar(id: number): Promise<Car> {
    const responce = await fetch(
      buildGarageURL({path: `${id}`}), {
      method: 'GET',
    });

    return await responce.json();
  },

  async createCar(params: Params): Promise<void> {
    const responce = await fetch(
      buildGarageURL(params)
      , {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    });

    if (!responce.ok) {
      const message = `An error occured during sending request. Response status: ${responce.status}.`
      throw new Error(message);
    }
  },

  async deleteCar(id: number): Promise<void> {
    await fetch(
      buildGarageURL({path: `${id}`}), { method: 'DELETE' });
  },

  async updateCar(id: number, params: Params): Promise<void> {
    const responce = await fetch(
      buildGarageURL({path: `${id}`, params}), {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(params),
    });

    if (!responce.ok) {
      const message = `An error occured during sending request. Response status: ${responce.status}.`
      throw new Error(message);
    }
  },
};

export default requestsGarage;
