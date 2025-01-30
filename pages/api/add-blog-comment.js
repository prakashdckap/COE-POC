import axios from "axios";
import Constant from "./helper/constant";

export default function AddCommentToPost(req, res) {
  if (req.method === "POST") {
    if (
      req.body.author_email &&
      req.body.author_nickname 
    ) {
      const graphqlQuery = {
        operationName: "AddCommentToPost",
        query: `mutation AddCommentToPost($input: addCommentToPostInput!, $pageSize: Int, $currentPage: Int) {
          addCommentToPost(
            input: $input
            pageSize: $pageSize
            currentPage: $currentPage
          ) {
            comments {
              admin_id
              author_email
              author_nickname
              author_type
              comment_id
              creation_time
              customer_id
              parent_id
              post_id
              status
              text
              update_time
            }
            total_count
            total_pages
          }
        }`,
        variables: {
          input: {
            author_email: req.body.author_email,
            author_nickname: req.body.author_nickname,
            parent_id: req.body.parent_id,
            post_id: req.body.post_id,
            text: req.body.text,
          },
          pageSize: req.body.pageSize,
          currentPage: req.body.currentPage,
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
      res.status(400).json({ status: "Bad Request", message: "Missing required fields" });
    }
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
