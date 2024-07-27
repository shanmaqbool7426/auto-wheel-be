import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, PasswordInput, Text } from '@mantine/core';
import { Fieldset, TextInput } from '@mantine/core';
import classes from '../../app/styles/Demo.module.scss';

function SignIn() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={true} onClose={close} title="">
                <h5>Let’s get you started!</h5>
                <Fieldset legend="" variant="unstyled" className='mx-5'>
                    <TextInput label="Email" placeholder="Enter email" className='my-3'         classNames={classes}
                    />
                    <PasswordInput label="Password" placeholder='Enter password'/>
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

export default SignIn;