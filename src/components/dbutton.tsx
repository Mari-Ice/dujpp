import {Button} from "@mui/material";

interface DButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const DButton = ({label, onClick, disabled}: DButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} variant={'contained'} fullWidth>
      {label}
    </Button>
  );
};

export default DButton;