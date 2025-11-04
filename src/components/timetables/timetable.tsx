import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {Box, Typography, Stack,} from '@mui/material';
import {observer} from "mobx-react-lite";
import type {RunDetail} from "../../types/stations.ts";

interface TimetableProps {
  runDetail: RunDetail;
  startStationId: string;
  endStationId: string;
  getStationLabel: (stationId: string) => string;
}

const Timetable = observer(({runDetail, startStationId, endStationId, getStationLabel}: TimetableProps) => {
  const startStationIndx = runDetail.stops.findIndex(s => s.stationId === startStationId);
  const endStationIndx = runDetail.stops.findIndex(s => s.stationId === endStationId);

  return (
      <Box id="timetable-detail-description">
        <Timeline sx={{
          p: 0,
          m: 0
        }}>
          {runDetail.stops.map((stop, index) => {
            const isFirst = index === 0;
            const isLast = index === runDetail.stops.length - 1;
            const stationLabel = getStationLabel(stop.stationId);
            const isColored = index >= startStationIndx && index <= endStationIndx;
            return (
                <TimelineItem key={stop.stationId + stop.time}>
                  <TimelineSeparator>
                    <TimelineDot
                        variant={isFirst || isLast ? 'filled' : 'outlined'}
                        color={isColored ? 'primary' : 'grey'}
                    />
                    {!isLast && <TimelineConnector/>}
                  </TimelineSeparator>

                  <TimelineContent sx={{py: '12px', px: 2}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                          variant="body1"
                          fontWeight={isFirst || isLast ? 'bold' : 'regular'}
                      >
                        {stationLabel}
                      </Typography>

                      <Typography
                          variant="body1"
                          color={isFirst || isLast ? 'primary.dark' : 'text.secondary'}
                          fontWeight="medium"
                      >
                        {stop.time}
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