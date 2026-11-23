import { useEffect } from "react";

import { Tabs } from "antd";

import AccusationAndViolationsInfo from "./helper/components/AccusationAndViolationsInfo/AccusationAndViolationsInfo";
import AccusationChangeRecords from "./helper/components/AccusationChangeRecords/AccusationChangeRecords";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { useGetDetailsAccusationAndViolationsMutation } from "../../../../../infrastructure/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_detailsAccusationAndViolations.scss";

const DetailsAccusationAndViolations = () => {
  const id = new URLSearchParams(location.search).get("id");
  useTitle({ text: `اتهام  ${id}` });

  //? ================================  Api Calls ================================
  const [getData, { data: accusationData, isLoading: isAccusationDataLoading }] =
    useGetDetailsAccusationAndViolationsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData({ _data_: { id: id?.toString() } });
    }
  }, [id]);

  const tabsItems = [
    {
      label: "اطلاعات اتهام / تخلف",
      children: (
        <div>
          <AccusationAndViolationsInfo data={accusationData?.data} />
        </div>
      ),
      key: "1",
    },
    {
      label: "سوابق تغییر",
      children: (
        <div>
          <AccusationChangeRecords />
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
    <CustomCard
      className="committee-details-accusation-violations-container"
      loading={isAccusationDataLoading}
    >
      <Tabs
        type="card"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="details-accusation-violations-tabs-container"
      />
    </CustomCard>
  );
};
export default DetailsAccusationAndViolations;
