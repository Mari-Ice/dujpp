import {observer} from "mobx-react-lite";
import {Stack, Typography} from "@mui/material";
interface FieldWithValidatorProps {
  error?: string;
  children: React.ReactNode;
}
const FieldWithValidator = observer(({children, error}: FieldWithValidatorProps) => {
  return <Stack gap={10}>
    {children}
    {error && <Typography color={'error'} variant={'body1'}>{error}</Typography>}
  </Stack>
});

export default FieldWithValidator;