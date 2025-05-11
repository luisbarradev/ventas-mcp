import axios from "axios";
import { PCFactoryProduct, Root } from "../types/pcfactory.types.js";
import { Marketplace } from "./Marketplace.js";

export class PCFactory extends Marketplace<PCFactoryProduct, Root> {
  private readonly API_URL =
    "https://api.pcfactory.cl/pcfactory-services-catalogo/v1/catalogo/productos";
  private readonly API_URL_SHOW =
    "https://api.pcfactory.cl/pcfactory-services-catalogo/v1/catalogo/productos/";

  private readonly headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "es-ES,es-CL;q=0.5",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    Origin: "https://www.pcfactory.cl",
    Connection: "keep-alive",
    Referer: "https://www.pcfactory.cl/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    DNT: "1",
    "Sec-GPC": "1",
    TE: "trailers",
  };

  async searchProduct(
    search: string,
    page: number = 0,
    size: number = 12,
    precioMin?: number,
    precioMax?: number
  ): Promise<PCFactoryProduct> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      search: search,
    });

    if (precioMin !== undefined) {
      params.append("precioMin", precioMin.toString());
    }

    if (precioMax !== undefined) {
      params.append("precioMax", precioMax.toString());
    }

    const url = `${this.API_URL}?${params.toString()}`;

    try {
      const response = await axios.get<PCFactoryProduct>(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching PCFactory products:", error);
      throw new Error("Failed to fetch PCFactory products");
    }
  }

  async getProductDetails(productId: string): Promise<Root> {
    const url = `${this.API_URL_SHOW}${productId}`;

    try {
      const response = await axios.get<Root>(url, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching PCFactory product details:", error);
      throw new Error("Failed to fetch PCFactory product details");
    }
  }
}
