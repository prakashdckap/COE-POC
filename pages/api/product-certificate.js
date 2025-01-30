import axios from "axios";
import Constant from "./helper/constant";

export default function BlogPostAuthor(req, res) {
  if (req.method === "GET") {
    if (req?.query?.sku) {
      return axios
        .get(`${Constant.magentoBaseUrl}rest/V1/products/${req.query.sku}`)
        .then((response) => {
          return res.json(response.data);
        })
        .catch((err) => {
          console.log({ err });
          return res.status(401).json({ status: "Error Occurred" });
        });
    }
    return res.send("error");
  }
  return res.status(401).json({ status: "Not Found" });
}
