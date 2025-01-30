import axios from "axios";
import Constant from "./helper/constant";

export default function NewsletterSubscription(req, res) {
  if (req.method === "POST") {
    if (req.body.emailId) {
      const graphqlQuery = {
        operationName: "newsletterSubscription",
        query: `mutation NewsLetterSubscription($emailId: String!){
          subscribeEmailToNewsletter(email: $emailId)
              {
              status
            }
          }`,
        variables: { emailId: req.body.emailId },
      };
      axios
        .post(Constant.magentoGraphQLEndpoint, graphqlQuery, { "content-type": "application/json" })
        .then((response) => {
          res.status(200).json(response.data);
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
