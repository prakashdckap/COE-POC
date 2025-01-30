import axios from "axios";
import Constant from "./helper/constant";

export default function TrackingCmsContent(req, res) {
  if (req.method === "POST") {
    if (req.body.identifiers) {
      const graphqlQuery = {
        operationName: "cmsBlocks",
        query: `query cmsBlocks($identifiers: [String]){
                  cmsBlocks(identifiers: $identifiers) {
                    items {
                    content
                    identifier
                    title
                    }
                }
            }`,
        variables: { identifiers: req.body.identifiers },
      };

      axios
        .post(Constant.magentoGraphQLEndpoint, graphqlQuery, { "Content-Type": "application/json" })
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