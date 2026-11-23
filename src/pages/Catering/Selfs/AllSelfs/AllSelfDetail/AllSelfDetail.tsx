import { Tabs } from "antd";
import { Link } from "react-router";

import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_SELF_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetDetailAllSelfQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";

import CateringAllSelfsContracts from "./helper/components/CateringAllSelfsContracts/CateringAllSelfsContracts";
import CateringAllSelfsDetail from "./helper/components/CateringAllSelfsDetail/CateringAllSelfsDetail";
import CateringAllSelfsFoodSchedule from "./helper/components/CateringAllSelfsFoodSchedule/CateringAllSelfsFoodSchedule";
import CateringAllSelfsHistory from "./helper/components/CateringAllSelfsHistory/CateringAllSelfsHistory";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const AllDetailSelf = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const { data: allSelfDetail } = useGetDetailAllSelfQuery(
    {
      id: Number(params?.id),
    },
    {
      skip: !params?.id,
    }
  );

  //? ================================ Handlers ================================
  const onTabChange = (tab: string) => {
    setSearchParams({
      ...(params?.id && { id: params.id }),
      tab,
    });
  };

  //? ================================ breadcrumb items ================================
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_SELF_LIST_PAGE_ROUTE}>سلف‌ها</Link>,
      },
      ...(allSelfDetail?.title
        ? [
            {
              title: allSelfDetail?.title,
            },
          ]
        : []),
    ],
  });

  //? ================================ components ================================

  const tabsItems = [
    {
      label: "جزئیات سلف",
      children: <CateringAllSelfsDetail />,
      key: "1",
    },
    {
      label: "برنامه‌غذایی",
      children: <CateringAllSelfsFoodSchedule />,
      key: "2",
    },
    {
      label: "قراردادها",
      children: <CateringAllSelfsContracts />,
      key: "3",
    },
    {
      label: "تاریخچه تغییرات",
      children: <CateringAllSelfsHistory />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="all-detail-self-page-container"
      activeKey={activeKey}
      onChange={onTabChange}
      destroyOnHidden
    />
  );
};

export default AllDetailSelf;
