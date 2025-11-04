import {observer} from "mobx-react-lite";
import {Stack, IconButton, Typography} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {DujppColors} from "../../theme.tsx";

interface NumericalIncrementProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const NumericalIncrement =
    observer(({value, onChange, min = 0, max = 1000, step = 1, label}: NumericalIncrementProps) => {
      return (
          <Stack direction={'row'} alignItems={'center'} gap={'10px'} width={'100%'} justifyContent={'center'}>
            <Typography variant={'h6'} width={'40%'}>{label}: </Typography>
            <IconButton onClick={() => {
              if (value - step >= min) onChange(value - step)
            }} disabled={value - step < min} sx={{
              padding: '3px', backgroundColor: DujppColors.primary,
              color: DujppColors.content,
              '&:focus': {
                backgroundColor: DujppColors.primary,
              }
            }}
            ><RemoveRoundedIcon/></IconButton>
            <Typography>{value}</Typography>
            <IconButton onClick={() => {
              if (value + step <= max) onChange(value + step)
            }} disabled={value + step > max} sx={{
              padding: '3px', backgroundColor: DujppColors.primary,
              color: DujppColors.content,
              '&:focus': {
                backgroundColor: DujppColors.primary,
              }
            }}>
              <AddRoundedIcon/></IconButton>
          </Stack>
      );
    });

export default NumericalIncrement;