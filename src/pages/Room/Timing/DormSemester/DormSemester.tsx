import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomSemesterModal } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomSemester/RoomSemester";
import { PADDING_40 } from "../../../../infrastructure/VARS/globalStyles/globalStyles";

import "./_dormSemester.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const dataSource = [
  {
    id: 1,
    key: 1,
    title: "1399 - 2",
    startDate: "2023-09-21T07:07:09",
    endDate: "2023-09-21T07:07:09",
    active: true,
  },
  {
    id: 2,
    key: 2,
    title: "1399 - 2",
    startDate: "2023-09-21T07:07:09",
    endDate: "2023-09-21T07:07:09",
    active: false,
  },
];

const DormSemester = () => {
  useTitle({ text: "نیمسال خوابگاهی" });

  //* ================================ Util Functions ================================
  const editClickHandler = () => {};
  const deleteClickHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-semester-page-container">
      <CustomCard padding={PADDING_40}>
        <div className="add-new-row-btn-container">
          <Button type="primary" icon={<AiOutlinePlus />} className="add-new-row-btn">
            ایجاد نیمسال خوابگاهی جدید
          </Button>
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={
            RoomSemesterModal({
              editClickHandler: editClickHandler,
              deleteClickHandler: deleteClickHandler,
            }) as any
          }
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-semester-table"
        />
      </CustomCard>
    </div>
  );
};

export default DormSemester;
