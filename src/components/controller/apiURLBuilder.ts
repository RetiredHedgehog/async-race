export default function buildURL(path = '', params: {[key: string]: string} = {}): string {
  const baseURL =  `http://127.0.0.1:3000`;
  const searchParams = new URLSearchParams(params).toString();

  const fullURL = `${baseURL}/${path}${searchParams ? `?${searchParams}` : searchParams}`;

  return fullURL;
}