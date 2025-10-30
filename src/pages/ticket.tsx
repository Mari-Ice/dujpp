import {Stack} from "@mui/material";

const Ticket = () => {
  return (
      <div>
        <div>Vstopna postaja</div>
        <div>Izstopna postaja</div>

        <div>Odrasli</div>
        <div>Otroci (7-14)</div>
        <div>Otroci (0-6)</div>
        <div>Prtljaga</div>

        <div>QR KODA</div>
        <Stack direction={'row'}>
          <button>Prenos</button>
          <button>Deli</button>
        </Stack>
      </div>
  );
};

export default Ticket;