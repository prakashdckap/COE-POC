import axios from "axios";
import Constant from "./helper/constant";

export default function BlogPostAuthor(req, res) {
  if (req.method === "POST") {
    if (req.body.pageSize && req.body?.currPage && req?.body?.authorId) {
      const graphqlQuery = {
        operationName: "BlogPostAuthor",
        query: `  query BlogPostsAuthorList($pageSize: Int, $currPage: Int, $authorId: String) {
            blogPosts(sort: ["DESC"], pageSize: , $pageSize, currentPage: $currPage, sortFiled:"publish_time", filter:{author_id:{eq: $authorId}}){
              items {
                categories{
                    category_id
                    category_url
                      title
                  }
                    title
                    post_id
                    first_image
                    identifier
                    publish_time
                    include_in_recent
              }
              total_count
              total_pages
            }
          }`,
        variables: {
          pageSize: req.body.pageSize,
          currPage: req.body?.currPage,
          authorId: parseInt(req.body?.authorId, 10),
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
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
