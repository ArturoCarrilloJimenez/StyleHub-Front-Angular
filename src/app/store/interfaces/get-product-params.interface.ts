export interface GetProductParam {
  limit?: number;
  page?: number;
  activeProducts?: boolean;
  types?: string[];
  genders?: string[];
  search?: string;
  maxPrice?: number;
  minPrice?: number;
}
