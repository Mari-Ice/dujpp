import {Stack, Typography, Box,} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useAppStore} from "../main.tsx";
import Body from "../components/common/body.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AppRoutes, buildRoute, ParamKeys} from "../types/route_utils.tsx";
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import Timetables from "../components/timetables/timetables.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import TimetableDetailModal from "../components/timetables/timetable_detail_modal.tsx";
import DButton from "../components/fields_buttons/dbutton.tsx";
import InvalidParams from "./invalid_params.tsx";
import {useEffect} from "react";
import {datePickerSlotProps,} from "../theme.tsx";


const Fares = observer(() => {
  const appStore = useAppStore();
  const navigate = useNavigate();
  const t = appStore.t;

  const store = appStore.faresStore;

  const [searchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string | undefined) => {
    const currentURL = new URL(window.location.href);
    if (value) {
      currentURL.searchParams.set(key, value);
    } else {
      currentURL.searchParams.delete(key);
    }
    window.history.pushState({}, '', currentURL);
  }
  useEffect(() => {
    store?.setupParams(searchParams);
  }, [searchParams]);

  if (!store) return null;
  if (!store.initialized) {
    const validStations = store.setupParams(searchParams);
    if (!validStations && appStore.timerCount === 0 && !appStore.navigateBack) {
      appStore.incrementTimer();
    }
  }
  if (appStore.navigateBack) {
    navigate(buildRoute(AppRoutes.HOME, undefined, {[ParamKeys.LANGUAGE]: appStore.language,}));
  }
  return (
      <Body>
        {!store.validStations ? <InvalidParams/>
            : <Stack
                sx={{
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: '10px 20px ',
                  height: '100%',
                  display: 'flex',
                  gap: '5px'
                }}>
              <Typography variant={'h4'}>{t('availableFares')}</Typography>
              <Stack direction={'row'} gap={'5px'} marginTop={'10px'}>

                <MobileDateTimePicker localeText={{
                  toolbarTitle: store.t('selectDateTime'),
                  cancelButtonLabel: store.t('cancelButton'),
                  nextStepButtonLabel: store.t('nextButton'),
                }} value={store.timeFrom} onChange={(e) => {
                  store.setTimeFrom(e);
                  updateSearchParams('timeFrom', e?.toISOString());
                }} format={t('dateTimeFormat')}
                                      label={t('departureTime')}
                                      slotProps={datePickerSlotProps}
                                      sx={{
                                        maxWidth: '137px',
                                        'div.MuiPickersInputBase-root': {padding: '0 14px 0 5px'},
                                        'div.MuiInputAdornment-root': {marginLeft: '4px'},
                                        'button.MuiIconButton-root': {padding: '4px'}
                                      }}
                  maxDate={store.timeTo ?? undefined}
                />
                <MobileDateTimePicker localeText={{
                  toolbarTitle: store.t('selectDateTime'),
                  cancelButtonLabel: store.t('cancelButton'),
                  nextStepButtonLabel: store.t('nextButton'),
                }} value={store.timeTo} onChange={(e) => {
                  store.setTimeTo(e);
                  updateSearchParams('timeTo', e?.toISOString());
                }} format={t('dateTimeFormat')}
                                      label={t('departureTimeTo')}
                                      slotProps={datePickerSlotProps}
                                      sx={{
                                        maxWidth: '137px',
                                        'div.MuiPickersInputBase-root': {padding: '0 14px 0 5px'},
                                        'div.MuiInputAdornment-root': {marginLeft: '4px'},
                                        'button.MuiIconButton-root': {padding: '4px'}
                                      }}
                  minDate={store.timeFrom ?? undefined}
                />
              </Stack>
              {store.loading ? <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    height: '100%',
                    justifyContent: 'center',
                    marginTop: '-40px',
                  }}>{t('loadingTimetables')}<CircularProgress/></Typography> :
                  <Timetables timetables={store.timetables} onSelectedRun={(r) => {
                    store?.setOpenModal(r);
                  }}/>}
              <Box sx={{marginBottom: '30px', marginTop: '5px'}}>
                <DButton label={t('travelingElsewhere')}
                         onClick={() => {
                           navigate(buildRoute(AppRoutes.HOME, undefined, {[ParamKeys.LANGUAGE]: appStore.language}))
                         }}/>
              </Box>
            </Stack>
        }
        {store.openModal &&
            <TimetableDetailModal open={store.openModal} trip={store.openTimetableRun!} handleClose={() => {
              store?.setOpenModal(undefined)
            }}/>
        }

      </Body>
  );
});

export default Fares;