import {
  CardElement,
  useStripe,
  useElements,
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
  PaymentElement, AddressElement, ExpressCheckoutElement
} from '@stripe/react-stripe-js';
import {useState} from "react";
import DButton from "../fields_buttons/dbutton.tsx";
import {DujppColors} from "../../theme.tsx";
import {stripePromise} from "../../main.tsx";

interface StripePaymentProps {
  clientSecret?: string | null;
  disabled?: boolean;
  inProgress?: (p: boolean) => void;
  onSuccess: () => void;
  onError: () => void;
}

export function StripePayment({
                                clientSecret,
                                disabled,
                                inProgress,
                                onSuccess,
                                onError
                              }: StripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!stripe || !elements || !clientSecret) {
//       return;
//     }
//     setLoading(true);
//     inProgress?.(true);
//     setError(null);
// // Confirm the payment with the card element
//     const result = await stripe.confirmCardPayment(clientSecret, {
//           payment_method:
//         }
//     );
//     setLoading(false);
//     inProgress?.(false);
//     if (result.error) {
//       setError(result.error.message || 'Payment failed');
//       onError();
//     } else if (result.paymentIntent?.status === 'succeeded') {
//       setSuccess(true);
//       onSuccess();
//     }
  };
  return (
      <div style={{margin: 'auto', width: '100%'}}>
      <form onSubmit={handleSubmit}>
        <div style={{
          padding: '12px',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '16px',
        }}>
          <AddressElement options={{mode: 'billing'}}/>
          {/*<PaymentElement />*/}

        </div>
        {error && (
            <div style={{ color: 'red', marginBottom: '16px' }}>
              {error}
            </div>
        )}
        {success && (
            <div style={{ color: 'green', marginBottom: '16px' }}>
              Payment successful!
            </div>
        )}
        <DButton
            type="submit"
            label={loading ? 'Processing...' : success ? 'Paid' : 'Pay Now'}
            onClick={() => {

            }}
            disabled={loading || !stripe || !elements || !!success || disabled}
        />
      </form>
      </div>
  );
}