import axios from "axios";
import Constant from "./helper/constant";

export default function DoWeShip(req, res) {
  if (req.method === "POST") {
    if (req.body.zipcode) {
      const graphqlQuery = {
        operationName: "doWeShip",
        query: `query DoWeShip ($zipCode: String!){
                    doWeShip(
                      zipcode: $zipCode
                    )
                  }`,
        variables: { zipCode: req.body.zipcode },
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
