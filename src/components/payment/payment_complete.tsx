import Body from "../common/body.tsx";
import {useEffect, useState} from "react";
import {useStripe} from "@stripe/react-stripe-js";

const PaymentComplete = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [intentId, setIntentId] = useState<string | null>(null);
  const stripe = useStripe();

  useEffect(() => {
    if(!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      if (!paymentIntent) return;

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });

  }, [stripe]);

  return (
      <Body>
        STATUS: {status}

      </Body>
  );
};

export default PaymentComplete;