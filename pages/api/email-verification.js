import axios from "axios";
import Constant from "./helper/constant";

export default async function CheckEmailExists(req, res) {
    if (req.method === "POST") {
      if (req.body) {
        const { email } = req.body;
  
        const graphqlQuery = {
          operationName: "checkEmailExists",
          query: `mutation checkEmailExists($email: String!) {
            checkEmailExists(email: $email) {
              exists
              message
            }
          }`,
          variables: {
            email,
          },
        };
  
        try {
          const response = await axios.post(
            Constant.magentoGraphQLEndpoint,
            graphqlQuery,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          return res.status(200).json(response.data);
        } catch (err) {
          console.error("GraphQL request error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
      } else {
        return res.status(400).json({ error: "Request body is missing" });
      }
    }
  }
  