import {makeAutoObservable} from "mobx";
import {isLanguage, type Language, type TranslationKey, translations} from "../types/language_utils.tsx";
import {mockStations, type Station} from "../types/stations.tsx";

export class AppStore {
  dialog?: any;
  _language: Language = 'en';
  _startStation?: Station;
  _endStation?: Station;
  _showMap = false;
  _timetable?: any;

  constructor() {
    makeAutoObservable(this);
    this._language = this.getInitialLanguage();
  }

  showDialog(dialog: any) {
    this.dialog = dialog;
  }

  hideDialog() {
    this.dialog = undefined;
  }

  getInitialLanguage = (): Language => {
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


  get mockStations() {
    return mockStations;
  }

  set showMap(value: boolean) {
    this._showMap = value;
  }

  get showMap() {
    return this._showMap;
  }

  setStartStation = (station: Station) => {
    this._startStation = station;
  }
  get startStation (){
    return this._startStation;
  }
  setEndStation = (station: Station) => {
    this._endStation = station;
  }
  get endStation (){
    return this._endStation;
  }

  setTimetable = (timetable: any) => {
    this._timetable = timetable;
  }

}