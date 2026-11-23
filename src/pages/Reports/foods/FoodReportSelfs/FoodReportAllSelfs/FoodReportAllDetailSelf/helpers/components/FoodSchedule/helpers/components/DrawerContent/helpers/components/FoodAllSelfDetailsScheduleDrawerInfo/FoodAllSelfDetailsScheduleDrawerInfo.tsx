import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { FoodScheduleDetailData } from "@pages/Food/FoodSchedules/AllFoodSchedules/AllFoodScheduleDetail/helper/components/FoodSchedule/@types/@foodScheduleTab";

const FoodAllSelfDetailsScheduleDrawerInfo = ({
  data,
}: {
  data: FoodScheduleDetailData | null;
}) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="تاریخ برنامه غذایی"
        value={data?.reserveDate}
        isDate
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="سلف"
        value={data?.productContractRestaurantTitle}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="قرارداد"
        value={data?.productContractTitle}
      />
      <SingleVerticalWithCol xl={8} lg={8} label="وعده" value={data?.mealName} />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نوع برنامه غذایی"
        value={
          data?.requestType === 0
            ? "دانشجویی"
            : data?.requestType === 1
              ? "آزاد"
              : "روزفروش"
        }
      />
      <SingleVerticalWithCol xl={8} lg={8} label="غذا" value={data?.productTitle} />

      <SingleVerticalWithCol
        span={24}
        label="واحدهای دانشگاهی"
        value={data?.branches?.map((item) => item.branchName)?.join(" - ")}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="تخفیف"
        value={data?.discount?.toString()}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="قیمت (ريال)"
        value={data?.basePrice?.toString()}
        isPrice
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="حداکثر سفارش"
        value={data?.maxTotalPerPerson?.toString()}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="محدودیت در تعداد"
        value={data?.limitedCount ? "دارای محدودیت" : "بدون محدودیت"}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="تعداد کل غذا"
        value={data?.maxCount?.toString()}
      />
    </Row>
  );
};
export default FoodAllSelfDetailsScheduleDrawerInfo;
