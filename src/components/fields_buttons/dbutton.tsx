import {Button, type SxProps} from "@mui/material";
import {DujppColors} from "../../theme.tsx";

interface DButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  sx?: SxProps;
  type?: 'submit' | 'button' | 'reset';
  followingNode?: React.ReactNode;
}

const DButton = ({label, onClick, disabled, sx, type, followingNode}: DButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick} variant={'contained'} fullWidth sx={{'&:hover': {boxShadow: 4, backgroundColor: DujppColors.primary + 'EE'},
      '&:disabled': {color: DujppColors.neutral, backgroundColor: DujppColors.primaryLight},
      ...sx}}
      type={type}
    >
      {label}
      {followingNode}
    </Button>
  );
};

export default DButton;