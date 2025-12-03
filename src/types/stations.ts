export interface Station {
  name: string;
  latitude?: number;
  longitude?: number;
  id: string;
  related?: Station[]
}

export type Stations = Station[];

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
  stops?: Station[];
  points: string;
}

export interface Trip {
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  legs: Leg[];
}

export const mockStations: Stations = [
  { name: "Ljubljana", latitude: 46.0569, longitude: 14.5058, id: "A01" },
  { name: "Domžale", latitude: 46.1384, longitude: 14.5901, id: "A02" },
  { name: "Litija", latitude: 46.0645, longitude: 14.8219, id: "A03" },
  { name: "Zidani Most", latitude: 46.0820, longitude: 15.1550, id: "A04" },
  { name: "Hrastnik", latitude: 46.1408, longitude: 15.2281, id: "A05" },
  { name: "Trbovlje", latitude: 46.1557, longitude: 15.0506, id: "A06" },
  { name: "Celje", latitude: 46.2333, longitude: 15.2636, id: "A07" },
  { name: "Žalec", latitude: 46.2536, longitude: 15.1556, id: "A08" },
  { name: "Velenje", latitude: 46.3934, longitude: 15.1189, id: "A09" },
  { name: "Ptuj", latitude: 46.4208, longitude: 15.8677, id: "A10" },
  { name: "Maribor", latitude: 46.5547, longitude: 15.6459, id: "A11" },

  { name: "Jesenice", latitude: 46.4357, longitude: 13.9317, id: "B01" },
  { name: "Bled", latitude: 46.3683, longitude: 14.1130, id: "B02" },
  { name: "Bohinjska Bistrica", latitude: 46.2690, longitude: 13.9574, id: "B03" },
  { name: "Kranj", latitude: 46.2415, longitude: 14.3556, id: "B04" },
  { name: "Škofja Loka", latitude: 46.1666, longitude: 14.3057, id: "B05" },
  { name: "Ljubljana", latitude: 46.0569, longitude: 14.5058, id: "B06" },
  { name: "Grosuplje", latitude: 45.9575, longitude: 14.6547, id: "B07" },
  { name: "Kočevje", latitude: 45.6429, longitude: 14.8596, id: "B08" },
  { name: "Novo mesto", latitude: 45.8033, longitude: 15.1689, id: "B09" },
  { name: "Brežice", latitude: 45.9080, longitude: 15.6022, id: "B10" },
  { name: "Metlika", latitude: 45.6549, longitude: 15.3180, id: "B11" },

  { name: "Ajdovščina", latitude: 45.8890, longitude: 13.8860, id: "C01" },
  { name: "Nova Gorica", latitude: 45.9554, longitude: 13.6414, id: "C02" },
  { name: "Postojna", latitude: 45.7824, longitude: 14.2127, id: "C03" },
  { name: "Sežana", latitude: 45.7077, longitude: 13.8643, id: "C04" },
  { name: "Koper", latitude: 45.5469, longitude: 13.7294, id: "C05" },
  { name: "Izola", latitude: 45.5457, longitude: 13.6668, id: "C06" },
  { name: "Piran", latitude: 45.5280, longitude: 13.5670, id: "C07" }
];

export interface StationStopDetails {
  id: string;
  label: string;
  time: string;
  runId: string;
}

export interface TimetableStop {
  stationId: string;
  time: string;
}

export interface TimetableRun {
  runId: string;
  stops: TimetableStop[];
}

export interface ServiceLine {
  lineId: string;
  companyName: string;
  lineName: string;
  runs: TimetableRun[];
}

export type TimetableData = ServiceLine[];

export const mockTimetables: TimetableData = [
  // --- LINE 1: Ljubljana (ab) to Maribor (ac) Express ---
  {
    lineId: 'LMB_EXP',
    companyName: 'Slovenske Železnice (SŽ)',
    lineName: 'Ljubljana - Maribor Express',
    runs: [
      {
        runId: 'LMB-0800', // Morning express
        stops: [
          { stationId: 'ab', time: '08:00' }, // Ljubljana
          { stationId: 'ad', time: '09:05' }, // Celje
          { stationId: 'aag', time: '09:35' }, // Žalec
          { stationId: 'ac', time: '10:00' }, // Maribor
        ],
      },
      {
        runId: 'LMB-1230', // Midday express
        stops: [
          { stationId: 'ab', time: '12:30' },
          { stationId: 'ad', time: '13:35' },
          { stationId: 'aag', time: '14:05' },
          { stationId: 'ac', time: '14:30' },
        ],
      },
      {
        runId: 'LMB-1745', // Evening express
        stops: [
          { stationId: 'ab', time: '17:45' },
          { stationId: 'ad', time: '18:50' },
          { stationId: 'aag', time: '19:20' },
          { stationId: 'ac', time: '19:45' },
        ],
      },
    ],
  },

  // --- LINE 2: Koper (ae) to Kranj (af) Local Line ---
  {
    lineId: 'KKR_LOC',
    companyName: 'Avrigo D.O.O.',
    lineName: 'Obala - Gorenjska Regional',
    runs: [
      {
        runId: 'KKR-0615', // Early morning local
        stops: [
          { stationId: 'ae', time: '06:15' }, // Koper
          { stationId: 'al', time: '07:20' }, // Postojna
          { stationId: 'ab', time: '08:15' }, // Ljubljana (Central Hub)
          { stationId: 'ap', time: '08:45' }, // Domžale
          { stationId: 'af', time: '09:25' }, // Kranj
        ],
      },
      {
        runId: 'KKR-1400', // Afternoon local
        stops: [
          { stationId: 'ae', time: '14:00' },
          { stationId: 'al', time: '15:05' },
          { stationId: 'ab', time: '16:00' },
          { stationId: 'ap', time: '16:30' },
          { stationId: 'af', time: '17:10' },
        ],
      },
    ],
  },

  // --- LINE 3: Novo mesto (ag) to Murska Sobota (ai) Intercity ---
  {
    lineId: 'NMS_INT',
    companyName: 'Nomago',
    lineName: 'Dolenjska - Pomurje Intercity',
    runs: [
      {
        runId: 'NMS-0900',
        stops: [
          { stationId: 'ag', time: '09:00' }, // Novo mesto
          { stationId: 'ay', time: '10:15' }, // Brežice
          { stationId: 'am', time: '11:45' }, // Ptuj
          { stationId: 'aah', time: '12:15' }, // Lenart
          { stationId: 'ai', time: '12:45' }, // Murska Sobota
        ],
      },
    ],
  },
];

