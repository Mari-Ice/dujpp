import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {Box, Typography, Stack,} from '@mui/material';
import {observer} from "mobx-react-lite";
import type {Leg, Trip} from "../../types/stations.ts";
import {timelineItemClasses} from "@mui/lab";
import dayjs from "dayjs";
import {useAppStore} from "../../main.tsx";

interface TimetableProps {
  trip: Trip;
  startStationId: string;
  endStationId: string;
}

const Timetable = observer(({trip, startStationId, endStationId}: TimetableProps) => {
  const lineLeg = trip.legs.find((leg: Leg) => !!leg.authority);
  if (!lineLeg) return null;
  const startStationIndx = lineLeg.stops?.findIndex(s => s.id === startStationId);
  const endStationIndx = lineLeg.stops?.findIndex(s => s.id === endStationId);
  const store = useAppStore();
  const t = store.t;

  return (
      <Box id="timetable-detail-description" sx={{maxWidth: '100%', margin: 'auto'}}>
        <Timeline sx={{
          p: 0,
          m: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}>
          {lineLeg.stops?.map((stop, index) => {
            const isFirst = index === 0;
            const isLast = index === lineLeg.stops!.length - 1;
            const stationLabel = stop.name;
            const isStartOrEnd = index === startStationIndx || index === endStationIndx;
            return (
                <TimelineItem key={stop.id}>
                  <TimelineSeparator>
                    <TimelineDot
                        variant={isStartOrEnd || isFirst || isLast ? 'filled' : 'outlined'}
                        color={isStartOrEnd ? 'secondary' : 'primary'}
                    />
                    {!isLast && <TimelineConnector/>}
                  </TimelineSeparator>

                  <TimelineContent sx={{py: '7px', px: 2}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                          variant="body1"
                          fontWeight={isStartOrEnd ? 'bold' : 'regular'}
                      >
                        {stationLabel}
                      </Typography>

                      <Typography
                          variant="body1"
                          color={isStartOrEnd ? 'secondary' : 'text.primary'}
                          fontWeight={isStartOrEnd ? 'bold' : "medium"}
                          marginLeft={'20px'}
                      >
                        {stop.id === startStationId && dayjs(lineLeg.startTime).format(t('timeFormat'))}
                        {stop.id === endStationId && dayjs(lineLeg.endTime).format(t('timeFormat'))}
                      </Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
  );
});

export default Timetable;