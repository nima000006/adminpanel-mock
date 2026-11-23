import { Tabs } from "antd";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_detailsAccusationCategories.scss";
import CategoriesInfo from "./helper/components/CategoriesInfo/CategoriesInfo";
import CategoriesChangeRecords from "./helper/components/ChangeRecords/CategoriesChangeRecords";

const DetailsAccusationCategories = () => {
  const type = new URLSearchParams(location.search).get("type");
  useTitle({ text: `دسته بندی ${type}` });

  const tabsItems = [
    {
      label: "اطلاعات دسته بندی",
      children: (
        <div>
          <CategoriesInfo />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <CategoriesChangeRecords />
        </div>
      ),
      key: "2",
      disabled: true,
    },
  ];

  //* ================================ Util Functions ================================
  const onTabChange = () => {};
  const onTabEdit = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-details-accusation-categories-container">
      <Tabs
        type="card"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="details-accusation-categories-tabs-container"
      />
    </div>
  );
};
export default DetailsAccusationCategories;
