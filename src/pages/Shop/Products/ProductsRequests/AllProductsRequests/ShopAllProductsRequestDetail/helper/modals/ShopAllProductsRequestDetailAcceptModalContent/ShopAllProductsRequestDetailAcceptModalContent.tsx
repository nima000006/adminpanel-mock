import { ShopAllProductsRequestDetailAcceptModalContentProps } from "../../../@types/@shopAllProductsRequestDetail";

const ShopAllProductsRequestDetailAcceptModalContent = ({
  title = "",
  supplierTitle = "",
}: ShopAllProductsRequestDetailAcceptModalContentProps) => {
  return (
    <div className="text-neutral-11 flex flex-col text-right text-sm leading-normal">
      <p>با تایید، «{title}» با همین اطلاعات به بانک کالا اضافه می‌شود.</p>
      <p>
        • {supplierTitle} می‌تواند آن را از «کالاهای من» با قیمت و موجودی خودش اضافه کند.
      </p>
      <p>• تا فروشنده‌ای به کالا اضافه نشود، کالا به کاربر نمایش داده نمی‌شود.</p>
    </div>
  );
};

export default ShopAllProductsRequestDetailAcceptModalContent;
