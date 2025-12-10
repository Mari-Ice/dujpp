import {observer} from "mobx-react-lite";
import {Route, Routes, useLocation} from "react-router-dom";
import Fares from "./pages/fares.tsx";
import PaymentPage from "./pages/payment_page.tsx";
import Ticket from "./pages/ticket.tsx";
import ChooseTimetablePage from "./pages/choose_timetable_page.tsx";
import Header from "./components/common/header.tsx";
import {MultiProvider} from "./utils.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useAppStore} from "./main.tsx";
import 'dayjs/locale/en';
import 'dayjs/locale/sl';
import {ParamKeys} from "./types/route_utils.tsx";
import {AppStore} from "./stores/app_store.ts";
import PaymentComplete from "./components/payment/payment_complete.tsx";



function App() {
  const store = useAppStore();
  const {search} = useLocation();
  const urlSearchParams = new URLSearchParams(search);
  const urlLang = urlSearchParams.get(ParamKeys.LANGUAGE);
  if (urlLang) {
    store.setLanguage(AppStore.getInitialLanguage(urlLang));
  }

  return <div style={{margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <MultiProvider providers={[
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={store.language}/>
    ]}>
      <Header/>
      <div style={{
        flexGrow: 1, overflowY: 'auto',
        position: 'relative'
      }}>
        <Routes>
          <Route path={'/'} element={<ChooseTimetablePage/>}/>
          <Route path={'/fares'} element={<Fares/>}/>
          <Route path={'/payment'} element={<PaymentPage/>}/>
          <Route path={'/ticket'} element={<Ticket/>}/>
          <Route path={'/payment-completed/:id'} element={<PaymentComplete/>}/>
        </Routes>
      </div>
    </MultiProvider>
  </div>
}

export default observer(App);
