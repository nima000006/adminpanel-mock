import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { PricingBasicDetailModel } from "../../../../../infrastructure/models/tableModels/RoomTableModel/pricing/PricingBasicDetailModel/PricingBasicDetailModel";
import PricingBasicDetailModal from "../PricingBasicDetailModal/PricingBasicDetailModal";

import "./_pricingBasicDetailTable.scss";

type dataSourceTypeArray = {
  key: number;
  id: number;
  qualityDegreeRoom: string;
  roomCapacity: string;
  dailyBasicPrice: number;
  MonthlyPercentage: string;
  thermalPercentage: string;
};
const PricingBasicDetailTable = () => {
  const dataSource: dataSourceTypeArray[] = [
    {
      key: 1,
      id: 1,
      qualityDegreeRoom: "2",
      roomCapacity: "8",
      dailyBasicPrice: 520.0,
      MonthlyPercentage: "10 (1900000)",
      thermalPercentage: "10 (1900000)",
    },
    {
      key: 1,
      id: 2,
      qualityDegreeRoom: "1",
      roomCapacity: "5",
      dailyBasicPrice: 520.0,
      MonthlyPercentage: "10 (1900000)",
      thermalPercentage: "10 (1900000)",
    },
    {
      key: 1,
      id: 3,
      qualityDegreeRoom: "2",
      roomCapacity: "8",
      dailyBasicPrice: 520.0,
      MonthlyPercentage: "10 (1900000)",
      thermalPercentage: "10 (1900000)",
    },
    {
      key: 1,
      id: 4,
      qualityDegreeRoom: "2",
      roomCapacity: "8",
      dailyBasicPrice: 520.0,
      MonthlyPercentage: "10 (1900000)",
      thermalPercentage: "10 (1900000)",
    },
    {
      key: 1,
      id: 5,
      qualityDegreeRoom: "2",
      roomCapacity: "8",
      dailyBasicPrice: 520.0,
      MonthlyPercentage: "10 (1900000)",
      thermalPercentage: "10 (1900000)",
    },
  ];

  const changeHandler = () => {};
  const deleteHandler = () => {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <PricingBasicDetailModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <div className="pricing-base-detail-container">
        <div className="pricing-base-detail-action-bar-container">
          <Button type="primary" icon={<AiOutlinePlus />} onClick={showModal}>
            ایجاد قیمت پایه جدید
          </Button>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={
            PricingBasicDetailModel({
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
export default PricingBasicDetailTable;
