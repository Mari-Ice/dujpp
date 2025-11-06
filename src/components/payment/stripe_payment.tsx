import {observer} from "mobx-react-lite";
import DButton from "../fields_buttons/dbutton.tsx";
import {useAppStore} from "../../main.tsx";
import {Box, Typography} from "@mui/material";
// import {EmbeddedCheckout} from "@stripe/react-stripe-js";

const StripePayment = observer(() => {
  const appStore = useAppStore();
  const t = appStore.t;
  const store = appStore.paymentStore;
  if (!store) return null;
  return (
      <form action="/create-checkout-session" method="POST">
        <Box sx={{height: '200px', alignContent: 'center', margin: 'auto'}}>
          <Typography variant={'overline'}>Stripe payment placeholder</Typography>
        </Box>
        {/*<EmbeddedCheckout />*/}
        <DButton label={t('pay')} onClick={() => store.pay()} />
      </form>
  );
});

export default StripePayment;