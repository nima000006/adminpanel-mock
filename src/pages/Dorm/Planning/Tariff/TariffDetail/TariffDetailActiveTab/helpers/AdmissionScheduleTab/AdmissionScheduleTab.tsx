import { useEffect, useState } from "react";

import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetTariffAdmissionScheduleTabCountQuery,
  useLazyGetTariffAdmissionScheduleTabQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";

import {
  getTariffAdmissionScheduleTabData,
  getTariffAdmissionScheduleTabResponse,
} from "./@types/@admissionScheduleTab";
import AdmissionScheduleActiveSection from "../../../helper/AdmissionScheduleActiveSection/AdmissionScheduleActiveSection";

const TABLE_DEPENDENCIES = ["name"];

const AdmissionScheduleTab = () => {
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
    <AdmissionScheduleActiveSection
      loading={admissionScheduleTabLoading || admissionScheduleTabCountLoading}
      countData={admissionScheduleTabCountData?.data}
      dataSource={dataSource}
    />
  );
};

export default AdmissionScheduleTab;
