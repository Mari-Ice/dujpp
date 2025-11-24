import type {Station} from "../types/stations.ts";

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

}

export interface GetStationsFilters {
  nearLocation?: {latitude: number; longitude: number, radius: number};
  startStationId?: string;
  endStationId?: string;

}