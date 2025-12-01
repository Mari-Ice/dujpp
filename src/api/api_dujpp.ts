import type {Station} from "../types/stations.ts";
import type {PickerValue} from "@mui/x-date-pickers/internals";


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
    let endpoint = 'stops';
    if (filters) {}

    const data = await this.httpGet(endpoint);
    console.log(data[0]);
    console.log(data.length);
    return data as Station[];
  }

  async getTrips(startStationId: string, stopStationId: string, dateTimeFrom?: PickerValue, dateTimeTo?: PickerValue): Promise<any> {
    const data = await this.httpPost('trips', {
      dateTime: dateTimeFrom?.toDate().toISOString() ?? null,
      fromStopId: startStationId,
      toStopId: stopStationId,
    } as TripPostRequest);

    return data as Trip[];
  }


}

export interface GetStationsFilters {
  nearLocation?: {latitude: number; longitude: number, radius: number};
  startStationId?: string;
  endStationId?: string;
}

interface TripPostRequest {
 dateTime?: string;

 maxTrips?: number;
 fromStopId: string;
 toStopId: string;
}


export interface Coordinates {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Leg {
  mode: 'foot' | 'bus' | string;
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  from: Coordinates;
  to: Coordinates;
  authority: string | null;
  line: string | null;
  points: string;
}

export interface Trip {
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  legs: Leg[];
}