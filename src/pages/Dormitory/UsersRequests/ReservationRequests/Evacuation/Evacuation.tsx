import { useState } from "react";

import { Form } from "antd";
import { FaArrowLeft } from "react-icons/fa6";

import { CustomButton } from "@components/CustomInputs";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import EvacuationFinancialCalculationStep from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationFinancialCalculationStep/EvacuationFinancialCalculationStep";
import EvacuationSettlementStep from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationSettlementStep/EvacuationSettlementStep";
import { EvacuationFinancialFormValues } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";
import { getActiveEvacuationMock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/mock/evacuationMock";
import { getActiveEvacuationSettlementMock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/mock/evacuationSettlementMock";

const Evacuation = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<EvacuationFinancialFormValues>();
  const mockData = getActiveEvacuationMock();
  const settlementMock = getActiveEvacuationSettlementMock();

  const stepsItem = [
    {
      id: "0",
      children: <EvacuationFinancialCalculationStep form={form} data={mockData} />,
    },
    {
      id: "1",
      children: <EvacuationSettlementStep data={settlementMock} />,
    },
  ];

  //* ================================ Util Functions ================================
  const nextClickHandler = async () => {
    if (current === 0) {
      await form.validateFields();
      setCurrent(1);
      return;
    }
  };

  const backClickHandler = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex min-h-[calc(100dvh-16rem)] flex-col gap-10"
      initialValues={{
        selectedAmount: mockData.selectedAmountRial,
        skipCharge: mockData.skipChargeDefault,
      }}
    >
      <CustomSteps
        current={current}
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "محاسبه مالی",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "تسویه و تایید نهایی",
          },
        ]}
      />

      {stepsItem[current].children}

      <div className="mt-auto flex justify-end gap-4">
        <CustomButton onClick={backClickHandler}>
          {current === 0 ? "انصراف" : "بازگشت"}
        </CustomButton>
        <CustomButton
          type="primary"
          onClick={nextClickHandler}
          icon={<FaArrowLeft />}
          iconPlacement="end"
        >
          {current === 0 ? "ثبت و ادامه" : "ثبت و تایید نهایی"}
        </CustomButton>
      </div>
    </Form>
  );
};

export default Evacuation;
