import { Modal, Button, Group, PasswordInput, Text, Checkbox, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import SignIn from './SignIn.jsx';
import Otp from './Otp';
import { useFormSubmission } from '@/custom-hooks/useForm.js';
import classes from '../../app/styles/Demo.module.scss';
import { API_ENDPOINTS } from '@/constants/api-endpoints.js';


function SignUp({ signUpOpened, signUpOnClose }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalOpenedOtp, setModalOpenedOtp] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      fullName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      // termsOfService: false,
    },
    validate: {
      fullName: (value) => (value.trim() ? null : 'Full name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value.trim() ? null : 'Phone number is required'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
      confirmPassword: (value, values) => {
        console.log('Confirm Password',value);
      }
       
    //   termsOfService: (value) => (value ? null : 'You must agree to the terms of service'),
    },
  });

  console.log('Validating',form.getValues())
  const { isLoading, error, handleChange, handleSubmit } = useFormSubmission (API_ENDPOINTS.SIGNUP, form.getValues()
  , form.validate);
console.log('Form submission',error)
  return (
    <>
      <Modal opened={signUpOpened} onClose={signUpOnClose} title="" size="auto" withCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <div className='signup-modal'>
            <Text fw={700} size="lg" className='mt-5'>Let’s get you started!</Text>
            <fieldset legend="" variant="unstyled">
              <TextInput
                withAsterisk
                label="Full Name"
                placeholder="William John"
                className='my-2'
                key={form.key('fullName')}
               {...form.getInputProps('fullName')}
                error={form.errors.fullName && form.errors.fullName}
              />
              <TextInput
                label="Email"
                placeholder="abc@gmail.com"
                className='my-2'
                key={form.key('email')}
                {...form.getInputProps('email')}
                error={form.errors.email && form.errors.email}
              />
              <TextInput
                label="Phone"
                placeholder="+1 342 456 7856"
                className='my-2'
                key={form.key('phone')}
                {...form.getInputProps('phone')}
                error={form.errors.phone && form.errors.phone}
              />
              <PasswordInput
                label="Password"
                placeholder='*********'
                className='my-2'
                key={form.key('password')}
                {...form.getInputProps('password')}
                error={form.errors.password && form.errors.password}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="*********"
                className='my-2'
                key={form.key('confirmPassword')}
                {...form.getInputProps('confirmPassword')}
                error={form.errors.confirmPassword && form.errors.confirmPassword}
              />
              <Checkbox
                className='my-2'
                size="sm"
                label={<span>I agree with <b>Privacy Policy</b> and <b>Term</b> and Conditions.</span>}
                // checked={form.values.termsOfService}
                // onChange={(event) => handleChange('termsOfService', event.currentTarget.checked)}
                // error={form.errors.termsOfService && form.errors.termsOfService}
              />
            </fieldset>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Group justify="flex-end" mt="md">
              <Button variant="primary" type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </Group>
            <Text ta="center" className='my-4'>
              Already have an account? <b className='primary cursor' onClick={() => {
                setModalOpened(true);
                signUpOnClose();
              }}>Sign in</b>
            </Text>
          </div>
        </form>
      </Modal>
      <SignIn signOpen={modalOpened} signInClose={() => setModalOpened(false)} />
      <Otp otpOpen={modalOpenedOtp} otpClose={() => setModalOpenedOtp(false)} />
    </>
  );
}

export default SignUp;
