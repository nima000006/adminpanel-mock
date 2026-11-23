import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { IconCalculator } from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  dataPlaceHolder,
  dayNameGenerator,
  getPersianDateText,
} from "@infra/helpers/utils";

import { FoodPendingPaymentDetailDrawerContentProps } from "./@types/@foodPendingPaymentDetail";
import FoodPendingReturnedMoneyListTableModel from "../../../../PendingReturnedMoney/helper/models/FoodPendingReturnedMoneyList/FoodPendingReturnedMoneyListTableModel";

const FoodPendingPaymentDetailDrawerContent = ({
  closeDrawerHandler,
  loading,
  total,
  dataSourceDetail,
  paymentDate,
}: FoodPendingPaymentDetailDrawerContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="food-pending-payment-detail-drawer-container">
      <CustomDrawerHeader
        title={` مشاهده پرداختی روز ${
          paymentDate
            ? `${dayNameGenerator(paymentDate)} ${getPersianDateText(paymentDate)}`
            : ""
        }`}
        closeDrawerHandler={closeDrawerHandler}
      />
      <div className="total-price-card-container">
        <IconCalculator viewBox="0 0 24 24" fill="#1890FF" />
        <span className="title">مجموع مبلغ قابل عودت</span>
        <span className="price-title">
          {dataPlaceHolder({ data: total?.toString(), isPrice: true, isRial: true })}{" "}
          تومان
        </span>
      </div>
      <div className="table-container">
        <CustomDivider
          text="لیست تراکنش‌های نیازمند عودت وجه"
          extraContentClassName="action-btns-container"
          extraContent={<CustomButton disabled={true}>خروجی اکسل</CustomButton>}
        />
        <CustomTable
          dataSource={dataSourceDetail}
          columns={FoodPendingReturnedMoneyListTableModel()}
          pagination={paginationConfig}
          loading={loading}
          {...TABLE_PROPS(dataSourceDetail?.length)}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default FoodPendingPaymentDetailDrawerContent;
