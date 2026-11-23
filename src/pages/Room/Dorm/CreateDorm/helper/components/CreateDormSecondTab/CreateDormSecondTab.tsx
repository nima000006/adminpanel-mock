import { useEffect } from "react";

import { Button, Form } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { CreateDormSecondTabProps } from "./@types/@createDormSecondTab";
import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomTextArea from "../../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../../../components/Renderers/CustomDivider/CustomDivider";
import { useCreateDormSecondTabMutation } from "../../../../../../../infrastructure/states/redux/Apis/roomApi";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../../../infrastructure/validation/validationSchema";
import {
  EDIT,
  NEW,
} from "../../../../../../../infrastructure/VARS/globalStrings/globalStrings";
import "./_createDormSecondTab.scss";

const CreateDormSecondTab = ({
  setCurrent,
  form,
  isLoading,
}: CreateDormSecondTabProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id, mode } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    createSecondStep,
    { data: stepData, isLoading: isStepCreateLoading, isSuccess },
  ] = useCreateDormSecondTabMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (stepData?.status === 200 && isSuccess) {
      setSearchParams({
        id: stepData?.data?.toString(),
        step: "3",
        mode: mode === EDIT ? EDIT : NEW,
      });
      setCurrent((prev) => prev + 1);
      toast.success("مرحله دوم با موفقیت ثبت شد");
    }
  }, [stepData?.status]);

  //* ================================ Util Functions ================================
  const onFormSubmit = (values: any) => {
    const formData = new FormData();
    if (!id) return;

    formData.append("DormitoryId", id);
    formData.append("Description", values?.Description ?? "");
    formData.append("About", values?.About);
    formData.append("Policies", values?.Policies);
    // formData.append("DormitoryPlanId", "");
    // formData.append("NearbyPlaceIds", []?.toString());
    // formData.append("DormitoryTypeIds", []?.toString());

    createSecondStep(formData as any);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="create-dorm-second-tab-container"
      form={form}
      onFinish={onFormSubmit}
    >
      <CustomCard loading={isLoading}>
        <CustomDivider orientationMargin="0" text="توضیحات" />
        <div className="main-dorm-container">
          <CustomTextArea
            label="درباره"
            name="About"
            placeholder="درباره"
            rules={[REQUIRED_RULE]}
            autoSize={true}
          />
          <CustomTextArea
            label="قوانین و مقررات"
            name="Policies"
            placeholder="قوانین و مقررات"
            rules={[CUSTOM_REQUIRED_RULE("لطفا قوانین و مقررات خوابگاه را وارد نمایید")]}
            autoSize={true}
          />
          <CustomTextArea
            label="توضیحات"
            name="Description"
            placeholder="توضیحات"
            autoSize={true}
          />
        </div>
      </CustomCard>
      <div className="btn-container">
        <Button
          className="cancel-btn"
          onClick={() => {
            setSearchParams({
              id,
              step: "1",
              mode: EDIT,
            });
            setCurrent((prev) => prev - 1);
          }}
        >
          قبلی
        </Button>
        <SubmitButton
          label="بعدی"
          form={form}
          type="primary"
          loading={isStepCreateLoading}
        />
      </div>
    </Form>
  );
};

export default CreateDormSecondTab;
