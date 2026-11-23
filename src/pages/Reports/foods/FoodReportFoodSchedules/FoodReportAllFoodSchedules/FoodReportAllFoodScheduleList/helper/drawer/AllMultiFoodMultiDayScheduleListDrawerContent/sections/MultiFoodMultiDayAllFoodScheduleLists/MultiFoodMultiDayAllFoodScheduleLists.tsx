import { Collapse } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  dataPlaceHolder,
  dayNameGenerator,
  randomIdGenerator,
} from "@infra/helpers/utils";

import { MultiFoodMultiDayAllFoodScheduleListsProps } from "./@types/@multiFoodMultiDayAllFoodScheduleLists";
import AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel from "../../../../models/MultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel/MultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel";
import "./_multiFoodMultiDayAllFoodScheduleLists.scss";

const MultiFoodMultiDayAllFoodScheduleLists = ({
  foodInfo,
  dates,
}: MultiFoodMultiDayAllFoodScheduleListsProps) => {
  //* ================================ Util Functions ================================

  return (
    <div className="multi-food-multi-day-all-food-schedule-lists">
      <CustomDivider text="لیست برنامه‌های غذایی" />
      <Collapse
        items={dates?.map((item) => {
          const uniqueId = randomIdGenerator();

          const selectFoods = foodInfo?.filter((food) => food?.date === item?.toJSON());

          return {
            key: uniqueId,
            label: (
              <div className="collapse-label-container" key={uniqueId}>
                <div className="collapse-label">
                  <CustomTag>{dayNameGenerator(item?.toISOString())}</CustomTag>
                  <CustomTag>{`${dataPlaceHolder({ data: item?.toISOString(), isDate: true })}`}</CustomTag>
                </div>
                <div className="collapse-label">
                  <CustomTag color={selectFoods?.length !== 0 ? "green" : "red"}>
                    {selectFoods?.length !== 0 ? "تعریف شده" : "تعریف نشده"}
                  </CustomTag>
                </div>
              </div>
            ),
            children: (
              <>
                {selectFoods?.length !== 0 ? (
                  <CustomTable
                    dataSource={selectFoods}
                    columns={AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel()}
                    className="multi-food-multi-day-all-food-schedule-list-add-food-table"
                    rowKey="id"
                    pagination={false}
                    {...TABLE_PROPS(selectFoods?.length)}
                  />
                ) : (
                  <CustomEmpty />
                )}
              </>
            ),
          };
        })}
        defaultActiveKey={[]}
      />
    </div>
  );
};

export default MultiFoodMultiDayAllFoodScheduleLists;
