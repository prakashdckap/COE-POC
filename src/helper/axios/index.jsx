import axios from "axios";
import Constant from "../constant";

export async function AxiosGraphQL(endpoint, graphqlQuery, token) {
  let AxiosResponse;
  await axios
    .post(`/api/${endpoint}`, graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    })
    .then((response) => {
      AxiosResponse = response.data;
    })
    .catch((err) => {
      AxiosResponse = false;
      return err;
    });
  return AxiosResponse;
}

export function AxiosPost(header, body) {
  axios
    .post(Constant.magentoGraphQLEndpoint, body, header)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err;
    });
}

// Axios GraphQL - GET Method for Magento API
export async function AxiosGet(endpoint, graphqlQuery, token) {
  let AxiosResponse;
  await axios
    .post(`/api/${endpoint}`, graphqlQuery, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    })
    .then((response) => {
      AxiosResponse = response.data;
    })
    .catch((err) => {
      AxiosResponse = false;
      return err;
    });
  return AxiosResponse;
}
