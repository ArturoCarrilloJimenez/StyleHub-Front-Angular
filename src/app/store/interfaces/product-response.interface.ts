export interface ProductResponse {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  type: string;
  gender: string;
  tags: string[];
  images: string[];
}
