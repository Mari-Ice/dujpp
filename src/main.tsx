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
// import {EmbeddedCheckoutProvider} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

configure({
  enforceActions: "never",
})
// const stripePromise = loadStripe("pk_test_51SKfP1EJGJYBk0kgU3RkwwwaOsdCcWp1ldN606Rz43GHRwkHxAogHFjQBibaId3qb9gloEChtgoVsOMlpaLjU3JL00QXvH7JpO");

const baseURL = window.location.hostname;
const apiBaseUrl = window.location.hostname.includes('localhost') ? 'http://10.32.25.198:8000/' : `https://${baseURL}/api/v1/`;

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
        // <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret: appStore.clientSecret}} />
    ]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MultiProvider>
  </StrictMode>,
);
