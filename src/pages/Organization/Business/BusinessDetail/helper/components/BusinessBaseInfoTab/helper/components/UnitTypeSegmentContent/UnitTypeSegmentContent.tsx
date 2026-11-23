import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { allocationHandlerDataTypes } from "@pages/Organization/Business/BusinessDetail/helper/components/BusinessBaseInfoTab/helper/components/UnitTypeSegmentContent/@types/@unitTypeSegmentContent";

import UnitTypeAllocationDrawerContent from "../../drawer/UnitTypeAllocationDrawerContent/UnitTypeAllocationDrawerContent";
import BusinessBaseInfoTableModel from "../../models/BusinessBaseInfoTableModel";

const mockData: allocationHandlerDataTypes[] = [
  {
    id: 1,
    unitName: "معاونت",
    presentTo: "1 از 101 شعبه",
  },
];

const UnitTypeSegmentContent = () => {
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
            <UnitTypeAllocationDrawerContent
              closeDrawerHandler={closeAllocationDrawerHandler}
            />
          }
        />
      )}
      <div className="business-base-info-container">
        <div>
          <CustomDivider text={"انواع واحد"} />

          <CustomTable<allocationHandlerDataTypes>
            dataSource={mockData}
            columns={BusinessBaseInfoTableModel({ allocationHandler })}
            pagination={paginationConfig}
            {...TABLE_PROPS(mockData?.length)}
            // loading={}
          />
        </div>
      </div>
    </>
  );
};
export default UnitTypeSegmentContent;
