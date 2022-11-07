import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material';
import PaymentsView from 'components/PaymentsView';
import SignaturesView from 'components/SignaturesView';

const App = () => {
  const theme = createTheme({
    typography: { fontFamily: 'Lato' },
    palette: { secondary: { light: grey[50], main: grey[100], dark: blueGrey[50] } },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/*' element={<Navigate to='/payments' />} />
          <Route path='/payments' element={<PaymentsView />} />
          <Route path='/signatures' element={<SignaturesView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
};

export default App;
