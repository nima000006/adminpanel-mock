import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_VENDOR_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetMyVendorViewQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import CateringMyVendorContracts from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorContracts/CateringMyVendorContracts";
import CateringMyVendorDetailTab from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorDetailTab/CateringMyVendorDetailTab";
import CateringMyVendorHistory from "@pages/Catering/Vendors/MyVendors/CateringMyVendorDetail/components/CateringMyVendorHistory/CateringMyVendorHistory";

const CateringMyVendorDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const { data: myVendorDetail } = useGetMyVendorViewQuery(
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
        title: <Link to={CATERING_MY_VENDOR_LIST_PAGE_ROUTE}>تامین کنندگان</Link>,
      },
      ...(myVendorDetail?.title
        ? [
            {
              title: myVendorDetail?.title,
            },
          ]
        : []),
    ],
  });
  //? ================================ components ================================

  const tabsItems = [
    {
      label: "جزئیات تأمین کننده",
      children: <CateringMyVendorDetailTab />,
      key: "1",
    },
    {
      label: "قراردادها",
      children: <CateringMyVendorContracts />,
      key: "2",
    },
    {
      label: "تاریخچه تغییرات",
      children: <CateringMyVendorHistory />,
      key: "3",
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

export default CateringMyVendorDetail;
