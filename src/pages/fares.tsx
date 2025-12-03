import {Stack, Typography, Box, Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
              {/* todo something nicer than this accordion - maybe two buttons that allow choosing the time (that open the pickers instead of the standard buttons) */}
              <Accordion variant={'outlined'} sx={{'&.Mui-expanded': {margin: '0px'}, '&.MuiAccordion-root': {borderColor: 'secondary.main'}}}>
                <AccordionSummary >
                  <Stack direction={'row'} alignItems={'center'} >
                    <ArrowDropDownIcon />
                  <Stack width={'100%'} alignItems={'flex-end'}>
                      <Typography component='span'>{store.t('departureTime')}: <Typography component={'span'} sx={{fontWeight: 'bold'}}>{store.timeFrom?.format(store.t('dateTimeFormat'))}</Typography></Typography>
                      <Typography component={'span'}>{store.t('departureTimeTo')}: <Typography component='span' sx={{fontWeight: 'bold'}}>{store.timeTo?.format(store.t('dateTimeFormat'))}</Typography></Typography>
                  </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
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
                  }} value={store.timeTo} onChange={(e) => store.setTimeTo(e)} format={t('dateTimeFormat')}
                                        label={t('departureTimeTo')}
                  />
                </AccordionDetails>
              </Accordion>

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