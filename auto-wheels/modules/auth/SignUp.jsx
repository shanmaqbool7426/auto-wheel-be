import {
  Modal,
  Button,
  PasswordInput,
  Text,
  Checkbox,
  TextInput,
  Title,
  Notification,
  CloseIcon,
  ActionIcon,
  CloseButton,
  Group,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import Otp from "./Otp";
import { useFormSubmission } from "@/custom-hooks/useForm";
import { validateSignUpForm } from "@/utils/validation";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { IconInfoCircle } from "@tabler/icons-react";

function SignUp({ signUpOpened, signUpOnClose }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [modalOpenedOtp, setModalOpenedOtp] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUpForm,
  });

  const {
    isLoading,
    error,
    handleSubmit,
    data = {},
  } = useFormSubmission(API_ENDPOINTS.SIGNUP, form.values, form.validate);

  useEffect(() => {
    if (data && data?.success) {
      console.log(">> >>>", data.success);
      setModalOpenedOtp(true);
      signUpOnClose();
    }
  }, [data]);

  console.log("modalOpenedOtp", modalOpenedOtp);
  return (
    <>
      <Modal
        opened={signUpOpened}
        onClose={signUpOnClose}
        withCloseButton={false}
        padding="xl"
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Group justify="space-between" align="center" mb="md">
            <Title order={4} tt="uppercase">
              Let’s get you started!
            </Title>
            <CloseButton onClick={signUpOnClose} ml="auto" />
          </Group>
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="William John"
            mb="md"
            key={form.key("fullName")}
            {...form.getInputProps("fullName")}
            error={form.errors.fullName && form.errors.fullName}
          />
          <TextInput
            label="Email"
            placeholder="abc@gmail.com"
            mb="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
            error={form.errors.email && form.errors.email}
          />
          <TextInput
            label="Phone"
            placeholder="+1 342 456 7856"
            mb="md"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
            error={form.errors.phone && form.errors.phone}
          />
          <PasswordInput
            label="Password"
            placeholder="*********"
            mb="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
            error={form.errors.password && form.errors.password}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="*********"
            mb="md"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
            error={form.errors.confirmPassword && form.errors.confirmPassword}
          />
          <Checkbox
            mb="md"
            size="sm"
            label={
              <>
                I agree with <b>Privacy Policy</b> and <b>Term</b> and
                Conditions.
              </>
            }
          />
          {error && (
            <Alert
              mb="md"
              variant="light"
              color="red"
              withCloseButton
              title={error && error}
              icon={<IconInfoCircle />}
            />
          )}

          {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
          <Button
            type="submit"
            fullWidth
            ff="heading"
            tt="uppercase"
            fw={500}
            size="md"
            mb="md"
            color="#E90808"
            loading={isLoading}
          >
            Submit
            {/* {isLoading ? "Loading..." : "Submit"} */}
          </Button>
          <Text ta="center">
            Already have an account?{" "}
            <b
              className="primary cursor"
              onClick={() => {
                setModalOpened(true);
                signUpOnClose();
              }}
            >
              Sign in
            </b>
          </Text>
        </form>
      </Modal>
      <SignIn
        signOpen={modalOpened}
        signInClose={() => setModalOpened(false)}
      />
      <Otp otpOpen={modalOpenedOtp} otpClose={() => setModalOpenedOtp(false)} />
    </>
  );
}

export default SignUp;
