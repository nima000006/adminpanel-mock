import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";

import {
  useLazyGetTariffAdmissionScheduleTabCountQuery,
  useLazyGetTariffAdmissionScheduleTabQuery,
} from "@infra/states/redux/Apis/dorm/planning/tariff/dormTariffApi";

import AdmissionScheduleActiveSection from "../../../helper/AdmissionScheduleActiveSection/AdmissionScheduleActiveSection";
import {
  getTariffAdmissionScheduleTabData,
  getTariffAdmissionScheduleTabResponse,
} from "../../../TariffDetailActiveTab/helpers/AdmissionScheduleTab/@types/@admissionScheduleTab";

const TABLE_DEPENDENCIES = ["name"];
const TariffAwaitingReviewAdmissionScheduleTab = () => {
  const [dataSource, setDataSource] = useState<getTariffAdmissionScheduleTabData[] | []>(
    []
  );
  const [searchParams] = useSearchParams();
  const url = Object.fromEntries([...searchParams]);

  //! get table data
  const [getAdmissionScheduleTab, { isFetching: admissionScheduleTabLoading }] =
    useLazyGetTariffAdmissionScheduleTabQuery();

  const [
    getAdmissionScheduleTabCount,
    { data: admissionScheduleTabCountData, isFetching: admissionScheduleTabCountLoading },
  ] = useLazyGetTariffAdmissionScheduleTabCountQuery();

  //! Success
  const getAdmissionListSuccess = async (
    values: getTariffAdmissionScheduleTabResponse
  ) => {
    if (values?.status === 200) {
      setDataSource(values?.data);
    }
  };

  //! Requests
  const getListData = () => {
    getAdmissionScheduleTab({
      firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
      maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
      priceListId_EQ: +url?.id,
      title_LIKE: url?.name,
    })
      .unwrap()
      .then(getAdmissionListSuccess);
    getAdmissionScheduleTabCount({ priceListId_EQ: +url?.id, title_LIKE: url.name });
  };

  useEffect(() => {
    getListData();
  }, [
    url?.id,
    url?.pageSize,
    url?.page,
    ...TABLE_DEPENDENCIES.map((item) => url?.[item]),
  ]);

  return (
    <AdmissionScheduleActiveSection
      loading={admissionScheduleTabLoading || admissionScheduleTabCountLoading}
      countData={admissionScheduleTabCountData?.data}
      dataSource={dataSource}
    />
  );
};

export default TariffAwaitingReviewAdmissionScheduleTab;
