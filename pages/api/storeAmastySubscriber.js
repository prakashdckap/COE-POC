/* eslint-disable camelcase */
import axios from "axios";
import Constant from "./helper/constant";

export default async function storeAmastySubscriber(req, res) {
  if (req.method === "POST") {
    if (req.body) {
      const { allow, token, source, visitor_id, customer_id } = req.body;

      const graphqlQuery = {
        operationName: "storeAmastySubscriber",
        query: `mutation storeAmastySubscriber($allow: Boolean!, $token: String!, $source: String!, $visitor_id:Int!, $customer_id: String) {
          storeAmastySubscriber(allow: $allow, token: $token, source: $source, visitor_id: $visitor_id, customer_id: $customer_id) {
            success
            message
          }
        }`,
        variables: {
          allow,
          token,
          source,
          visitor_id,
          customer_id,
        },
      };

      try {
        const response = await axios.post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
          headers: { "Content-Type": "application/json" },
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
}