export type Language = 'en' | 'sl';

export const translations = {
  'en': {
    appName: 'Dujpp',
    englishLabel: 'English',
    slovenianLabel: 'Slovenian',
    date: 'Date',
    startStation: 'Departure station',
    endStation: 'Arrival station',
    showMap: 'Show map',
    timetable: 'Show timetable',
    confirmLocation: 'Confirm location',
    userLocationError: 'Location access denied.',
    chooseStation: 'Where are you going?',
    dateError: 'Choose a valid date.',
    noStartStation: 'No start station selected.',
    noEndStation: 'No end station selected.',
    sameStationsError: 'Start and end stations cannot be the same.',
  },
  'sl': {
    appName: 'Dujpp',
    englishLabel: 'Angleški',
    slovenianLabel: 'Slovenski',
    date: 'Datum',
    startStation: 'Vstopna postaja',
    endStation: 'Izstopna postaja',
    showMap: 'Prikaži na zemljevidu',
    timetable: 'Prikaži vozni red',
    confirmLocation: 'Potrdi lokacijo',
    userLocationError: 'Dostop do lokacije uporabnika onemogočen.',
    chooseStation: 'Kam potujete?',
    dateError: 'Izberite veljaven datum.',
    noStartStation: 'Izberite vstopno postajo.',
    noEndStation: 'Izberite izstopno postajo.',
    sameStationsError: 'Vstopna in izstopna postaja ne moreta biti enaki.',
  },

};






export const isLanguage = (lang: string): lang is Language => lang in translations;

export const languages = ['en', 'sl'];
export type TranslationKey = keyof typeof translations['en'];