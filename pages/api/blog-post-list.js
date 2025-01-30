import axios from "axios";
import Constant from "./helper/constant";

export default function BlogPostList(req, res) {
  if (req.method === "POST") {
    if (req.body.pageSize && req.body?.currPage) {
      const graphqlQuery = {
        operationName: "BlogPostsList",
        query: `  query BlogPostsList($pageSize: Int, $currPage: Int) {
            blogPosts(
              sort: ["DESC"]
              pageSize: $pageSize
              currentPage: $currPage
              sortFiled: "publish_time"
            ){
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
              }}`,
        variables: { pageSize: req.body.pageSize, currPage: req.body?.currPage },
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
