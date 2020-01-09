import { useEffect, useRef, useState } from "react";
import { isEmpty, isNil } from "lodash";

export const useForm = ({ defaultInputs, onSubmit, validation }) => {
  const [inputs, setInputs] = useState(defaultInputs || {});
  const [errors, setErrors] = useState({});

  const fieldsModified = useRef(defaultInputs || {});
  const formSubmitted = useRef(false);

  const [checkValidation, setCheckValidation] = useState(false);

  const handleChange = event => {
    event.persist();

    const updatedInputs = {
      ...inputs,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    };

    fieldsModified.current[event.target.name] = true;

    setInputs(updatedInputs);
  };

  const validateInputs = () => {
    const validationErrors = {};

    for (const fieldName in validation) {
      // Don't run validation on an un-modified form field unless it's on form submission
      if (!fieldsModified.current[fieldName] && !formSubmitted.current) {
        continue;
      }

      const validationFunc = validation[fieldName];
      const isValid =
        !isNil(inputs[fieldName]) && validationFunc(inputs[fieldName]);

      if (!isValid) {
        validationErrors[fieldName] = true;
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length > 0;
  };

  const handleSubmit = () => {
    formSubmitted.current = true;

    let hasErrors = false;
    if (validation && !isEmpty(inputs)) {
      hasErrors = validateInputs();
      if (hasErrors) {
        return;
      }
    }

    onSubmit(inputs);
  };

  const reset = resetValue => {
    setInputs(resetValue);
  };
  // eslint-disable-next-line
  useEffect(() => {
    if (validation && !isEmpty(inputs) && checkValidation) {
      validateInputs();
      setCheckValidation(false);
    }
  });

  return {
    errors,
    handleChange,
    handleSubmit,
    inputs,
    reset
  };
};
