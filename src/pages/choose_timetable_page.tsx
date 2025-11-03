import {Box, Button, IconButton, Slide, Stack} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useAppStore} from "../main.tsx";
import {observer} from "mobx-react-lite";
import DAutocomplete from "../components/dautocomplete.tsx";
import DButton from "../components/dbutton.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapPage from "./map_page.tsx";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import type {Station} from "../types/stations.tsx";

const ChooseTimetablePage = observer(() => {
  const store = useAppStore();
  const t = store.t;
  const [inMapStation, setInMapStation] = useState<Station | undefined>(undefined);
  const polyline = [];
  const storeOtherStation = store.showMap === 'start' ? store.endStation : store.startStation;

  if (store.showMapBool) {
    if (storeOtherStation) {
      polyline.push({lat: storeOtherStation.lat, lng: storeOtherStation.lng});
    }
    if (inMapStation) {
      polyline.push({lat: inMapStation.lat, lng: inMapStation.lng});
    }
  }
  return (
      <Box sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1000px',
        margin: 'auto',
      }}>
        <Stack sx={{
          alignItems: 'center',
          margin: 'auto',
          padding: '20px',
          height: '-webkit-fill-available'
        }}>
          <Typography variant={'h1'} marginTop={'10vh'} marginBottom={'-20vh'}>{t('chooseStation')}</Typography>
          <Stack sx={{
            gap: '10px',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>

            <DatePicker label={t('date')} sx={{width: '100%'}} format={'DD.MM.YYYY'} disablePast slotProps={{
              textField: {
                helperText: store.getError('date') ? t('dateError') : undefined,
              },
            }} onError={(newError) => {
              store.errors(newError?.toString() ?? undefined, 'date')
            }} onChange={(e) => store.setDate(e?.toDate() ?? null)}/>
            <StationChooser label={t('startStation')} onChange={v => store.setStartStation(v)}
                            options={store.mockStations}
                            onMap={() => {
                              store.showMap = 'start';
                              setInMapStation(store.startStation);
                            }} value={store.startStation} showMapButton={true} error={store.getError('startStation')}/>
            <StationChooser label={t('endStation')} onChange={v => store.setEndStation(v)}
                            options={store.mockStations} onMap={() => {
                              store.showMap = 'end';
                              setInMapStation(store.endStation);
                            }} value={store.endStation}
                            showMapButton={true} error={store.getError('endStation')}/>
          </Stack>


          <DButton label={t('timetable')} onClick={() => {
                                                  store.validateFields();
                                                  if (!(store.getError('date') || store.getError('startStation') || store.getError('endStation'))) {
                                                    // navigate to timetable page
                                                  }
                                                  }}/>

        </Stack>
        <Slide
            direction={'up'}
            in={store.showMapBool}
            mountOnEnter
            unmountOnExit
        >
          <Box sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            overflow: 'hidden',
            background: (theme) => `linear-gradient(
                to top,
                ${theme.palette.background.paper} 90%,    /* Solid background up to 90% */
                ${theme.palette.background.paper}00 100%  /* Fully transparent at 100% */
            )`,
            alignContent: 'end',
            boxSizing: 'border-box',
          }}>
            <Box sx={{padding: '30px',}}>
              <StationChooser label={t(store.showMap == 'start' ? 'startStation' : 'endStation')}
                              onChange={v => setInMapStation(v)}
                              options={store.mockStations} value={inMapStation} showMapButton={false}/>
            </Box>
            <Box sx={{
              overflow: 'hidden', position: 'relative', borderTopLeftRadius: '20px', height: 'calc(100% - 150px)',
              borderTopRightRadius: '20px', backgroundColor: 'blue',
            }}>
              <Box sx={{position: 'relative'}}>
                <MapPage markers={store.mockStations.map(s => {
                  const isOtherStation = storeOtherStation !== undefined && store.isEqualStations(s, storeOtherStation);
                  return {
                    station: s,
                    color: isOtherStation ? 'green' : store.isEqualStations(s, inMapStation) ? 'red' : 'blue',
                    onClick: (s: Station | undefined) => {
                      if (!isOtherStation) {
                        setInMapStation(s);
                      }
                    }
                  };
                })}
                         center={{lat: 46.0569, lng: 14.5058}} initialZoom={8} polylineCoordinates={polyline}/>
                <IconButton
                    aria-label="back"
                    onClick={() => store.showMap = undefined}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 1000,
                      backgroundColor: 'primary.main',
                    }}
                >
                  <ArrowBackIcon/>
                </IconButton>
              </Box>;

              <Button
                  aria-label="back"
                  onClick={() => {
                    (store.showMap === 'start' && inMapStation) ? store.setStartStation(inMapStation!) : store.setEndStation(inMapStation!);
                    setInMapStation(undefined);
                    store.showMap = undefined;
                  }}
                  color={'primary'}
                  variant={'contained'}
                  sx={{
                    position: 'absolute',
                    bottom: '5%',
                    width: '50%',
                    left: '25%',
                    zIndex: 1000,
                  }}
              >
                {t('confirmLocation')}
              </Button>
            </Box>
          </Box>

        </Slide>
      </Box>
  );
});

export default ChooseTimetablePage;

interface StationChooserProps {
  label: string;
  onChange: (v: any) => void;
  options: any[];
  onMap?: () => void;
  value?: any;
  showMapButton?: boolean;
  error?: string;
}

const StationChooser = ({label, onChange, options, onMap, value, showMapButton, error}: StationChooserProps) => {
  return <Stack direction={'row'} gap={'10px'} width={'100%'} alignItems={'center'}
                sx={{justifyContent: 'space-between'}}>
    <DAutocomplete options={options} label={label} onChange={onChange} value={value} error={error}/>
    {showMapButton &&
        <IconButton onClick={onMap ?? (() => {
        })} sx={{
          backgroundColor: 'primary.main',
          color: 'primary.text',
        }}><MapIcon/></IconButton>
    }
  </Stack>
}
