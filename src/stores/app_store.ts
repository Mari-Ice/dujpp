import {makeAutoObservable} from "mobx";
import {isLanguage, type Language, type TranslationKey, translations} from "../types/language_utils.ts";
import {FaresStore} from "./fares_store.ts";
import {LocationStore} from "./location_store.ts";
import {PaymentStore} from "./payment_store.ts";

export class AppStore {
  dialog?: any;
  _language: Language = 'en';
  _timerCounter = 0;
  _navigateBack = false;

  faresStore?: FaresStore;
  locationStore?: LocationStore;
  paymentStore?: PaymentStore;

  constructor() {
    makeAutoObservable(this);
    this.locationStore = new LocationStore(this.t);
    this.faresStore = new FaresStore(this.t, this);
    this.paymentStore = new PaymentStore(this.t);
  }

  showDialog(dialog: any) {
    this.dialog = dialog;
  }

  hideDialog() {
    this.dialog = undefined;
  }

  static getInitialLanguage = (urlLang: string | null): Language => {
    if (urlLang && isLanguage(urlLang)) {
      localStorage.setItem('language', urlLang); // Sync to storage
      return urlLang as Language;
    }
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang === 'en' || storedLang === 'sl') {
      return storedLang;
    }

    const browserLang = navigator.language.toLowerCase();

    if (browserLang.includes('sl')) {
      return 'sl';
    }

    return 'en';
  };

  t = (key: TranslationKey) => {
    return translations[this.language][key] as string;
  }

  setLanguage = (lang: string) => {
    if (isLanguage(lang)) {
      this._language = lang as Language;
      localStorage.setItem('language', lang);
    }
  }

  get language(): Language {
    return this._language;
  }

  get timerCount() {
    return this._timerCounter;
  }

  incrementTimer() {
    this._timerCounter += 1;
    if (this._timerCounter > 5) {
      this._timerCounter = 0;
      this._navigateBack = true;
    } else {
      setTimeout(() => {
        this.incrementTimer();
      }, 1000);
    }
  }

  get navigateBack() {
    return this._navigateBack;
  }

}