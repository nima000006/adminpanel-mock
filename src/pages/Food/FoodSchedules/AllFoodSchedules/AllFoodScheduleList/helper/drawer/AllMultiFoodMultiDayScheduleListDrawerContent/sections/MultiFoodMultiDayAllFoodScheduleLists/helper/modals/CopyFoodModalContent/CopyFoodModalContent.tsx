import { Radio, Space } from "antd";

import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder, dayNameGenerator } from "@infra/helpers/utils";

import { foodInfoType } from "../../../@types/@multiFoodMultiDayAllFoodScheduleLists";
import "./_copyFoodModalContent.scss";

interface CopyFoodModalContentProps {
  foodInfo: foodInfoType[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
  currentDate?: string;
}

const CopyFoodModalContent = ({
  foodInfo,
  selectedDate,
  onDateSelect,
  currentDate,
}: CopyFoodModalContentProps) => {
  if (foodInfo?.length === 0) {
    return <CustomEmpty description="در حال حاضر هیچ غذایی تعریف نشده" />;
  }

  // Check if all foods are from the current date only
  const hasOtherDates = foodInfo.some((item) => item.date !== currentDate);
  if (!hasOtherDates && currentDate) {
    return <CustomEmpty description="هیچ غذایی در سایر روزها برای کپی کردن وجود ندارد" />;
  }

  // Group food items by date
  const groupedByDate = foodInfo.reduce(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, foodInfoType[]>
  );

  // Get unique dates sorted and filter out current date
  const uniqueDates = Object.keys(groupedByDate)
    .filter((date) => date !== currentDate)
    .sort();

  return (
    <div className="copy-food-modal-content">
      <p className="copy-food-modal-content__description">
        لطفا روزی را که می‌خواهید غذاهای آن را کپی کنید، انتخاب نمایید:
      </p>
      <Radio.Group
        value={selectedDate}
        onChange={(e) => onDateSelect(e.target.value)}
        className="copy-food-modal-content__radio-group"
      >
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          {uniqueDates.map((date) => {
            const foods = groupedByDate[date];
            return (
              <Radio.Button
                key={date}
                value={date}
                className="copy-food-modal-content__radio-card"
              >
                <div className="copy-food-modal-content__card">
                  <div className="copy-food-modal-content__card-header">
                    <CustomTag color="blue">{dayNameGenerator(date)}</CustomTag>
                    <CustomTag>{dataPlaceHolder({ data: date, isDate: true })}</CustomTag>
                    <CustomTag color="green">{foods.length} غذا</CustomTag>
                  </div>
                  <div className="copy-food-modal-content__card-body">
                    {foods.map((food, index) => (
                      <div key={food.id} className="copy-food-modal-content__food-item">
                        <span className="food-item-number">{index + 1}.</span>
                        <span className="food-item-name">{food.product.title}</span>
                        <span className="food-item-divider">|</span>
                        <span className="food-item-meal">{food.meal.title}</span>
                        <span className="food-item-divider">|</span>
                        <span className="food-item-type">{food.requestType.title}</span>
                        <span className="food-item-divider">|</span>
                        <span className="food-item-price">
                          {dataPlaceHolder({
                            data: food.basePrice?.toString(),
                            isPrice: true,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Radio.Button>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default CopyFoodModalContent;
