import { useEffect } from "react";

import { CheckboxOptionType, Col, Form, Row } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import {
  CreateDormFirstTabProps,
  CreateDormFirstTabResponse,
  CreateDormitoryPlanResponse,
} from "./@types/@createDormFirstTab";
import CustomCard from "../../../../../../../components/CustomCard/CustomCard";
import CustomCheckboxGroup from "../../../../../../../components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomInput from "../../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomMap from "../../../../../../../components/CustomInputs/CustomMap/CustomMap";
import CustomTextArea from "../../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "../../../../../../../components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDivider from "../../../../../../../components/Renderers/CustomDivider/CustomDivider";
import { makeSearchParams } from "../../../../../../../infrastructure/helpers/utils";
import {
  DORM_DETAIL_PAGE_ROUTE,
  DORM_HOME_PAGE_ROUTE,
} from "../../../../../../../infrastructure/router/routes/room";
import {
  useCreateDormFirstTabMutation,
  useCreateDormitoryPlanMutation,
  useDormAddPropertySectionMutation,
  useEditDormFirstTabMutation,
} from "../../../../../../../infrastructure/states/redux/Apis/roomApi";
import {
  CUSTOM_REQUIRED_RULE,
  NUMBER_RULE,
  POSTAL_CODE_RULE,
  REQUIRED_RULE,
} from "../../../../../../../infrastructure/validation/validationSchema";
import {
  EDIT,
  NEW,
} from "../../../../../../../infrastructure/VARS/globalStrings/globalStrings";

import "./_createDormFirstTab.scss";

const checkBoxItems: CheckboxOptionType[] = [
  {
    label: "فعال",
    value: "active",
    title: "فعال",
  },
  // {
  //   label: "نمایش",
  //   value: "IsShow",
  //   title: "نمایش",
  // },
];

