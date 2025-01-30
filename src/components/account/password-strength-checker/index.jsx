import React from "react";
import StrengthMeter from "./strength-meter";

function PasswordStrengthChecker({ passwordinput }) {
  const passwordValue = passwordinput;

  const poorRegExp = /[a-z]/;
  const weakRegExp = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*?[#?!@$%^&*-])(?=.{6,})"
  );
  const mediumRegExp = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*?[#?!@$%^&*-])(?=.{7,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*?[#?!@$%^&*-])(?=.{8,}))"
  );
  const strongRegExp = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*?[#?!@$%^&*-])(?=.{8,11})"
  );
  const veryStrongRegExp = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*?[#?!@$%^&*-])(?=.{11,})"
  );
  const whitespaceRegExp = /^$|\s+/;

  const poorPassword = poorRegExp.test(passwordValue);
  const weakPassword = weakRegExp.test(passwordValue);
  const mediumPassword = mediumRegExp.test(passwordValue);
  const strongPassword = strongRegExp.test(passwordValue);
  const veryStrongPassword = veryStrongRegExp.test(passwordValue);
  const whiteSpace = whitespaceRegExp.test(passwordValue);
  return (
    <div>
      <StrengthMeter
        poorPassword={poorPassword}
        weakPassword={weakPassword}
        mediumPassword={mediumPassword}
        strongPassword={strongPassword}
        passwordValue={passwordValue}
        veryStrongPassword={veryStrongPassword}
      />
    </div>
  );
}

export default PasswordStrengthChecker;
