import { Col, Form, Row } from "antd";

import { CustomButton, CustomInputNumber } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { EvacuationSystemicPercentageDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationSystemicPercentageDrawerContent/@types/@evacuationSystemicPercentageDrawerContentProps";

const EvacuationSystemicPercentageDrawerContent = ({
  closeDrawerHandler,
}: EvacuationSystemicPercentageDrawerContentProps) => {
  //* ================================ Util Functions ================================
  const selectHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="محاسبه درصد سیستمی"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton loading={false} onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton type="primary" loading={false} onClick={selectHandler}>
              انتخاب به‌عنوان مبلغ منتخب
            </CustomButton>
          </div>
        }
      />

      <Form className="flex flex-col gap-6 p-10">
        <div className="bg-neutral-2 flex flex-col items-center justify-center gap-2 rounded-lg p-2">
          <div className="text-neutral-10">
            اگر ۱۰۰٪ مبلغ روزانه را دریافت کنید، مبلغ هزینه برای اقامت مازاد
          </div>
          <div className="text-neutral-13 font-bold">
            {dataPlaceHolder({
              data: 10000000,
              isPrice: true,
              isRial: true,
              currency: { isAvailable: true, type: "تومان" },
            })}
          </div>
          <div className="text-neutral-10"> خواهد بود.</div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-neutral-11 font-bold">بابت محاسبه هزینه روزهای مازاد </div>
          <div className="text-neutral-10 font-bold">
            چند درصد افزایش قیمت روی مبلغ روزانه در نظر می‌گیرید؟
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomInputNumber
              isPrice={true}
              type="text"
              label="درصد محاسبه قیمت روزانه"
              name="percentage"
              placeholder="100"
              suffix="%"
            />
          </Col>

          <SingleVerticalWithCol
            span={24}
            label="مبلغ محاسبه شده بر اساس درصد منتخب"
            value={"1000000"}
            isPrice={true}
            isRial={true}
            currency={{ isAvailable: true, type: "تومان" }}
          />
        </Row>
      </Form>
    </div>
  );
};

export default EvacuationSystemicPercentageDrawerContent;
