import React from 'react';
import {Stack} from "@mui/material";
import VozniRed from "../components/vozni_red";

const Timetable = () => {
  return (
      <Stack style={{justifyContent: 'center', alignItems: 'center', height: '100vh', margin: '0 auto', gap: '10px'}}>
        <h1>vehicle id</h1>
        <h1>route</h1>

        <VozniRed />
        <button>Potujem drugam</button>
      </Stack>
  );
};

export default Timetable;