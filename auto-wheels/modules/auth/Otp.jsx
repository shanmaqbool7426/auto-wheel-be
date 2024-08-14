import { Modal, Button, Group, Text, PinInput, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useFormSubmission } from '@/custom-hooks/useForm';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import classes from '../../app/styles/Demo.module.scss';

function Otp({ otpOpen = false, otpClose = () => {} }) {
  const form = useForm({
    initialValues: {
      otp: '',
    },
    validate: {
      otp: (value) => (value.length === 4 ? null : 'OTP must be 4 digits'),
    },
  });

  const { isLoading, error, handleSubmit, data } = useFormSubmission(
    API_ENDPOINTS.VERIFY_OTP, // Replace with your OTP verification endpoint
    form.values,
    form.validate
  );

  useEffect(() => {
    if (data && data.success) {
      // Handle successful OTP verification, e.g., navigate to another page
      otpClose(); // Close OTP modal on successful verification
    }
  }, [data]);

  return (
    <Modal opened={otpOpen} onClose={otpClose} title="">
      <div className="otp-model-main">
        <Text fw={700} size="lg" ta="center">
          Enter Code!
        </Text>
        <Text ta="center" mt="xs" mb="lg">
          Enter the code you’ve received on your email account to verify your account.
        </Text>
        <Center maw={400} h={100}>
          <PinInput
            {...form.getInputProps('otp')}
            length={4}
            size="lg"
            placeholder=''
            error={form.errors.otp}
          />
        </Center>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <Group justify="flex-end" mt="md" className="mx-5 my-5">
          <Button variant="primary" type="submit" fullWidth disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Group>
      </div>
    </Modal>
  );
}

export default Otp;
