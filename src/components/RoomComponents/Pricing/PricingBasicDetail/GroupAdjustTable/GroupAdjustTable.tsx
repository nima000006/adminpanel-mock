import { useState } from "react";

import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { GroupAdjustModel } from "../../../../../infrastructure/models/tableModels/RoomTableModel/pricing/GroupAdjustModel/GroupAdjustModel";
import GroupAdjustModal from "../GroupAdjustModal/GroupAdjustModal";

import "./_groupAdjustTable.scss";

type dataSourceTypeArray = {
  key: number;
  id: number;
  section: string;
  Nationality: string;
  religion: string;
  PercentageReduction: number;
};

const GroupAdjustTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource: dataSourceTypeArray[] = [
    {
      key: 1,
      id: 1,
      section: "کارشناسی",
      Nationality: "ایرانی",
      religion: "اسلام",
      PercentageReduction: 20,
    },
    {
      key: 1,
      id: 1,
      section: "کارشناسی",
      Nationality: "آمریکایی",
      religion: "اسلام",
      PercentageReduction: 20,
    },
    {
      key: 1,
      id: 1,
      section: "کارشناسی",
      Nationality: "ایرانی",
      religion: "اسلام",
      PercentageReduction: 20,
    },
    {
      key: 1,
      id: 1,
      section: "کارشناسی",
      Nationality: "ایرانی",
      religion: "اسلام",
      PercentageReduction: 20,
    },
    {
      key: 1,
      id: 1,
      section: "کارشناسی",
      Nationality: "ایرانی",
      religion: "اسلام",
      PercentageReduction: 20,
    },
  ];

  const changeHandler = () => {};
  const deleteHandler = () => {};
  const showModal = () => {
    setIsModalOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <GroupAdjustModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      <div className="pricing-base-detail-container">
        <div className="pricing-base-detail-action-bar-container">
          <Button type="primary" icon={<AiOutlinePlus />} onClick={showModal}>
            تعدیل گروهی
          </Button>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={
            GroupAdjustModel({
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
export default GroupAdjustTable;
