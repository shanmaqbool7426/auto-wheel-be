import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, PasswordInput, Text, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Fieldset, TextInput } from '@mantine/core';
import classes from '../../app/styles/Demo.module.scss';
import SignIn from './SignIn.jsx';
import { useState } from 'react';
import Otp from './Otp';


function SignUp({ signUpOpened, signUpOnClose }) {
    const [modalOpened, setModalOpened] = useState(false);
    const [modalOpenedOtp, setModalOpenedOtp] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            fullName:'',
            phone: '',
            password: '',
            confirmPassword: '',
            termsOfService: false,
        },

        validate: {
            fullName: (value) => (value.trim() ? null : 'Full name is required'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => (value.trim() ? null : 'Phone number is required'),
            password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
            confirmPassword: (value, values) => 
                value === values.password ? null : 'Passwords do not match',
            termsOfService: (value) => (value ? null : 'You must agree to the terms of service'),
        }, 
    });

    return (
        <>

            <Modal opened={signUpOpened} onClose={signUpOnClose} title="" size="auto" withCloseButton={false}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <div className='signup-modal'>
                        <Text fw={700} size="lg" className='mt-5'>Let’s get you started!</Text>

                        {/* <h5 className='fw-800'></h5> */}
                        <Fieldset legend="" variant="unstyled" >
                            <TextInput withAsterisk label="Full Name" placeholder="William John" color='red' className='my-2' key={form.key('fullName')}
                                {...form.getInputProps('fullName')} />

                            <TextInput label="Email" placeholder="abc@gmail.com" className='my-2'  key={form.key('email')}
                                {...form.getInputProps('email')} />
                            <TextInput label="Phone" placeholder="+1 342 456 7856" className='my-2' key={form.key('phone')}
                                {...form.getInputProps('phone')} />

                            <PasswordInput label="Password" placeholder='*********' classNames={classes} className='my-2' key={form.key('password')}
                                {...form.getInputProps('password')} />
                            <PasswordInput
                                label="Confirm Password"
                                description=""
                                placeholder="*********"
                                className='my-2'
                                classNames={classes}
                                key={form.key('confirmPassword')}
                                {...form.getInputProps('confirmPassword')}
                            />

                            <Checkbox
                                className='my-2'
                                size="sm"
                                color="red"

                                defaultChecked
                                label={<span>I agree with <b>Privacy Policy</b>  and <b>Term</b> and Conditions.</span>}
                            />

                        </Fieldset>

                        {/* <Text ta="right" className='mx-5' > forget password ?</Text> */}
                        <Group justify="flex-end" mt="md" className=''>
                            <Button variant="primary"  type="submit" fullWidth onClick={() => {
                                // setModalOpenedOtp(true)
                                // signUpOnClose(false)

                            }}>Submit</Button>
                        </Group>
                        <Text ta="center" className='my-4' > Already have an account ? <b className='primary cursor' onClick={() => {
                            setModalOpened(true)
                            signUpOnClose(false)
                        }}>Sign in</b>
                        </Text>

                    </div>
                </form>

            </Modal>

            <SignIn
                signOpen={modalOpened}
                signInClose={() => setModalOpened(false)}
            />

            <Otp
                otpOpen={modalOpenedOtp}
                otpClose={() => setModalOpenedOtp(false)}
            />
        </>
    );
}

export default SignUp;