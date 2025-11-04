import {Stack, Typography, Box} from "@mui/material";
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

const Fares = observer(() => {
  const appStore = useAppStore();
  const navigate = useNavigate();
  const t = appStore.t;

  const store = appStore.faresStore;

  const [searchParams] = useSearchParams();
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
        {!store.validStations ? <InvalidParams />
            : <Stack
                sx={{justifyContent: 'start', alignItems: 'center', padding: '20px', height: '100%', display: 'flex'}}>
              <Typography variant={'h3'}>{t('availableFares')}</Typography>

              <Stack gap={'15px'} sx={{width: '100%', paddingY: '20px', flexShrink: 0}}>
                <Typography variant={'h6'}>{t('startStation')}: {store.startStation?.label}</Typography>
                <Typography variant={'h6'}>{t('endStation')}: {store.endStation?.label}</Typography>
                <MobileDateTimePicker localeText={{
                  toolbarTitle: store.t('selectDateTime'),
                  cancelButtonLabel: store.t('cancelButton'),
                  nextStepButtonLabel: store.t('nextButton'),
                }} value={store.timeFrom} onChange={(e) => store.setTimeFrom(e)} format={t('dateTimeFormat')}
                                      label={t('departureTime')}
                />
                <MobileDateTimePicker localeText={{
                  toolbarTitle: store.t('selectDateTime'),
                  cancelButtonLabel: store.t('cancelButton'),
                  nextStepButtonLabel: store.t('nextButton'),
                }} value={store.timeTo} onChange={(e) => store.setTimeFrom(e)} format={t('dateTimeFormat')}
                                      label={t('arrivalTime')}
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
              <Box sx={{marginBottom:'50px', marginTop: '20px'}}>
              <DButton label={t('travelingElsewhere')}
                       onClick={() => navigate(buildRoute(AppRoutes.HOME, undefined, {[ParamKeys.LANGUAGE]: appStore.language}))}/>
              </Box>
            </Stack>
        }
        {store.openModal &&
            <TimetableDetailModal open={store.openModal} runDetail={store.openTimetableRun!} handleClose={() => {
              store?.setOpenModal(undefined)
            }}/>
        }

      </Body>
  );
});

export default Fares;