// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused fieldset": {
            borderColor: "transparent"
          },
          "&:hover fieldset": {
            borderColor: "transparent"
          }
        },
        notchedOutline: {
          borderColor: "transparent"
        },
      },
    },
  },
});

export default theme;
