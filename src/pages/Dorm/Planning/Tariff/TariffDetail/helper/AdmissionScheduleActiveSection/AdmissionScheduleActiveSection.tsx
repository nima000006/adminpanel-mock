import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { ADMISSION_SCHEDULE_MSG } from "@pages/Dorm/Planning/Tariff/_shared/utils/TariffUtils";

import { AdmissionSchedulePropsType } from "./@types/admissionScheduleActiveSection";
import DormAdmissionScheduleTabTableModel from "../../TariffDetailActiveTab/helpers/Model/DormAdmissionScheduleTabTableModel";
import ActiveAdmissionScheduleDrawerContent from "../Drawers/ActiveAdmissionScheduleDrawerContent/ActiveAdmissionScheduleDrawerContent";
import "./_admissionScheduleActiveSection.scss";

const AdmissionScheduleActiveSection = ({
  loading,
  countData,
  dataSource,
}: AdmissionSchedulePropsType) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState({ isOpen: false, id: -1 });
  const { params: url, setSearchParams } = useQueryParams();

  //* ================================ Util Functions ================================
  // view btn
  const viewClickHandler = (id: string) => {
    setIsDrawerOpen({ isOpen: true, id: +id });
  };

  // drawer btn
  const closeDrawerHandler = () => {
    setIsDrawerOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDrawerOpen?.isOpen}
          className="tariff-admission-schedule-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ActiveAdmissionScheduleDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={isDrawerOpen?.id}
            />
          }
        />
      )}
      <div className="admission-schedule-active-section-container">
        <CustomAlert
          message={ADMISSION_SCHEDULE_MSG}
          type="info"
          showIcon
          className="alert"
        />
        <ToolBox
          rightSide={
            <>
              {/* //Todo[Atefeh]: uncomment when needed in the future */}
              {/* <CustomInput
                suffix={<AiOutlineSearch  />}
                placeholder="جستجو"
                hasVerticalLabel={false}
                disabled
              /> */}
              <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
                فیلتر پیشرفته
              </CustomButton>
            </>
          }
          leftSide={
            <div className="btn-wrapper">
              <CustomButton type="primary" ghost className="btn-text" disabled>
                خروجی اکسل
              </CustomButton>
            </div>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          columns={DormAdmissionScheduleTabTableModel({
            viewClickHandler: viewClickHandler,
          })}
          pagination={manualPaginationConfig({
            total: countData,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"} `}
          {...TABLE_PROPS(dataSource?.length)}
          className="dorm-admission-list-table"
        />
      </div>
    </>
  );
};

export default AdmissionScheduleActiveSection;
