import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_AGE_VERIFICATION_DETAILS } from "../../redux/actions";

export default function useAgeVerification(setdisplaySecondLevelVerification) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [ageVerificationResponse, setageVerificationResponse] = useState([]);
  const handleAgeVerification = (data) => {
    setloading(true);
    axios
      .post("/api/age-verification", data)
      .then((response) => {
        if (!response?.errors?.length) {
          if (data?.target?.dob) setdisplaySecondLevelVerification(true);
          setageVerificationResponse(response);
          dispatch(SET_AGE_VERIFICATION_DETAILS(response?.data));
          setloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  return { handleAgeVerification, ageVerificationResponse, loading };
}
