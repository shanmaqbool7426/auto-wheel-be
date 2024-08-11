import { useState } from 'react';
import { submitFormData } from '@/services/forms';

export function useFormSubmission(url, formValues, validate) {
  const [values, setValues] = useState(formValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({})
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
      const validationErrors = validate(formValues);
      if (validationErrors.hasErrors && Object.keys(validationErrors).length > 0) {
        setError('Validation error');
        console.error(validationErrors);
        return;
      }

      const data = await submitFormData(url, formValues);
      setData(data)
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { values, isLoading, error, handleChange, handleSubmit,data };
}
