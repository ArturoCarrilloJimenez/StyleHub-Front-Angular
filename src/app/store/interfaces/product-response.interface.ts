export interface ProductsResponse {
  statusCode: string;
  data: Product[];
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  images: string[];
  isActive: boolean;
  insertDate: Date;
  updateDate: Date;
  type: string;
}
