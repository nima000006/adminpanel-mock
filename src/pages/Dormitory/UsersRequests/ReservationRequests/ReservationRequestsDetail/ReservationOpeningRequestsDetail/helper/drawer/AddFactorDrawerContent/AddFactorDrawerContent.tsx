import { useState } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import {
  AddFactorDrawerContentProps,
  AddFactorFirstStepDrawerContentForm,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/@types/@addFactorDrawerContentTypes";
import AddFactorFirstStepDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/helper/components/AddFactorFirstStepDrawerContent/AddFactorFirstStepDrawerContent";
import AddFactorSecondStepDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/helper/components/AddFactorSecondStepDrawerContent/AddFactorSecondStepDrawerContent";
import AddFactorThirdStepDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/helper/drawer/AddFactorDrawerContent/helper/components/AddFactorThirdStepDrawerContent/AddFactorThirdStepDrawerContent";

const AddFactorDrawerContent = ({ closeDrawerHandler }: AddFactorDrawerContentProps) => {
  const [current, setCurrent] = useState(0);

  const [form] = Form.useForm<AddFactorFirstStepDrawerContentForm>();

  //* ================================ Util Functions ================================
  // btn handler
  const nextBtnHandler = () => {
    setCurrent((prev) => prev + 1);
  };
  const backBtnHandler = () => {
    setCurrent((prev) => prev - 1);
  };

  const submitBtnHandler = () => {
    toast.success(`شناسه فاکتور  ${4545151}با موفقیت ایجاد شد.`, {
      toastId: `شناسه فاکتور  ${4545151}با موفقیت ایجاد شد.`,
    });

    closeDrawerHandler();
  };

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children: <AddFactorFirstStepDrawerContent form={form} />,
    },
    {
      id: "2",
      children: <AddFactorSecondStepDrawerContent form={form} />,
    },
    {
      id: "3",
      children: <AddFactorThirdStepDrawerContent />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="تحویل اقامتگاه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton loading={false} onClick={backBtnHandler}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              loading={false}
              onClick={current === 0 || current === 1 ? nextBtnHandler : submitBtnHandler}
            >
              {current === 0 || current === 1 ? "تایید و ادامه" : "تایید و ثبت فاکتور"}
            </CustomButton>
          </div>
        }
      />
      <CustomSteps
        current={current}
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات فاکتور",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "تنظیمات مالی",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "تایید نهایی",
          },
        ]}
      />
      {stepsItem[current].children}
    </div>
  );
};

export default AddFactorDrawerContent;
