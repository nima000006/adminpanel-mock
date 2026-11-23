import { useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiPlusLight } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { OrganizationStructureSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/OrganizationalUnitsTab/helper/components/OrganizationStructureSegmentContent/@types/@organizationStructureSegmentContent";

import img from "../../../../../../../../../../assets/images/business/img.svg";
import ModifyOrganizationStructureDrawerContent from "../../drawer/ModifyOrganizationStructureDrawerContent/ModifyOrganizationStructureDrawerContent";
import ViewOrganizationStructureDrawerContent from "../../drawer/ViewOrganizationStructureDrawerContent/ViewOrganizationStructureDrawerContent";
import OrganizationStructureSegmentContentTableModel from "../../models/OrganizationStructureSegmentContentTableModel";

import "./_organizationStructureSegmentContent.scss";

const mockData: OrganizationStructureSegmentContentDataType[] = [
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

const OrganizationStructureSegmentContent = () => {
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [ModifyOrganizationMood, setIsModifyOrganizationMood] = useState(false);

  //* ================================ Util Functions ================================
  const createUnitHandler = () => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id: -1,
    });

    setIsModifyOrganizationMood(true);
  };

  const editHandler = (id: number) => {
    setIsModifyDrawerOpen({
      isOpen: true,
      id,
    });

    setIsModifyOrganizationMood(false);
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

    setIsModifyOrganizationMood(false);
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
            <ModifyOrganizationStructureDrawerContent
              closeDrawerHandler={closeModifyDrawerHandler}
              isModifyDrawerOpen={isModifyDrawerOpen}
              ModifyOrganizationMood={ModifyOrganizationMood}
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
            <ViewOrganizationStructureDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
            />
          }
        />
      )}

      <CustomCard className="organization-structure-segment-content-container">
        {mockData?.length == 0 ? (
          <div className="empty-list-container">
            <img src={img} alt="empty-place-holder" width="97" height="59" />

            <p className="empty-text">
              هنوز هیچ واحدی در ساختار سازمانی ایجاد نکرده‌اید.
            </p>
            <div>
              <CustomButton
                type="primary"
                onClick={createUnitHandler}
                icon={<PiPlusLight size={16} />}
                iconPlacement="end"
              >
                ایجاد واحد جدید
              </CustomButton>
            </div>
          </div>
        ) : (
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

            <CustomTable<OrganizationStructureSegmentContentDataType>
              dataSource={mockData}
              columns={OrganizationStructureSegmentContentTableModel({
                deleteHandler,
                viewHandler,
                editHandler,
                subSetHandler,
              })}
              pagination={paginationConfig}
              {...TABLE_PROPS(mockData?.length)}
              // loading={}
              className="organization-structure-segment-content-list-table"
            />

            <CustomButton
              type="default"
              onClick={createUnitHandler}
              icon={<PiPlusLight size={16} />}
              iconPlacement="start"
            >
              ایجاد واحد جدید
            </CustomButton>
          </div>
        )}
      </CustomCard>
    </>
  );
};
export default OrganizationStructureSegmentContent;
