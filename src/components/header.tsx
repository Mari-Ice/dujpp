import {AppBar, MenuItem, Select, Stack, Toolbar, Typography} from "@mui/material";
import {Si, Gb} from 'react-flags-select';
import {observer} from "mobx-react-lite";
import {useAppStore} from "../main.tsx";
import {languages} from "../types/language_utils.tsx";

const Header = observer(() => {
  const store = useAppStore();
  return (
      <AppBar position={'static'} >
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Typography variant={'h4'}>Dujpp</Typography>
          <Select labelId="label" id="select" value={store.language}
                  renderValue={(v) =>
                      <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                        {languageToFlag(v)}
                        {v?.toUpperCase()}
                      </Stack>}
                  variant={'standard'} disableUnderline={true}
                  size={'small'}
                  sx={{'& .css-1nblfdq-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input-MuiInput-input': {padding: '0px'}}}
                  onChange={(e) => store.setLanguage(e.target.value)}>
            {languages.map((lang) => {
              return (
                  <MenuItem value={lang} sx={{alignItems: 'center', gap: '10px'}}>
                    {languageToFlag(lang)}
                    {lang?.toUpperCase()}
                  </MenuItem>
              )
            })}
          </Select>
        </Toolbar>
      </AppBar>
  );
});

export default Header;


const languageToFlag = (language: string) => {
  switch (language) {
    case 'sl':
      return <Si/>
    default:
      return <Gb/>
  }
}