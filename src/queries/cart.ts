import axios, { AxiosError } from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";

type CartResponse = {
  data: {
    cart: {
      id: string;
      items: CartItem[];
      created_at: string;
      updated_at: string;
      user_id: string;
      status: string;
    };
    count: number;
  };
};

const queryCart = async () => {
  const url = `${API_PATHS.cart}/profile/cart`;
  const headers = {
    Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
  };
  const res = await axios.get<CartResponse>(url, { headers });

  console.log(res);

  return res.data.data.cart.items;
};

export function useCart() {
  return useQuery<CartItem[], AxiosError>("cart", {
    queryFn: queryCart,
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation((values: CartItem) =>
    axios.put<CartItem[]>(`${API_PATHS.cart}/profile/cart`, values, {
      headers: {
        Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
      },
    })
  );
}
