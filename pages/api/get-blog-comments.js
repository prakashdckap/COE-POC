import axios from "axios";
import Constant from "./helper/constant";

export default function BlogComments(req, res) {
  if (req.method === "POST") {
    if (true) {
      const graphqlQuery = {
        operationName: "blogComments",
        query: `
          fragment commentFields on BlogComment {
            admin_id
            comment_id
            customer_id
            author_type
            author_email
            author_nickname
            status
            post_id
            parent_id
            text
            creation_time
            update_time
          }

          query blogComments($filter: BlogCommentsFilterInput!, $pageSize: Int, $currentPage: Int) {
            blogComments(
              filter: $filter
              pageSize: $pageSize
              currentPage: $currentPage
            ) {
              total_count
              total_pages
              items {
                ...commentFields
                replies {
                  replies {
                    ...commentFields
                  }
                  ...commentFields
                }
              }
            }
          }
        `,
        variables: {
          filter: { post_id: { eq: req.body.post_id || 99} },
          pageSize: 10,
          currentPage: 1,
        },
      };

      axios
        .post(Constant.magentoGraphQLEndpoint, graphqlQuery, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          res.status(200).json(response.data);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(400).json({ status: "Bad Request", message: "Missing required fields" });
    }
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
