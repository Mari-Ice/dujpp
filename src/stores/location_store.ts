import {makeAutoObservable} from "mobx";
import type {Station, Trip} from "../types/stations.ts";
import {type ErrorEvent, type LatLng, LatLngBounds, type LatLngExpression, type LatLngTuple} from "leaflet";
import type {TranslationKey} from "../types/language_utils.ts";
import {mockStations} from "../types/stations.ts";
import type {PickerValue} from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import type {ApiDujpp, GetStationsFilters} from "../api/api_dujpp.ts";
import { decode } from "@googlemaps/polyline-codec";

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
  _allStations: Station[] = [];
  _departureStations: Station[] = [];
  _departureFilters: GetStationsFilters = {};
  _arrivalStations: Station[] = [];
  _arrivalFilters: GetStationsFilters = {};
  recenter: boolean = false;
  getBounds: boolean = false;
  mapBounds?: LatLngBounds;
  t: (key: TranslationKey) => string;
  _polyline: LatLngExpression[] | null = null;
  _centerToStations: boolean = false;

  constructor(t: (key: TranslationKey) => string, api: ApiDujpp) {
    makeAutoObservable(this);
    this.t = t;
    this._date = dayjs();
    this.api = api;
    this.refreshStations('start');
    this.refreshStations('stop');
  }

  get mockStations() {
    return mockStations;
  }

  get stations(): Station[] {
    if (this.showMapBool) {
      if (this.showMap === 'start') {
        return this.departureStations;
      }
      return this.arrivalStations;
    } else {
      return this.departureStations.concat(this.arrivalStations);
    }
  }

  get visualizedStations(): Station[] {
    if (this.showMapBool) {
      if (this.showMap === 'start') {
        return this._endStation ? this.departureStations.concat([this._endStation]) : this.departureStations;
      }
      return this._startStation ? this.arrivalStations.concat([this._startStation]) : this.arrivalStations;
    } else {
      return this.stations;
    }
  }

  get departureStations(): Station[] {
    // if (this._departureStations.length === 0) {
    //   this.refreshStations('start', this._departureFilters);
    // }
    return this._departureStations ?? [];
  }


  get arrivalStations(): Station[] {
    // if (this._arrivalStations.length === 0) {
    //   this.refreshStations('stop', this._arrivalFilters);
    // }
    return this._arrivalStations ?? [];
  }

  refreshStations(departure_arrival: 'start' | 'stop', filters?: GetStationsFilters) {
    this.api.getStations(filters).then((stations: Station[]) => {
      if (!stations || stations.length === 0) {
        stations = [];
      }
      if (departure_arrival === 'start') {
        if (filters && filters.stationId) {
          // we need to filter the current _departureStations over the ids provided in the new data
          const ids = stations.map(station => station.id);
          // console.log('filtering departure stations', ids.length);
          this._departureStations = this._allStations.filter(station => ids.includes(station.id));
        } else {
          this._departureStations = stations;
        }
        // console.log('departure stations', this._departureStations.length);
      } else {
        if (filters && filters.stationId) {
          // we need to filter the current _arrivalStations over the ids provided in the new data
          const ids = stations.map(station => station.id);
          // console.log('filtering arrival stations', ids.length);
          // console.log('all stations include those: ', ids.filter(id => this._allStations.map(s => s.id).includes(id)).length);

          this._arrivalStations = this._allStations.filter(station => ids.includes(station.id));
        } else {
          this._arrivalStations = stations;
        }
        // console.log('arrival stations', this._arrivalStations.length);
      }

      if (!filters || !filters.stationId) {
        this._allStations = stations;
        // console.log('all stations include those: ', stations.length);
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

  setStartStation = (station: Station | null) => {
    this._startStation = station ?? undefined;
    if (this.getError('startStation')) {
      if (this.getError('startStation') === this.t('sameStationsError') && !this.isEqualStations(this.startStation, this.endStation)) {
        this.errors(undefined, 'endStation');
      }
      this.errors(undefined, 'startStation');
    }
    if (!station) {
      this._departureFilters = {};
      if (!this._endStation) {
        this.refreshStations('stop');
      }
    } else {
      this._departureFilters = {stationId: station.id};
      this.refreshStations('stop', this._departureFilters);
    }
    this.getPolyline();
  }

  get startStation (){
    return this._startStation;
  }

  setEndStation = (station: Station | null) => {
    this._endStation = station ?? undefined;
    if (this.getError('endStation')) {
      if (this.getError('endStation') === this.t('sameStationsError') && !this.isEqualStations(this.startStation, this.endStation)) {
        this.errors(undefined, 'startStation');
      }
      this.errors(undefined, 'endStation');
    }
    if (!station) {
      this._arrivalFilters = {};
      if (!this._startStation) {
        this.refreshStations('start');
      }
    } else {
      this._arrivalFilters = {stationId: station.id};
      this.refreshStations('start', this._arrivalFilters);
    }
    this.getPolyline();
  }

  get endStation (){
    return this._endStation;
  }

  stationChosen(station: Station) {
    return (!!this._startStation && this.isEqualStations(station, this.startStation!)) || (!!this._endStation && this.isEqualStations(station, this.endStation!));
  }

  isEqualStations(s1?: Station, s2?: Station) {
    if (!s1 || !s2) return !s1 && !s2;
    return s1.id === s2.id;
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
    }
    if (this.startStation && this.startStation.latitude && this.startStation.longitude) {
      points.push([this.startStation.latitude!, this.startStation.longitude!]);
    }
    if (this.endStation && this.endStation.latitude && this.endStation.longitude) {
      points.push([this.endStation.latitude!, this.endStation.longitude!]);
    }

    if (points.length === 1) {
      if (this.position) {
        points.push([this.position.lat, this.position.lng]);
      }
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

  private getTripPoints(trip: Trip): LatLngExpression[] | null {
    if (!trip.legs) return null;
    console.log(trip.legs);
    if (trip.legs.length === 0) {
      return null;
    }
    for (const leg of trip.legs) {
      if (leg.points && leg.authority) {
        return decode(leg.points);
      }
    }
    return null;
  }

  async getPolyline() {
    if (!this._startStation || !this._endStation) {
      this._polyline = null;
      return;
    }
    const trips =  await this.api.getTrips(this._startStation.id, this._endStation.id, this._date);
    if (trips.length === 0) {
      this._polyline = null;
      return;
    }
    this._polyline = this.getTripPoints(trips[0]);
  }
  get polyline() {
    if (this._polyline) {
      return this._polyline;
    } else {
      this.getPolyline();
      return undefined;
    }
  }
  get centerToStations() {
    return this._centerToStations;
  }

  recenterToStations() {
    if (this._centerToStations) {
      this._centerToStations = false;
      setTimeout(() =>  this.recenterToStations(), 100);
    } else {
      this._centerToStations = true;
    }
  }
}