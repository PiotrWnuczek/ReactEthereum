import React, { useState } from 'react';
import { Card, Alert } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { ethers } from 'ethers';

const VerifyCard = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const verifyMessage = ({ address, message, signature }) => {
    try {
      const signerAddress = ethers.utils.verifyMessage(message, signature);
      if (signerAddress !== address) throw new Error('Invalid signature.');
      setSuccess('Signature is valid.');
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
        initialValues={{ address: '', message: '', signature: '' }}
        onSubmit={(values) => {
          setError(null);
          setSuccess(null);
          values.message ? verifyMessage({
            address: values.address,
            message: values.message,
            signature: values.signature,
          }) : setError('Wrong form values.');
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} id='verify' autoComplete='off'>
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
            />
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
            />
            <TextField
              sx={{ my: 1 }}
              onChange={handleChange}
              value={values.signature}
              name='signature'
              placeholder='Signature'
              label='Signature'
              type='text'
              variant='outlined'
              size='small'
              fullWidth
              multiline
              minRows={2}
              required
            />
          </form>
        )}
      </Formik>
      <Button
        sx={{ my: 1 }}
        type='submit'
        form='verify'
        variant='contained'
        size='small'
      >
        Verify Signature
      </Button>
      {error && <Alert
        sx={{ my: 1 }}
        severity='error'
      >
        {error}
      </Alert>}
      {success && <Alert
        sx={{ my: 1 }}
        severity='info'
      >
        {success}
      </Alert>}
    </Card>
  )
};

export default VerifyCard;
