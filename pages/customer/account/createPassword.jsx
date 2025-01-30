import React from "react";
import Createpassword from "../../../src/components/create-password";
import SEOHead from "../../../src/helper/SEOHeader";

export default function password() {
  return (
    <>
      <SEOHead title="Change Password" />
      <Createpassword />
    </>
  );
}
