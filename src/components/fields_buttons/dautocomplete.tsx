import {Autocomplete, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useAppStore} from "../../main.tsx";


interface DAutocompleteProps {
  options: any[];
  label: string;
  onChange: (e: any) => void;
  value?: any;
  error?: string;
  getOptionLabel?: (option: any) => string;
}

const DAutocomplete = observer(({options, label, onChange, value = null, error, getOptionLabel}: DAutocompleteProps) => {
  const appStore = useAppStore();
  return (
      <Autocomplete disablePortal options={options} size={'medium'} sx={{width: '100%'}} autoComplete
                    renderInput={(params) =>
                        <TextField {...params} label={label} helperText={error ?? undefined} error={!!error}/>}
                    onChange={(_, v) => onChange(v)} value={value}
                    getOptionLabel={getOptionLabel} getOptionKey={(option) => option.id}
                    noOptionsText={appStore.t('noOptions')}

      />
  );
});

export default DAutocomplete;