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
  },

};






export const isLanguage = (lang: string): lang is Language => lang in translations;

export const languages = ['en', 'sl'];
export type TranslationKey = keyof typeof translations['en'];