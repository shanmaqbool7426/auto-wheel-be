import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import { Fieldset, TextInput } from "@mantine/core";
import classes from "../../app/styles/Demo.module.scss";

function SignIn({ signOpen, signInClose }) {
  return (
    <>
      <Modal
        opened={signOpen}
        onClose={signInClose}
        withCloseButton={false}
        padding="xl"
      >
        <Title order={4} tt="uppercase">
          Let’s get you started!
        </Title>
        <TextInput
          label="Email"
          placeholder="Enter email"
          className="my-3"
          classNames={classes}
        />
        <PasswordInput label="Password" placeholder="Enter password" />

        <Text ta="right" c="dimmed" size="sm" mt="xs" className="cursor">
          Forgot Password?
        </Text>
        <Button
          tt="uppercase"
          fw={600}
          size="md"
          fullWidth
          color="#E90808"
          autoContrast
          my="md"
          ff="heading"
        >
          Sign In
        </Button>
        <Text ta="center">
          Don't have an account?{" "}
          <Text span inherit className="text-primary" fw={600}>
            Sign up
          </Text>
        </Text>
      </Modal>
    </>
  );
}

export default SignIn;
