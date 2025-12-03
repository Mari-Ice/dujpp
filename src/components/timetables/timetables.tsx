import {observer} from "mobx-react-lite";
import {Stack, Card, Typography, Box} from "@mui/material";
import {useAppStore} from "../../main.tsx";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import dayjs from "dayjs";
import type {Trip} from "../../types/stations.ts";

interface TimetableProps {
  timetables: Trip[];
  onSelectedRun: (trip: Trip) => void;
}

export function getStartStationLabel(trip: Trip) {
  if (trip.legs.length === 0) return '';
  for (const leg of trip.legs) {
    if (!!leg.authority) {
      return leg.from.name;
    }
  }
  return trip.legs[0].from.name;
}
export function getEndStationLabel(trip: Trip) {
  if (trip.legs.length === 0) return '';
  for (let i = trip.legs.length - 1; i >= 0; i--) {
    if (!!trip.legs[i].authority) {
      return trip.legs[i].to.name;
    }
  }
  return trip.legs[trip.legs.length - 1].to.name;
}

export function getStartStationTime(trip: Trip, t: any) {
  if (trip.legs.length === 0) return '';
  for (const leg of trip.legs) {
    if (!!leg.authority) {
      return dayjs(leg.startTime).format(t('timeFormat'));
    }
  }
  return dayjs(trip.legs[0].startTime).format(t('timeFormat'));
}

export function getEndStationTime(trip: Trip, t: any) {
  if (trip.legs.length === 0) return '';
  for (let i = trip.legs.length - 1; i >= 0; i--) {
    if (!!trip.legs[i].authority) {
      return dayjs(trip.legs[i].endTime).format(t('timeFormat'));
    }
  }
  return dayjs(trip.legs[trip.legs.length - 1].endTime).format(t('timeFormat'));
}

export function getTripOrganisation(trip: Trip) {
  if (trip.legs.length === 0) return '';
  for (const leg of trip.legs) {
    if (!!leg.authority) {
      return leg.authority;
    }
  }
  return trip.legs[0].authority;
}
export function getTripLine(trip: Trip) {
  if (trip.legs.length === 0) return '';
  for (const leg of trip.legs) {
    if (!!leg.line) {
      return leg.line;
    }
  }
  return '';
}


const Timetables = observer(({timetables, onSelectedRun}: TimetableProps) => {
  const appStore = useAppStore();
  const t = appStore.t;
  const store = appStore.faresStore;
  if (!store) return null;

  return (
      <Box sx={{height: '100%', overflowY: 'auto', padding: '10px', width: '100%',}}>
      <Stack gap={'10px'} sx={{paddingBottom: '20px', width: '100%'}}>
        {timetables.length > 0 ?
        timetables.map((timetable: Trip) => {
          return <Card key={timetable.startTime + timetable.endTime + timetable.legs.map((v) => v.authority ?? '').toString()}
                onClick={() => onSelectedRun(timetable)}
                sx={{
                  padding: '5px',
                  cursor: 'pointer',
                  transition: '0.3s',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 6,
                    backgroundColor: 'action.hover',
                  },
                }}
          >
            <Stack justifyContent="space-between" alignItems="center" width={'100%'} direction={'row'}>
              <Stack  justifyContent={'space-between'} alignItems={'start'} width={'100%'}>
                <Typography color={'textDisabled'}>{t('departure')}</Typography>
                <Typography variant={'body2'}>{getStartStationLabel(timetable)}</Typography>
                <Typography variant={'h6'}>{getStartStationTime(timetable, t)}</Typography>
              </Stack>
              <Stack minWidth={'100px'} alignItems={'center'}>
                <Typography variant={'body1'} fontSize={'11px'} textAlign={'center'}>{getTripOrganisation(timetable)}</Typography>
              <ArrowForwardRoundedIcon fontSize={'large'} color={'primary'}/>
                <Typography variant={'body1'} fontSize={'11px'} textAlign={'center'}>{getTripLine(timetable)}</Typography>
              </Stack>
              <Stack  justifyContent={'space-between'} alignItems={'end'} width={'100%'}>
                <Typography color={'textDisabled'}>{t('arrival')}</Typography>
                <Typography variant={'body2'}>{getEndStationLabel(timetable)}</Typography>
                <Typography variant={'h6'}>{getEndStationTime(timetable, t)}</Typography>
              </Stack>
            </Stack>
          </Card>;
        }) : <Typography>{t('noAvailableFares')}</Typography>}
      </Stack>
      </Box>
  );
});

export default Timetables;