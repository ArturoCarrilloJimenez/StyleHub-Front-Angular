import { Product } from '../../interfaces/product-response.interface';

export interface CartResponse {
  id: string;
  insertDate: Date;
  products: ProductCart[];
}

export interface ProductCart {
  id: string;
  quantity: number;
  product: Product;
  size: string;
}
