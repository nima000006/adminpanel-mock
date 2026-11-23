import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { PositionTypeSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/BusinessBaseInfoTab/helper/components/PositionTypeSegmentContent/@types/@positionTypeSegmentContent";

import PositionTypeAllocationDrawerContent from "../../drawer/PositionTypeAllocationDrawerContent/PositionTypeAllocationDrawerContent";
import BusinessBaseInfoPositionTypeTableModel from "../../models/BusinessBaseInfoPositionTypeTableModel";

const mockData: PositionTypeSegmentContentDataType[] = [
  {
    id: 1,
    unitName: "معاونت",
    presentTo: "1 از 101 شعبه",
  },
];

const PositionTypeSegmentContent = () => {
  const [isAllocationDrawerOpen, setIsAllocationDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //* ================================ Util Functions ================================
  const allocationHandler = (id: number) => {
    setIsAllocationDrawerOpen({ id, isOpen: true });
  };

  const closeAllocationDrawerHandler = () => {
    setIsAllocationDrawerOpen({ id: -1, isOpen: false });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ALLOCATION DRAWER */}
      {isAllocationDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeAllocationDrawerHandler}
          open={isAllocationDrawerOpen?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <PositionTypeAllocationDrawerContent
              closeDrawerHandler={closeAllocationDrawerHandler}
            />
          }
        />
      )}
      <div className="business-base-info-container">
        <div>
          <CustomDivider text={"انواع سمت"} />

          <CustomTable<PositionTypeSegmentContentDataType>
            dataSource={mockData}
            columns={BusinessBaseInfoPositionTypeTableModel({ allocationHandler })}
            pagination={paginationConfig}
            {...TABLE_PROPS(mockData?.length)}
            // loading={}
          />
        </div>
      </div>
    </>
  );
};
export default PositionTypeSegmentContent;
