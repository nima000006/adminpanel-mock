import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import {
  PiCookingPotLight,
  PiForkKnifeDuotone,
  PiMoneyLight,
  PiReceiptDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";

import { FoodPerformanceContentProps } from "./@types/foodPerformanceContent";
import PerformanceCard from "./components/PerformanceCard/PerformanceCard";
import SecondPerformanceCard from "./components/SecondPerformanceCard/SecondPerformanceCard";

const foodPerformanceOptions = [
  {
    id: 1,
    title: "وضعیت سفارشات",
  },
  {
    id: 2,
    title: "کاربران و عملکرد سرویس تغذیه",
  },
  {
    id: 3,
    title: "سلف‌ها و ظرفیت عملیاتی",
  },
  {
    id: 4,
    title: "قیمت‌گذاری و درآمد",
  },
];

const FoodPerformanceContent = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: FoodPerformanceContentProps) => {
  const [cardList, setCardList] = useState(foodPerformanceOptions[0].id);

  const [form] = Form.useForm();

  // Wrapper function to handle null return from createBodyParams
  const getBodyParams = (): { [x: number]: any } | undefined => {
    const params = createBodyParams();
    return (params ?? undefined) as { [x: number]: any } | undefined;
  };

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldsValue({
      performance: selectDefaultValueGenerator(foodPerformanceOptions[0]),
    });
  }, []);

  //* ================================ Util Functions ================================
  const changePerformanceUiHandler = (e: string) => {
    setCardList(+e);
  };

  return (
    <div className="flex flex-col gap-10">
      <Form form={form}>
        <Row>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomSelect
              options={foodPerformanceOptions}
              label=""
              name="performance"
              onChange={(e) => changePerformanceUiHandler(e as string)}
            />
          </Col>
        </Row>
      </Form>
      <div className="grid grid-cols-4 gap-6 max-[1480px]:grid-cols-3 max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1">
        {/* وضعیت سفارشات */}
        {cardList === 1 && (
          <>
            <PerformanceCard
              title={"کل سفارشات"}
              icon={<PiReceiptDuotone size={24} color="#8C8C8C" />}
              unit={"سفارش"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={67}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <SecondPerformanceCard
              title={"سفارشات فردا"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"سفارش"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={64}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <SecondPerformanceCard
              title={"سفارشات امروز"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"سفارش"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={63}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <SecondPerformanceCard
              title={"سفارشات از ابتدای ترم جاری"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"سفارش"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={65}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <SecondPerformanceCard
              title={"شعب / واحد دارای سفارش امروز"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={" شعبه / واحد"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={66}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          </>
        )}

        {/* کاربران و عملکرد سرویس تغذیه */}
        {cardList === 2 && (
          <>
            <PerformanceCard
              title={"کاربران فعال سرویس"}
              icon={<PiUsersThreeDuotone size={24} color="#8C8C8C" />}
              unit={"سفارش"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={68}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <PerformanceCard
              title={"میانگین سفارش هر کاربر"}
              icon={<PiReceiptDuotone size={24} color="#8C8C8C" />}
              unit={"سفارش"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={69}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <PerformanceCard
              title={"نرخ تحویل موفق "}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"%"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={70}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <PerformanceCard
              title={"نرخ عودت وجه"}
              icon={<PiMoneyLight size={24} color="#8C8C8C" />}
              unit={"%"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={74}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          </>
        )}
        {/* سلف‌ها و ظرفیت عملیاتی */}
        {cardList === 3 && (
          <>
            <SecondPerformanceCard
              title={"سلف‌ها"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"سلف"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={71}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <SecondPerformanceCard
              title={"سلف‌های فعال"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"سلف"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={72}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <SecondPerformanceCard
              title={"ظرفیت پذیرش سلف‌ها"}
              icon={<PiForkKnifeDuotone size={24} color="#8C8C8C" />}
              unit={"نفر"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={73}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          </>
        )}
        {cardList === 4 && (
          <>
            <PerformanceCard
              title={"درآمد کل"}
              icon={<PiMoneyLight size={24} color="#8C8C8C" />}
              unit={"ریال"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={75}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <PerformanceCard
              title={"میانگین قیمت غذا‌ها"}
              icon={<PiCookingPotLight size={24} color="#8C8C8C" />}
              unit={"ریال"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={76}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <PerformanceCard
              title={"گرانترین غذا"}
              icon={<PiCookingPotLight size={24} color="#8C8C8C" />}
              unit={"ریال"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={77}
              isFormValid={isFormValid}
              validateData={validateData}
            />
            <PerformanceCard
              title={"ارزانترین غذا"}
              icon={<PiCookingPotLight size={24} color="#8C8C8C" />}
              unit={"ریال"}
              createBodyParams={getBodyParams}
              triggerItems={triggerItems}
              reportId={78}
              isFormValid={isFormValid}
              validateData={validateData}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default FoodPerformanceContent;
