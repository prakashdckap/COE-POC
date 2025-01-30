import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  
  const [values, setValues] = useState({});
  const [valueTypes, setValueTypes] = useState({});
  const [valueRequired, setValueRequired] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for(const [key, value] of data.entries())
    {
      setValues(values => ({ ...values, [key]: value }));
      setValueTypes(valueTypes => ({ ...valueTypes, [key]: event.target[key].getAttribute('type') }));
      setValueRequired(valueRequired => ({ ...valueRequired, [key]: event.target[key].getAttribute('required') }));
    }
    console.log(values)

    const validateResult = validate(values, valueTypes, valueRequired);
    validateResult.then(function(result) {
      setErrors(result);
   })
    
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setValueTypes(valueTypes => ({ ...valueTypes, [event.target.name]: event.target.getAttribute('type') }));
    setValueRequired(valueRequired => ({ ...valueRequired, [event.target.name]: event.target.getAttribute('required') }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default useForm;