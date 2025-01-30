import axios from "axios";
import Constant from "./helper/constant";

export default function PickUpLocally(req, res) {
  if (req.method === "POST") {
    if (req.body.zipcode) {
      const graphqlQuery = {
        operationName: "pickUpLocally",
        query: `query PickUpLocally ($zipCode: String!){
            pickUpLocally(
              zipcode: $zipCode
            )
            {
              name
              number
              address1
              address2
              city
              province
              provinceid
              postalCode
              country
              countryid
              phone
              distance
              hours
              dealerid
            }
          }
          `,
        variables: { zipCode: req.body.zipcode },
      };
      axios
        .post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
          "content-type": "application/json",

          headers: {
            Authorization: req.headers.authorization,
          },
        })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    } else {
      res.status(401).json({ status: "Unauthorized access" });
    }
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
