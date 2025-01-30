import React, { useEffect, useState } from "react";

export default function StrengthMeter({
  poorPassword,
  weakPassword,
  mediumPassword,
  strongPassword,
  veryStrongPassword,
  passwordValue,
}) {
  const [percentage, setPercentage] = useState(20);
  const [color, setColor] = useState("#959292");
  const [text, setText] = useState("No Password");

  const strengthChecker = (PasswordParameter) => {
    if (PasswordParameter) {
      if (veryStrongPassword) {
        setPercentage(100);
        setColor("#5cb85c");
        setText("Very Strong");
      } else if (strongPassword) {
        setPercentage(75);
        setColor("#337ab7");
        setText("Strong");
      } else if (mediumPassword) {
        setPercentage(50);
        setColor("#f0ad4e");
        setText("Medium");
      } else if (poorPassword || weakPassword) {
        setPercentage(25);
        setColor("#d9534f");
        setText("Weak");
      }
    } else {
      setPercentage(20);
      setColor("#959292");
      setText("No Password");
    }
  };

  useEffect(() => {
    strengthChecker(passwordValue);
  }, [passwordValue]);

  return (
    <div className="mt-5">
      <div className="w-full h-5 bg-[#f5f5f5] rounded-[4px] box-shadow-main overflow-hidden my-[10px]">
        <div
          className={`h-full flex items-center justify-center w-[${percentage}%] float-left transition-1 background-image-1 box-shadow-1 animation-1 back background-size-1 px-[5px]`}
          style={{ backgroundColor: color }}
        >
          <span className="text-xs leading-[20px] text-center text-[#fff] px-[9px]">{text}</span>
        </div>
      </div>
    </div>
  );
}
