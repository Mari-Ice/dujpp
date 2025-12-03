import {Button, type SxProps} from "@mui/material";
import {DujppColors} from "../../theme.tsx";

interface DButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
  type?: 'submit' | 'button' | 'reset';
}

const DButton = ({label, onClick, disabled, sx, type}: DButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} variant={'contained'} fullWidth sx={{'&:hover': {boxShadow: 4, backgroundColor: DujppColors.primary + 'EE'},
      ...sx}}
      type={type}
    >
      {label}
    </Button>
  );
};

export default DButton;