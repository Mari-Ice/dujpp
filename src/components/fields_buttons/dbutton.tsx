import {Button, type SxProps} from "@mui/material";

interface DButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
}

const DButton = ({label, onClick, disabled, sx}: DButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} variant={'contained'} fullWidth sx={{...sx}}>
      {label}
    </Button>
  );
};

export default DButton;