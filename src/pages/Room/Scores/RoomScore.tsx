import { Tabs } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { FONTSIZE_17 } from "@infra/VARS/globalStyles/globalStyles";

import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomScoreModel } from "../../../infrastructure/models/tableModels/RoomTableModel/RoomScoreModel/RoomScoreModel";
import { BLUE_02 } from "../../../infrastructure/VARS/globalColors/globalColors";

import "./_roomScore.scss";
const RoomScore = () => {
  useTitle({ text: "امتیاز بندی" });
  const dataSource = [
    {
      key: 1,
      title: "عنوان پارامتر",
      score: "5",
      operation: "تغییر",
    },
    {
      key: 2,
      title: "عنوان پارامتر",
      score: "7",
      operation: "تغییر",
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: <div className="tabs-label">ادیان</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: <div className="tabs-label">دانشکده</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: <div className="tabs-label">دوره آموزشی</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: <div className="tabs-label">رشته</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "5",
      label: <div className="tabs-label">قومیت</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "6",
      label: <div className="tabs-label">مذاهب</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "7",
      label: <div className="tabs-label">مقاطع</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "8",
      label: <div className="tabs-label">ملیت</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "9",
      label: <div className="tabs-label">نیمسال</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
    {
      key: "10",
      label: <div className="tabs-label">گروه آموزشی</div>,
      children: (
        <div className="room-score-table-container">
          <CustomTable
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={RoomScoreModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
      ),
    },
  ];

  const items = [
    {
      label: "حال حاضر",
      children: (
        <Tabs
          // defaultActiveKey={DENOMINATION}
          items={tabItems}
          // onChange={(e) => onTabsChange(e as BusinessBaseTableTypes)}
          dir="rtl"
          destroyInactiveTabPane={true}
          className="mini-tab-container"
        />
      ),
      key: "1",
    },
    {
      label: "نیمه اول ۱۴۰۱",
      children: <>{/* <ApartmentDetail key="1" /> */}</>,
      key: "2",
    },
    {
      label: "نیمه دوم ۱۴۰۱",
      children: <>{/* <ApartmentDetail key="1" /> */}</>,
      key: "3",
    },
  ];

  //* ================================ Util Functions ================================
  const onTimeTabChange = () => {};
  const onTimeTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="room-score-rules-text-container">
      <div className="title">قوانین بر اساس زمان اعمال</div>
      <div className="sub-title">
        از این قسمت میتوانید مجموعه قوانین جدید ایجاد کرده و برای شروع اعمال آن تاریخ
        تعیین کنید.
      </div>
      <Tabs
        type="editable-card"
        onChange={onTimeTabChange}
        // activeKey={"1"}
        onEdit={onTimeTabEdit}
        items={items}
        className="rules-section-tabs-container"
        addIcon={
          <div className="rules-section-btn">
            <span className="rules-section-btn-label">بازه قانونی جدید</span>
            <span>
              <AiOutlinePlusSquare style={{ color: BLUE_02, fontSize: FONTSIZE_17 }} />
            </span>
          </div>
        }
      />
    </div>
  );
};

export default RoomScore;
