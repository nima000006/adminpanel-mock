import { useEffect } from "react";

import { Button, Col, Form, Row } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { CreateFloorResponse } from "./@types/@createFloor";
import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "../../../../components/CustomInputs/CustomInput/CustomInput";
import SubmitButton from "../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../components/Renderers/Div/Div";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  makeSearchParams,
  CheckBoxFormGenerator,
} from "../../../../infrastructure/helpers/utils";
import { DORM_DETAIL_PAGE_ROUTE } from "../../../../infrastructure/router/routes/room";
import { GetFloorInformationResponse } from "../../../../infrastructure/states/redux/Apis/models/roomApi.model";
import {
  useCreateFloorMutation,
  useEditFloorMutation,
  useGetFloorInformationMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { REQUIRED_RULE } from "../../../../infrastructure/validation/validationSchema";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_createFloors.scss";

const CreateFloor = () => {
  const [searchParams] = useSearchParams();
  const { mode, buildingId, floorId, dormId } = Object.fromEntries([...searchParams]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useTitle({ text: mode === EDIT ? "ویرایش طبقه" : "ایجاد طبقه جدید" });

  //? ================================  Api Calls ================================
  // send new floor api.
  const [createFloor, { data: createFloorData, isLoading: createFloorIsLoading }] =
    useCreateFloorMutation();

  // send edit floor api.
  const [editFloor, { data: editFloorData, isLoading: isEditFloorLoading }] =
    useEditFloorMutation();

  // get information
  const [getFloorInfo, { isLoading: isGetFloorInfoLoading }] =
    useGetFloorInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (floorId && mode === EDIT) {
      getFloorInfo(floorId).unwrap().then(onGetFloorDataSuccess);
    }
  }, [floorId]);

  useEffect(() => {
    if (createFloorData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigateToDormDetailScreen();
    }
  }, [createFloorData?.status]);

  // on edit success
  useEffect(() => {
    if (editFloorData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigateToDormDetailScreen();
    }
  }, [editFloorData?.status]);

  //* ================================ Util Functions ================================
  const onGetFloorDataSuccess = async (value: GetFloorInformationResponse) => {
    if (value?.status === 200 && value?.data && mode === EDIT) {
      form.setFieldsValue({
        Name: value?.data?.name,
        PhoneNumber: value?.data?.phone,
        // statusData: [
        //   CheckBoxFormGenerator(getFloorInfoData?.data?.isactive, "IsActive"),
        //   CheckBoxFormGenerator(getFloorInfoData?.data?.isshow, "IsShow"),
        // ],
      });
    }
  };

  const navigateToDormDetailScreen = (floor?: number) => {
    navigate({
      pathname: DORM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id: dormId,
        buildingId: buildingId ? buildingId : undefined,
        floorId: floor ? floor : floorId,
      }),
    });
  };

  // onCreateSuccess
  const onEditSuccess = async (values: CreateFloorResponse) => {
    if (values?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigateToDormDetailScreen(values?.data);
    }
  };
  const onCreateSuccess = async (values: CreateFloorResponse) => {
    if (values?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigateToDormDetailScreen(values?.data);
    }
  };

  // submit form (add & edit floor)
  const onFormSubmit = (values: any) => {
    const formData = new FormData();

    formData.append("Name", values?.Name);
    formData.append("PhoneNumber", values?.PhoneNumber ?? "");
    formData.append(
      "IsActive",
      values?.createFloor?.includes("IsActive") ? "true" : "false"
    );
    formData.append(
      "IsShow",
      values?.sendCreateRoom?.includes("IsShow") ? "true" : "false"
    );
    formData.append("BuildingId", buildingId);

    if (buildingId && mode === EDIT) {
      formData.append("FloorId", floorId);
      editFloor(formData as any)
        .unwrap()
        .then(onEditSuccess);
    } else {
      createFloor(formData as any)
        .unwrap()
        .then(onCreateSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="create-floor-main-container"
      form={form}
      onFinish={onFormSubmit}
      initialValues={{
        createFloor: [
          CheckBoxFormGenerator(true, "IsActive"), // should change from true to real value
          CheckBoxFormGenerator(true, "IsShow"), // should change from true to real value
        ],
      }}
    >
      <CustomCard
        className="floor-container"
        padding="2rem"
        loading={createFloorIsLoading || isEditFloorLoading}
      >
        {/* todo[shirin]:this design is related to the future tense. */}
        {/* <CustomDivider   text="اطلاعات پایه طبقه" />
        <div className="container">
          <CustomInput
            name="number"
            type="text"
            label="شماره"
          />
          <CustomCheckboxGroup
            containerClassName="dorm-info-checkboxes"
            name="status"
            label="وضعیت ها"
            options={[
              { label: "نمایش", value: "visibleStatus" },
              { label: "فعال", value: "isStatusActive" },
              { label: "امکان استثنا قیمت", value: "exceptionStatus" },
            ]}
          />

          <CustomCheckboxGroup
            containerClassName="dorm-info-checkboxes floor-checkbox"
            name="features"
            label="امکانات"
            options={[
              { label: "آشپرخانه", value: "kitchen" },
              { label: "حمام", value: "bath" },
              { label: "سرویس بهداشتی فرنگی", value: "bath" },
              { label: "سرویس بهداشتی ایرانی", value: "bath" },
            ]}
          />
        </div> */}
        {/* ///////////////////////////////////////////// */}
        {/* //todo uncomment Breadcrumb when backend data is ready */}
        {/* <Breadcrumb items={breadCrumbItems} className="bread-crumb" /> */}
        <CustomCheckboxGroup
          checkboxClassName="check-box"
          containerClassName="check-box-container"
          name="createFloor"
          // rules={[REQUIRED_RULE]}
          disabled={true}
          options={[
            { label: "فعال", value: "IsActive" },
            { label: "نمایش", value: "IsShow" },
          ]}
        />
        <div className="info-box">
          <CustomDivider text="اطلاعات " />
          <Div loading={isGetFloorInfoLoading}>
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="نام طبقه"
                  name="Name"
                  placeholder="نام طبقه"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="تلفن"
                  name="PhoneNumber"
                  placeholder="مثلا 55223366 - 021"
                />
              </Col>
            </Row>
          </Div>
        </div>
      </CustomCard>

      <div className="btn-container">
        <Button className="cancel-btn" onClick={() => navigateToDormDetailScreen()}>
          انصراف
        </Button>
        {mode === EDIT ? (
          <SubmitButton label="ویرایش" form={form} type="primary" />
        ) : (
          <SubmitButton label="ایجاد" form={form} type="primary" />
        )}
      </div>
    </Form>
  );
};

export default CreateFloor;
