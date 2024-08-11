import { Modal, Button, Group, PasswordInput, Text, Checkbox, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import Otp from './Otp';
import { useFormSubmission } from '@/custom-hooks/useForm';
import { validateSignUpForm } from '@/utils/validation';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import classes from '../../app/styles/Demo.module.scss';

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
    },
    validate: validateSignUpForm,
  });

  const { isLoading, error, handleSubmit,data={} } = useFormSubmission(
    API_ENDPOINTS.SIGNUP,
    form.values,
    form.validate
  );

  useEffect(() => {
    
    if(data && data?.success){
  console.log('>> >>>',data.success)
  setModalOpenedOtp(true);
  signUpOnClose();
}

  }, [data])
  


console.log('modalOpenedOtp',modalOpenedOtp)
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
