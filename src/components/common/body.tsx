import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";

const Body = observer(({children}: {children: React.ReactNode}) => {
  return (
      <Box sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1000px',
        margin: 'auto',
      }}>
        {children}
      </Box>
  );
});

export default Body;