import axios from "axios";
import Constant from "./helper/constant";

export default function BlogPostDetail(req, res) {
  if (req.method === "POST") {
    if (req.body.postId) {
      const graphqlQuery = {
        operationName: "BlogPostDetail",
        query: `  query BlogPostsDetail($postId: String) {
            blogPosts(filter:{post_id:{eq: $postId}}){
              items {
                author {
                    author_id
                    author_url
                    identifier
                    meta_title
                    name
                    title
                  }
                  author_id
                  canonical_url
                  categories {
                    breadcrumbs {
                      category_url_path
                      category_url_key        
                      category_name
                    }
                    category_id
                    category_url_path
                    identifier
                    title
                  }
                  content
                  featured_image
                  filtered_content
                  first_image
                  identifier
                  include_in_recent
                  is_active
                  meta_description
                  meta_keywords
                  meta_title
                  og_description
                  og_image
                  og_title
                  og_type
                  post_id
                  post_url
                  publish_time
                  related_posts {
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
                  related_products
                  relatedproduct_id
                  short_filtered_content
                  title
                  update_time
                  views_count
              }
              total_count
              total_pages
            }
            }`,
        variables: {
          postId: req.body.postId,
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
