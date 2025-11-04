import {observer} from "mobx-react-lite";
import {Stack, Card, Typography, Box} from "@mui/material";
import type {RunDetail} from "../../types/stations.ts";
import {useAppStore} from "../../main.tsx";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

interface TimetableProps {
  timetables: RunDetail[];
  onSelectedRun: (run: RunDetail) => void;
}

const Timetables = observer(({timetables, onSelectedRun}: TimetableProps) => {
  const appStore = useAppStore();
  const t = appStore.t;
  const store = appStore.faresStore;
  if (!store) return null;

  const findStopTime = (timetable: RunDetail, stationId: string) => {
    const stop = timetable.stops.find(s => s.stationId === stationId);
    if (!stop) return undefined;
    return stop.time;
  }
  return (
      <Box sx={{height: '100%', overflowY: 'auto', padding: '10px', width: '100%',}}>
      <Stack gap={'10px'} sx={{paddingBottom: '20px', width: '100%'}}>
        {timetables.length > 0 ?
        timetables.map((timetable: RunDetail, _) => {
          return <Card key={timetable.lineId + timetable.companyName + timetable.runId}
                onClick={() => onSelectedRun(timetable)}
                sx={{
                  padding: '5px',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  boxShadow: 2,
                }}
          >
            <Stack justifyContent="space-between" alignItems="center" width={'100%'} direction={'row'}>
              <Stack  justifyContent={'space-between'} alignItems={'start'} width={'100%'}>
                <Typography color={'textDisabled'}>{t('departure')}</Typography>
                <Typography variant={'body2'}>{store.startStation.label}</Typography>
                <Typography variant={'h6'}>{findStopTime(timetable, store.startStation.id)}</Typography>
              </Stack>
              <ArrowForwardRoundedIcon fontSize={'large'} color={'primary'}/>
              <Stack  justifyContent={'space-between'} alignItems={'end'} width={'100%'}>
                <Typography color={'textDisabled'}>{t('arrival')}</Typography>
                <Typography variant={'body2'}>{store.endStation.label}</Typography>
                <Typography variant={'h6'}>{findStopTime(timetable, store.endStation.id)}</Typography>
              </Stack>
            </Stack>
          </Card>;
        }) : <Typography>{t('noAvailableFares')}</Typography>}
      </Stack>
      </Box>
  );
});

export default Timetables;