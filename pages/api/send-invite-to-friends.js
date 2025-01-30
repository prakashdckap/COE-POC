import axios from "axios";
import Constant from "./helper/constant";

export default function SendInviteToFriends(req, res) {
  if (req.method === "POST") {
    if (req.body.items && req?.body?.message) {
      const graphqlQuery = {
        operationName: "sendInviteToFriends",
        query: `mutation SendInviteToFriends($message: String!, $items: [Friends!]){
            sendInviteFriends(message: $message, items: $items)
          }
          `,
        variables: {
          items: req.body.items,
          message: req.body.message,
        },
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
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
