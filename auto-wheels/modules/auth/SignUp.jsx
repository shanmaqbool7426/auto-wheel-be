import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, PasswordInput, Text, Checkbox } from '@mantine/core';
import { Fieldset, TextInput } from '@mantine/core';
import classes from '../../app/styles/Demo.module.scss';
import SignIn from './SignIn.jsx';
import { useState } from 'react';
import Otp from './Otp';

function SignUp({ signUpOpened, signUpOnClose }) {
    const [modalOpened, setModalOpened] = useState(false);
    const [modalOpenedOtp, setModalOpenedOtp] = useState(false);
    console.log('SignUp', signUpOpened)

    return (
        <>

            <Modal opened={signUpOpened} onClose={signUpOnClose} title="" size="auto" withCloseButton={false}>
                <div className='signup-modal'>
                    <Text fw={700} size="lg" className='mt-5'>Let’s get you started!</Text>

                    {/* <h5 className='fw-800'></h5> */}
                    <Fieldset legend="" variant="unstyled" >
                        <TextInput label="Full Name" placeholder="William John" color='red' className='my-2' />

                        <TextInput label="Email" placeholder="abc@gmail.com" className='my-2' />
                        <TextInput label="Phone" placeholder="+1 342 456 7856" className='my-2' />

                        <PasswordInput label="Password" placeholder='*********' classNames={classes} className='my-2' />
                        <PasswordInput
                            label="Confirm Password"
                            description=""
                            placeholder="*********"
                            className='my-2'
                            classNames={classes}
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
                        <Button variant="primary" fullWidth onClick={()=>{
                            setModalOpenedOtp(true)
                        signUpOnClose(false)

                        } }>Submit</Button>
                    </Group>
                    <Text ta="center" className='my-4' > Already have an account ? <b className='primary cursor' onClick={() => {
                        setModalOpened(true)
                        signUpOnClose(false)
                    }}>Sign in</b>
                    </Text>

                </div>


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