import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { DailyDiscountModel } from "../../../../../infrastructure/models/tableModels/RoomTableModel/pricing/DailyDiscountModel/DailyDiscountModel";
import DailyDiscountModal from "../DailyDiscountModal/DailyDiscountModal";

type dataSourceTypeArray = {
  key: number;
  id: number;
  from: string;
  until: string;
  discountPercent: number;
};

const DailyDiscountTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource: dataSourceTypeArray[] = [
    {
      key: 1,
      id: 1,
      from: "2 روز",
      until: "8 روز",
      discountPercent: 20,
    },
    {
      key: 1,
      id: 1,
      from: "2 روز",
      until: "2 روز",
      discountPercent: 20,
    },
    {
      key: 1,
      id: 1,
      from: "2 روز",
      until: "3 روز",
      discountPercent: 20,
    },
    {
      key: 1,
      id: 1,
      from: "4 روز",
      until: "2 روز",
      discountPercent: 20,
    },
    {
      key: 1,
      id: 1,
      from: "2 روز",
      until: "8 روز",
      discountPercent: 20,
    },
  ];

  //* ================================ Util Functions ================================
  const changeHandler = () => {};
  const deleteHandler = () => {};
  const showModal = () => {
    setIsModalOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <DailyDiscountModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      <div className="pricing-base-detail-container">
        <div className="pricing-base-detail-action-bar-container">
          <Button type="primary" icon={<AiOutlinePlus />} onClick={showModal}>
            ایجاد تخفیف روزانه
          </Button>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={
            DailyDiscountModel({
              changeHandler: changeHandler,
              deleteHandler: deleteHandler,
            }) as any
          }
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          // loading={historyPaymentsIsLoading}
          className="pricing-basic-detail-table-container"
        />
      </div>
    </>
  );
};
export default DailyDiscountTable;
