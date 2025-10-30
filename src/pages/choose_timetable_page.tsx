import {Box, Button, IconButton, Slide, Stack} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useAppStore} from "../main.tsx";
import {observer} from "mobx-react-lite";
import DAutocomplete from "../components/dautocomplete.tsx";
import DButton from "../components/dbutton.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MapPage, {type Position} from "./map_page.tsx";

const ChooseTimetablePage = observer(() => {
  const store = useAppStore();
  const t = store.t;

  return (
      <Box sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Stack sx={{
          alignItems: 'center',
          margin: 'auto',
          padding: '20px',
          height: '-webkit-fill-available'
        }}>

          <Stack sx={{
            gap: '10px',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>
            <DatePicker label={t('date')} sx={{width: '100%'}} localeText={{}}/>
            <StationChooser label={t('startStation')} onChange={v => store.setStartStation(v)}
                            options={store.mockStations} onMap={() => store.showMap = true} value={store.startStation}/>
            <StationChooser label={t('endStation')} onChange={v => store.setEndStation(v)}
                            options={store.mockStations} onMap={() => store.showMap = true} value={store.endStation}/>
          </Stack>


          <DButton label={t('timetable')} onClick={() => {
          }}/>

        </Stack>
        <Slide
            direction={'up'}
            in={store.showMap}
            mountOnEnter
            unmountOnExit
        >
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1000,
            backgroundColor: 'background.paper',
          }}>
            <MapDrawer/>
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
  onMap: () => void;
  value?: any;
}

const StationChooser = ({label, onChange, options, onMap, value}: StationChooserProps) => {
  return <Stack direction={'row'} gap={'10px'} width={'100%'} alignItems={'center'}
                sx={{justifyContent: 'space-between'}}>
    <DAutocomplete options={options} label={label} onChange={onChange} value={value}/>
    <IconButton onClick={onMap} sx={{
      backgroundColor: 'primary.main',
      color: 'primary.text',
    }}><MapIcon/></IconButton>
  </Stack>
}

const MapDrawer = observer(() => {
  const store = useAppStore();
  const t = store.t;
  return <Box sx={{position: 'relative'}}>
    <MapPage markers={store.mockStations.map(s => ({lat: s.lat, lng: s.lng} as Position))}
             center={{lat: 46.0569, lng: 14.5058}} initialZoom={10}
             polylineCoordinates={store.mockStations.map(s => ({lat: s.lat, lng: s.lng} as Position))}/>
    <IconButton
        aria-label="back"
        onClick={() => store.showMap = false}
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
    <Button
        aria-label="back"
        onClick={() => store.showMap = false} // Action to go back
        color={'primary'}
        variant={'contained'}
        sx={{
          position: 'absolute',
          bottom: '10vh',
          width: '50%',
          left: '25%',
          zIndex: 1000,
        }}
    >
      {t('confirmLocation')}
    </Button>
  </Box>;
});