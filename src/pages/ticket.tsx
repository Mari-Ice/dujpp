import {Stack, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useAppStore} from "../main.tsx";
import Summary from "../components/timetables/summary.tsx";
import {MockQrComponent} from "../components/fields_buttons/mock_qr_component.tsx";


const Ticket = observer(() => {
  const appStore = useAppStore();
  const t = appStore.t;
  const store = appStore.paymentStore;
  if (!store) return null;

  return (
      <Stack alignItems={'center'} padding={'20px'} gap={'20px'}>
        <Summary runDetail={store.runDetail!} startStop={store.startStation} endStop={store.endStation}/>
        <Typography>{t('adults')}: {store.adults}</Typography>
        <Typography>{t('children714')}: {store.children714}</Typography>
        <Typography>{t('children06')}: {store.children06}</Typography>
        <Typography>{t('baggage')}: {store.baggage}</Typography>
        <MockQrComponent />
      </Stack>
  );
});

export default Ticket;