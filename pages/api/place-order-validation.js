import axios from "axios";
import Constant from "./helper/constant";

export default function PlaceOrder(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "placeOrderValidation",
      query: `mutation placeOrderValidation($cartId: String!, $image: String, $file_type: String, $dob: String, $veratad_confirmation: String, $veratad_timestamp: String, $veratad_action: String, $veratad_detail: String) {
        placeOrderValidation(input: {cart_id: $cartId, image: $image, file_type: $file_type, dob: $dob, veratad_confirmation: $veratad_confirmation, veratad_timestamp: $veratad_timestamp, veratad_action: $veratad_action, veratad_detail: $veratad_detail}) {
          orderFlag
        }
      }`,
      variables: {
        cartId: req.body.cartId,
        image: req.body.image,
        file_type: req.body.fileType,
        dob: req.body.dob,
        veratad_confirmation: req.body.veratadConfirmation,
        veratad_timestamp: req.body.veratadTimestamp,
        veratad_action: req.body.veratadAction,
        veratad_detail: req.body.veratadDetail,
      },
    };

    axios
      .post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
        "content-type": "application/json",
      })
      .then((response) => {
        if (response?.data) {
          res.status(200).json(response.data);
        } else if (response?.data?.errors) {
          res.status(200).json({ error: response.data.errors });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
