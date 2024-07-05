import { customInstance } from "..";

export interface ProductSale {
  productId: number;
  name: string;
  city: string;
  phone: string;
  country: string;
  productName: string;
  currency: string;
  price: number;
}

export const createLead = (payload: any) => {
  return customInstance<any>({
    url: "/lead",
    method: "post",
    data: payload,
  });
};
export const trackViewLead = (payload: any) => {
  return customInstance<any>({
    url: "/lead-view",
    method: "post",
    data: payload,
  });
};
