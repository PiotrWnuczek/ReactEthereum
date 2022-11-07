import React, { useState } from 'react';
import { Card, Alert } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { ethers } from 'ethers';

const SignCard = () => {
  const [error, setError] = useState(null);
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
    <Card
      sx={{ p: 2, my: 2, bgcolor: 'secondary.light', borderRadius: 2 }}
      variant='outlined'
    >
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values) => {
          setError(null);
          values.message ? signMessage({
            message: values.message,
          }) : setError('Wrong form values.');
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} id='sign' autoComplete='off'>
            <TextField
              sx={{ my: 1 }}
              onChange={handleChange}
              value={values.message}
              name='message'
              placeholder='Message'
              label='Message'
              type='text'
              variant='outlined'
              size='small'
              fullWidth
              multiline
              minRows={2}
              required
              autoFocus
            />
          </form>
        )}
      </Formik>
      <Button
        sx={{ my: 1 }}
        type='submit'
        form='sign'
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
    </Card>
  )
};

export default SignCard;
