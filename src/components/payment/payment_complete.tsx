import Body from "../common/body.tsx";
import {useEffect, useState} from "react";
import {useAppStore} from "../../main.tsx";
import {Typography} from "@mui/material";
import Ticket from "../../pages/ticket.tsx";

const PaymentComplete = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [intentId, setIntentId] = useState<string | null>(null);
  const store = useAppStore();

  useEffect(() => {

    const searchParams = new URLSearchParams(window.location.search);
    setStatus(searchParams.get("redirect_status"));
    setIntentId(searchParams.get("payment_intent"));
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!clientSecret) return;
  }, []);

  return (
      <Body>
        <Typography variant={'h1'} textAlign={'center'}>{store.t('payment')} {store.t(status ?? 'unsuccessful')}</Typography>
        {status === 'succeeded' ?
        <Ticket /> : <Typography textAlign={'center'} fontSize={'50px'}>❌</Typography>}
      </Body>
  );
};

export default PaymentComplete;