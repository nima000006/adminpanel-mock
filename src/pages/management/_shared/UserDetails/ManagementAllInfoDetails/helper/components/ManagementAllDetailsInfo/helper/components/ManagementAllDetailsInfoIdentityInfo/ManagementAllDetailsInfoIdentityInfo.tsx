import { useState } from "react";

import { Col, Form, Row } from "antd";
import { PiArrowCounterClockwise } from "react-icons/pi";

import { CustomInput, CustomSelect } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useUpdateUserInfoMutation } from "@infra/states/redux/Apis/authApi";
import { ManagementAllStaffInfoListResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/@types/@managementUserAllCustomerDetails";
import { UpdateUserInfoFormType } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsInfo/helper/components/ManagementAllDetailsInfoIdentityInfo/@types/@managementAllDetailsInfoIdentityInfo";

const genderOptions = [
  { title: "آقا", id: "MALE" },
  { title: "خانم", id: "FEMALE" },
];

const ManagementAllDetailsInfoIdentityInfo = ({
  data,
  loading,
  setEditIdentityInfoToggle,
}: {
  data: ManagementAllStaffInfoListResponse | undefined;
  loading: boolean;
  setEditIdentityInfoToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm<UpdateUserInfoFormType>();

  // old version. to talk with Mr. Momtazi it doesn't necessary to call additional api
  // * ================================ Api ================================
  // const [
  //   getUsersCustomersInfoIdentityInfo,
  //   { data, isLoading: isGetUsersCustomersInfoIdentityInfoLoading },
  // ] = useLazyManagementAllStaffInfoIdentityInfoListsQuery();

  const [updateUserInfo, { isLoading: isUpdateUserInfoLoading }] =
    useUpdateUserInfoMutation();

  // const userData: ManagementAllStaffInfoIdentityInfoListResponse | undefined = data;

  //? ================================ Effects ================================

  // useEffect(() => {
  //   if (staffId) {
  //     getUsersCustomersInfoIdentityInfo({ staffId });
  //   }
  // }, [staffId, getUsersCustomersInfoIdentityInfo]);

  // ================================ Utils function ================================

  const genderMap: Record<number, string> = {
    1: "آقا",
    2: "خانم",
    3: "نامشخص",
  };
  const validGenderIds = [1, 2, 3];

  const genderId = data?.genderId;
  const genderText = validGenderIds.includes(genderId ?? 0)
    ? genderMap[genderId as 1 | 2 | 3]
    : "_";

  // 103 is a const irani variable for now
  const nationalityText = data?.regionId
    ? data?.regionId === 103
      ? "ایرانی"
      : "غیر ایرانی"
    : "-";

  const openEditModalHandler = () => {
    const genderOption =
      genderId === 1 ? genderOptions[0] : genderId === 2 ? genderOptions[1] : undefined;

    form.setFieldsValue({
      firstName: data?.firstName,
      enFirstName: data?.enFirstName,
      enMiddleName: data?.middleName,
      lastName: data?.lastName,
      enLastName: data?.enLastName,
      username: data?.username,
      fatherName: data?.fatherName,
      gender: selectDefaultValueGenerator(genderOption),
    });

    setEditModalOpen(true);
  };

  const closeEditModalHandler = () => {
    setEditModalOpen(false);
    form.resetFields();
  };

  const editRequestHandler = async () => {
    const values = await form.validateFields();

    if (!data?.username) return;

    updateUserInfo({
      id: data?.username,
      body: {
        firstName: values.firstName,
        enFirstName: values.enFirstName,
        middleName: values.enMiddleName,
        lastName: values.lastName,
        enLastName: values.enLastName,
        fatherName: values.fatherName,
        gender: values.gender?.value as string,
      },
    })
      .unwrap()
      .then(() => {
        closeEditModalHandler();
        setEditIdentityInfoToggle((prev) => !prev);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {editModalOpen && (
        <ConfirmationModalWithContent
          title="ویرایش اطلاعات"
          isModalOpen={editModalOpen}
          closeModalHandler={closeEditModalHandler}
          onConfirmClickHandler={editRequestHandler}
          isConfirmButtonLoading={isUpdateUserInfoLoading}
          content={
            <Form form={form} className="flex flex-col gap-3">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <CustomInput label="نام فارسی" name="firstName" />
                </Col>
                <Col span={12}>
                  <CustomInput label="نام انگلیسی" name="enFirstName" />
                </Col>
                <Col span={12}>
                  <CustomInput label="نام میانی انگلیسی" name="enMiddleName" />
                </Col>
                <Col span={12}>
                  <CustomInput label="نام خانوادگی فارسی" name="lastName" />
                </Col>
                <Col span={12}>
                  <CustomInput label="نام خانوادگی انگلیسی" name="enLastName" />
                </Col>
                <Col span={12}>
                  <CustomInput label="نام پدر" name="fatherName" />
                </Col>
                <Col span={12}>
                  <CustomSelect
                    label="جنسیت"
                    name="gender"
                    form={form}
                    options={genderOptions}
                  />
                </Col>
              </Row>
            </Form>
          }
        />
      )}
      <Div loading={loading} className="management-all-detail-identity-info">
        <CustomDivider
          text="اطلاعات هویتی"
          extraContent={
            <div className="flex gap-2">
              <CustomButton disabled icon={<PiArrowCounterClockwise />}>
                استعلام
              </CustomButton>
              <CustomButton onClick={openEditModalHandler}>ویرایش</CustomButton>
            </div>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol value={data?.firstName} label="نام" />
          <SingleVerticalWithCol value={data?.lastName} label="نام خانوادگی" />
          <SingleVerticalWithCol value={data?.username} label="کدملی / کد فراگیر" />
          <SingleVerticalWithCol value={nationalityText} label="ملیت" />
          <SingleVerticalWithCol value={data?.fatherName} label="نام پدر" />
          <SingleVerticalWithCol value={data?.birthDate} label="تاریخ تولد" isDate />
          <SingleVerticalWithCol value={genderText} label="جنسیت" />
        </Row>
      </Div>
    </>
  );
};
export default ManagementAllDetailsInfoIdentityInfo;
