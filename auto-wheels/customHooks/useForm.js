// useForm.js
import { useState } from 'react';
import { submitFormData } from '@/services/forms';

export function useFormSubmission(url, initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setError('Validation error');
        console.error(validationErrors);
        return;
      }

      const data = await submitFormData(url, values);
      console.log(data); // Handle the response data if necessary
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { values, isLoading, error, handleChange, handleSubmit };
}
