import React from 'react';
import {Stack} from "@mui/material";

interface Postaja {
  name: string;
  time: string;
}

const VozniRed: React.FC = () => {
  const postaje: Postaja[] = [
    {
      name: 'Postaja 1',
      time: '10:00',
    },
    {
      name: 'Postaja 2',
      time: '10:00',
    },
    // Spread the generated 10 posts
    ...(Array(10).fill(0).map((_, i) => ({name: `Postaja ${i + 3}`, time: '10:00'} as Postaja)))
  ];

  return (
      <Stack>
        {
          postaje.map((postaja, index) => (
              <Stack direction={'row'} key={index} gap={'10px'}>
                <div>{postaja.name}</div>
                <div>{postaja.time}</div>
              </Stack>
          ))
        }
      </Stack>
  );
};

export default VozniRed;