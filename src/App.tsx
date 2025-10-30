import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import Timetable from "./pages/timetable.tsx";
import PaymentPage from "./pages/payment_page.tsx";
import Ticket from "./pages/ticket.tsx";
import ChooseTimetablePage from "./pages/choose_timetable_page.tsx";
import Header from "./components/header.tsx";


function App() {
  // const api = useContext(ApiContext);

  return <div style={{margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column'}}>
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
  </div>
}

export default observer(App);
