import {observer} from "mobx-react-lite";
import {Typography} from "@mui/material";
import {useAppStore} from "../main.tsx";

const InvalidParams = observer(() => {
  const appStore = useAppStore();
  const t = appStore.t;
  return (
      <Typography
          variant={'h3'}>{t('invalidParams')} {6 - appStore.timerCount} {t('seconds')}.</Typography>
  );
});

export default InvalidParams;