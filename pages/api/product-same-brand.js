import axios from "axios";
import Constant from "./helper/constant";

export default function ProductsList(req, res) {
  if (req.method === "POST") {
    console.log(req?.body);
    const graphqlQuery = {
      operationName: "OtherProductSuggestions",
      query: `query OtherProductSuggestions($sku: String!) {
         OtherProductSuggestions(input: { sku: $sku }) {
            code
            name
            results {
                id
                image_url
                name
                price
                product_categories
                sku
                url_key
             }
          }
      }`,
      variables: {
        sku: req?.body?.sku,
      },
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
}
