import { buildURL } from 'components/helpers';

type Params = {
  [key: string]: string;
};

const engineURL = 'engine';
const buildEngineURL = (function (baseUrl = '') {
  return function (
    { params, path }: { params?: Params; path?: string } = {
      params: {},
      path: '',
    }
  ) {
    const fullUrl = baseUrl + (path ? `/${path}` : '');

    return buildURL(fullUrl, params);
  };
})(engineURL);

const requestsEngine = {
  async toggleEngine(
    params: Params
  ): Promise<{ velocity: number; distance: number }> {
    const responce = await fetch(buildEngineURL({ params }), {
      method: 'PATCH',
    });

    return await responce.json();
  },

  async driveCar(params: Params): Promise<boolean> {
    const responce = await fetch(buildEngineURL({ params }), {
      method: 'PATCH',
    });

    return responce.ok;
  },
};

export default requestsEngine;
