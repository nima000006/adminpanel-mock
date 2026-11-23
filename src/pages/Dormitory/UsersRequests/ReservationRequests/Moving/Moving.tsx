import { useState } from "react";

import { Form } from "antd";
import { FaArrowLeft } from "react-icons/fa6";

import { CustomButton } from "@components/CustomInputs";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import EvacuationFinancialCalculationStep from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationFinancialCalculationStep/EvacuationFinancialCalculationStep";
import EvacuationSettlementStep from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/components/EvacuationSettlementStep/EvacuationSettlementStep";
import { getActiveEvacuationMock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/mock/evacuationMock";
import { getActiveEvacuationSettlementMock } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/mock/evacuationSettlementMock";
import FinalApprovalStep from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/FinalApprovalStep";
import { FINAL_APPROVAL_MOCK } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinalApprovalStep/helper/mock/finalApprovalMock";
import FinancialCalculationNewResidenceStep from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinancialCalculationNewResidenceStep/FinancialCalculationNewResidenceStep";
import { NEW_RESIDENCE_FINANCIAL_MOCK } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinancialCalculationNewResidenceStep/helper/mock/newResidenceFinancialMock";
import SelectNewResidenceStep from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/SelectNewResidenceStep";

const Moving = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm<any>();

  const mockData = getActiveEvacuationMock();
  const settlementMock = getActiveEvacuationSettlementMock();

  useTitle({
    breadcrumbItems: [
      {
        title: "درخواست های رزرو",
      },
      {
        title: "درخواست‌ محمد محمدی",
      },
      {
        title: "جابه‌جایی",
      },
    ],
  });

  const stepsItem = [
    {
      id: "0",
      children: <EvacuationFinancialCalculationStep form={form} data={mockData} />,
    },
    {
      id: "1",
      children: <EvacuationSettlementStep data={settlementMock} />,
    },
    {
      id: "2",
      children: <SelectNewResidenceStep form={form} />,
    },
    {
      id: "3",
      children: (
        <FinancialCalculationNewResidenceStep
          form={form}
          data={NEW_RESIDENCE_FINANCIAL_MOCK}
        />
      ),
    },
    {
      id: "4",
      children: <FinalApprovalStep data={FINAL_APPROVAL_MOCK} />,
    },
  ];

  //* ================================ Util Functions ================================
  const nextClickHandler = async () => {
    setCurrent((prev) => prev + 1);
  };

  const backClickHandler = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form} className="flex min-h-[calc(100dvh-16rem)] flex-col gap-10">
      <CustomSteps
        current={current}
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "محاسبه مالی اقامت فعلی",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "تسویه اقامت فعلی",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "انتخاب اقامت‌جدید",
          },
          {
            status: stepStatusCreator(current, 3),
            title: "محاسبه مالی اقامت جدید",
          },
          {
            status: stepStatusCreator(current, 4),
            title: "تایید نهایی ",
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
          {current !== 4 ? "ثبت و ادامه" : "ثبت و تایید نهایی"}
        </CustomButton>
      </div>
    </Form>
  );
};

export default Moving;
