import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Label from "../label";

export default function EmailInput({
  type,
  label,
  name,
  values,
  setvalues,
  isRequired,
  isClicked,
  setmailValidationError,
  mailValidationError,
}) {
  const handleInputChange = (event) => {
    setvalues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (values[name]) {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[name])) {
        setmailValidationError(false);
      } else {
        setmailValidationError(true);
      }
    }
  }, [isClicked, values]);

  return (
    <div className="relative mt-1">
      <Label htmlFor="mobile" className="block text-sm font-medium text-gray-700 capitalize">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <input
        type={type}
        name={name}
        value={values[name]}
        onChange={(e) => handleInputChange(e)}
        className="theme-1 mt-1 mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
      />
      {isRequired && !values[name] && isClicked ? (
        <p className="text-red-500 text-sm capitalize">required field</p>
      ) : null}

      {mailValidationError && values[name] && isClicked ? (
        <p className="text-red-500 text-sm capitalize">Enter a valid email</p>
      ) : null}
    </div>
  );
}

EmailInput.defaultProps = {
  type: "",
  label: "",
  name: "",
  values: {},
  isRequired: false,
  isClicked: false,
  mailValidationError: true,
};

EmailInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.shape({ data: PropTypes.string }),
  setvalues: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  isClicked: PropTypes.bool,
  setmailValidationError: PropTypes.func.isRequired,
  mailValidationError: PropTypes.bool,
};
