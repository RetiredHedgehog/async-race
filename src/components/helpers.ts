export function buildURL(
  path = '',
  params: { [key: string]: string } = {}
): string {
  const baseURL = `http://127.0.0.1:3000`;
  const searchParams = new URLSearchParams(params).toString();

  const fullURL = `${baseURL}/${path}${
    searchParams ? `?${searchParams}` : searchParams
  }`;

  return fullURL;
}

export const getRandomName = (arr1: string[], arr2: string[]): string =>
  arr1[Math.floor(Math.random() * arr1.length)] +
  ' ' +
  arr2[Math.floor(Math.random() * arr2.length)];

export const getRandomColor = (): string =>
  '#' + ((Math.random() * 0xffffff) << 0).toString(16);
