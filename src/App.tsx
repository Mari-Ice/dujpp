import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import Timetable from "./pages/timetable.tsx";
import PaymentPage from "./pages/payment_page.tsx";
import Ticket from "./pages/ticket.tsx";
import ChooseTimetablePage from "./pages/choose_timetable_page.tsx";
import Header from "./components/header.tsx";
import {MultiProvider} from "./utils.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useAppStore} from "./main.tsx";
import 'dayjs/locale/en';
import 'dayjs/locale/sl';



function App() {
  // const api = useContext(ApiContext);
  const store = useAppStore();

  return <div style={{margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column'}}>
    <MultiProvider providers={[
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={store.language}/>
    ]}>
    <Header/>
    <div style={{flexGrow: 1, overflowY: 'auto',
      position: 'relative'}}>
    <Routes >
      <Route path={'/'} element={<ChooseTimetablePage/>}/>
      <Route path={'/timetable'} element={<Timetable/>}/>
      <Route path={'/payment'} element={<PaymentPage/>}/>
      <Route path={'/ticket'} element={<Ticket/>}/>
    </Routes>
    </div>
    </MultiProvider>
  </div>
}

export default observer(App);
