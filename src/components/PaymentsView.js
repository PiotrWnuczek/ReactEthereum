import React, { useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { Alert, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { ethers } from 'ethers';
import MainLayout from 'components/MainLayout';

const PaymentsView = () => {
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);

  const startPayment = async ({ ether, address }) => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet.');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(address);
      const payment = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(ether),
      });
      console.log({ ether, address, payment });
      setPayments([...payments, payment]);
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
        <Card
          sx={{ p: 2, my: 2, bgcolor: 'secondary.light', borderRadius: 2 }}
          variant='outlined'
        >
          <Formik
            initialValues={{ address: '', ether: '' }}
            onSubmit={(values) => {
              setError(null);
              values.address && values.ether ? startPayment({
                address: values.address,
                ether: values.ether,
              }) : setError('Wrong form values.');
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} id='pay' autoComplete='off'>
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
                  required
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
                  required
                />
              </form>
            )}
          </Formik>
          <Button
            sx={{ my: 1 }}
            type='submit'
            form='pay'
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
          {payments.map(payment =>
            <Alert
              sx={{ my: 1, wordBreak: 'break-all' }}
              key={payment.hash}
              severity='info'
            >
              {payment.hash}
            </Alert>
          )}
        </Card>
      </Box>
    </MainLayout>
  )
};

export default PaymentsView;
