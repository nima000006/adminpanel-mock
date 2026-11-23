import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { FoodScheduleDetailData } from "../../../@types/@foodScheduleTab";

const AllFoodScheduleInfo = ({ data }: { data: FoodScheduleDetailData | null }) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="تاریخ برنامه غذایی"
        value={data?.reserveDate}
        isDate
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="سلف"
        value={data?.productContractRestaurantTitle}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="قرارداد"
        value={data?.productContractTitle}
      />
      <SingleVerticalWithCol md={12} sm={24} label="وعده" value={data?.mealName} />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="نوع برنامه غذایی"
        value={
          data?.requestType === 0
            ? "دانشجویی"
            : data?.requestType === 1
              ? "آزاد"
              : "روزفروش"
        }
      />
      <SingleVerticalWithCol md={12} sm={24} label="غذا" value={data?.productTitle} />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="قیمت (ريال)"
        value={data?.basePrice?.toString()}
        isPrice
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="تخفیف"
        value={data?.discount?.toString()}
      />

      <SingleVerticalWithCol
        span={24}
        label="واحدهای دانشگاهی"
        value={data?.branches?.map((item) => item.branchName)?.join(" - ")}
      />

      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="حداکثر سفارش"
        value={data?.maxTotalPerPerson?.toString()}
        isPrice
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="محدودیت در تعداد"
        value={data?.limitedCount ? "دارای محدودیت" : "بدون محدودیت"}
      />
      {data?.limitedCount && (
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تعداد کل غذا"
          value={data?.maxCount?.toString()}
          isPrice
        />
      )}
    </Row>
  );
};
export default AllFoodScheduleInfo;
