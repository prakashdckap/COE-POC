import React, { useEffect, useState } from "react";

export default function PasswordStrengthBar({ password }) {
  const [percentage, setPercentage] = useState(20);
  const [color, setColor] = useState("#9f0103");
  const [text, setText] = useState("No Password");
  const strongPassword = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
  const mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  const strengthChecker = (PasswordParameter) => {
    if (PasswordParameter) {
      if (strongPassword.test(PasswordParameter)) {
        setPercentage(100);
        setColor("#3fc317");
        setText("Strong");
      } else if (mediumPassword.test(PasswordParameter)) {
        setPercentage(60);
        setColor("#b38f00");
        setText("medium");
      } else {
        setPercentage(20);
        setColor("#9f0103");
        setText("week");
      }
    } else {
      setPercentage(18);
      setColor("#545454");
      setText("No Password");
    }
  };

  useEffect(() => {
    strengthChecker(password);
  }, [password]);

  return (
    <div>
      <div className="h-5 w-full bg-[#ccc] rounded mt-2 overflow-hidden">
        <div
          className={`h-full w-[${percentage}%] bg-[${color}] rounded-l text-xs text-skin-inverted text-center flex items-center justify-center transition-all duration-300`}
        >
          {text}
        </div>
      </div>
      {/* <span className="text-[13px] text-[#e02b27] mt-[17px] block">
        Minimum of different classes of characters in password is 4. Classes of characters: Lower
        Case, Upper Case, Digits, Special Characters.
      </span> */}
    </div>
  );
}
