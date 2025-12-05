import {mockStations, type Station, type Trip} from "../types/stations.ts";
import type {PickerValue} from "@mui/x-date-pickers/internals";
import {MOCK_STATIONS} from "../globals.ts";


export class ApiDujpp {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? 'http://localhost:8000/api/v1/';
  }

  private httpGet(endpoint: string): Promise<any> {
    return fetch(`${this.baseUrl}${endpoint}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });
  }

  private httpPost(endpoint: string, data: any): Promise<any> {
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });
  }

  async getStations(filters?: GetStationsFilters): Promise<Station[]> {
    if (MOCK_STATIONS) {
      if (filters && filters.stationId) {
        const line = filters.stationId[0];
        return mockStations.filter(s => s.id > filters.stationId! && s.id[0] === line);
      }
      return mockStations;
    }

    let endpoint = 'stops';
    if (filters) {
      if (filters.stationId) {
        endpoint += `/${filters.stationId}`;
      }
    }
    console.log(endpoint);

    const data = await this.httpGet(endpoint);

    if (data instanceof Array) {
      return data as Station[];
    } else {
      return (data as Station).related ?? [];
    }
  }

  async getTrips(startStationId: string, stopStationId: string, dateTimeFrom?: PickerValue, dateTimeTo?: PickerValue): Promise<any> {
    const data = await this.httpPost('trips', {
      dateTime: dateTimeFrom?.toDate().toISOString() ?? null,
      searchWindow: dateTimeTo && dateTimeFrom ? Math.floor(((dateTimeTo.toDate().getTime() - dateTimeFrom.toDate().getTime()) / 1000) / 60) : undefined,
      fromStopId: startStationId,
      toStopId: stopStationId,
    } as TripPostRequest);

    return data as Trip[];
  }

  async createPaymentIntent(routeId: string, adults: number, children06: number, children714: number, baggage: number) {
    return (await this.httpPost('create-payment-intent', {routeId, adults, children06, children714, baggage})) as PaymentIntentResponse;
  }
}

export interface GetStationsFilters {
  nearLocation?: {latitude: number; longitude: number, radius: number};
  stationId?: string;
}

interface TripPostRequest {
 dateTime?: string;
 searchWindow?: number;
 maxTrips?: number;
 fromStopId: string;
 toStopId: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}


