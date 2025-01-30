import axios from "axios";
import Constant from "./helper/constant";

export default function doWeShipFormSubmit(req, res) {
  if (req.method === "POST") {
    if (req.body.input) {
      const graphqlQuery = {
        operationName: "doWeShipFormSubmit",
        query: `mutation doweShip($input: DoWeShipInput!) {
          doWeShipFormSubmit(input: $input) {
            success_message
          }
        }`,

        variables: { input: req.body.input },
      };
      axios
        .post(Constant.magentoGraphQLEndpoint, graphqlQuery, { "content-type": "application/json" })
        .then((response) => {
          res.status(200).json(response.data.data);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(401).json({ status: "Unauthorized access" });
    }
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
