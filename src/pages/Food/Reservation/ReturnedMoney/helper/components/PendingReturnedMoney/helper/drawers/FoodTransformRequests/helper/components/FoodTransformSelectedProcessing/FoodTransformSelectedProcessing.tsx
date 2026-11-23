import { useEffect, useState } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { IconCalculator } from "@components/icons/icons";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { requestDtos } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingPayment/helper/drawers/FoodPendingPaymentDetail/@types/@foodPendingPaymentDetail";
import { CancelRequestsType } from "@pages/Food/Reservation/ReturnedMoney/helper/components/PendingReturnedMoney/@types/@foodPendingReturnedMoney";

import { FoodTransformSelectedProcessingProps } from "./@types/@foodTransformSelectedProcessing";
import FoodPendingReturnedMoneyListTableModel from "../../../../../models/FoodPendingReturnedMoneyList/FoodPendingReturnedMoneyListTableModel";
import "./_foodTransformSelectedProcessing.scss";

const FoodTransformSelectedProcessing = ({
  dataSource,
  total,
  loading,
  onRemove,
}: FoodTransformSelectedProcessingProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<any[]>([]);
  const [localDataSource, setLocalDataSource] = useState<CancelRequestsType[]>(
    dataSource || []
  );

  //? ================================ Effects ================================
  useEffect(() => {
    setLocalDataSource(dataSource || []);
  }, [dataSource]);

  //* ================================ Util Functions ================================
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRequests(selectedRows);
    },
  };

  const removeFromSelectedListHandler = () => {
    const filteredData = localDataSource.filter(
      (item) => !selectedRowKeys.includes(item.id)
    );
    setLocalDataSource(filteredData);
    onRemove(selectedRowKeys); // ارسال لیست آی‌دی‌های انتخاب‌شده به والد
    setSelectedRowKeys([]);
    setSelectedRequests([]);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="food-transform-selected-processing-tab-container">
      <Div className="total-price-card-container" loading={loading}>
        <IconCalculator viewBox="0 0 24 24" fill="#1890FF" />
        <span className="title">مجموع مبالغ قابل عودت</span>
        <span className="price-title">
          {dataPlaceHolder({ data: total?.toString(), isPrice: true, isRial: true })}{" "}
          تومان
        </span>
      </Div>
      <div className="table-container">
        <CustomDivider
          text="لیست انتخاب شده‌ها"
          extraContentClassName="action-btns-container"
          extraContent={
            <>
              <CustomButton
                type="primary"
                danger
                disabled={selectedRequests?.length === 0}
                onClick={removeFromSelectedListHandler}
              >
                حذف از لیست
              </CustomButton>
              <CustomButton disabled={true}>خروجی اکسل</CustomButton>
            </>
          }
        />
        <CustomTable<CancelRequestsType | requestDtos>
          dataSource={localDataSource}
          columns={FoodPendingReturnedMoneyListTableModel()}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          rowKey="id"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default FoodTransformSelectedProcessing;
