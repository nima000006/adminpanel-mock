import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_ALL_VENDOR_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useGetAllVendorViewQuery } from "@infra/states/redux/Apis/catering/vendors/vendorsApi";
import CateringAllVendorContracts from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorContracts/CateringAllVendorContracts";
import CateringAllVendorDetailTab from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorDetailTab/CateringAllVendorDetailTab";
import CateringAllVendorHistory from "@pages/Catering/Vendors/AllVendors/CateringAllVendorDetail/components/CateringAllVendorHistory/CateringAllVendorHistory";

const CateringAllVendorDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const { data: allVendorDetail } = useGetAllVendorViewQuery(
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
        title: <Link to={CATERING_ALL_VENDOR_LIST_PAGE_ROUTE}>تامین کنندگان</Link>,
      },
      ...(allVendorDetail?.title
        ? [
            {
              title: allVendorDetail?.title,
            },
          ]
        : []),
    ],
  });
  //? ================================ components ================================

  const tabsItems = [
    {
      label: "جزئیات تأمین کننده",
      children: <CateringAllVendorDetailTab />,
      key: "1",
    },
    {
      label: "قراردادها",
      children: <CateringAllVendorContracts />,
      key: "2",
    },
    {
      label: "تاریخچه تغییرات",
      children: <CateringAllVendorHistory />,
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

export default CateringAllVendorDetail;
