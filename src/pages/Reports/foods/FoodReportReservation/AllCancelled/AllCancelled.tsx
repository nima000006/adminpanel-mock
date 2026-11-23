import { useEffect, useState } from "react";

import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { REPORT_FOOD_ALL_RESERVATION_PAGE_ROUTE } from "@infra/router/routes/reports";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import AllCanceledDaysTab from "./helper/components/AllCanceledDaysTab/AllCanceledDaysTab";
import AllFoodScheduleTab from "./helper/components/AllFoodScheduleTab/AllFoodScheduleTab";
import "./_allCancelled.scss";

const AllCancelled = () => {
  const [universityData, setUniversityData] = useState<{ id: number; title: string }[]>(
    []
  );

  const { setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={REPORT_FOOD_ALL_RESERVATION_PAGE_ROUTE}>سفارشات</Link>,
      },
      {
        title: "لغو شده‌ها",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getAllUniversity, { isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllUniversity().unwrap().then(getUniversityListSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getUniversityListSuccess = async (values: GetAllBranchesResponse) => {
    setUniversityData(values);
  };

  const tabsItems = [
    {
      label: "برنامه غذایی",
      children: (
        <AllFoodScheduleTab
          branchData={universityData}
          branchDataLoading={isUniversityDataLoading}
        />
      ),
      key: "1",
    },
    {
      label: "روز‌های لغو شده",
      children: (
        <AllCanceledDaysTab
          branchData={universityData}
          branchDataLoading={isUniversityDataLoading}
        />
      ),
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="all-order-cancelled-page-container"
      onChange={() => setSearchParams({})}
      destroyInactiveTabPane
    />
  );
};
export default AllCancelled;
