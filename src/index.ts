import App from './components/app/app';
import './index.css';

{
  const apiURL = `http://127.0.0.1:3000`;
  const app = new App(apiURL);
  app.start();
}
