import { useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { TopChartSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/TopChartSegmentContent/@types/@topChartSegmentContent";

import ModifyTopChartDrawerContent from "../../drawer/ModifyTopChartDrawerContent/ModifyTopChartDrawerContent";
import ViewTopChartDrawerContent from "../../drawer/ViewTopChartDrawerContent/ViewTopChartDrawerContent";
import TopChartSegmentContentTableModel from "../../models/TopChartSegmentContentTableModel";

import "./_topChartSegmentContent.scss";

const mockData: TopChartSegmentContentDataType[] = [
  {
    unitTitle: "صمیم",
    unitType: 2,
    branch: "شعبه",
    parentUnit: "شعبه",
    createDate: "1403 / 10 / 10",
    lastEditDate: "1403 / 10 / 10",
    creator: "شیرین نجفی",
    description: "3",
  },
];

const TopChartSegmentContent = () => {
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [ModifyTopChartMood, setIsModifyTopChartMoodMood] = useState(false);

  //* ================================ Util Functions ================================

  const editHandler = (id: number) => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id,
    });

    setIsModifyTopChartMoodMood(true);
  };

  const viewHandler = (id: number) => {
    setIsViewDrawerOpen({
      isOpen: true,
      id,
    });
  };

  const subSetHandler = () => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id: -1,
    });

    setIsModifyTopChartMoodMood(false);
  };

  // drawer handler
  const closeModifyDrawerHandler = () => {
    setIsModifyDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  const closeViewDrawerHandler = () => {
    setIsViewDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* MODIFY DRAWER */}
      {isModifyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeModifyDrawerHandler}
          open={isModifyDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ModifyTopChartDrawerContent
              closeDrawerHandler={closeModifyDrawerHandler}
              isModifyDrawerOpen={isModifyDrawerOpen}
              ModifyTopChartMood={ModifyTopChartMood}
            />
          }
        />
      )}

      {/* VIEW BRANCH DRAWER */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ViewTopChartDrawerContent closeDrawerHandler={closeViewDrawerHandler} />
          }
        />
      )}

      <CustomCard className="top-chart-segment-content-container">
        <div className="modify-business-list-container">
          <ToolBox
            leftSide={
              <div className="left-side">
                <CustomButton type="primary" ghost disabled>
                  خروجی اکسل
                </CustomButton>
              </div>
            }
            rightSide={
              <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
                فیلتر پیشرفته
              </CustomButton>
            }
          />

          <CustomTable<TopChartSegmentContentDataType>
            dataSource={mockData}
            columns={TopChartSegmentContentTableModel({
              viewHandler,
              editHandler,
              subSetHandler,
            })}
            pagination={paginationConfig}
            {...TABLE_PROPS(mockData?.length)}
            // loading={}
            className="top-chart-segment-content-list-table"
          />
        </div>
      </CustomCard>
    </>
  );
};
export default TopChartSegmentContent;
