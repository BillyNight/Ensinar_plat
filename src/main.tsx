import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider, ThemeOptions } from '@mui/material/styles';
import { GlobalProvider } from './contexts/global/index.tsx'
import { BrowserRouter } from 'react-router-dom'

const theme: ThemeOptions = createTheme({


  palette: {
    primary: green,

  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </ThemeProvider>
  </React.StrictMode>,
)