const compareTimes = (timeA: string, timeB: string): number => {
  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
};

export interface RunDetail {
  companyName: string;
  lineId: string;
  lineName: string;
  runId: string;
  // This will contain ONLY the start and end stops for the specific query
  // For display purposes, you might want to adjust this list
  stops: TimetableStop[];
}
export interface TimetableQuery {
  startId: string;
  endId: string;
  // Time strings in 'HH:mm' format (optional)
  timeFrom?: string;
  timeTo?: string;
}

export function fetchTimetables(query: TimetableQuery): Promise<RunDetail[]> {
  // Use a setTimeout to simulate network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      const { startId, endId, timeFrom, timeTo } = query;

      // The results array now holds the flattened RunDetail objects
      const results: RunDetail[] = [];

      for (const line of mockTimetables) {
        for (const run of line.runs) {
          // 1. Find the stops for the start and end station
          const startStopIndex = run.stops.findIndex(stop => stop.stationId === startId);
          const endStopIndex = run.stops.findIndex(stop => stop.stationId === endId);

          // Check if both stations exist and the travel direction is correct (start comes before end)
          if (startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex) {

            const departureTime = run.stops[startStopIndex].time;
            let isValidTime = true;

            // 2. Apply optional time filtering
            if (timeFrom && compareTimes(departureTime, timeFrom) === -1) {
              // Departure is BEFORE timeFrom
              isValidTime = false;
            }

            // Note: I assume timeTo should filter based on departure time,
            // as you had it in the original logic. If you meant arrival time,
            // you'd use run.stops[endStopIndex].time
            if (timeTo && compareTimes(departureTime, timeTo) === 1) {
              // Departure is AFTER timeTo
              isValidTime = false;
            }

            // 3. If valid, create and push the flattened RunDetail object
            if (isValidTime) {
              // Extract only the relevant stops (start and end) for display.
              // Note: If you want to show ALL stops, you'd use 'run.stops' here.
              // I'll include the segment of stops from start to end, inclusive.
              results.push({
                companyName: line.companyName,
                lineId: line.lineId,
                lineName: line.lineName,
                runId: run.runId,
                stops: run.stops,
              });
            }
          }
        }
      }

      // Optional: Sort the results by departure time
      results.sort((a, b) => {
        const aTime = a.stops[0].time; // The first stop in the relevantStops is the departure stop
        const bTime = b.stops[0].time;
        return compareTimes(aTime, bTime);
      });

      resolve(results);
    }, 500); // Simulate 500ms API latency
  });
}

export interface TimetableStop {
  stationId: string;
  time: string;
}

export interface RunDetail {
  companyName: string;
  lineId: string;
  lineName: string;
  runId: string;
  stops: TimetableStop[];
}

// Interface for the new function's query
export interface RunDetailQuery {
  runId: string;
  startId?: string;
  endId?: string;
}

/**
 * Finds a specific RunDetail by runId, optionally filtering the stops
 * to a segment defined by startId and endId.
 * @param query The query object containing runId and optional start/end station IDs.
 * @returns A Promise that resolves with the RunDetail or null if the run is not found
 * or the requested segment is invalid/not part of the run.
 */
export function fetchRunDetail(query: RunDetailQuery): Promise<RunDetail | null> {
  // Use a setTimeout to simulate network latency, consistent with fetchTimetables
  return new Promise((resolve) => {
    setTimeout(() => {
      const { runId, startId, endId } = query;
      let foundRunDetail: RunDetail | null = null;

      // Iterate through the service lines to find the matching runId
      for (const line of mockTimetables) {
        const run = line.runs.find(r => r.runId === runId);

        if (run) {
          let stopsToUse: TimetableStop[] = run.stops;

          if (startId && endId) {
            // Segment specified: check validity and slice stops
            const startStopIndex = run.stops.findIndex(stop => stop.stationId === startId);
            const endStopIndex = run.stops.findIndex(stop => stop.stationId === endId);

            if (startStopIndex !== -1 && endStopIndex !== -1 && startStopIndex < endStopIndex) {
              // Valid segment: slice stops inclusive of start and end
              stopsToUse = run.stops.slice(startStopIndex, endStopIndex + 1);
            } else {
              // Invalid segment (not found or wrong direction), result should be null for this query
              resolve(null);
              return;
            }
          }

          // Run found and segment (if specified) is valid
          foundRunDetail = {
            companyName: line.companyName,
            lineId: line.lineId,
            lineName: line.lineName,
            runId: run.runId,
            stops: stopsToUse,
          };

          break; // Found the unique run, exit the line loop
        }
      }

      resolve(foundRunDetail);
    }, 500); // Simulate 500ms API latency
  });
}

