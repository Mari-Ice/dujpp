import {Stack} from "@mui/material";

const PaymentPage = () => {
  return (
      <Stack>
        <div>Vstopna postaja</div>
        <div>Izstopna postaja</div>

        <div>Odrasli</div>
        <div>Otroci (7-14)</div>
        <div>Otroci (0-6)</div>
        <div>Prtljaga</div>

        <h1>20 EUR</h1>
        <button>Plačilo</button>

      </Stack>
  );
};

export default PaymentPage;