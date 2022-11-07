import React from 'react';
import { Box, Typography } from '@mui/material';
import MainLayout from 'components/MainLayout';
import SignCard from 'components/SignCard';
import VerifyCard from 'components/VerifyCard';

const SignaturesView = () => (
  <MainLayout>
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{ mb: 1 }}
        variant='h5'
      >
        Signatures
      </Typography>
      <SignCard />
      <VerifyCard />
    </Box>
  </MainLayout>
);

export default SignaturesView;
