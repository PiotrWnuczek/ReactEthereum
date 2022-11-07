import React, { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { ethers } from 'ethers';
import MainLayout from 'components/MainLayout';

const SignaturesView = () => {
  const [error, setError] = useState();
  const [signatures, setSignatures] = useState([]);

  const signMessage = async ({ message }) => {
    try {
      if (!window.ethereum) throw new Error('No crypto wallet.');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
      console.log({ message, address, signature });
      setSignatures([...signatures, { message, address, signature }]);
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
          Signatures
        </Typography>
        <Formik
          initialValues={{ message: '' }}
          onSubmit={(values) => {
            values.message ? signMessage({
              message: values.message,
            }) : setError('Wrong form values.');
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} id='confirm' autoComplete='off'>
              <TextField
                sx={{ my: 1 }}
                onChange={handleChange}
                value={values.address}
                name='message'
                placeholder='Message'
                label='Message'
                type='text'
                variant='outlined'
                size='small'
                fullWidth
                multiline
                minRows={2}
                autoFocus
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
          Sign Message
        </Button>
        {error && <Alert
          sx={{ my: 1 }}
          severity='error'
        >
          {error}
        </Alert>}
        {signatures.map((signature, idx) =>
          <Alert
            sx={{ my: 1, wordBreak: 'break-all' }}
            key={idx}
            severity='info'
          >
            mssage: {signature.message} <br />
            address: {signature.address} <br />
            signature: {signature.signature}
          </Alert>
        )}
      </Box>
    </MainLayout>
  )
};

export default SignaturesView;
