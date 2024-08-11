export const validateSignUpForm = {
    fullName: (value) => (value.trim() ? null : 'Full name is required'),
    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    phone: (value) => (value.trim() ? null : 'Phone number is required'),
    password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters long'),
    confirmPassword: (value, values) => (value === values.password ? null : 'Passwords do not match'),
  };
  