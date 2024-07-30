import { Product } from "~/models/Product";

export type CartApppend = {
  items: Partial<CartItem>[];
};

export type CartItem = {
  product: Product;
  product_id: string;
  count: number;
  id: string;
};
