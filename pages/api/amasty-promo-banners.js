import axios from "axios";
import Constant from "./helper/constant";

export default function amastyPromoBanners(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "megamenu",
      query: `query {
        getAmastyBanners{
            actions_serialized
            conditions_serialized
            id
            rule_name
            is_active
            sort_order
            from_date
            to_date
            stores
            cust_groups
            banner_position
            banner_img
            banner_link
            banner_title
            cms_block
            cats
            show_on_products
            banner_type
            show_products
            show_on_search
            after_n_product_row
            n_product_width
            segments
        }
      }`,
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
}