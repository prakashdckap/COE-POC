import { useSelector } from "react-redux";

function useAgeValidParam() {
  const checkoutEmail = useSelector((state) => state.checkoutEmail);
  const customerDetails = useSelector((state) => state.customerDetails);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);

  // Age Verification Data formatting based on the condition
  const handleAgeVerificationData = (DOB, dobValues) => {
    const { firstName, lastName, city, postcode, region, street, telephone } =
      checkoutShippingAddress;

    if (!DOB) {
      const data = {
        user: "magento@elementvape.com",
        pass: "Terfi4!fh76gfjjfnl$fhyu",
        service: "AgeMatch5.0",
        rules: null,
        reference: checkoutEmail,
        target: {
          fn: firstName || customerDetails?.firstName,
          ln: lastName || customerDetails?.lastName,
          addr: street?.[0],
          city,
          state: region,
          zip: postcode,
          age: "21+",
          dob: "",
          ssn: "xxxx",
          phone: telephone,
          email: checkoutEmail,
          test_key: null,
        },
      };
      return data;
    }
    const data = {
      user: "magento@elementvape.com",
      pass: "Terfi4!fh76gfjjfnl$fhyu",
      service: "AgeMatch5.0",
      rules: null,
      reference: checkoutEmail,
      target: {
        fn: firstName || customerDetails?.firstName,
        ln: lastName || customerDetails?.lastName,
        addr: street[0],
        city,
        state: region,
        zip: postcode,
        age: "21+",
        dob: dobValues?.dob,
        ssn: dobValues?.ssn ? dobValues?.ssn : "",
        phone: telephone,
        email: checkoutEmail,
        test_key: null,
      },
    };

    return data;
  };

  return { handleAgeVerificationData };
}
export default useAgeValidParam;