const CreateDormFirstTab = ({
  setCurrent,
  form,
  isActive,
  isLoading,
  lat,
  lng,
  setLng,
  setLat,
}: CreateDormFirstTabProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mode, id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [createFirstDormFirstTab, { isLoading: isCreateDataLoading }] =
    useCreateDormFirstTabMutation();

  const [
    editFirstDormFirstTab,
    { data: editData, isLoading: isEditDataLoading, isSuccess: isEditSuccess },
  ] = useEditDormFirstTabMutation();

  // CHAIN 2
  const [createDormPlan] = useCreateDormitoryPlanMutation();

  const [addPropertySection] = useDormAddPropertySectionMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldsValue({
      statusData: ["active"],
    });
  }, []);

  useEffect(() => {
    if (editData?.status === 200 && isEditSuccess) {
      setSearchParams({
        id,
        step: "2",
        mode: mode === EDIT ? EDIT : "new",
      });
      // sendAddPropertyRequest(id);
      setCurrent((prev) => prev + 1);
      toast.success("مرحله اول با موفقیت ثبت شد");
    }
  }, [editData?.status]);

  //* ================================ Util Functions ================================
  // navigate back
  const navigateToDormDetailScreen = () => {
    if (id) {
      navigate({
        pathname: DORM_DETAIL_PAGE_ROUTE,
        search: makeSearchParams({ id }),
      });
    } else {
      navigate({
        pathname: DORM_HOME_PAGE_ROUTE,
      });
    }
  };

  //  mock request
  const sendAddPropertyRequest = (id: string) => {
    const formData = new FormData();
    formData.append("DormitoryId", id);
    formData.append("ManagementTypeId", "1");
    formData.append("RezervTypeId", "2");
    formData.append("LevelTypeId", "1");
    formData.append("DormitoryTypeOfAccommentationId", "1");
    addPropertySection(formData as any);
  };

  const onSetDormPolicySuccess = (
    values: CreateDormitoryPlanResponse,
    dormId: number
  ) => {
    if (values?.status === 200) {
      setSearchParams({
        id: dormId?.toString(),
        step: "2",
        mode: mode === EDIT ? EDIT : NEW,
      });
      sendAddPropertyRequest(dormId?.toString());
      setCurrent((prev) => prev + 1);
      toast.success("مرحله اول با موفقیت ثبت شد");
    }
  };

  // chain 3  // move ta create part 4
  // const onCreateDormSuccess = async (
  //   value: CreateDormitoryPlanResponse,
  //   dormId: number
  // ) => {
  //   if (value?.status === 200 && dormId) {
  //     const formData = new FormData();

  //     // new change is in this phase
  //     formData.append("planid", value?.data?.dormitoryPlanId?.toString());
  //     formData.append("dudays", "1");
  //     formData.append("todate", ""); // null
  //     formData.append("persentfee", "100");
  //     formData.append("ownertype", "2");
  //     formData.append("ownerid", dormId?.toString());
  //     formData.append("des", "");
  //     formData.append("dayscountforpayment", "");
  //     formData.append("fromdate", "");
  //     formData.append("rezervetype", "2");
  //     setDormPolicy(formData as any)
  //       .unwrap()
  //       .then((value: SetDormitoryPolicyPaymentResponse) =>
  //         onSetDormPolicySuccess(value, dormId)
  //       );
  //   } else {
  //     toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
  //   }
  // };

  // chain 2 // REMAINS
  const onSuccessCreateFirstDormFirstTab = async (value: CreateDormFirstTabResponse) => {
    if (value?.status === 200) {
      createDormPlan({
        fromDate: "2024-08-30T08:14:51.652Z",
        toDate: "2025-02-16T08:14:51.652Z",
        isActicve: true,
        ownerId: value?.data,
        ownerType: 2,
      })
        .unwrap()
        .then(
          (data: CreateDormitoryPlanResponse) => onSetDormPolicySuccess(data, value?.data)
          // onCreateDormSuccess(data, value?.data)
        );
    }
  };

  const onFormSubmit = (values: any) => {
    const formData = new FormData();

    // REAL REQUEST
    formData.append("Name", values?.Name);
    formData.append("Address", values?.Address ?? "");
    formData.append("PhoneNumber", values?.PhoneNumber);
    formData.append("PostalCode", values?.PostalCode ? values?.PostalCode : "");
    formData.append("fromprice", values?.fromprice?.toString().replaceAll(",", ""));
    formData.append("toprice", values?.toprice?.toString().replaceAll(",", ""));
    formData.append("caposity", values?.copacity);
    formData.append("CityId", "1");
    formData.append("active", values?.statusData?.includes("active") ? "true" : "false");
    formData.append(
      "IsShow",
      values?.statusData?.includes("IsShow")
        ? "true"
        : "true" /* the second param here should get changed to false */
    );
    formData.append("Lat", lat?.toString() || "");
    formData.append("Lang", lng?.toString() || "");
    if (mode === EDIT && id) {
      formData.append("dormitoryId", id);
      formData.append("capacity", values?.copacity);
      editFirstDormFirstTab(formData as any);
    } else {
      createFirstDormFirstTab(formData as any)
        .unwrap()
        .then(onSuccessCreateFirstDormFirstTab);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="create-dorm-first-tab-container"
      form={form}
      key={isActive ? 1 : 0}
      onFinish={onFormSubmit}
      // initialValues={{
      //   statusData: [
      //     CheckBoxFormGenerator(isActive, "active"), //todo[saman]: should change from true to real value
      //     // "active",
      //     //  CheckBoxFormGenerator(true, "IsShow"), //todo[saman]: should change from true to real value
      //   ],
      // }}
    >
      <CustomCard loading={isLoading}>
        <CustomCheckboxGroup
          options={checkBoxItems}
          name="statusData"
          // disabled={true}
          key={id}
        />
      </CustomCard>
      <CustomCard loading={isLoading}>
        <CustomDivider orientationMargin="0" text="اطلاعات پایه" />
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="نام"
              name="Name"
              placeholder="نام خوابگاه"
              rules={[CUSTOM_REQUIRED_RULE("لطفا نام خوابگاه را وارد نمایید")]}
              maxLength={100}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="تلفن"
              name="PhoneNumber"
              placeholder="مثلا 55223366 - 021"
              rules={[CUSTOM_REQUIRED_RULE("لطفا تلفن خوابگاه را وارد نمایید")]}
              maxLength={100}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInput
              type="text"
              label="کدپستی"
              name="PostalCode"
              placeholder="کدپستی"
              rules={[POSTAL_CODE_RULE]}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="row">
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInputNumber
              type="text"
              label="(ریال) حداقل قیمت"
              name="fromprice"
              placeholder="حداقل قیمت"
              rules={[
                CUSTOM_REQUIRED_RULE("لطفا حداقل قیمت را وارد نمایید"),
                NUMBER_RULE,
              ]}
              isPrice={true}
              maxLength={15}
              min={0}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInputNumber
              type="text"
              label="(ریال) حداکثر قیمت"
              name="toprice"
              placeholder="حداکثر قیمت"
              rules={[
                CUSTOM_REQUIRED_RULE("لطفا حداکثر قیمت را وارد نمایید"),
                NUMBER_RULE,
              ]}
              isPrice={true}
              maxLength={15}
              min={0}
            />
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <CustomInputNumber
              type="text"
              label="ظرفیت"
              name="copacity"
              placeholder="ظرفیت"
              rules={[REQUIRED_RULE, NUMBER_RULE]}
              maxLength={10}
              min={0}
            />
          </Col>

          <CustomTextArea
            label="آدرس"
            name="Address"
            placeholder="آدرس"
            rules={[REQUIRED_RULE]}
          />
        </Row>
      </CustomCard>
      <CustomCard className="map-container" loading={isLoading}>
        <CustomDivider orientationMargin="0" text="موقعیت مکانی خوابگاه" />
        <CustomMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      </CustomCard>
      <div className="btn-container">
        <CustomButton className="cancel-btn" onClick={navigateToDormDetailScreen}>
          انصراف
        </CustomButton>
        <CustomButton
          htmlType="submit"
          type="primary"
          loading={isCreateDataLoading || isEditDataLoading}
        >
          بعدی
        </CustomButton>
      </div>
    </Form>
  );
};

export default CreateDormFirstTab;
