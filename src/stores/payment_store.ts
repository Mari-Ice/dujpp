import type {TranslationKey} from "../types/language_utils.ts";
import {makeAutoObservable} from "mobx";
import {ParamKeys} from "../types/route_utils.tsx";
import {
  fetchRunDetail,
  mockStations,
  type RunDetail,
  type RunDetailQuery,
  type StationStopDetails
} from "../types/stations.ts";

export class PaymentStore {
  t: (key: TranslationKey) => string;
  _initialized = false;
  _routeId?: string;
  _startStationId?: string;
  _endStationId?: string;
  _validParams = false;
  _runDetails?: RunDetail;
  adults: number = 0;
  children714: number = 0;
  children06: number = 0;
  baggage: number = 0;
  _paymentSuccessful: boolean = false;
  _paymentId?: string;
  _paymentStarted: boolean = false;

  constructor(t: (key: TranslationKey) => string) {
    makeAutoObservable(this);
    this.t = t;
  }

  get initialized() {
    return this._initialized;
  }

  setupParams(searchParams: URLSearchParams) {
    this._startStationId = searchParams.get(ParamKeys.START_STATION) ?? undefined;
    this._endStationId = searchParams.get(ParamKeys.END_STATION) ?? undefined;
    this._routeId = searchParams.get(ParamKeys.ROUTE_ID) ?? undefined;
    this._initialized = true;
    this._validParams = !!this._startStationId && !!this._endStationId && !!this._routeId;
    if (this._validParams) this._fetchRouteDetails();
    return this._validParams;
  }

  get validParams() {
    return this._validParams;
  }

  async _fetchRouteDetails() {
    const query: RunDetailQuery = {
      runId: this._routeId!,
      startId: this._startStationId!,
      endId: this._endStationId!,
    }
    this._runDetails = await fetchRunDetail(query) ?? undefined;
  }

  get runDetail() {
    return this._runDetails;
  }

  get startStation(): StationStopDetails | undefined {
    const station = mockStations.filter(station => station.id === this._startStationId);
    const timeStop = this._runDetails?.stops.filter(s => s.stationId === this._startStationId);
    if (station.length == 0 || (timeStop?.length ?? 0) == 0) return undefined;
    return {
      id: this._startStationId!,
      label: station[0].name,
      time: timeStop![0].time,
      runId: this._runDetails?.runId ?? '',
    };
  }
  get endStation(): StationStopDetails | undefined {
    const station = mockStations.filter(station => station.id === this._endStationId);
    const timeStop = this._runDetails?.stops.filter(s => s.stationId === this._endStationId);
    if (station.length == 0 || (timeStop?.length ?? 0) == 0) return undefined;
    return {
      id: this._endStationId!,
      label: station[0].name,
      time: timeStop![0].time,
      runId: this._runDetails?.runId ?? '',
    };
  }

  setAdults(count: number) {
    this.adults = count;
  }
  setChildren714(count: number) {
    this.children714 = count;
  }
  setChildren06(count: number) {
    this.children06 = count;
  }
  setBaggage(count: number) {
    this.baggage = count;
  }

  get price() {
    return this.getMockPrice();
  }

  getMockPrice() {
    return this.adults *  + this.children714 * 50 + this.children06 * 20 + this.baggage * 10;
  }

  pay() {
    this._paymentSuccessful = true;
  }

  get paymentSuccessful() {
    this._paymentId = '123456789';
    return this._paymentSuccessful && this._paymentStarted;
  }

  paymentId() {
    return this._paymentId;
  }

  startPayment() {
    this._paymentStarted = true;
  }

  get paymentStarted() {
    return this._paymentStarted;
  }

}