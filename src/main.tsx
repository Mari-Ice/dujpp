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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

configure({
  enforceActions: "never",
})

export const appStore = new AppStore();
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
      <LocalizationProvider dateAdapter={AdapterDayjs}/>,
    ]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MultiProvider>
  </StrictMode>,
);
