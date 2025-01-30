import axios from "axios";
import Constant from "./helper/constant";

export default function FeatureBrandsRequest(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "ambrandslider",
      query: `query AMBrandSlider {
                  ambrandslider {
                    autoplay
                    autoplay_delay
                    buttons_show
                    image_height
                    image_width
                    infinity_loop
                    items_number
                    pagination_clickable
                    show_label
                    slider_header_color
                    slider_title
                    slider_title_color
                    slider_width
                    simulate_touch
                    items {
                      alt
                      brandId
                      img
                      label
                      position
                      url
                    }
                  }
                } `,
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
