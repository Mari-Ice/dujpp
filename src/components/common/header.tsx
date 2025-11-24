import {AppBar, MenuItem, Select, type SelectChangeEvent, Stack, Toolbar, Typography} from "@mui/material";
import {Si, Gb} from 'react-flags-select';
import {observer} from "mobx-react-lite";
import {useAppStore} from "../../main.tsx";
import {languages} from "../../types/language_utils.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AppRoutes, buildRoute, ParamKeys} from "../../types/route_utils.tsx";

const Header = observer(() => {
  const store = useAppStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLanguageChange = (event: SelectChangeEvent<unknown>) => {
    const selectedLanguage = event.target.value as string;
    store.setLanguage(selectedLanguage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set(ParamKeys.LANGUAGE, selectedLanguage);
    navigate({ search: newParams.toString() });
    store.setLanguage(selectedLanguage);
  }
  return (
      <AppBar position={'static'} >
        <Toolbar sx={{justifyContent: 'space-between'}}>
          <Typography variant={'h4'} onClick={() => navigate(buildRoute(AppRoutes.HOME, undefined, {[ParamKeys.LANGUAGE]: store.language}))} sx={{cursor: 'pointer'}}>
            <img src={'/dujpp_neg.svg'} alt={'Dujpp'} style={{width: '80px', margin: '10px'}}/>
          </Typography>
          <Select labelId="name" id="select" value={store.language}
                  renderValue={(v) =>
                      <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
                        {languageToFlag(v)}
                        <Typography color={'primary.contrastText'}>{v?.toUpperCase()}</Typography>
                      </Stack>}
                  variant={'standard'} disableUnderline={true}
                  size={'small'}
                  sx={{'& .css-1nblfdq-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input-MuiInput-input': {padding: '0px'},
                    '& .MuiSvgIcon-root': {
                      color: 'primary.contrastText', // Sets the color to the theme's textSecondary value
                    }
                  }}
                  onChange={(e) => handleLanguageChange(e)}>
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