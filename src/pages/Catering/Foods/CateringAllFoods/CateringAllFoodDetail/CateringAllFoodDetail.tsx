import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_ALL_FOOD_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useViewAllFoodQuery } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import CateringAllFoodDetailTab from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodDetailTab/CateringAllFoodDetailTab";
import CateringAllFoodHistory from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/CateringAllFoodHistory";

const CateringAllFoodDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const { data: allFoodDetail } = useViewAllFoodQuery(
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
        title: <Link to={CATERING_ALL_FOOD_LIST_PAGE_ROUTE}>غذاها</Link>,
      },
      ...(allFoodDetail?.title
        ? [
            {
              title: allFoodDetail?.title,
            },
          ]
        : []),
    ],
  });
  //? ================================ components ================================

  const tabsItems = [
    {
      label: "جزئیات غذا",
      children: <CateringAllFoodDetailTab />,
      key: "1",
    },
    {
      label: "تاریخچه تغییرات",
      children: <CateringAllFoodHistory />,
      key: "2",
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

export default CateringAllFoodDetail;
