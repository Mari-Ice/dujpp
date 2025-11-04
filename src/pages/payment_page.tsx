import Body from "../components/common/body.tsx";
import {Stack, Typography} from "@mui/material";
import {useAppStore} from "../main.tsx";
import {AppRoutes, buildRoute, ParamKeys} from "../types/route_utils.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import InvalidParams from "./invalid_params.tsx";
import { observer } from "mobx-react-lite";
import Summary from "../components/timetables/summary.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import NumericalIncrement from "../components/fields_buttons/numerical_increment.tsx";
import DButton from "../components/fields_buttons/dbutton.tsx";
import Ticket from "./ticket.tsx";


const PaymentPage = observer(() => {
  const appStore = useAppStore();
  const t = appStore.t;
  const store = appStore.paymentStore;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (!store) return null;
  if (!store.initialized) {
    const validParams = store.setupParams(searchParams);
    if (!validParams && appStore.timerCount === 0 && !appStore.navigateBack) {
      appStore.incrementTimer();
    }
  }
  if (appStore.navigateBack) {
    navigate(buildRoute(AppRoutes.HOME, undefined, {[ParamKeys.LANGUAGE]: appStore.language,}));
  }

  return (
      <Body>
        {!store.validParams ? <InvalidParams/> :
            !store.paymentSuccessful ?
            <Stack alignItems={'start'} padding={'20px'} gap={'20px'} height={'100%'}>
              <Typography variant={'h2'}>{t('paymentPageTitle')}</Typography>
              {!store.runDetail ? <CircularProgress /> : <Summary runDetail={store.runDetail} startStop={store.startStation} endStop={store.endStation}/>}
              <NumericalIncrement value={store.adults} onChange={(v) => store.setAdults(v)} label={t('adults')}/>
              <NumericalIncrement value={store.children714} onChange={(v) => store.setChildren714(v)} label={t('children714')} />
              <NumericalIncrement value={store.children06} onChange={(v) => store.setChildren06(v)} label={t('children06')}/>
              <NumericalIncrement value={store.baggage} onChange={(v) => store.setBaggage(v)} label={t('baggage')}/>
              <Typography variant={'h3'}>{t('totalPrice')}: {store.price} EUR</Typography>
              <DButton label={t('pay')} onClick={() => {
                store.pay();
              }} sx={{justifySelf: 'end'}}/>
            </Stack>
                : <Ticket />
        }
        <DButton label={t('travelingElsewhere')} onClick={() => navigate(buildRoute(AppRoutes.HOME, undefined, {[ParamKeys.LANGUAGE]: appStore.language}))}/>
      </Body>
  );
});

export default PaymentPage;