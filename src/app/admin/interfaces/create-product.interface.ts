export interface CreateProduct {
  title: string;
  price?: number;
  description?: string;
  slug?: string;
  stock?: number;
  sizes: string[];
  gender: string;
  images?: string[];
  type: string;
}

export interface FileUrl {
  file: File;
  url: string;
}
