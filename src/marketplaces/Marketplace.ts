export abstract class Marketplace<TSearchResult, TProductDetail> {
  abstract searchProduct(
    search: string,
    page?: number,
    size?: number,
    precioMin?: number,
    precioMax?: number
  ): Promise<TSearchResult>;

  abstract getProductDetails(productId: string): Promise<TProductDetail>;
}
