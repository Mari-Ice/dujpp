import type {TranslationKey} from "../types/language_utils.ts";
import {makeAutoObservable} from "mobx";
import {ParamKeys} from "../types/route_utils.tsx";
import {type Trip} from "../types/stations.ts";
import type {ApiDujpp} from "../api/api_dujpp.ts";
import type {Stripe, StripeElements} from "@stripe/stripe-js";
import {baseURL} from "../main.tsx";

export class PaymentStore {
  t: (key: TranslationKey) => string;
  _initialized = false;
  _routeId?: string;
  _startStationId?: string;
  _endStationId?: string;
  _validParams = false;
  _trip?: Trip;
  adults: number = 0;
  children714: number = 0;
  children06: number = 0;
  baggage: number = 0;
  _paymentSuccessful: boolean = false;
  _paymentId?: string;
  _paymentStarted: boolean = false;
  _clientSecret?: string;
  _loading = false;
  _card_error?: string;
  _payment_error?: string;
  api: ApiDujpp;

  constructor(t: (key: TranslationKey) => string, api: ApiDujpp) {
    makeAutoObservable(this);
    this.t = t;
    this.api = api;
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

  }

  get trip() {
    return this._trip;
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
    return this.adults * +this.children714 * 50 + this.children06 * 20 + this.baggage * 10;
  }

  pay() {
    this._paymentSuccessful = true;
  }

  get paymentSuccessful() {
    return this._paymentSuccessful && this._paymentStarted;
  }

  paymentId() {
    return this._paymentId;
  }

  startPayment() {
    this._paymentStarted = true;
    this.api.createPaymentIntent(this._routeId ?? '', this.adults, this.children06, this.children714, this.baggage).then(paymentIntent => {
      this._clientSecret = paymentIntent.clientSecret;
      this._paymentId = 'MOCK_PAYMENT_ID' // todo: this is currently placeholder, we need to get the real payment id from the server - for passing to the redirect url
    })

  }

  get paymentStarted() {
    return this._paymentStarted;
  }

  get clientSecret() {
    return this._clientSecret;
  }

  async handleSubmitPayment(stripe: Stripe, elements: StripeElements) {
    if (!stripe || !elements || !this._clientSecret) return;
    this._loading = true;
    this._card_error = undefined;
    this._payment_error = undefined;

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseURL}/payment-completed/${this._paymentId}`,
      },
      redirect: 'always',
    });
    this._loading = false;
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error' || error.type === 'invalid_request_error' || error.type==='authentication_error') {
        this._card_error = error.message;
      } else {
        this._payment_error = error.message;
        console.log('PAYMENT ERROR: ', error.message, error.type);
      }
    } else {
      this._paymentSuccessful = true;
    }
  }
  get loading() {
    return this._loading;
  }
  get paymentError() {
    if (this._card_error) return this._card_error;
    if (this._payment_error) return 'Payment issue on our side. Please try again later.';
    return undefined;
  }
}