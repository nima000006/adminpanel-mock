import { useEffect, useState } from "react";

import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetTariffAdmissionScheduleTabCountQuery,
  useLazyGetTariffAdmissionScheduleTabQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";

import AdmissionScheduleActiveSection from "../../../helper/AdmissionScheduleActiveSection/AdmissionScheduleActiveSection";
import {
  getTariffAdmissionScheduleTabData,
  getTariffAdmissionScheduleTabResponse,
} from "../../../TariffDetailActiveTab/helpers/AdmissionScheduleTab/@types/@admissionScheduleTab";
import "./_tariffInActiveAdmissionScheduleTab.scss";

const TABLE_DEPENDENCIES = ["name"];

const TariffInActiveAdmissionScheduleTab = () => {
  const [dataSource, setDataSource] = useState<getTariffAdmissionScheduleTabData[] | []>(
    []
  );
  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  // get table data
  const [getAdmissionScheduleTab, { isFetching: admissionScheduleTabLoading }] =
    useLazyGetTariffAdmissionScheduleTabQuery();

  const [
    getAdmissionScheduleTabCount,
    { data: admissionScheduleTabCountData, isFetching: admissionScheduleTabCountLoading },
  ] = useLazyGetTariffAdmissionScheduleTabCountQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, [
    url?.id,
    url?.pageSize,
    url?.page,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  //* ================================ Util Functions ================================
  // Success
  const getAdmissionListSuccess = async (
    values: getTariffAdmissionScheduleTabResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  const getListData = () => {
    getAdmissionScheduleTab({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      priceListId_EQ: +url?.id,
      title_LIKE: url?.name,
    })
      .unwrap()
      .then(getAdmissionListSuccess);
    getAdmissionScheduleTabCount({ priceListId_EQ: +url?.id, title_LIKE: url?.name });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-inActive-admission-schedule-tab-container">
      {/* //Todo[atefeh]:delete if not needed in the future */}
      {/*  <CustomAlert message={ADMISSION_SCHEDULE_MSG} type="info" showIcon />
      <ToolBox
        rightSide={
          <>
            <CustomInput
              suffix={<AiOutlineSearch  />}
              placeholder="جستجو"
              hasVerticalLabel={false}
              disabled
            />
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
        loading={admissionScheduleTabLoading || admissionScheduleTabCountLoading}
        columns={InActiveAdmissionScheduleTableModel()}
        pagination={manualPaginationConfig({
          total: admissionScheduleTabCountData?.data,
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
        className="dorm-admission-list-table"
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(dataSource?.length)}  
       /> */}
      <AdmissionScheduleActiveSection
        loading={admissionScheduleTabLoading || admissionScheduleTabCountLoading}
        countData={admissionScheduleTabCountData?.data}
        dataSource={dataSource}
      />
    </div>
  );
};

export default TariffInActiveAdmissionScheduleTab;
