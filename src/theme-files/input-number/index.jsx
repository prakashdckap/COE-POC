import React, { useState } from "react";
import PropTypes from "prop-types";
import constants from "../../helper/constant";
import style from "./style.module.scss";

const { theme, HEADLESS_SOLUTION_THEME } = constants;

export default function InputNumber({ type, themeName, className, name, required, ...props }) {

  const [ isNumberValid, setIsNumberValid ] = useState("");

  function handleChange(e)  {
    e.preventDefault();
    setIsNumberValid("");
    const regex = /^\d+$/;
    const InputValue = e.target.value;

    if(required !== false)
    {
      if((InputValue).length === 0)
      {
        setIsNumberValid("This input is mandatory");
        return false;
      }
    }
    
    if(regex.test(InputValue) === false){
      if((InputValue).length > 0)
      {
        setIsNumberValid("Input is not valid");
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <input
          {...props}
          type="text"
          className={`${themeName || theme[type]} ${className || ""}`}
          name={ name }
          onKeyUp={handleChange}
      />
      <span className={(isNumberValid !== "" ? style.emailError : "hide")}>{ isNumberValid }</span>
    </>
  );

}

InputNumber.propTypes = {
  name: PropTypes.string,
  type: PropTypes.number,
  themeName: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.string
};

InputNumber.defaultProps = {
  type: HEADLESS_SOLUTION_THEME,
  themeName: theme[HEADLESS_SOLUTION_THEME],
  className: "",
  name: "number",
  required: false
};