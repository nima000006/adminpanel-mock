import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_CONTRACTS_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetMyRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import MyContractsDetailContract from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailContract/MyContractsDetailContract";
import MyContractsDetailFoods from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailFoods/MyContractsDetailFoods";
import MyContractsDetailHistory from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailHistory/MyContractsDetailHistory";
import MyContractsDetailSelf from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailSelf/MyContractsDetailSelf";
import MyContractsDetailVendor from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailVendor/MyContractsDetailVendor";

const MyContractsDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const {
    data: myContractDetail,
    isLoading,
    isFetching,
  } = useGetMyRequestContractsViewQuery(
    {
      id: Number(params?.id),
    },
    {
      skip: !params?.id,
      refetchOnMountOrArgChange: true,
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
        title: <Link to={CATERING_MY_CONTRACTS_LIST_PAGE_ROUTE}>قراردادهای من</Link>,
      },
      ...(myContractDetail?.title
        ? [
            {
              title: myContractDetail?.title,
            },
          ]
        : []),
    ],
  });

  //? ================================ components ================================
  const tabsItems = [
    {
      label: "جزئیات قرارداد",
      children: (
        <MyContractsDetailContract
          contractDetail={myContractDetail}
          isLoading={isLoading || isFetching}
        />
      ),
      key: "1",
    },
    {
      label: "غذاها",
      children: <MyContractsDetailFoods />,
      key: "2",
    },
    {
      label: "جزئیات سلف",
      children: <MyContractsDetailSelf restaurantId={myContractDetail?.restaurantId} />,
      key: "3",
    },
    {
      label: "جزئیات تامین کننده",
      children: <MyContractsDetailVendor vendorId={myContractDetail?.vendorId} />,
      key: "4",
    },
    {
      label: "تاریخچه تغییرات",
      children: <MyContractsDetailHistory />,
      key: "5",
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

export default MyContractsDetail;
