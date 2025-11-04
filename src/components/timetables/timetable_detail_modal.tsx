import { Box, Typography, Modal, Stack, Divider, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type {RunDetail} from "../../types/stations.ts";
import {useAppStore} from "../../main.tsx";
import Timetable from "./timetable.tsx";
import DButton from "../fields_buttons/dbutton.tsx";
import {useNavigate} from "react-router-dom";


// Style for the modal content box
const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

// Define the props for the modal
interface TimetableDetailModalProps {
  open: boolean;
  handleClose: () => void;
  runDetail: RunDetail;
}

const TimetableDetailModal = ({ open, handleClose, runDetail }: TimetableDetailModalProps) => {
  const appStore = useAppStore(); // Assuming appStore is available here for station lookups
  const t = appStore.t;
  const store = appStore.faresStore;
  const navigate = useNavigate();
  if (!store) return null;

  return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="timetable-detail-title"
          aria-describedby="timetable-detail-description"
          sx={{maxWidth: '80vw', margin: 'auto', maxHeight: '90vh', overflow: 'hidden'}}
      >
        <ModalContent sx={{ padding: '20px', '&:focus': { outline: 'none' }, paddingTop: '40px',}}>
          <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="timetable-detail-title" variant="h5" component="h2" sx={{ mb: 1 }}>
            {runDetail.lineName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {t('operatedBy')}: {runDetail.companyName}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{overflowY: 'auto', width: '100%'}}>
            <Stack id="timetable-detail-description" gap={1}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {/*{t('tripStops')}*/}
              </Typography>
              <Timetable runDetail={runDetail} startStationId={store.startStation.id ?? ''} endStationId={store.endStation.id} getStationLabel={(id) => store.getStationLabel(id) ?? ''}/>
            </Stack>
          </Box>
          <DButton label={t('buyTicket')} onClick={() => {
            store?.setOpenModal(undefined);
            navigate(store?.buildRouteForPaymentPage(runDetail.runId));
          }} />
        </ModalContent>
      </Modal>
  );
};

export default TimetableDetailModal;