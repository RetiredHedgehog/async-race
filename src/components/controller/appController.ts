import { Car } from 'components/Interfaces/car';
import { Winner } from 'components/Interfaces/winner';

export default class AppController {
  apiBaseURL: string;
  garage: string;
  engine: string;
  winners: string;

  constructor(apiBaseURL: string) {
    this.apiBaseURL = apiBaseURL;
    this.garage = `${apiBaseURL}/garage`;
    this.engine = `${apiBaseURL}/engine`;
    this.winners = `${apiBaseURL}/winners`;
  }

  async getCars(_page = 1, _limit = 7): Promise<[Car[], number]> {
    const params = `${new URLSearchParams({
      _page: `${_page}`,
      _limit: `${_limit}`,
    })}`;
    const fullUrl = `${this.garage}?${params}`;

    const responce = await fetch(fullUrl, {
      method: 'GET',
    });

    const carsArr: Car[] | [] =
      (await responce.json().then((data) => data)) || [];
    const totalCount =
      Number(responce.headers.get('X-Total-Count')) || carsArr.length;

    return [carsArr, totalCount];
  }

  async getCar(id: number): Promise<Car | object> {
    const responce = await fetch(`${this.garage}/${id}`, {
      method: 'GET',
    });

    const car: Car | object = await responce.json().then((data) => data);

    return car;
  }

  async createCar(name: string, color = '#ff0000'): Promise<Car> {
    const responce = await fetch(`${this.garage}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ name, color }),
    });

    const car = await responce.json().then((data) => data);

    return car;
  }

  async createCars(): Promise<void> {
    const carBrands = [
      'Ford',
      'BMW',
      'Honda',
      'Hyundai',
      'Skoda',
      'Fiat',
      'Nissan',
      'Dodge',
      'Renault',
      'Volkswagen',
      'Kia',
    ];
    const carModels = [
      'Mustang GT',
      '1-Series Urban Line',
      'Civic Type R Limited Edition',
      'Santa Cruz',
      'Superb',
      'Stilo Multi Wagon',
      'Sakura',
      'Charger',
      'Logan',
      'CrossGolf',
      'K900',
    ];

    const getRandomName = (arr1: string[], arr2: string[]): string =>
      arr1[Math.floor(Math.random() * arr1.length)] +
      ' ' +
      arr2[Math.floor(Math.random() * arr2.length)];

    const getRandomColor = (): string =>
      '#' + ((Math.random() * 0xffffff) << 0).toString(16);

    for (let i = 0; i < 100; i++) {
      await this.createCar(getRandomName(carBrands, carModels), getRandomColor());
    }
  }

  async deleteCar(id: number): Promise<void> {
    await fetch(`${this.garage}/${id}`, { method: 'DELETE' });
  }

  async updateCar(id: number, name: string, color: string): Promise<void> {
    await fetch(`${this.garage}/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ name, color }),
    });
  }

  async toggleEngine(
    id: number,
    status: 'started' | 'stopped'
  ): Promise<{ velocity: number; distance: number }> {
    const params = `${new URLSearchParams({
      id: `${id}`,
      status,
    })}`;
    const fullUrl = `${this.engine}?${params}`;

    const responce = await fetch(fullUrl, {
      method: 'PATCH',
    });

    const data = await responce.json().then((data) => data);

    return data;
  }

  async driveCar(id: number): Promise<{ success: boolean }> {
    const params = `${new URLSearchParams({
      id: `${id}`,
      status: 'drive',
    })}`;
    const fullUrl = `${this.engine}?${params}`;

    const responce = await fetch(fullUrl, {
      method: 'PATCH',
    });

    // TODO: throw error and catch to stop a car?
    if (responce.status === 500) {
      return { success: false };
    }

    const success = await responce.json().then((data) => data);

    return success;
  }

  async getWinners(
    _page = 1,
    _limit = 10,
    _sort: 'id' | 'numberOfWins' | 'time' = 'id',
    _order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<[Winner[] | [], number]> {
    const params = `${new URLSearchParams({
      _page: `${_page}`,
      _limit: `${_limit}`,
      _sort,
      _order,
    })}`;
    const fullUrl = `${this.winners}?${params}`;

    const responce = await fetch(fullUrl, {
      method: 'GET',
    });

    const winnersArr: Winner[] | [] =
      (await responce.json().then((data) => data)) || [];
    const totalCount =
      Number(responce.headers.get('X-Total-Count')) || winnersArr.length;

    return [winnersArr, totalCount];
  }

  async getWinner(id: number): Promise<Winner | object> {
    const responce = await fetch(`${this.winners}/${id}`, {
      method: 'GET',
    });

    const data: Winner | object = await responce.json().then((data) => data);

    return data;
  }

  async createWiner(winner: Winner): Promise<Winner | object> {
    const responce = await fetch(`${this.winners}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(winner),
    });

    // TODO: throw error and catch?
    if (responce.status === 500) {
      throw new Error();
    }

    const data: Winner | object = await responce.json().then((data) => data);

    return data;
  }

  async deleteWinner(id: number): Promise<void> {
    await fetch(`${this.winners}/${id}`, { method: 'DELETE' });
  }

  async updateWinenr(id: number, numberOfWins: number, time: number): Promise<void> {
    await fetch(`${this.winners}/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ numberOfWins, time }),
    });
  }
}
