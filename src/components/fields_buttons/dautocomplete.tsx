import {Autocomplete, TextField} from "@mui/material";


interface DAutocompleteProps {
  options: any[];
  label: string;
  onChange: (e: any) => void;
  value?: any;
  error?: string;
}

const DAutocomplete = ({options, label, onChange, value = null, error}: DAutocompleteProps) => {
  return (
      <Autocomplete disablePortal options={options} size={'medium'} sx={{width: '100%'}} autoComplete
                    renderInput={(params) =>
                        <TextField {...params} label={label} helperText={error ?? undefined} error={!!error}/>}
                    onChange={(_, v) => onChange(v)} value={value}
      />
  );
};

export default DAutocomplete;