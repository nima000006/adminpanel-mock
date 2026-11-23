import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CATERING_MY_FOOD_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useViewMyFoodQuery } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import CateringMyFoodDetailTab from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodDetailTab/CateringMyFoodDetailTab";
import CateringMyFoodHistory from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodDetail/helper/components/CateringMyFoodHistory/CateringMyFoodHistory";

const CateringMyFoodDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================  Api Calls ================================
  const { data: myFoodDetail } = useViewMyFoodQuery(
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
        title: <Link to={CATERING_MY_FOOD_LIST_PAGE_ROUTE}>?????</Link>,
      },
      ...(myFoodDetail?.title
        ? [
            {
              title: myFoodDetail?.title,
            },
          ]
        : []),
    ],
  });
  //? ================================ components ================================

  const tabsItems = [
    {
      label: "?????? ???",
      children: <CateringMyFoodDetailTab />,
      key: "1",
    },
    {
      label: "??????? ???????",
      children: <CateringMyFoodHistory />,
      key: "2",
    },
  ];

  //* ???????????????????????????? Main TSX ???????????????????????????? */
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

export default CateringMyFoodDetail;
