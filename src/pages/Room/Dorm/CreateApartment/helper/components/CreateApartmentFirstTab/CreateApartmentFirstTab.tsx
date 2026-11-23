import { useEffect } from "react";

import { Button, Col, Form, Row } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { CreateApartmentFirstTabProps } from "./@types/@createApartmentFirstTab";
import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "../../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomTextArea from "../../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../../../components/Renderers/CustomDivider/CustomDivider";
import {
  makeSearchParams,
  CheckBoxFormGenerator,
} from "../../../../../../../infrastructure/helpers/utils";
import { DORM_DETAIL_PAGE_ROUTE } from "../../../../../../../infrastructure/router/routes/room";
import {
  useCreateBuildingFirstTabMutation,
  useEditBuildingFirstTabMutation,
} from "../../../../../../../infrastructure/states/redux/Apis/roomApi";
import {
  CUSTOM_REQUIRED_RULE,
  POSTAL_CODE_RULE,
} from "../../../../../../../infrastructure/validation/validationSchema";
import { EDIT } from "../../../../../../../infrastructure/VARS/globalStrings/globalStrings";
import "./_createApartmentFirstTab.scss";

const CreateApartmentFirstTab = ({
  setCurrent,
  form,
  isLoading,
}: CreateApartmentFirstTabProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mode, dormId, buildingId, floorId } = Object.fromEntries([...searchParams]);
  const NO_ID_ERROR_MSG = "شناسه خوابگاه ایراد دارد";

  const checkBoxItems = [
    {
      label: "فعال",
      value: "isActive",
      title: "فعال",
    },
    {
      label: "نمایش",
      value: "IsShow",
      title: "نمایش",
    },
  ];

  //? ================================  Api Calls ================================
  const [
    createFirstTab,
    { data: createData, isLoading: isCreateDataLoading, isSuccess: isCreateDataSuccess },
  ] = useCreateBuildingFirstTabMutation();

  const [
    editFirstTab,
    { data: editData, isLoading: isEditDataLoading, isSuccess: isEditDataSuccess },
  ] = useEditBuildingFirstTabMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (createData?.status === 200 && isCreateDataSuccess) {
      setSearchParams({
        buildingId: createData?.data?.toString(),
        step: "2",
        mode: mode === EDIT ? EDIT : "new",
        dormId,
      });
      setCurrent((prev) => prev + 1);
      toast.success("مرحله اول با موفقیت ثبت شد");
    }
  }, [createData?.status]);

  useEffect(() => {
    if (editData?.status === 200 && isEditDataSuccess) {
      setSearchParams({
        buildingId: editData?.data?.toString(),
        step: "2",
        mode: mode === EDIT ? EDIT : "new",
        dormId,
      });
      setCurrent((prev) => prev + 1);
      toast.success("مرحله اول با موفقیت ویرایش شد");
    }
  }, [editData?.status]);

  //* ================================ Util Functions ================================
  const navigateToDormDetailScreen = () => {
    navigate({
      pathname: DORM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: dormId, floorId, buildingId }),
    });
  };

  const onFormSubmit = (values: any) => {
    const formData = new FormData();

    if (!dormId) {
      return toast.error(NO_ID_ERROR_MSG, { toastId: NO_ID_ERROR_MSG });
    }
    formData.append("dormitoryId", dormId);
    formData.append("Name", values?.Name);
    formData.append("Address", values?.Address ?? "");
    formData.append("PhoneNumber", values?.PhoneNumber ?? "");
    formData.append("PostalCode", values?.PostalCode ?? "");
    formData.append(
      "isActive",
      values?.statusData?.includes("isActive") ? "true" : "false"
    );
    formData.append("IsShow", values?.statusData?.includes("IsShow") ? "true" : "false");
    if (mode === EDIT && buildingId) {
      formData.append("buildingId", buildingId);
      editFirstTab(formData as any);
    } else {
      createFirstTab(formData as any);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="create-apartment-first-tab"
      form={form}
      onFinish={onFormSubmit}
      initialValues={{
        statusData: [
          CheckBoxFormGenerator(true, "isActive"), // should change from true to real value
          CheckBoxFormGenerator(true, "IsShow"), // should change from true to real value
        ],
      }}
    >
      <CustomCard loading={isLoading}>
        <CustomCheckboxGroup options={checkBoxItems} name="statusData" disabled={true} />
      </CustomCard>
      <CustomCard loading={isLoading}>
        <CustomDivider orientationMargin="0" text="اطلاعات پایه" />
        <Row gutter={[16, 16]}>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="نام"
              name="Name"
              placeholder="نام ساختمان"
              rules={[CUSTOM_REQUIRED_RULE("لطفا نام ساختمان را وارد نمایید")]}
              maxLength={100}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="تلفن"
              name="PhoneNumber"
              placeholder="مثلا 55223366 - 021"
              // rules={[CUSTOM_REQUIRED_RULE("لطفا تلفن ساختمان را وارد نمایید")]}
              maxLength={100}
            />
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomInput
              type="text"
              label="کدپستی"
              name="PostalCode"
              placeholder="کدپستی"
              rules={[POSTAL_CODE_RULE]}
            />
          </Col>
        </Row>
        <div className="row">
          <CustomTextArea
            label="آدرس"
            name="Address"
            placeholder="آدرس"
            // rules={[CUSTOM_REQUIRED_RULE("لطفا آدرس ساختمان را وارد نمایید")]}
            autoSize={true}
          />
        </div>
      </CustomCard>
      <div className="btn-container">
        <Button className="cancel-btn" onClick={navigateToDormDetailScreen}>
          انصراف
        </Button>
        {mode === EDIT ? (
          <SubmitButton
            label="ویرایش"
            form={form}
            type="primary"
            loading={isEditDataLoading}
          />
        ) : (
          <SubmitButton
            label="ادامه"
            form={form}
            type="primary"
            loading={isCreateDataLoading}
          />
        )}
      </div>
    </Form>
  );
};

export default CreateApartmentFirstTab;
