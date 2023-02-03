import { Car } from 'components/Interfaces/car';
import { Winner } from 'components/Interfaces/winner';
import buildURL from './apiURLBuilder';
import requestsEngine from './requests/requestsEngine';
import requestsGarage from './requests/requestsGarage';
import requestsWinners from './requests/requestsWinners';

export default class AppController {
  apiBaseURL: string;
  garage: string;
  engine: string;
  winners: string;

  constructor() {
    this.apiBaseURL = buildURL();
    this.garage = `${this.apiBaseURL}/garage`;
    this.engine = `${this.apiBaseURL}/engine`;
    this.winners = `${this.apiBaseURL}/winners`;
  }

  DEFAULT_PAGE_INDEX = 1;
  DEFAULT_ITEMS_PER_GARAGE_PAGE = 7;
  DEFAULT_ITEMS_PER_WINNERS_PAGE = 10;
  DEFAULT_CAR_COLOR = '#ff0000';
  CAR_BRANDS = [
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
  CAR_MODELS = [
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
  ]

  async getCars(_page: number = this.DEFAULT_PAGE_INDEX, _limit: number = this.DEFAULT_ITEMS_PER_GARAGE_PAGE): Promise<[Car[], number]> {
    const params = {_page: `${_page}`, _limit: `${_limit}`};

    const data = await requestsGarage.getCars(params);

    return data;
  }

  async getCar(id: number): Promise<Car> {
    const responce = requestsGarage.getCar(id);

    const car = await responce.then((data) => data);

    return car;
  }

  async createCar(name: string, color: string = this.DEFAULT_CAR_COLOR): Promise<void> {
    try {
      const params = {name, color}
      await requestsGarage.createCar(params);
    }
    catch (e) {
      console.error(e);
    }
  }

  async createCars(): Promise<void> {
    const getRandomName = (arr1: string[], arr2: string[]): string =>
      arr1[Math.floor(Math.random() * arr1.length)] +
      ' ' +
      arr2[Math.floor(Math.random() * arr2.length)];

    const getRandomColor = (): string =>
      '#' + ((Math.random() * 0xffffff) << 0).toString(16);

    const numberOfcarsToCreate = 100
    for (let i = 0; i < numberOfcarsToCreate; i++) {
      await this.createCar(getRandomName(this.CAR_BRANDS, this.CAR_MODELS), getRandomColor());
    }
  }

  async deleteCar(id: number): Promise<void> {
    await requestsGarage.deleteCar(id);
  }

  async updateCar(id: number, name: string, color: string): Promise<void> {
    try {
      const params = {name, color};
      await requestsGarage.updateCar(id, params);
    }
    catch (e) {
      console.error(e);
    }
  }

  async toggleEngine(
    id: number,
    status: 'started' | 'stopped'
  ): Promise<{ velocity: number; distance: number }> {
    const params = {id: `${id}`, status};
    const data = await requestsEngine.toggleEngine(params);

    return data;
  }

  async driveCar(id: number): Promise<boolean> {
    const params = {
      id: `${id}`,
      status: 'drive'
    }

    const isDriving = await requestsEngine.driveCar(params);

    return isDriving;
  }

  async getWinners(
    _page = this.DEFAULT_PAGE_INDEX,
    _limit = this.DEFAULT_ITEMS_PER_WINNERS_PAGE,
    _sort: 'id' | 'numberOfWins' | 'time' = 'id',
    _order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<[Winner[] | [], number]> {
    const params = {
      _page: `${_page}`,
      _limit: `${_limit}`,
      _sort,
      _order,
    };

    const data = await requestsWinners.getWinners(params);

    return data;
  }

  async getWinner(id: number): Promise<Winner | object> {
    const winner = await requestsWinners.getWinner(id);

    return winner;
  }

  async createWinner(winner: Winner): Promise<void> {
    try {
      await requestsWinners.createWinner(winner);
    }
    catch (e) {
      console.error(e);
    }
  }

  async deleteWinner(id: number): Promise<void> {
    await requestsWinners.deleteWinner(id);
  }

  async updateWinner(id: number, numberOfWins: number, time: number): Promise<void> {
    const params = {numberOfWins: `${numberOfWins}`, time: `${time}`};

    try {
      await requestsWinners.updateWinner(id, params);
    }
    catch (e) {
      console.error(e);
    }
  }
}
