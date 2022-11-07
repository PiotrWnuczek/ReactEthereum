import React from 'react';
import { Box } from '@mui/material';
import SideMenu from 'components/SideMenu';

const MainLayout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <SideMenu
      sx={{
        width: { xs: 72, md: 172 }, '& .MuiDrawer-paper': {
          bgcolor: 'secondary.dark', justifyContent: 'space-between',
          width: { xs: 72, md: 172 },
        },
      }}
      variant='permanent'
      main
    />
    <Box sx={{ flexGrow: 1 }}>
      {children}
    </Box>
  </Box>
);

export default MainLayout;
