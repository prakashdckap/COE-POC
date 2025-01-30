import axios from "axios";
import Constant from "./helper/constant";

export default function categoryList(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "categorySearch",
      query: `query CategorySearch($search: String) {
        xsearchCategories(search: $search) {
          code
          items {
            description
            name
            url
          }
          total_count
        }
      }`,
      variables: {
        search: req?.body?.search,
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
