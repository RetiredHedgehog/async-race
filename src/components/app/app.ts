import AppController from '../controller/appController';
import AppView from '../view/appView';

export default class App {
  controller: AppController;

  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    this.view.init(this.controller);
  }
}
