import axios from "axios";
import Constant from "./helper/constant";

export default function CheckOrderStatus(req, res) {
  if (req.method === "POST") {
    if (req.body.orderId && req.body.email) {
      const graphqlQuery = {
        operationName: "checkOrderStatus",
        query: `query CheckOrderStatus($orderId: String!, $email:  String!){
          checkOrderStatus(
            orderId: $orderId,
            email : $email
          )
          {
            trackingInfo {
              date
               status
              time
               ... on LocationStringObj {
                 locationString: location
             }
                 ... on LocationObject{
                   time
                   location{
                     city
                     country
                     state
                     zip
                   }
                 }
            }
            orderId
            orderStatus
            shipmentStatus
            carrier
            trackingNumber
            trackingUrl
            adultSignature
          }
        }`,
        variables: { orderId: req.body.orderId, email: req.body.email },
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
