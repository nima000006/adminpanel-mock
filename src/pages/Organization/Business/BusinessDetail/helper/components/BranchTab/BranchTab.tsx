import { useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiPlusLight } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { BranchTabDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BranchTab/@type/@branchTab";

import ModifyBranchDrawerContent from "./helper/drawer/ModifyBranchDrawerContent/ModifyBranchDrawerContent";
import ViewBranchDrawerContent from "./helper/drawer/ViewBranchDrawerContent/ViewBranchDrawerContent";
import BranchListTableModel from "./helper/model/BranchListTableModel/BranchListTableModel";
import "./_branchTab.scss";

const mockData: BranchTabDataType[] = [
  {
    branchTitle: "شعبه مرکزی",
    branchType: 1,
    branchParent: "3",
    province: "تهران",
    city: "تهران",
    branchCode: "100",
    createDateBranch: "1403 / 10 / 10",
    creator: "شیرین نجفی",
  },
];
const BranchTab = () => {
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [branchTitle, setBranchTitle] = useState("");

  //* ================================ Util Functions ================================
  const createBranchHandler = () => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id: -1,
    });
  };

  const deleteBranchHandler = () => {};

  const viewBranchHandler = ({ id, title }: { id: number; title: string }) => {
    setIsViewDrawerOpen({
      isOpen: true,
      id,
    });
    setBranchTitle(title);
  };

  const editBranchHandler = (id: number) => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id,
    });
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
      {/* MODIFY BRANCH DRAWER */}
      {isModifyDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeModifyDrawerHandler}
          open={isModifyDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ModifyBranchDrawerContent
              closeDrawerHandler={closeModifyDrawerHandler}
              isModifyDrawerOpen={isModifyDrawerOpen}
            />
          }
        />
      )}

      {/* VIEW DRAWER */}
      {isViewDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ViewBranchDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
              branchTitle={branchTitle}
            />
          }
        />
      )}

      <CustomCard className="modify-business-list-container">
        <CustomDivider text={"لیست شعب"} />
        <ToolBox
          className="work-spaces-list-toolbox"
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

        <CustomTable<BranchTabDataType>
          dataSource={mockData}
          columns={BranchListTableModel({
            deleteBranchHandler,
            viewBranchHandler,
            editBranchHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(mockData?.length)}
          // loading={}
          className="business-branch-list-table"
        />

        <CustomButton
          type="default"
          onClick={createBranchHandler}
          icon={<PiPlusLight size={16} />}
          iconPlacement="start"
          className="business-create-branch-btn"
        >
          ایجاد شعبه جدید
        </CustomButton>
      </CustomCard>
    </>
  );
};
export default BranchTab;
