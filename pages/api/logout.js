/* eslint-disable camelcase */
import axios from "axios";
import Constant from "./helper/constant";

export default async function logout(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "revokeCustomerToken",
      query: `mutation {
                revokeCustomerToken {
                    result
                }
            }`,
      variables: {},
    };

    try {
      const response = await axios.post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
        "content-type": "application/json",
        headers: {
          Authorization: req.headers.authorization,
        },
      });
      return res.status(200).json(response.data);
    } catch (err) {
      console.error("GraphQL request error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ error: "Request body is missing" });
  }
}
