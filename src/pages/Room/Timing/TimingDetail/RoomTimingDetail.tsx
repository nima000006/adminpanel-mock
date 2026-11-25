import { Breadcrumb, Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { linkBreadcrumbItems } from "@infra/helpers/BreadcrumbHelpers/linkBreadcrumbItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import BasicRulesSection from "../../../../components/RoomComponents/BasicRuleSection/BasicRulesSection";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomTimingDetailModal } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomTimingDetailModal/RoomTimingDetailModal";
import {
  PADDING_20,
  PADDING_40,
} from "../../../../infrastructure/VARS/globalStyles/globalStyles";

import "./_roomTimingDetail.scss";

const breadCrumbItems = [
  {
    title: "خوابگاه Y",
  },
  {
    title: "بیزینس X",
  },
];

const dataSource = [
  {
    id: 1,
    key: 1,
    startDate: "1402 / 02 / 06",
    endDate: "1402 / 02 / 06",
    description: "21 عدد",
  },
];

const RoomTimingDetail = () => {
  useTitle({ text: "زمانبندی رزرو" });

  //* ================================ Util Functions ================================
  const editClickHandler = () => {};
  const deleteClickHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="room-timing-detail-container-page">
      <div className="bread-crumb-container">
        <CustomCard padding={PADDING_20}>
          <Breadcrumb
            items={linkBreadcrumbItems(breadCrumbItems)}
            className="bread-crumb"
          />
        </CustomCard>
      </div>
      <div className="table-container">
        <CustomCard padding={PADDING_40}>
          <CustomDivider text="تعطیلات" />
          <div className="new-row-btn-container">
            <Button type="primary" className="new-row-btn">
              ایجاد تعطیلات جدید
              <AiOutlinePlus />
            </Button>
          </div>
          <CustomTable
            dataSource={dataSource}
            columns={
              RoomTimingDetailModal({
                editClickHandler: editClickHandler,
                deleteClickHandler: deleteClickHandler,
              }) as any
            }
            pagination={paginationConfig}
            {...TABLE_PROPS(dataSource?.length)}
            className="pricing-basic-table-container"
          />
        </CustomCard>
      </div>
      <div className="rule-section">
        <BasicRulesSection />
      </div>
    </div>
  );
};

export default RoomTimingDetail;
