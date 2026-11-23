import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import "./_dormPaymentMethodTypeViewModalContent.scss";

const DormPaymentMethodTypeViewModalContent = () => {
  return (
    <div className="dorm-payment-method-view-content-modal">
      <SingleVerticalItem
        label="روش پرداخت"
        value={dataPlaceHolder({
          data: "ماک دیتا",
        })}
      />
      <SingleVerticalItem
        label="ارائه شده به شعبه‌های"
        value={dataPlaceHolder({
          data: "ماک دیتا",
        })}
      />
    </div>
  );
};
export default DormPaymentMethodTypeViewModalContent;
