import {makeAutoObservable} from "mobx";
import {isLanguage, type Language, type TranslationKey, translations} from "../types/language_utils.tsx";
import {mockStations, type Station} from "../types/stations.tsx";
import type {ErrorEvent, LatLng, LatLngTuple} from "leaflet";

export class AppStore {
  dialog?: any;
  _language: Language = 'en';
  _date: Date | undefined;
  _startStation?: Station;
  _endStation?: Station;
  _showMap = undefined as string | undefined;
  _timetable?: any;
  _userPosition?: LatLng;
  _userPositionAccuracy?: number;
  _userLocationError?: ErrorEvent;
  _errors: Map<string, string | undefined> = new Map();

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

  set showMap(value: string | undefined) {
    this._showMap = value;
  }

  get showMap() {
    return this._showMap;
  }
  get showMapBool() {
    return this._showMap !== undefined;
  }

  setStartStation = (station: Station) => {
    this._startStation = station;
    if (this.getError('startStation')) {
      if (this.getError('startStation') === this.t('sameStationsError') && !this.isEqualStations(this.startStation, this.endStation)) {
        this.errors(undefined, 'endStation');
      }
      this.errors(undefined, 'startStation');
    }
  }
  get startStation (){
    return this._startStation;
  }
  setEndStation = (station: Station) => {
    this._endStation = station;
    if (this.getError('endStation')) {
      if (this.getError('endStation') === this.t('sameStationsError') && !this.isEqualStations(this.startStation, this.endStation)) {
        this.errors(undefined, 'startStation');
      }
      this.errors(undefined, 'endStation');
    }
  }
  get endStation (){
    return this._endStation;
  }

  setTimetable = (timetable: any) => {
    this._timetable = timetable;
  }

  stationChosen(station: Station) {
    return (!!this._startStation && this.isEqualStations(station, this.startStation!)) || (!!this._endStation && this.isEqualStations(station, this.endStation!));
  }

  isEqualStations(s1?: Station, s2?: Station) {
    if (!s1 || !s2) return !s1 && !s2;
    return s1.lat === s2.lat && s1.lng === s2.lng && s1.label === s2.label;
  }

  setPosition = (position: LatLng) => {
    this._userPosition = position;
  }
  get position() {
    return this._userPosition;
  }

  setAccuracy = (accuracy: number) => {
    this._userPositionAccuracy = accuracy;
  }
  get accuracy() {
    return this._userPositionAccuracy;
  }

  userLocationError(e: ErrorEvent) {
    if (!this._userLocationError) {
      this._userLocationError = e;
      alert(this.t('userLocationError'))
    }
  }

  getBoundPoints(point?: LatLng): LatLngTuple[] {
    let points: LatLngTuple[] = [];
    if (point) {
      points.push([point.lat, point.lng]);
    } else if (this.position) {
      points.push([this.position.lat, this.position.lng]);
    }
    if (this.startStation) {
      points.push([this.startStation.lat, this.startStation.lng]);
    }
    if (this.endStation) {
      points.push([this.endStation.lat, this.endStation.lng]);
    }

    if (points.length === 0) {
      return [[46.0569, 14.5058]]; // Default to Ljubljana
    }
    return points;
  }

  errors(message: string | undefined, category: string) {
    this._errors.set(category, message);
  }

  getError(category: string) {
    return this._errors.get(category);
  }

  validateFields() {
    if (this._startStation === undefined) {
      this._errors.set('startStation', this.t('noStartStation'))
    }
    if (this._endStation === undefined) {
      this._errors.set('endStation', this.t('noEndStation'))
    }
    if (this.isEqualStations(this.startStation, this.endStation)) {
      this._errors.set('startStation', this.t('sameStationsError'));
      this._errors.set('endStation', this.t('sameStationsError'));
    }
    if (this._date === undefined) {
      this._errors.set('date', this.t('dateError'))
    }
  }

  setDate = (date: Date | null) => {
    this._date = date ?? undefined;
    if (this.getError('date')) {
      this.errors(undefined, 'date');
    }
  }

}