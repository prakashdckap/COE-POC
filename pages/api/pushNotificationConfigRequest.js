import axios from "axios";
import Constant from "./helper/constant";

export default function PushNotificationConfigRequest(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "getAmastyPushNotificationConfig",
      query: `query GetAmastyPushNotificationConfig {
                getAmastyPushNotificationConfig {
                    devices_available_prompt
                    firebase_api_key
                    firebase_api_request_url
                    isEnabled
                    is_prompt_enabled
                    logo_path
                    max_notifications_per_customer_daily
                    prompt_available_on_all_pages
                    prompt_available_pages
                    prompt_delay
                    prompt_frequency
                    prompt_position
                    prompt_text
                    sender_id
                }
              }`,
    };

    axios
      .post(Constant.magentoGraphQLEndpoint, graphqlQuery, { headers: { "Content-Type": "application/json" } })
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