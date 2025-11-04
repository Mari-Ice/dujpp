import {observer} from "mobx-react-lite";
import {Stack, Typography} from "@mui/material";
import type {RunDetail, StationStopDetails} from "../../types/stations.ts";
import {useAppStore} from "../../main.tsx";

interface SummaryProps {
  runDetail: RunDetail;
  startStop: StationStopDetails | undefined;
  endStop: StationStopDetails | undefined;
}

const Summary = observer(({runDetail, startStop, endStop}: SummaryProps) => {
  const appStore = useAppStore();
  const t = appStore.t;
  if (!startStop || !endStop) return null;
  return (
      <Stack>
        <Typography variant={'h6'}>{t('summary')}</Typography>
        <Typography>{t('line')}: {runDetail.lineName}</Typography>
        <Typography>{t('operatedBy')}: {runDetail.companyName}</Typography>
        <Typography>{t('departure')}: {startStop.label} {t('at')} {startStop.time}</Typography>
        <Typography>{t('arrival')}: {endStop.label} {t('at')} {endStop.time}</Typography>
      </Stack>
  );
});

export default Summary;