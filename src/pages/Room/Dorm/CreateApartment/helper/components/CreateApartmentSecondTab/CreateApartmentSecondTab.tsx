import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { CreateApartmentSecondTabProps } from "./@types/@createApartmentSecondTab";
import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../../../components/Renderers/CustomDivider/CustomDivider";
import { makeSearchParams } from "../../../../../../../infrastructure/helpers/utils";
import { DORM_DETAIL_PAGE_ROUTE } from "../../../../../../../infrastructure/router/routes/room";
import { useCreateBuildingSecondTabMutation } from "../../../../../../../infrastructure/states/redux/Apis/roomApi";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../../../infrastructure/validation/validationSchema";
import { EDIT } from "../../../../../../../infrastructure/VARS/globalStrings/globalStrings";
import "./_createApartmentSecondTab.scss";

const CreateApartmentSecondTab = ({
  setCurrent,
  form,
  isLoading,
}: CreateApartmentSecondTabProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mode, dormId, buildingId } = Object.fromEntries([...searchParams]);
  const NO_ID_ERROR_MSG = "شناسه خوابگاه ایراد دارد";

  const genderOptions = [
    { id: 1, title: "خواهران" },
    { id: 2, title: "برادران" },
  ];

  //? ================================  Api Calls ================================
  const [
    createSecondStep,
    { data: createData, isLoading: isCreateDataLoading, isSuccess: isCreateDataSuccess },
  ] = useCreateBuildingSecondTabMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (createData?.status === 200 && isCreateDataSuccess) {
      toast.success("ساختمان با موفقیت ایجاد شد");
      navigateBackToDormInfo();
    }
  }, [createData?.status]);

  //* ================================ Util Functions ================================
  const navigateBackToDormInfo = () => {
    navigate({
      pathname: DORM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: dormId, buildingId }),
    });
  };

  const onFormSubmit = (values: any) => {
    const formData = new FormData();

    if (!dormId) {
      return toast.error(NO_ID_ERROR_MSG, { toastId: NO_ID_ERROR_MSG });
    }

    formData.append("BuildingId", buildingId);
    formData.append("Policies", values?.Policies);
    formData.append("Description", "1");
    formData.append("PhoneNumber", "1");
    formData.append("About", values?.About);
    formData.append("GenderTypeId", values?.gender?.value);
    formData.append("NearbyPlaceIds", "1");

    createSecondStep(formData as any);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="create-apartment-second-tab-container"
      form={form}
      onFinish={onFormSubmit}
    >
      <CustomCard loading={isLoading}>
        <CustomDivider orientationMargin="0" text="توضیحات" />

        <div className="main-apartment-container">
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
          <CustomSelect
            label="جنسیت"
            name="gender"
            options={genderOptions}
            form={form}
            rules={[REQUIRED_RULE]}
          />
        </div>
      </CustomCard>
      <div className="btn-container">
        <Button
          className="cancel-btn"
          onClick={() => {
            setSearchParams({
              buildingId,
              step: "1",
              mode: EDIT,
              dormId,
            });
            setCurrent((prev) => prev - 1);
          }}
        >
          قبلی
        </Button>
        {mode === EDIT ? (
          <SubmitButton
            label="ثبت ویرایش"
            form={form}
            type="primary"
            loading={isCreateDataLoading}
          />
        ) : (
          <SubmitButton
            label="ایجاد"
            form={form}
            type="primary"
            loading={isCreateDataLoading}
          />
        )}
      </div>
    </Form>
  );
};

export default CreateApartmentSecondTab;
