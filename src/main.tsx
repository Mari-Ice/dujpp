import {StrictMode, useContext} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createContext} from 'react';
import './index.css';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import {BrowserRouter} from "react-router-dom";
import {configure} from "mobx";
import {AppStore} from "./stores/app_store";
import {MultiProvider} from './utils'
import {DujppTheme} from "./theme";
import {LOCAL} from "./globals.ts";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_API_KEY } from "./globals";

configure({
  enforceActions: "never",
})
export const stripePromise = loadStripe(STRIPE_API_KEY);

export const baseURL = window.location.hostname;
const apiBaseUrl = window.location.hostname.includes('localhost') ?
    (LOCAL ? 'http://localhost:8000/' : 'http://10.32.25.198:8000/') : `/api/`;

export const appStore = new AppStore(apiBaseUrl);
console.log(apiBaseUrl);
export const AppStoreContext = createContext<AppStore>(appStore);
export const useAppStore = (): AppStore => {
  const context = useContext(AppStoreContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppStoreContext.Provider');
  }
  return context;
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiProvider providers={[
      <AppStoreContext.Provider value={appStore}/>,
      <MuiThemeProvider theme={DujppTheme} />,
    ]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MultiProvider>
  </StrictMode>,
);
