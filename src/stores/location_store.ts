import {makeAutoObservable} from "mobx";
import type {Station} from "../types/stations.ts";
import {type ErrorEvent, type LatLng, LatLngBounds, type LatLngTuple} from "leaflet";
import type {TranslationKey} from "../types/language_utils.ts";
import {mockStations} from "../types/stations.ts";
import type {PickerValue} from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import type {ApiDujpp, GetStationsFilters} from "../api/api_dujpp.ts";

export class LocationStore {
  api: ApiDujpp;
  _date: PickerValue | undefined;
  _startStation?: Station;
  _endStation?: Station;
  _showMap = undefined as 'start' | 'stop' | undefined;
  _userPosition?: LatLng;
  _userPositionAccuracy?: number;
  _userLocationError?: ErrorEvent;
  _errors: Map<string, string | undefined> = new Map();
  _departureStations: Station[] = [];
  _departureFilters: GetStationsFilters = {};
  _arrivalStations: Station[] = [];
  _arrivalFilters: GetStationsFilters = {};
  recenter: boolean = false;
  getBounds: boolean = false;
  mapBounds?: LatLngBounds;
  t: (key: TranslationKey) => string;

  constructor(t: (key: TranslationKey) => string, api: ApiDujpp) {
    makeAutoObservable(this);
    this.t = t;
    this._date = dayjs();
    this.api = api;
  }

  get mockStations() {
    return mockStations;
  }

  get stations(): Station[] {
    return [];
  }

  get departureStations(): Station[] {
    if (this._departureStations.length === 0) {
      this.refreshStations('start', this._departureFilters);
    }
    return this._departureStations;
  }


  arrivalStations(): Station[] {
    if (this._arrivalStations.length === 0) {
      this.refreshStations('stop', this._arrivalFilters);
    }
    return this._arrivalStations;
  }

  refreshStations(departure_arrival: 'start' | 'stop', filters?: GetStationsFilters) {
    this.api.getStations(filters).then((stations: Station[]) => {
      if (stations.length === 0) {
        return;
      }
      if (departure_arrival === 'start') {
        this._departureStations = stations;
      } else {
        this._arrivalStations = stations;
      }
    })
  }

  set showMap(value: 'start' | 'stop' | undefined) {
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
    this._departureFilters = {startStationId: station.id};
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
    this._arrivalFilters = {endStationId: station.id};
  }
  get endStation (){
    return this._endStation;
  }

  stationChosen(station: Station) {
    return (!!this._startStation && this.isEqualStations(station, this.startStation!)) || (!!this._endStation && this.isEqualStations(station, this.endStation!));
  }

  isEqualStations(s1?: Station, s2?: Station) {
    if (!s1 || !s2) return !s1 && !s2;
    return s1.latitude === s2.latitude && s1.longitude === s2.longitude && s1.name === s2.name;
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
      points.push([this.startStation.latitude, this.startStation.longitude]);
    }
    if (this.endStation) {
      points.push([this.endStation.latitude, this.endStation.longitude]);
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

  setDate = (date?: PickerValue) => {
    this._date = date;
    if (this.getError('date')) {
      this.errors(undefined, 'date');
    }
  }

  get date() {
    return this._date;
  }

  recenterMap() {
    if (this.position) {
      if (this.recenter) {
        this.recenter = false;
        setTimeout(() => this.recenterMap(), 100);
        return;
      }
      this.recenter = true;
    }
  }

  getMapBounds() {
    if (this.getBounds) {
      this.getBounds = false;
      setTimeout(() => this.getMapBounds(), 100);
      return;
    }
    this.getBounds = true;
  }

  _getFilters() {
    return this.showMap == 'start' ? this._departureFilters : this._arrivalFilters;
  }

  getStationsNearMapCenter() {
    this.getMapBounds();
    if (!this.mapBounds) return;
    const center = this.mapBounds.getCenter();
    const radius = Math.max(this.mapBounds.getNorthEast().distanceTo(center), this.mapBounds.getSouthWest().distanceTo(center));
    if (!this.showMapBool) return;
    this.refreshStations(this.showMap!, {...this._getFilters(), nearLocation: {latitude: center.lat, longitude: center.lng, radius: radius}});
  }

}