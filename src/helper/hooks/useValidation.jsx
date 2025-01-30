export default async function validate (values, valueTypes, valueRequired) {
  
  const errors = {};
  await Object.entries(values).map(([key,value]) => {

    // Email validations
    if (valueTypes[key] === 'email') 
    {
      if(value.length > 0)
      {
        if (!/\S+@\S+\.\S+/.test(value)) 
        {
          errors[key] = 'Email address is invalid';
        }
      }
      else if(valueRequired[key] !== null && valueRequired[key] !== false)
      {
        errors[key] = 'Email address is required'; 
      }
    } 

    // Password validations
    if (valueTypes[key] === 'password') 
    {
      if(value.length > 0)
      {
        if (value.length < 8) 
        errors[key] = 'Password must be 8 or more characters'; 
      }
      else if(valueRequired[key] !== null && valueRequired[key] !== false)
      {
        errors[key] = 'Password is required';
      }
    } 

    // Text validations
    if (valueTypes[key] === 'text') 
    {
      if (value.length > 0)
      {
        if (value.length < 3)
        errors[key] = 'Input must be 3 or more characters';
      }
      else if(valueRequired[key] !== null && valueRequired[key] !== false)
      {
        errors[key] = 'Input is required';  
      } 
    } 

    // Number validations
    if (valueTypes[key] === 'number') 
    {
      if (value.length > 0)
      {
        if (/^\d+$/.test(value)) 
        {
          errors[key] = 'Input is invalid';
        }
      } 
      else if(valueRequired[key] !== null && valueRequired[key] !== false)
      {
        errors[key] = 'Input is required'; 
      }
    } 
    return false
  });

  return errors
};