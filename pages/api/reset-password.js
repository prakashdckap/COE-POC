import axios from "axios";
import Constant from "./helper/constant";

export default function ResetPassword(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "resetPassword",
      query: `mutation ResetPassword($email:String!, $resetPasswordToken: String!, $newPassword:String!) { 
            resetPassword(email:$email, resetPasswordToken: $resetPasswordToken, newPassword: $newPassword)
            }`,
      variables: {
        email: req.body.email,
        resetPasswordToken: req.body.resetPasswordToken,
        newPassword: req.body.newPassword,
      },
    };

    axios
      .post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
        "content-type": "application/json",
      })
      .then((response) => {
        if (response?.data) {
          res.status(200).json(response.data);
        } else if (response?.data?.errors) {
          res.status(200).json({ error: response.data.errors });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
