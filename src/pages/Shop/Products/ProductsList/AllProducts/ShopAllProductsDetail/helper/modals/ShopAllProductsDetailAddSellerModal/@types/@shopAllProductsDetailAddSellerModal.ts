import { ShopAllProductsDetailCategoryRowType } from "@pages/Shop/Products/ProductsList/AllProducts/ShopAllProductsDetail/@types/@shopAllProductsDetail";

export type ShopAllProductsDetailAddSellerFormType = {
  supplierUuid?: string;
  payablePrice?: number | null;
  quantity?: number | null;
  strikePrice?: number | null;
};

export type ShopAllProductsDetailAddSellerModalProps = {
  open: boolean;
  bookUuid: string;
  onCancel: () => void;
  onSuccess?: () => void;
};

//! APIs
export type CreateShopAllProductsDetailSupplierBookRequest = {
  supplierUuid: string;
  bookUuid: string;
  price: number;
  discountedPrice: number;
  quantity: number;
};

export type CreateShopAllProductsDetailSupplierBookResponse = {
  uuid: string;
  bookUuid: string;
  title: string;
  isbn: string;
  discountedPrice: number;
  price: number;
  quantity: number;
  createdDate: string;
  visible: boolean;
  categories: ShopAllProductsDetailCategoryRowType[];
};
