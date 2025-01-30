import axios from "axios";
import Constant from "./helper/constant";

export default function GetInvitationUrl(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "getInvitationUrl",
      query: `query GetInvitationUrl {
        getInivationUrl
      } `,
    };

    axios
      .post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
        "content-type": "application/json",
        headers: {
          Authorization: req.headers.authorization,
        },
      })
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
