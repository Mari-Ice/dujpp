import React from 'react';
import {Stack} from "@mui/material";

const ChooseTimetablePage = () => {
  return (
      <Stack style={{justifyContent: 'center', alignItems: 'center', height: '100vh', margin: '0 auto', gap: '10px'}}>
        <input placeholder={'Datum'}></input>
        <input placeholder={'Vstopna postaja'}></input>
        <input placeholder={'Izhodna postaja'}/>
        <button>Prikaži na zemljevidu</button>
        <button>Vozni red =</button>
      </Stack>
  );
};

export default ChooseTimetablePage;