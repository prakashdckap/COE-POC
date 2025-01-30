import axios from "axios";
// import Constant from "./helper/constant";

export default function CategoryRequest(req, res) {
  if (req.method === "POST") {
    axios
      .post("https://production.idresponse.com/process/comprehensive/gateway", req.body, {
        "content-type": "application/json",
      })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
