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
import { OrganizationUnitSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/OrganizationUnitSegmentContent/@types/@organizationUnitSegmentContent";

import ModifyOrganizationUnitDrawerContent from "../../drawer/ModifyOrganizationUnitDrawerContent/ModifyOrganizationUnitDrawerContent";
import ViewOrganizationUnitDrawerContent from "../../drawer/ViewOrganizationUnitDrawerContent/ViewOrganizationUnitDrawerContent";
import OrganizationUnitSegmentContentTableModel from "../../models/OrganizationUnitSegmentContentTableModel";

import "./_organizationUnitSegmentContent.scss";

const mockData: OrganizationUnitSegmentContentDataType[] = [
  {
    unitTitle: "شعبه مرکزی",
    unitType: "موسس",
    createDate: "1403 / 10 / 10",
    lastEditDate: "1403 / 10 / 10",
    creator: "شیرین نجفی",
    description: "متن توضیحات وارد شده توسط کاربر در اینجا قرار میگیرد.",
  },
];

const OrganizationUnitSegmentContent = () => {
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //* ================================ Util Functions ================================
  const addInfoHandler = () => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id: -1,
    });
  };

  const editHandler = (id: number) => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id,
    });
  };

  const viewHandler = (id: number) => {
    setIsViewDrawerOpen({
      isOpen: true,
      id,
    });
  };

  const deleteHandler = () => {};

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
            <ModifyOrganizationUnitDrawerContent
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
            <ViewOrganizationUnitDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
            />
          }
        />
      )}

      <CustomCard className="organization-unit-segment-content-list-container">
        <CustomDivider text={"لیست واحدهای سازمانی"} />
        <ToolBox
          leftSide={
            <CustomButton type="primary" ghost disabled>
              خروجی اکسل
            </CustomButton>
          }
          rightSide={
            <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          }
        />

        <CustomTable<OrganizationUnitSegmentContentDataType>
          dataSource={mockData}
          columns={OrganizationUnitSegmentContentTableModel({
            deleteHandler,
            viewHandler,
            editHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(mockData?.length)}
          className="organization-unit-segment-content-list-table"
          // loading={}
        />

        <CustomButton
          type="default"
          onClick={addInfoHandler}
          icon={<PiPlusLight size={16} />}
          iconPlacement="start"
          className="business-create-branch-btn"
        >
          افزودن اطلاعات واحد سازمانی
        </CustomButton>
      </CustomCard>
    </>
  );
};
export default OrganizationUnitSegmentContent;
