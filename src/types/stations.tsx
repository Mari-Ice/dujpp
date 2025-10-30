export interface Station {
  label: string;
  lat: number;
  lng: number;
}

export type Stations = Station[];

export const mockStations: Stations = [
  { label: 'Ljubljana', lat: 46.0569, lng: 14.5058 },
  { label: 'Maribor', lat: 46.5547, lng: 15.6459 },
  { label: 'Celje', lat: 46.2333, lng: 15.2636 },
  { label: 'Koper', lat: 45.5469, lng: 13.7294 },
  { label: 'Kranj', lat: 46.2415, lng: 14.3556 },
  { label: 'Novo mesto', lat: 45.8033, lng: 15.1689 },
  { label: 'Velenje', lat: 46.3934, lng: 15.1189 },
  { label: 'Murska Sobota', lat: 46.6548, lng: 16.1627 },
  { label: 'Jesenice', lat: 46.4357, lng: 13.9317 },
  { label: 'Nova Gorica', lat: 45.9554, lng: 13.6414 },
  { label: 'Postojna', lat: 45.7824, lng: 14.2127 },
  { label: 'Ptuj', lat: 46.4208, lng: 15.8677 },
  { label: 'Slovenj Gradec', lat: 46.5085, lng: 15.0801 },
  { label: 'Trbovlje', lat: 46.1557, lng: 15.0506 },
  { label: 'Domžale', lat: 46.1384, lng: 14.5901 },
  { label: 'Kamnik', lat: 46.2236, lng: 14.6111 },
  { label: 'Škofja Loka', lat: 46.1666, lng: 14.3057 },
  { label: 'Izola', lat: 45.5457, lng: 13.6668 },
  { label: 'Piran', lat: 45.5280, lng: 13.5670 },
  { label: 'Bled', lat: 46.3683, lng: 14.1130 },
  { label: 'Bohinjska Bistrica', lat: 46.2690, lng: 13.9574 },
  { label: 'Kočevje', lat: 45.6429, lng: 14.8596 },
  { label: 'Brežice', lat: 45.9080, lng: 15.6022 },
  { label: 'Grosuplje', lat: 45.9575, lng: 14.6547 },
  { label: 'Ajdovščina', lat: 45.8890, lng: 13.8860 },
  { label: 'Metlika', lat: 45.6549, lng: 15.3180 },
  { label: 'Sežana', lat: 45.7077, lng: 13.8643 },
  { label: 'Dravograd', lat: 46.5833, lng: 15.0180 },
  { label: 'Zidani Most', lat: 46.0820, lng: 15.1550 },
  { label: 'Hrastnik', lat: 46.1408, lng: 15.2281 },
  { label: 'Litija', lat: 46.0645, lng: 14.8219 },
  { label: 'Žalec', lat: 46.2536, lng: 15.1556 },
  { label: 'Lenart', lat: 46.5684, lng: 15.8202 },
  { label: 'Gornja Radgona', lat: 46.6853, lng: 15.9922 },
];

