import React, { useState } from "react";

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
import { useSendRemovePendingPaymentItemMutation } from "@infra/states/redux/Apis/food/reservation/foodReservationApi";
import { requestDtos } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import { CancelRequestsType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";

import {
  FoodPendingPaymentDetailDrawerContentProps,
  SendRemovePendingPaymentItemResponse,
} from "./@types/@foodPendingPaymentDetail";
import FoodPendingReturnedMoneyListTableModel from "../../../../PendingReturnedMoney/helper/models/FoodPendingReturnedMoneyList/FoodPendingReturnedMoneyListTableModel";

const FoodPendingPaymentDetailDrawerContent = ({
  closeDrawerHandler,
  loading,
  total,
  dataSourceDetail,
  id,
  detailData,
  paymentDate,
}: FoodPendingPaymentDetailDrawerContentProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<any[]>([]);

  const selectedIds = selectedRowKeys as number[];

  //? ================================  Api Calls ================================
  // remove pending payment items
  const [removePendingPayment, { isLoading: isRemovePendingPayment }] =
    useSendRemovePendingPaymentItemMutation();

  //* ================================ Util Functions ================================

  const removeFromSelectedListHandler = () => {
    removePendingPayment({
      documentId: id,
      removedRequestIds: selectedIds,
    })
      .unwrap()
      .then(removePendingPaymentSuccess);
  };

  // success
  const removePendingPaymentSuccess = (res: SendRemovePendingPaymentItemResponse) => {
    if (res?.status === 200) {
      detailData(id);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRequests(selectedRows);
    },
  };

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
          extraContent={
            <>
              <CustomButton
                type="primary"
                danger
                disabled={selectedRequests?.length === 0}
                onClick={removeFromSelectedListHandler}
                loading={isRemovePendingPayment}
              >
                حذف از لیست
              </CustomButton>
              <CustomButton disabled={true}>خروجی اکسل</CustomButton>
            </>
          }
        />
        <CustomTable<requestDtos | CancelRequestsType>
          dataSource={dataSourceDetail}
          columns={FoodPendingReturnedMoneyListTableModel()}
          pagination={paginationConfig}
          loading={loading}
          {...TABLE_PROPS(dataSourceDetail?.length)}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default FoodPendingPaymentDetailDrawerContent;
