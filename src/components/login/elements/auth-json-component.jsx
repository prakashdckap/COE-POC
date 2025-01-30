import React from "react";
import Login from "../form/login-form";
import Register from "../form/register-form";

const Components = {
  login: Login,
  createAccount: Register,
};

function AuthJsonComponent(block) {
  const { component, id } = block;
  if (typeof Components[component] !== "undefined") {
    return React.createElement(Components[component], {
      key: id,
    });
  }
  return React.createElement(() => <>{component}</>, { key: id });
}

export default AuthJsonComponent;
