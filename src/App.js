import './App.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Routes from "./routes";

export default function App() {
  const [themeVal, setThemeVal] = useState(true)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#b8a05a'
      },
      mode: themeVal ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes onChangeTheme={setThemeVal} theme={theme} />
    </ThemeProvider>
  );
}