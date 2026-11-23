import { Tabs } from "antd";
import { Link } from "react-router";

import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_SELF_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetDetailMySelfsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";

import CateringMySelfsContracts from "./helper/components/CateringMySelfsContracts/CateringMySelfsContracts";
import CateringMySelfsDetail from "./helper/components/CateringMySelfsDetail/CateringMySelfsDetail";
import CateringMySelfsFoodSchedule from "./helper/components/CateringMySelfsFoodSchedule/CateringMySelfsFoodSchedule";
import CateringMySelfsHistory from "./helper/components/CateringMySelfsHistory/CateringMySelfsHistory";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const MyDetailSelf = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const { data: mySelfDetail } = useGetDetailMySelfsQuery(
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
        title: <Link to={CATERING_MY_SELF_LIST_PAGE_ROUTE}>سلف‌ها</Link>,
      },
      ...(mySelfDetail?.title
        ? [
            {
              title: mySelfDetail?.title,
            },
          ]
        : []),
    ],
  });

  //? ================================ components ================================

  const tabsItems = [
    {
      label: "جزئیات سلف",
      children: <CateringMySelfsDetail />,
      key: "1",
    },
    {
      label: "برنامه‌غذایی",
      children: <CateringMySelfsFoodSchedule />,
      key: "2",
    },
    {
      label: "قراردادها",
      children: <CateringMySelfsContracts />,
      key: "3",
    },
    {
      label: "تاریخچه تغییرات",
      children: <CateringMySelfsHistory />,
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      activeKey={activeKey}
      onChange={onTabChange}
      destroyOnHidden
    />
  );
};

export default MyDetailSelf;
