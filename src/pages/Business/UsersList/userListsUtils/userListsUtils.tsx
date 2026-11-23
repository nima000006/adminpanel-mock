import { useEffect } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import { toast } from "react-toastify";

import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../components/CustomInputs/CustomSelect/CustomSelect";
import { selectDefaultValueGenerator } from "../../../../infrastructure/helpers/utils";
import { CUSTOM_REQUIRED_RULE } from "../../../../infrastructure/validation/validationSchema";
import { ARE_YOU_SURE } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import { SingleUserInUserList } from "../../../Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";
import "./_userListUtil.scss";

const WRONG_INPUTS = "شماره دانشجویی یا واحد دانشگاهی ایراد دارد";

const genderType = [
  {
    id: 0,
    title: "مرد",
  },
  {
    id: 1,
    title: "زن",
  },
];

export const DeleteModalContent = () => {
  return (
    <div className="delete-modal-container">
      آیا از حذف شماره تلفن این فرد اطمینان دارید ؟
    </div>
  );
};

export const UpdateModalContent = ({
  userData,
  form,
}: {
  userData: Partial<SingleUserInUserList>;
  form: FormInstance<any>;
}) => {
  //? ================================  Api Calls ================================
  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  useEffect(() => {
    getAllUniversity();
  }, []);

  //? ================================ Effects ================================
  useEffect(() => {
    if (userData?.branchCode && userData?.unitName && userData?.studentNumber) {
      form.setFieldsValue({
        studentNumber: userData?.studentNumber,
        branchName: selectDefaultValueGenerator({
          id: +userData?.branchCode,
          title: userData?.unitName,
        }),
        name: userData?.firstName,
        family: userData?.lastName,
        gender: selectDefaultValueGenerator({
          id:
            userData?.sexStatus === "مرد"
              ? 0
              : userData?.sexStatus === "زن"
                ? 1
                : undefined,
          title: userData?.sexStatus ?? ("" as any),
        }),
        nationalCode: userData?.nationalCode,
        fieldName: userData?.fieldName,
        levelName: userData?.levelName,
      });
    } else {
      toast.error(WRONG_INPUTS, { toastId: WRONG_INPUTS });
    }
  }, [userData]);

  {
    /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  }

  return (
    <Form form={form}>
      <CustomCard className="delete-modal-container">
        <Row gutter={[16, 12]}>
          <Col md={6} xs={12}>
            <CustomInput name="name" label="نام" />
          </Col>
          <Col md={6} xs={12}>
            <CustomInput name="family" label="نام خانوادگی" />
          </Col>

          <Col md={6} xs={12}>
            <CustomSelect name="gender" label="جنسیت" options={genderType} form={form} />
          </Col>
          <Col md={6} xs={12}>
            <CustomInput name="nationalCode" label="کد ملی" />
          </Col>

          <Col md={6} xs={12}>
            <CustomInput name="fieldName" label="رشته" />
          </Col>
          <Col md={6} xs={12}>
            <CustomInput name="levelName" label="مقطع" />
          </Col>

          <Col md={6} xs={12}>
            <CustomInput label="شماره دانشجویی" name="studentNumber" />
          </Col>
          <Col md={6} xs={12}>
            <CustomSelect
              className="update-user-select"
              label="واحد دانشگاهی"
              name="branchName"
              isLoading={isUniversityDataLoading}
              rules={[CUSTOM_REQUIRED_RULE("لطفا دانشگاه مورد نظر را انتخاب کنید")]}
              options={universityData ? universityData : []}
              placeholder="انتخاب کنید"
              form={form}
              hasVerticalLabel={false}
            />
          </Col>
        </Row>
      </CustomCard>
    </Form>
  );
};

export const InquiryModalContent = () => {
  return <div className="inquiry-text">{ARE_YOU_SURE}</div>;
};
