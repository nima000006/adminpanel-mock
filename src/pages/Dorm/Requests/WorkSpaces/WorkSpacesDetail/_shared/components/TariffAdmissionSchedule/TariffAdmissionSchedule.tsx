import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAdmissionByPriceListQuery,
  useLazyGetAdmissionListByPriceCountQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  AdmissionListData,
  GetAdmissionListResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionList/_shared/@types/@admissionListTab";
import { WorkSpaceTariffListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";

import { WORK_SPACES_ADMISSION_SCHEDULE_MSG } from "../../utils/WorkSpaceDetailUtils";
import TariffAdmissionScheduleTableModel from "./helper/models/TariffAdmissionScheduleTableModel/TariffAdmissionScheduleTableModel";
import "./_tariffAdmissionSchedule.scss";

const type = 1; // backend said to send 1

const TariffAdmissionSchedule = ({ data }: { data: WorkSpaceTariffListType[] }) => {
  const [dataSource, setDataSource] = useState<AdmissionListData[] | []>([]);
  const { params: url, setSearchParams } = useQueryParams();
  const priceId = data[0]?.id;

  //? ================================  Api Calls ================================
  const [getAdmissionList, { isFetching: admissionListLoading }] =
    useLazyGetAdmissionByPriceListQuery();

  const [
    getAdmissionListCount,
    { data: admissionListCountData, isFetching: admissionListCountLoading },
  ] = useLazyGetAdmissionListByPriceCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [type, url?.pageSize, url?.page]);

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAdmissionList({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      recordStatus_EQ: type,
      priceListId_EQ: priceId,
    })
      .unwrap()
      .then(getAdmissionListSuccess);
    getAdmissionListCount({ type, priceId });
  };

  // Success
  const getAdmissionListSuccess = async (values: GetAdmissionListResponse) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="work-spaces-tariff-admission-schedule-container">
      <CustomAlert message={WORK_SPACES_ADMISSION_SCHEDULE_MSG} type="info" showIcon />
      <ToolBox
        rightSide={
          <CustomButton type="primary" icon={<AiOutlineFilter />} disabled>
            فیلتر پیشرفته
          </CustomButton>
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
        loading={admissionListLoading || admissionListCountLoading}
        columns={TariffAdmissionScheduleTableModel()}
        pagination={manualPaginationConfig({
          total: admissionListCountData?.data,
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
  );
};

export default TariffAdmissionSchedule;
