import axios from "axios";
import Constant from "./helper/constant";

export default function CategoryRequest(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "megamenu",
      query: `query Megamenu {
              megamenu {
                content
                menu_id
              }
            }`,
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
