import axios from "axios";
import Constant from "./helper/constant";

export default function GetReferrals(req, res) {
  if (req.method === "POST") {
    if (req.body.pageSize && req.body.currPage) {
      const graphqlQuery = {
        operationName: "getReferrals",
        query: `query GetReferrals($pageSize: Int, $currPage: Int){
              getReferrals (current_page: $currPage, page_size:$pageSize)
            {
                data{
            email
                  name
                  points_amount
                  referral_id
                  status
                }
                count
              }
            } `,
        variables: {
          pageSize: req.body.pageSize,
          currPage: req.body.currPage,
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
