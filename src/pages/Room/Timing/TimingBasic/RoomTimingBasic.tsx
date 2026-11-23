import { Button, Input } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomTimingBasicModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingBasicModel/RoomTimingBasicModel";
import "./_roomTimingBasic.scss";

const dataSource = [
  {
    id: 1,
    key: 1,
    name: "بلوار لاله",
    managementType: "آزاد",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "پسران",
    active: false,
    remainingCapacity: "1",
  },
  {
    id: 2,
    key: 2,
    name: "بلوار لاله",
    managementType: "آزاد",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "دختران",
    active: true,
    remainingCapacity: "3",
  },
  {
    id: 3,
    key: 3,
    name: "بلوار لاله",
    managementType: "آزاد",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "متاهلی",
    active: true,
    remainingCapacity: "5",
  },
  {
    id: 4,
    key: 4,
    name: "بلوار لاله",
    managementType: "آزاد",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "پسران",
    active: true,
    remainingCapacity: "7",
  },
  {
    id: 5,
    key: 5,
    name: "بلوار لاله",
    managementType: "دانشگاهی",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "دختران",
    active: true,
    remainingCapacity: "2",
  },
  {
    id: 6,
    key: 6,
    name: "بلوار لاله",
    managementType: "دانشگاهی",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "پسران",
    active: true,
    remainingCapacity: "4",
  },
  {
    id: 7,
    key: 7,
    name: "بلوار یاس",
    managementType: "آزاد",
    nominalCapacity: 22,
    qualityGrade: 1,
    gender: "متاهلی",
    active: true,
    remainingCapacity: "6",
  },
];

const RoomTimingBasic = () => {
  useTitle({ text: "زمانبندی رزرو" });

  //* ================================ Util Functions ================================
  const viewClickHandler = (/*id: number*/) => {
    // Todo[atefeh]:edit after detail page created
    // navigate(`room-timing-basic-detail?=id=${id}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="room-timing-basic-page-container">
      <div className="table-container">
        <div className="search-box-container">
          <Button
            type="primary"
            icon={<AiOutlineFilter />}
            size="middle"
            className="filter-btn"
          >
            فیلتر پیشرفته
          </Button>
          <Input
            addonAfter={<AiOutlineSearch />}
            placeholder="جستجو"
            className="search-box"
          />
        </div>
        <CustomTable
          dataSource={dataSource}
          columns={
            RoomTimingBasicModel({
              viewClickHandler,
            }) as any
          }
          pagination={paginationConfig}
          rowSelection={{
            type: "checkbox",
          }}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </div>
  );
};

export default RoomTimingBasic;
