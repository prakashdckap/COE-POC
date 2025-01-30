import axios from "axios";
import Constant from "./helper/constant";

export default function ShopByBrandRequest(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "ambrandlist",
      query: `query AMBrandList($imageWidth: Int, $imageHeight: Int, $showCount: Boolean, $displayZero: Boolean) {
                ExtAMBrandList(
                  imageWidth: $imageWidth,
                  imageHeight: $imageHeight,
                  showCount: $showCount,
                  displayZero: $displayZero
                ) 
                  {
                    all_letters
                    filter_display_all
                    items{
                      label
                      brandId
                      url
                      letter
                    }
                  }
              }`,
      variables: {
        imageWidth: req?.body?.imageWidth,
        imageHeight: req?.body?.imageHeight,
        showCount: req?.body?.showCount,
        displayZero: req?.body?.displayZero,
      },
    };
    axios
      .post(Constant.magentoGraphQLEndpoint, graphqlQuery, { "content-type": "application/json" })
      .then((response) => {
        res.status(200).json(response.data.data);
      })
      .catch((err) => {
        console.error("Error making GraphQL request:", err); // log the full error
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
