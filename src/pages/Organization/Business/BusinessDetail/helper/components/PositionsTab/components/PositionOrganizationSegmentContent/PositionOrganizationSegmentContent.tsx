import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { PiPlusLight } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { PositionOrganizationSegmentContentType } from "@pages/Organization/Business/BusinessDetail/helper/components/PositionsTab/components/PositionOrganizationSegmentContent/@types/@positionOrganizationSegmentContent";

import img from "../../../../../../../../../assets/images/business/img.svg";
import ModifyOrganizationPositionInfoDrawerContent from "../../drawer/ModifyOrganizationPositionInfoDrawerContent/ModifyOrganizationPositionInfoDrawerContent";
import ViewOrganizationPositionInfoDrawerContent from "../../drawer/ViewOrganizationPositionInfoDrawerContent/ViewOrganizationPositionInfoDrawerContent";
import PositionOrganizationSegmentContentTableModel from "../../model/PositionOrganizationSegmentContentTableModel";

const mockData: PositionOrganizationSegmentContentType[] = [
  {
    positionTitle: "مدیرکل",
    positionType: "مدیریت",
    desc: "توضیحات",
    createDate: "1403 / 10 / 10",
    lastEditDate: "1403 / 10 / 10",
    creator: "شیرین نجفی",
  },
];

const PositionOrganizationSegmentContent = () => {
  const [isModifyDrawerOpen, setIsModifyDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //* ================================ Util Functions ================================
  const createUnitHandler = () => {
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
            <ModifyOrganizationPositionInfoDrawerContent
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
            <ViewOrganizationPositionInfoDrawerContent
              closeDrawerHandler={closeViewDrawerHandler}
            />
          }
        />
      )}

      <CustomCard className="organization-structure-segment-content-container">
        {mockData?.length == 0 ? (
          <div className="empty-list-container">
            <img src={img} alt="empty-place-holder" width="97" height="59" />

            <p className="empty-text">هنوز هیچ سمتی سازمانی ایجاد نکرده‌اید..</p>
            <div>
              <CustomButton
                type="primary"
                onClick={createUnitHandler}
                icon={<PiPlusLight size={16} />}
                iconPlacement="end"
              >
                افزودن اطلاعات سمت سازمانی
              </CustomButton>
            </div>
          </div>
        ) : (
          <div className="modify-business-list-container">
            <CustomDivider text={"سمت سازمانی"} />
            <CustomTable<PositionOrganizationSegmentContentType>
              dataSource={mockData}
              columns={PositionOrganizationSegmentContentTableModel({
                deleteHandler,
                viewHandler,
                editHandler,
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
              افزودن اطلاعات سمت سازمانی
            </CustomButton>
          </div>
        )}
      </CustomCard>
    </>
  );
};
export default PositionOrganizationSegmentContent;
