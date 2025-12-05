import {
  useStripe,
  useElements,
  PaymentElement, AddressElement,
} from '@stripe/react-stripe-js';
import {useState} from "react";
import DButton from "../fields_buttons/dbutton.tsx";
import {useAppStore} from "../../main.tsx";

interface StripePaymentProps {
  clientSecret?: string | null;
  disabled?: boolean;
  inProgress?: (p: boolean) => void;
  onSuccess: () => void;
  onError: () => void;
}

export function StripePayment({
                                // clientSecret,
                                disabled,
                                // inProgress,
                                // onSuccess,
                                // onError
                              }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const appStore = useAppStore();
  const store = appStore.paymentStore;
  if (!store) return null;

  return (
      <div style={{margin: 'auto', width: '100%', overflowY: 'scroll'}}>
      <form onSubmit={() => store.handleSubmitPayment(stripe, elements)} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <PaymentElement id={'payment-element'} options={{layout: 'tabs'}}/>
        <DButton
            type="submit"
            label={store.loading ? store.t('processing') : store.paymentSuccessful ? store.t('paid') : store.t('pay')}
            sx={{marginTop: '30px', maxWidth: '200px', width: '100%'}}
            onClick={() => {}}
            disabled={!stripe || !elements || disabled}
        />

      </form>
      </div>
  );
}