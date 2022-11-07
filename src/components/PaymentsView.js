import React, { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { ethers } from 'ethers';
import MainLayout from 'components/MainLayout';

const PaymentsView = () => {
  const [error, setError] = useState();
  const [transfers, setTransfers] = useState([]);

  const startPayment = async ({ ether, address }) => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet.');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(address);
      const transfer = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(ether),
      });
      console.log({ ether, address });
      console.log('transfer', transfer);
      setTransfers([transfer]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{ mb: 1 }}
          variant='h5'
        >
          Payments
        </Typography>
        <Formik
          initialValues={{ address: '', ether: '' }}
          onSubmit={(values) => {
            values.address && values.ether ? startPayment({
              address: values.address,
              ether: values.ether,
            }) : setError('Wrong form values.');
          }}
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
                required
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
                required
              />
            </form>
          )}
        </Formik>
        <Button
          sx={{ my: 1 }}
          type='submit'
          form='confirm'
          variant='contained'
          size='small'
        >
          Pay Now
        </Button>
        {error && <Alert
          sx={{ my: 1 }}
          severity='error'
        >
          {error}
        </Alert>}
        {transfers.map(transfer =>
          <Alert
            sx={{ my: 1 }}
            key={transfer.hash}
            severity='info'
          >
            {transfer.hash}
          </Alert>
        )}
      </Box>
    </MainLayout>
  )
};

export default PaymentsView;
