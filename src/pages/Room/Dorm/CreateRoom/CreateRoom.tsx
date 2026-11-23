import { useEffect } from "react";

import { Button, Col, Form, Row } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomInputNumber from "../../../../components/CustomInputs/InputNumber/CustomInputNumber";
import SubmitButton from "../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../components/Renderers/Div/Div";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  makeSearchParams,
  CheckBoxFormGenerator,
} from "../../../../infrastructure/helpers/utils";
import { DORM_DETAIL_PAGE_ROUTE } from "../../../../infrastructure/router/routes/room";
import {
  useCreateRoomMutation,
  useEditRoomMutation,
  useGetRoomInformationMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import {
  NUMBER_RULE,
  REQUIRED_RULE,
} from "../../../../infrastructure/validation/validationSchema";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_createRoom.scss";

const CreateRoom = () => {
  const [searchParams] = useSearchParams();
  const { mode, floorId, dormId, roomId, buildingId } = Object.fromEntries([
    ...searchParams,
  ]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useTitle({ text: mode === EDIT ? "ویرایش اتاق" : "ایجاد اتاق جدید" });
  // const breadCrumbItems = [
  //   {
  //     title: "ساختمان 2",
  //   },
  //   {
  //     title: "خوابگاه شهید چمران - واحد ایرانشهر",
  //   },
  // ];

  //? ================================  Api Calls ================================
  // send new room api
  const [sendCreateRoom, { data: createRoomData, isLoading: isCreateRoomLoading }] =
    useCreateRoomMutation();

  const [sendEditRoom, { data: editRoomData, isLoading: isEditRoomLoading }] =
    useEditRoomMutation();

  // get information
  const [
    getRoomInfo,
    {
      data: getRoomInfoData,
      isLoading: isGetRoomInfoLoading,
      isSuccess: isRoomInfoSuccess,
    },
  ] = useGetRoomInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (roomId && mode === EDIT) {
      getRoomInfo(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (
      getRoomInfoData?.status === 200 &&
      getRoomInfoData?.data &&
      mode === EDIT &&
      isRoomInfoSuccess
    ) {
      form.setFieldsValue({
        Name: getRoomInfoData?.data?.name,
        PhoneNumber: getRoomInfoData?.data?.phone,
        Number: getRoomInfoData?.data?.number,
        NominalCapacity: getRoomInfoData?.data?.coposity,
        Price: getRoomInfoData?.data?.price,
        statusData: [CheckBoxFormGenerator(getRoomInfoData?.data?.isactive, "IsActive")],
      });
    }
  }, [roomId, getRoomInfoData?.status]);

  useEffect(() => {
    form.setFieldsValue({
      statusData: ["IsActive"],
    });
  }, []);

  useEffect(() => {
    if (createRoomData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigateToDormDetailScreen();
    }
  }, [createRoomData?.status]);

  useEffect(() => {
    if (editRoomData?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      navigateToDormDetailScreen();
    }
  }, [editRoomData?.status]);

  //* ================================ Util Functions ================================
  const navigateToDormDetailScreen = () => {
    navigate({
      pathname: DORM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: dormId, buildingId, floorId }),
    });
  };

  // submit create and edit room
  const onSubmitForm = (values: any) => {
    const formData = new FormData();
    formData.append("IsShow", values?.statusData?.includes("IsShow") ? "true" : "false");
    formData.append(
      "IsActive",
      values?.statusData?.includes("IsActive") ? "true" : "false"
    );
    formData.append("Name", values?.Name);
    formData.append("Number", values?.Number ?? "");
    formData.append("PhoneNumber", values?.PhoneNumber ?? "");
    formData.append("FloorId", floorId);
    formData.append("NominalCapacity", values?.NominalCapacity);
    formData.append("Price", values?.Price);
    formData.append("RezerveTypeId", "2");
    formData.append("Level", "1");
    formData.append("RoomTypeId", "1");
    if (floorId && mode === EDIT) {
      formData.append("RoomId", roomId);
      sendEditRoom(formData as any);
    } else {
      sendCreateRoom(formData as any);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="create-room-main-container"
      form={form}
      onFinish={onSubmitForm}
      // initialValues={{
      //   statusData: [
      //     CheckBoxFormGenerator(true, "IsActive"), // should change from true to real value
      //     // CheckBoxFormGenerator(true, "IsShow"), // should change from true to real value
      //   ],
      // }}
    >
      <CustomCard
        className="room-container"
        loading={isCreateRoomLoading || isEditRoomLoading}
      >
        {/* <CustomDivider   text="اطلاعات پایه اتاق" />
        <div className="room-info-inputs-container">
          <div className="row">
            <CustomInput
              name="number"
              type="text"
              label="شماره"
            />
            <CustomInput
              name="area"
              type="text"
              label="مساحات"
            />
          </div>

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
          <CustomSelect name="specialStatus" options={[]} label="وضعیت ویژه" />
          <CustomSelect name="rank" options={[]} label="درجه کیفی" />
          <CustomRadioGroup
            label="نوع اتاق"
            options={[
              {
                label: "مستقل",
                value: "independent",
              },
              {
                label: "سوییت",
                value: "suit",
              },
              {
                label: "زیر مجموعه",
                value: "subGroup",
              },
            ]}
            hasVerticalLabel={true}
          />
          <CustomSelect name="rank" options={[]} label="اتاق سوییت" />
          <CustomCheckboxGroup
            containerClassName="dorm-info-checkboxes"
            name="features"
            label="امکانات"
            options={[
              { label: "سرویس ایرانی", value: "visibleStatus" },
              { label: "سرویس فرنگی", value: "isStatusActive" },
              { label: "حمام", value: "exceptionStatus" },
              { label: "آشپزخانه", value: "exceptionStatus" },
              { label: "پنجره", value: "exceptionStatus" },
              { label: "یخچال", value: "exceptionStatus" },
              { label: "سیستم گرمایشی", value: "exceptionStatus" },
              { label: "سیستم سرمایشی", value: "exceptionStatus" },
              { label: "میز مطالعه", value: "exceptionStatus" },
              { label: "رخت آویز", value: "exceptionStatus" },
            ]}
          />
        </div> */}
        {/* <Breadcrumb items={breadCrumbItems} className="bread-crumb" /> */}
        <CustomCheckboxGroup
          checkboxClassName="check-box"
          containerClassName="check-box-container"
          name="statusData"
          options={[{ label: "فعال", value: "IsActive" }]}
        />
        <div className="info-box">
          <CustomDivider text="اطلاعات " />
          <Div loading={isGetRoomInfoLoading}>
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="نام اتاق"
                  name="Name"
                  placeholder="نام اتاق"
                  rules={[REQUIRED_RULE]}
                  maxLength={100}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="تلفن"
                  name="PhoneNumber"
                  placeholder="مثلا 55223366 - 021"
                  maxLength={100}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInput
                  type="text"
                  label="شماره اتاق"
                  name="Number"
                  placeholder="شماره اتاق"
                  maxLength={12}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInputNumber
                  type="text"
                  label="ظرفیت"
                  name="NominalCapacity"
                  placeholder="ظرفیت"
                  rules={[REQUIRED_RULE, NUMBER_RULE]}
                  maxLength={100}
                  min={0}
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <CustomInputNumber
                  type="text"
                  label="(ریال) قیمت ترمیک"
                  name="Price"
                  placeholder="قیمت ترمیک"
                  className="price-input"
                  rules={[REQUIRED_RULE, NUMBER_RULE]}
                  isPrice={true}
                  min={0}
                  initialValue={
                    getRoomInfoData?.data?.price ? getRoomInfoData?.data?.price : 0
                  }
                />
              </Col>
            </Row>
          </Div>
        </div>
      </CustomCard>

      <div className="btn-container">
        {mode === EDIT ? (
          <SubmitButton label="ویرایش" form={form} type="primary" />
        ) : (
          <SubmitButton label="ایجاد" form={form} type="primary" />
        )}
        <Button className="cancel-btn" onClick={navigateToDormDetailScreen}>
          انصراف
        </Button>
      </div>
    </Form>
  );
};

export default CreateRoom;
