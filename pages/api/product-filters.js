import axios from "axios";
import Constant from "./helper/constant";

export default function ProductsListFilters(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "productsFilters",
      query: `query ProductsFilters($search: String, $pageSize: Int, $currentPage: Int, $sort: ProductAttributeSortInput, $filter: ProductAttributeFilterInput) {
        products(search: $search, pageSize: $pageSize, currentPage: $currentPage, sort: $sort, filter: $filter) {
          aggregations {
            attribute_code
            count
            label 
            options {
              count
              label
              value
            }
            position
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
