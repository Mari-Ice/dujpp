import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import DButton from "../fields_buttons/dbutton.tsx";
import {useAppStore} from "../../main.tsx";
import {Typography, CircularProgress} from "@mui/material";
import {observer} from "mobx-react-lite";
import {DujppColors} from "../../theme.tsx";

interface StripePaymentProps {
  disabled?: boolean;
}

export const StripePayment = observer(({disabled}: StripePaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const appStore = useAppStore();
  const store = appStore.paymentStore;
  if (!store) return null;
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    await store.handleSubmitPayment(stripe, elements);
  }
  return (
      <div style={{margin: 'auto', width: '100%', overflowY: 'scroll'}}>
        <form onSubmit={(e) => handleSubmit(e)}
              style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <PaymentElement id={'payment-element'} options={{layout: 'tabs'}}/>
          <DButton
              type="submit"
              label={store.loading ?
                 store.t('processing')
                  : (store.paymentSuccessful ? store.t('paid') : store.t('pay'))
              }
              followingNode={store.loading ? <CircularProgress sx={{maxWidth: '15px', maxHeight: '15px', marginLeft: '10px', color: DujppColors.neutral}}/> : undefined}
              sx={{
                marginTop: '30px',
                maxWidth: '200px',
                width: '100%',
                backgroundColor: store.paymentSuccessful ? DujppColors.secondary : undefined
              }}
              disabled={!stripe || !elements || disabled || store.loading || store.paymentSuccessful}
              onClick={() => {
              }}
          />
          <Typography color={'error'} sx={{marginTop: '20px'}}>{store.paymentError}</Typography>
        </form>
      </div>
  );
});