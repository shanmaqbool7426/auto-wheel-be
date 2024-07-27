import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, PasswordInput, Text, PinInput, Center } from '@mantine/core';
import { Fieldset, TextInput } from '@mantine/core';
import classes from '../../app/styles/Demo.module.scss';

function Otp() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={true} onClose={close} title="">
                <h5>Forgot Password!!</h5>
                <Text ta="center">If you've forgotten your account password, Enter your email below and we will send you an email with instructions to reset your account.</Text>
                <Center maw={400} h={100} >
                <PinInput placeholder="" />
                </Center>


                <Group justify="flex-end" mt="md" className='mx-5 my-5'>
                    <Button variant="primary" color="red" fullWidth>Submit</Button>
                </Group>
            </Modal>

        </>
    );
}

export default Otp;