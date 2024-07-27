import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, PasswordInput, Text, Checkbox } from '@mantine/core';
import { Fieldset, TextInput } from '@mantine/core';
import classes from '../../app/styles/Demo.module.scss';

function SignUp() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={true} onClose={close} title="">
                <h5>Let’s get you started!</h5>
                <Fieldset legend="" variant="unstyled" className='mx-5'>
                    <TextInput label="Full Name" placeholder=" " className='my-3' classNames={classes} />

                    <TextInput label="Email" placeholder=" " className='my-3' classNames={classes} />
                    <TextInput label="Phone" placeholder=" " className='my-3' classNames={classes} />

                    <PasswordInput label="Password" placeholder='' className='my-3'  />
                    <PasswordInput
                        label="Confirm Password"
                        description=""
                        placeholder=""
                        className='my-3'
                    />

                    <Checkbox
                    className='my-3'
                        defaultChecked
                        label="I agree with Privacy Policy and Terms and Conditions."
                    />

                </Fieldset>

                <Text ta="right" className='mx-5' > forget password ?</Text>
                <Group justify="flex-end" mt="md" className='mx-5 my-5'>
                    <Button variant="primary" color="red" fullWidth>Submit</Button>
                </Group>
                <Text ta="center" className='' > Don't have an account ? <b>Sign up</b>
                </Text>

            </Modal>

        </>
    );
}

export default SignUp;