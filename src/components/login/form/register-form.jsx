import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import style from "../style.module.scss";
import Label from "../../../theme-files/label";
import useRegister from "../../../helper/hooks/customer/use-register";
import LoadingSpinner from "../../../helper/loading-spinner";
import ImageTag from "../../../theme-files/image";
import TextInput from "../../../theme-files/text-input";
import SelectOption from "../../../theme-files/select-option";
import Paragraph from "../../../theme-files/paragraph";
import { AxiosGraphQL } from "../../../helper/axios";
import ReCAPTCHA from "react-google-recaptcha";
import constants from "../../../helper/constant";

export default function Register() {
  const [clicked, setclicked] = useState(false);
  const [isChecked, setisChecked] = useState({ terms: false, ageVerification: false });
  const [values, setvalues] = useState({});
  const { userRegistration, loading } = useRegister();
  const [dobValues, setdobValues] = useState({});
  const [dropdownSelectedData, setdropdownSelectedData] = useState({});
  const [daysArr, setdaysArr] = useState([]);
  const [errorText, seterrorText] = useState({ em: "", pd: "", cp: "", age: "" });
  const [reCAPTCHA, setReCAPTCHA] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const captchaRef = useRef();

  const months = [
    {
      name: "January",
      code: "JAN",
      id: "01",
    },
    {
      name: "February",
      code: "FEB",
      id: "02",
    },
    {
      name: "March",
      code: "MAR",
      id: "03",
    },
    {
      name: "April",
      code: "APR",
      id: "04",
    },
    {
      name: "May",
      code: "MAY",
      id: "05",
    },
    {
      name: "June",
      code: "JUN",
      id: "06",
    },
    {
      name: "July",
      code: "JUL",
      id: "07",
    },
    {
      name: "August",
      code: "AUG",
      id: "08",
    },
    {
      name: "September",
      code: "SEP",
      id: "09",
    },
    {
      name: "October",
      code: "OCT",
      id: "10",
    },
    {
      name: "November",
      code: "NOV",
      id: "11",
    },
    {
      name: "December",
      code: "DEC",
      id: "12",
    },
  ];

  // set ReCAPTCHA value
  const verify = (value) => {
    setReCAPTCHA(value);
    if (value) setCaptchaError(false);
  };

  // Get List of Years
  const singleYear = new Date().getFullYear();
  const yearList = Array.from(new Array(100), (val, index) => ({
    year: singleYear - (18 + index),
  }));

  // To get array of days
  const handleDays = (startDate, endDate) => {
    setdaysArr(
      Array(endDate - startDate + 1)
        .fill()
        .map((_, idx) =>
          (startDate + idx)?.toString().length === 1
            ? { day: `0${(startDate + idx)?.toString()}` }
            : { day: (startDate + idx)?.toString() }
        )
    );
  };

  // To check how many days are there in a month
  useEffect(() => {
    const year = dropdownSelectedData?.year?.year;
    const month = dropdownSelectedData?.month?.id;

    let noOfDays = 0;

    if (month?.toString() === "02") {
      if (year % 4 === 0) {
        noOfDays = 29;
      } else {
        noOfDays = 28;
      }
    } else if (month?.toString() === "07" || month?.toString() === "08") {
      noOfDays = 31;
    } else if (
      month?.toString() === "04" ||
      month?.toString() === "06" ||
      month?.toString() === "09" ||
      month?.toString() === "11"
    ) {
      noOfDays = 30;
    } else {
      noOfDays = 31;
    }
    if (noOfDays) handleDays(1, noOfDays);
  }, [dropdownSelectedData?.year, dropdownSelectedData?.month]);

  // // Setting the input data inside dob object and passing it to the parent component
  useEffect(() => {
    const { year, month, day } = dropdownSelectedData;
    if (year?.year && month?.id && day?.day) {
      setdobValues({
        dob: year.year.toString() + month?.id?.toString() + day?.day?.toString(),
        ssn: values.ssn,
      });
    } else {
      setdobValues({ ...dobValues, dob: null });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownSelectedData, values]);

  // email validation
  const validateEmail = async () => {
    const { email } = values;
    const mail = email?.replace(/ /g, "")?.split(",")[0]; // Extract the first email if multiple are entered
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i;

    if (emailRegex.test(mail)) {
      seterrorText({ ...errorText, em: "" });

      // Meganto validation
      try {
        const response = await AxiosGraphQL("email-verification", {
          email,
        });
        if (response?.data?.checkEmailExists?.exists) {
          seterrorText({
            ...errorText,
            em: (errorText.em =
              response?.data?.checkEmailExists?.message ||
              "That email is already taken, try another one."),
          });
          return false;
        }
        seterrorText({ ...errorText, em: (errorText.em = "") });
        return true;
      } catch (error) {
        console.error("Error in handleAllow:", error);
      }
    } else {
      seterrorText({
        ...errorText,
        em: (errorText.em = "Please enter a valid email address (Ex: johndoe@domain.com)."),
      });
      return false;
    }
  };

  // Password validation
  const validatePassword = () => {
    const { password } = values;

    if (password?.length < 7) {
      seterrorText({
        ...errorText,
        pd: (errorText.pd =
          "Minimum length of this field must be equal or greater than 6 symbols. Leading and trailing spaces will be ignored."),
      });
    } else if (
      !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?~`=+-/.:;"'_|<>)}{(\[\]])[a-zA-Z0-9!@#$%^&*?~`=+-/.:;"'_|<>)}{(\[\]]{6,}$/.test(
        password
      )
    ) {
      seterrorText({
        ...errorText,
        pd: (errorText.pd =
          "Minimum of different classes of characters in password is 4. Classes of characters: Lower Case, Upper Case, Digits, Special Characters"),
      });
    } else {
      seterrorText({ ...errorText, pd: (errorText.pd = "") });
      return true;
    }
    return false;
  };

  // checking whether applied password and confirm password are matching
  const validateConfirmPassword = () => {
    const { password, confirmPassword } = values;
    if (password === confirmPassword) {
      seterrorText({ ...errorText, cp: (errorText.cp = "") });
      return true;
    }
    seterrorText({ ...errorText, cp: (errorText.cp = "Password doesn't match") });
    return false;
  };

  // checking whether name only have empty string of not
  const validatedNames = () => {
    try {
      const { firstName, lastName } = values;
      const obj = { ...values };
      const name1 = firstName?.replaceAll(" ", "");
      const name2 = lastName?.replaceAll(" ", "");
      if (!name1 || !name2) {
        if (!name1) {
          obj.firstName = "";
        }
        if (!name2) {
          obj.lastName = "";
        }
        setvalues(obj);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  // age validation
  const validateAge = () => {
    const { day, month, year } = dropdownSelectedData;
    if (day?.day && month?.id && year?.year) {
      const currentDate = new Date();
      const dateOfBirth = new Date(`${month.id}/${day.day}/${year.year}`);
      const ageDiffMs = currentDate - dateOfBirth;

      // Calculate the age in years.
      const ageInYears = ageDiffMs / (1000 * 60 * 60 * 24 * 365.25);
      if (ageInYears < 18) {
        seterrorText({ ...errorText, age: "You need to be 18 or over to use this website." });
        return false;
      }
      seterrorText({ ...errorText, age: "" });
      return true;
    }
    return false;
  };

  // ReCAPTCHA validate
  const validateRecaptcha = () => {
    if (!reCAPTCHA) {
      setCaptchaError(true);
      return false;
    } else {
      setCaptchaError(false);
      return true;
    }
  };
  async function handleFormSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = values;
    const { day, month, year } = dropdownSelectedData;
    const { terms, ageVerification } = isChecked;
    const isValidEmail = await validateEmail();
    if (password) {
      validatePassword();
    }
    validateRecaptcha();
    if (isValidEmail) {
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        confirmPassword &&
        day &&
        month &&
        year &&
        terms &&
        ageVerification &&
        validatedNames() &&
        validateAge() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateRecaptcha()
      ) {
        const data = {
          email,
          firstName,
          lastName,
          password,
          date_of_birth: `${month?.id}/${day?.day}/${year?.year}`,
        };
        userRegistration(e, data);
      }
    }
  }

  useEffect(() => {
    if (clicked) {
      validateEmail();
      validatePassword();
      validateConfirmPassword();
      validateAge();
    }
  }, [values?.email, values?.password, values?.confirmPassword]);

  useEffect(() => {
    if (values.email) {
      validateEmail();
    }
  }, [values.email]);

  useEffect(() => {
    const { day, month, year } = dropdownSelectedData;
    if (day && month && year) {
      validateAge();
    }
  }, [dropdownSelectedData]);

  return (
    <>
      <div className="mx-auto w-full lg:w-full  md:px-7 md:pt-8 md:pb-20 md:border login-page">
        <h2 className="text-[18px] text-skin-base font-semibold mb-10">CREATE ACCOUNT</h2>

        <div className={style.account_feature_container}>
          <div className={style.account_features}>
            <div className="relative mb-2">
              <ImageTag src="/icons/heart.svg" height={20} width={20} />
            </div>
            <p>Save your favorites</p>
          </div>
          <div className={style.account_features}>
            <div className="relative mb-2">
              <ImageTag src="/icons/gem.svg" height={20} width={20} />
            </div>
            <p>Learn about EV Rewards</p>
          </div>
          <div className={style.account_features}>
            <div className="relative mb-2">
              <ImageTag src="/icons/truck.svg" height={20} width={20} />
            </div>
            <p>Easily track orders</p>
          </div>
        </div>

        <div className="mt-3 mb-3">
          <small className="font-semibold font-[13px]">
            Please enter your full legal name as it appears on your government-issued ID.
          </small>
        </div>

        <div className="mt-5">
          <div>
            <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-6">
              <TextInput
                name="firstName"
                label="First Name"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />

              <TextInput
                name="lastName"
                label="Last Name"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />

              <TextInput
                id="email"
                name="email"
                label="Email Address"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
              {values?.email && errorText.em ? (
                <span className="text-[#e02b27] text-sm mt-1">{errorText.em}</span>
              ) : null}

              <TextInput
                type="password"
                id="password"
                name="password"
                label="Create Password"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
              {values?.password && errorText.pd ? (
                <span className="text-[#e02b27] text-[13px] mt-1">{errorText.pd}</span>
              ) : null}

              <TextInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                values={values}
                setvalues={setvalues}
                isRequired
                isClicked={clicked}
              />
              {values?.confirmPassword && errorText.cp ? (
                <span className="text-[#e02b27] text-[13px] mt-1">{errorText.cp}</span>
              ) : null}

              <div className="flex">
                <p className="block text-[12px] font-semibold text-skin-base">Date of Birth</p>
                <span className="text-[#e02b27] ml-1"> *</span>
              </div>

              <div
                className={`grid grid-cols-3  ${style.DateOfBirthGrid}`}
                style={{ marginTop: "-7px", marginBottom: "15px", alignItems: "flex-start" }}
              >
                <SelectOption
                  data={months}
                  placeholder="MM"
                  displayKey="id"
                  setdropdownSelectedData={setdropdownSelectedData}
                  dropdownSelectedData={dropdownSelectedData}
                  name="month"
                  isRequired
                  isClicked={clicked}
                />
                <div>
                  <SelectOption
                    data={daysArr}
                    displayKey="day"
                    placeholder="DD"
                    setdropdownSelectedData={setdropdownSelectedData}
                    dropdownSelectedData={dropdownSelectedData}
                    name="day"
                    isRequired
                    isClicked={clicked}
                  />
                  {dropdownSelectedData?.year?.year &&
                  dropdownSelectedData?.month?.id &&
                  dropdownSelectedData?.day?.day &&
                  errorText.age ? (
                    <span className="text-[#e02b27] text-[13px] mt-1">{errorText.age}</span>
                  ) : null}
                </div>
                <SelectOption
                  data={yearList}
                  displayKey="year"
                  placeholder="YYYY"
                  setdropdownSelectedData={setdropdownSelectedData}
                  dropdownSelectedData={dropdownSelectedData}
                  name="year"
                  isRequired
                  isClicked={clicked}
                />
              </div>

              <small className="text-[13px] italic text-skin-base font-normal">
                You need to be 21 and over to use this website in the U.S.
              </small>

              <div className="mb-[10px]">
                {/* <label className="containercheckbox">
                  <input
                    id="aggreement"
                    name="aggreement"
                    type="checkbox"
                    className="h-4 w-4 border-[#979797]"
                    onClick={() => setisChecked({ ...isChecked, terms: !isChecked.terms })}
                    checked={isChecked.terms}
                  />
                  <span className="checkbox-checkmark rounded-sm" />
                </label> */}
                <Label
                  htmlFor="aggreement"
                  className="flex flex-wrap whitespace-pre  text-xs text-[#454545] font-normal"
                >
                  <label className="containercheckbox">
                    <input
                      id="aggreement"
                      name="aggreement"
                      type="checkbox"
                      className="h-4 w-4 border-[#979797]"
                      onClick={() => setisChecked({ ...isChecked, terms: !isChecked.terms })}
                      checked={isChecked.terms}
                      tabIndex="-1"
                      role="checkbox"
                    />
                    <span
                      className="checkbox-checkmark rounded-sm"
                      tabIndex="0"
                      role="checkbox"
                      aria-checked={isChecked.terms}
                      aria-label="I read and agree to Terms and Conditions and Privacy Policy"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setisChecked({ ...isChecked, terms: !isChecked.terms });
                          e.preventDefault();
                        }
                      }}
                    />
                  </label>
                  I read and agree to{" "}
                  <Link href="/terms-and-conditions">
                    <a className="text-skin-secondary font-medium whitespace-pre text-[13px] focus:font-normal focus:underline text">
                      Terms and Conditions
                    </a>
                  </Link>
                  <span className="px-1">and</span>
                  <Link href="/privacy-policy">
                    <a className="text-skin-secondary font-medium whitespace-pre text-[13px] focus:font-normal focus:underline">
                      Privacy Policy
                    </a>
                  </Link>
                </Label>
              </div>

              {clicked && !isChecked.terms ? (
                <Paragraph
                  className="text-red-500 error-msg text-[10px] font-medium capitalize"
                  style={{ marginTop: "2px" }}
                >
                  required field
                </Paragraph>
              ) : null}

              {/* <div className="flex">
                <label className="containercheckbox">
                  <input
                    id="certify"
                    name="certify"
                    type="checkbox"
                    className="h-4 w-4  border-[#979797]"
                    onChange={() =>
                      setisChecked({ ...isChecked, ageVerification: !isChecked.ageVerification })
                    }
                    checked={isChecked.ageVerification}
                  />
                  <span className="checkbox-checkmark rounded-sm" />
                </label>
                <label
                  htmlFor="certify"
                  className="block text-xs text-[#454545] leading-5 font-normal -mt-[5px]"
                >
                  I certify that I am a tobacco/vapor consumer 21 years of age or older and want to
                  receive premiums, offers, coupons, and information from Element Vape and/or their
                  affiliates.
                </label>
              </div> */}

              <div className="">
                <label
                  htmlFor="certify"
                  className="block text-xs text-[#454545] leading-5 font-normal -mt-[5px]"
                >
                  <label className="containercheckbox">
                    <input
                      id="certify"
                      name="certify"
                      type="checkbox"
                      className="h-4 w-4  border-[#979797]"
                      onChange={() =>
                        setisChecked({ ...isChecked, ageVerification: !isChecked.ageVerification })
                      }
                      checked={isChecked.ageVerification}
                      tabIndex="-1"
                      role="checkbox"
                    />
                    <span
                      className="checkbox-checkmark rounded-sm"
                      tabIndex="0"
                      role="checkbox"
                      aria-checked={isChecked.ageVerification}
                      aria-label=" I certify that I am a tobacco/vapor consumer 21 years of age or older and want to
                  receive premiums, offers, coupons, and information from Element Vape and/or their
                  affiliates"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setisChecked({
                            ...isChecked,
                            ageVerification: !isChecked.ageVerification,
                          });
                          e.preventDefault();
                        }
                      }}
                    />
                  </label>
                  I certify that I am a tobacco/vapor consumer 21 years of age or older and want to
                  receive premiums, offers, coupons, and information from Element Vape and/or their
                  affiliates.
                </label>
              </div>

              {clicked && !isChecked.ageVerification ? (
                <Paragraph
                  className="text-red-500 error-msg text-[10px] font-medium capitalize"
                  style={{ marginTop: "2px" }}
                >
                  required field
                </Paragraph>
              ) : null}

              <div className="">
                <ReCAPTCHA
                  sitekey={constants.RECAPTCHA_KEY}
                  ref={captchaRef}
                  onChange={verify}
                  isolated
                />
                {captchaError && (
                  <span className="text-red-500 error-msg text-[10px] font-medium capitalize">
                    Required Field
                  </span>
                )}
              </div>

              <button
                onClick={() => setclicked(true)}
                type="submit"
                className="inline-flex mt-10 items-center px-10 py-2 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-white bg-skin-secondary hover:bg-black uppercase text-sm font-medium"
              >
                {clicked && loading ? <LoadingSpinner message="loading" /> : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}