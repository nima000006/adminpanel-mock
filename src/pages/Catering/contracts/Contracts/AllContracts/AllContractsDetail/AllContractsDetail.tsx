import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_ALL_CONTRACTS_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetAllRequestContractsViewQuery } from "@infra/states/redux/Apis/catering/contracts/contractsApi";
import AllContractsDetailContract from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailContract/AllContractsDetailContract";
import AllContractsDetailFoods from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailFoods/AllContractsDetailFoods";
import AllContractsDetailHistory from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailHistory/AllContractsDetailHistory";
import AllContractsDetailSelf from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailSelf/AllContractsDetailSelf";
import AllContractsDetailVendor from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsDetail/helper/components/AllContractsDetailVendor/AllContractsDetailVendor";

const AllContractsDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const {
    data: allContractDetail,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllRequestContractsViewQuery(
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
        title: <Link to={CATERING_ALL_CONTRACTS_LIST_PAGE_ROUTE}>قراردادها</Link>,
      },
      ...(allContractDetail?.title
        ? [
            {
              title: allContractDetail?.title,
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
        <AllContractsDetailContract
          contractDetail={allContractDetail}
          isLoading={isLoading || isFetching}
          onRefetch={refetch}
        />
      ),
      key: "1",
    },
    {
      label: "غذاها",
      children: <AllContractsDetailFoods />,
      key: "2",
    },
    {
      label: "جزئیات سلف",
      children: <AllContractsDetailSelf restaurantId={allContractDetail?.restaurantId} />,
      key: "3",
    },
    {
      label: "جزئیات تامین کننده",
      children: <AllContractsDetailVendor vendorId={allContractDetail?.vendorId} />,
      key: "4",
    },
    {
      label: "تاریخچه تغییرات",
      children: <AllContractsDetailHistory />,
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

export default AllContractsDetail;
