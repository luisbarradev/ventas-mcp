import axios, { AxiosResponse } from "axios";
import * as crypto from "crypto";

interface FlowApiOptions {
  apiKey: string;
  secretKey: string;
  apiURL: string;
}

export const FlowStatus = {
  PENDING_PAYMENT: 1,
  PAID: 2,
  REJECTED: 3,
  CANCELED: 4,
};

export const PaymentMethod = {
  WEBPAY: 1,
  SERVIPAG: 2,
  MULTICAJA: 3,
  ONEPAY: 4,
  CRYPOMONEDA: 5,
  TODOS_LOS_MEDIOS: 9,
};
interface FlowApiResponse {
  output: any;
  info: {
    http_code: number;
  };
}

interface Params {
  [key: string]: string | number | undefined;
}

class FlowApi {
  private apiKey: string;
  private secretKey: string;
  private apiURL: string;

  constructor({ apiKey, secretKey, apiURL }: FlowApiOptions) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.apiURL = apiURL;
  }

  async send(
    service: string,
    params: Params,
    method: "GET" | "POST" = "GET"
  ): Promise<any> {
    try {
      method = method.toUpperCase() as "GET" | "POST";

      const url = `${this.apiURL}/${service}`;

      const data = this.getPack({ apiKey: this.apiKey, ...params }, method);
      const sign = this.sign({ apiKey: this.apiKey, ...params });

      const response =
        method === "GET"
          ? await this.httpGet(url, data, sign)
          : await this.httpPost(url, data, sign);

      const { info, output } = response;

      if (info?.http_code === 200) {
        return output;
      }

      throw new Error(
        output?.message ||
          `Unexpected error occurred. HTTP_CODE: ${info?.http_code}`
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  private getPack(params: Params, method: "GET" | "POST"): string {
    const keys = Object.keys(params).sort();
    return keys
      .map((key) =>
        method === "GET"
          ? `${encodeURIComponent(key)}=${encodeURIComponent(
              params[key] as string
            )}`
          : `${key}=${params[key]}`
      )
      .join("&");
  }

  private sign(params: Params): string {
    if (!this.secretKey) {
      throw new Error("Secret key is not defined");
    }

    const keys = Object.keys(params).sort();
    const toSign = keys.map((key) => `${key}=${params[key]}`).join("&");

    return crypto
      .createHmac("sha256", this.secretKey)
      .update(toSign)
      .digest("hex");
  }

  private async httpGet(
    url: string,
    data: string,
    sign: string
  ): Promise<FlowApiResponse> {
    try {
      const response: AxiosResponse = await axios.get(
        `${url}?${data}&s=${sign}`
      );
      return {
        output: response.data,
        info: {
          http_code: response.status,
        },
      };
    } catch (error: any) {
      return {
        output: error.response?.data,
        info: {
          http_code: error.response?.status,
        },
      };
    }
  }

  private async httpPost(
    url: string,
    data: string,
    sign: string
  ): Promise<FlowApiResponse> {
    try {
      const response: AxiosResponse = await axios.post(
        url,
        `${data}&s=${sign}`
      );
      return {
        output: response.data,
        info: {
          http_code: response.status,
        },
      };
    } catch (error: any) {
      return {
        output: error.response?.data,
        info: {
          http_code: error.response?.status,
        },
      };
    }
  }
}

export default FlowApi;
