import AppController from "components/controller/appController";
import AppView from "components/view/appView";

export default class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    return;
  }
}
