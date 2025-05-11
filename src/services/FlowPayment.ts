import dotenv from "dotenv";
dotenv.config();

import FlowApi from "./FlowService.js";

const apiKey = (process.env.FLOW_API_KEY as string) || "default_api_key";
const secretKey =
  (process.env.FLOW_SECRET_KEY as string) || "default_secret_key";

const apiURL =
  (process.env.FLOW_API_URL as string) || "https://sandbox.flow.cl/api/payment";

const api = new FlowApi({
  apiKey,
  secretKey,
  apiURL,
});

export const createPayment = async ({
  subject,
  amount,
}: {
  subject: string;
  amount: number;
}) => {
  const params = {
    commerceOrder: "orden123",
    subject,
    currency: "CLP",
    amount,
    email: "luisbarradev@gmail.com",
    paymentMethod: 9,
    urlConfirmation: "https://luisbarra.cl/confirmacion",
    urlReturn: "https://luisbarra.cl/retorno",
    timeout: 60 * 1000,
  };

  const response = (await api.send("create", params, "POST")) as {
    token: string;
    url: string;
    flowOrder: number;
  };

  const url = response.url + "?" + "token=" + response.token;
  return url;
};
