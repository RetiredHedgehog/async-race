import { buildURL } from "components/helpers";
import { Winner } from "components/Interfaces/winner";

type Params = {
  [key: string]: string
};

const winnersURL =  'winners';
const buildWinnersURL = (function (baseUrl: string = '') {
  return function({params, path}: {params?: Params, path?: string} = {params: {}, path: ''}) {
    const fullUrl = baseUrl + (path ? `/${path}` : '');

    return buildURL(fullUrl, params);
  }
})(winnersURL);

const requestsWinners = {
  async getWinners(params: Params): Promise<[Winner[] | [], number]> {
    const responce = await fetch(buildWinnersURL({params}), {
      method: 'GET',
    });

    const winners: Winner[] | [] =
      (await responce.json().then((data) => data)) || [];
    const totalCount = Number(responce.headers.get('X-Total-Count')) || winners.length;

    return [winners, totalCount];
  },

  async getWinner(id: number): Promise<Winner | object> {
    const responce = await fetch(buildWinnersURL({path: `${id}`}), {
      method: 'GET',
    });

    return await responce.json();
  },

  async createWinner(winner: Winner): Promise<void> {
    const responce = await fetch(buildWinnersURL(), {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(winner),
    });

    if (!responce.ok) {
      const message = `An error occured during sending request. Response status: ${responce.status}.`
      throw new Error(message);
    }
  },

  async deleteWinner(id: number): Promise<void> {
    await fetch(buildWinnersURL({path: `${id}`}), { method: 'DELETE' });
  },

  async updateWinner(id: number, params: Params): Promise<void> {
    const responce = await fetch(buildWinnersURL({path: `${id}`}), {
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
  }
}

export default requestsWinners;
