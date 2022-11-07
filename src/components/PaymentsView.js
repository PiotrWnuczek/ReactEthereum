import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import MainLayout from 'components/MainLayout';

const PaymentsView = () => (
  <MainLayout>
    <Box sx={{ p: 2 }}>
      <Typography>
        Payments
      </Typography>
      <Formik
        initialValues={{ address: '', ether: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
            <TextField
              sx={{ my: 1 }}
              onChange={handleChange}
              value={values.address}
              name='address'
              placeholder='Address'
              label='Address'
              type='text'
              variant='outlined'
              size='small'
              fullWidth
              autoFocus
            />
            <TextField
              sx={{ my: 1 }}
              onChange={handleChange}
              value={values.ether}
              name='ether'
              placeholder='Ether'
              label='Ether'
              type='text'
              variant='outlined'
              size='small'
              fullWidth
            />
          </form>
        )}
      </Formik>
      <Button
        type='submit'
        form='confirm'
        variant='contained'
        size='small'
      >
        Confirm
      </Button>
    </Box>
  </MainLayout>
);

export default PaymentsView;
