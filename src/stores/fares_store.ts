import {makeAutoObservable} from "mobx";
import type {TranslationKey} from "../types/language_utils.ts";
import {AppRoutes, buildRoute, ParamKeys} from "../types/route_utils.tsx";
import dayjs from "dayjs";
import type {PickerValue} from "@mui/x-date-pickers/internals";
import {mockStations} from "../types/stations.ts";
import type {AppStore} from "./app_store.ts";
import type {ApiDujpp, Trip} from "../api/api_dujpp.ts";

export class FaresStore {
  api: ApiDujpp;
  t: (key: TranslationKey) => string;
  _timeFrom?: PickerValue | undefined;
  _timeTo?: PickerValue | undefined;
  _startStationId?: string;
  _endStationId?: string;

  _initialized = false;
  _validStations = true;
  _stations: any[] = [];
  _timetables: Trip[] = [];
  _loading = false;
  _openTimetableRun?: Trip;
  _appStore?: any;


  constructor(t: (key: TranslationKey) => string, api: ApiDujpp, appStore?: AppStore, ) {
    makeAutoObservable(this);
    this.t = t;
    this._stations = mockStations;
    this._appStore = appStore;
    this.api = api;
  }

  setupParams(searchParams: URLSearchParams): boolean {
    const timeFrom = searchParams.get(ParamKeys.TIME_FROM);
    if (timeFrom) {
      this._timeFrom = dayjs(timeFrom);
    }
    const timeTo = searchParams.get(ParamKeys.TIME_TO);
    if (timeTo) {
      this._timeTo = dayjs(timeTo);
    }
    this._startStationId = searchParams.get(ParamKeys.START_STATION) ?? undefined;
    this._endStationId = searchParams.get(ParamKeys.END_STATION) ?? undefined;

    this._initialized = true;
    this._validStations = !!this._startStationId && !!this._endStationId;
    this._fetchTimetables();
    return this._validStations;
  }

  get initialized() {
    return this._initialized;
  }

  get validStations() {
    return this._validStations;
  }

  get timeFrom() {
    return this._timeFrom;
  }

  setTimeFrom(timeFrom: PickerValue) {
    this._timeFrom = timeFrom;
    this._fetchTimetables();
  }

  get timeTo() {
    return this._timeTo;
  }

  setTimeTo(timeTo: PickerValue) {
    this._timeTo = timeTo;
    this._fetchTimetables();
  }

  get startStation() {
    const filtered = this._stations.filter(station => station.id === this._startStationId);
    return filtered.length > 0 ? filtered[0] : undefined;
  }

  get endStation() {
    const filtered = this._stations.filter(station => station.id === this._endStationId);
    return filtered.length > 0 ? filtered[0] : undefined;
  }

  async _fetchTimetables() {
    if (!this._startStationId || !this._endStationId) return;
    if (this._loading) return;
    this._loading = true;
    this._timetables = await this.api.getTrips(this._startStationId, this._endStationId, this._timeFrom, this._timeTo);
    this._loading = false;
  }

  get loading() {
    return this._loading;
  }

  get timetables() {
    return this._timetables;
  }

  get openModal() {
    return this._openTimetableRun !== undefined;
  }

  setOpenModal(trip?: Trip) {
    this._openTimetableRun = trip;
  }

  get openTimetableRun() {
    return this._openTimetableRun;
  }

  getStationLabel(stationId: string) {
    const filtered = this._stations.filter(station => station.id === stationId);
    return filtered.length > 0 ? filtered[0].name : undefined;
  }

  buildRouteForPaymentPage(routeId: string) {
    return buildRoute(AppRoutes.PAYMENT, {
      [ParamKeys.ROUTE_ID]: routeId,
      [ParamKeys.START_STATION]: this._startStationId,
      [ParamKeys.END_STATION]: this._endStationId
    }, {[ParamKeys.LANGUAGE]: this._appStore?.language});
  }
}