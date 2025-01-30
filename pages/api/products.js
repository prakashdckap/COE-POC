import axios from "axios";
import Constant from "./helper/constant";

export default function ProductsList(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "productsList",
      query: `query Products($search: String, $pageSize: Int, $currentPage: Int, $sort: ProductAttributeSortInput, $filter: ProductAttributeFilterInput) {
        products(search: $search, pageSize: $pageSize, currentPage: $currentPage, sort: $sort, filter: $filter) {
          items {
            id
            name
            url_key
            uid
            sku
            stock_status
            categories{
              id
            }
            image{
              url
            }
            price_range {
              minimum_price {
                final_price {
                  currency
                  value
                }
                regular_price {
                  currency
                  value
                }
              }
            }
          }
          total_count
        }
      }`,
      variables: {
        search: req?.body?.text || req?.body?.search,
        pageSize: req?.body?.pageSize,
        currentPage: req?.body?.currentPage,
        sort: req?.body?.sort,
        filter: req?.body?.filter,
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
}
