import {makeAutoObservable} from "mobx";

export class AppStore {
  dialog?: any;

  constructor() {
    makeAutoObservable(this);
  }

  showDialog(dialog: any) {
    this.dialog = dialog;
  }

  hideDialog() {
    this.dialog = undefined;
  }
}