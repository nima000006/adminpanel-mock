import { useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useGetUserByPhoneOrUserNameMutation,
  useRetryEstelaamWithCredMutation,
  useUpdateUserByUnitMangerMutation,
} from "@infra/states/redux/Apis/authApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GENERAL_UPDATE_SUCCESS } from "@infra/VARS/globalToasts/globalToasts";

import { FormType, UserEstelaamModel } from "./@types/@myUsers";
import { usersGenderType } from "./helper/utils/myUsersUtil";
import "./_myUsers.scss";

const PLEASE_ENTER_ONE_OF_THE_VALUES =
  "لطفا حداقل یکی از موارد کد ملی یا شماره تماس را وارد نمائید";

const MyUsers = () => {
  const [form] = Form.useForm<FormType>();

  const [getUser, { isLoading: isGetUserDataLoading }] =
    useGetUserByPhoneOrUserNameMutation();

  const [retryUser, { isLoading: isRetryUserDataLoading }] =
    useRetryEstelaamWithCredMutation();

  const [updateUser, { isLoading: isUpdatingUserLoading }] =
    useUpdateUserByUnitMangerMutation();

  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isNationalCodeDisabled, setIsNationalCodeDisabled] = useState(false);
  const [isPhoneNoDisabled, setIsPhoneNoDisabled] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [userData, setUserData] = useState<Partial<UserEstelaamModel>>({});
  const [isAmozeshyarTrue, setIsAmozeshyarTrue] = useState(false);
  const [isEstelaamDastiTrue, setIsEstelaamDastiTrue] = useState(false);
  // const [isEstelamDastiTrue, setIsEstelaamDastiEnabled] = useState(false);

  const [isFormAndBtnReadOnly, setIsFormAndBtnReadOnly] = useState(true);

  useTitle({
    breadcrumbItems: [
      {
        title: "مدیریت",
      },
      {
        title: "لیست کاربران من",
      },
    ],
  });

  //* ================================ Util Functions ================================

  // resetData
  const resetData = () => {
    setUserData({});
    setIsNationalCodeDisabled(false);
    setIsPhoneNoDisabled(false);
    setIsAmozeshyarTrue(false);
    setIsEstelaamDastiTrue(false);
    setIsFormAndBtnReadOnly(true);
  };

  // inputs disable logic
  Form.useWatch(({ nationalCode, phoneNo }: FormType) => {
    if (nationalCode) {
      setIsPhoneNoDisabled(true);
    } else {
      setIsPhoneNoDisabled(false);
    }
    if (phoneNo) {
      setIsNationalCodeDisabled(true);
    } else {
      setIsNationalCodeDisabled(false);
    }
  }, form);

  //! on Search دکمه جستجو
  const onSearchForm = () => {
    if (!userName && !phoneNo) {
      return toast.warn(PLEASE_ENTER_ONE_OF_THE_VALUES, {
        toastId: PLEASE_ENTER_ONE_OF_THE_VALUES,
      });
    }

    // RESET INTERNAL STATES TO GET RESET
    resetData();
    form.resetFields();

    // MAIN REQUEST
    getUser({
      phoneNumber: phoneNo ? phoneNo : null,
      username: userName ? userName : null,
    })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          //
          if (res?.data?.estelamDasti) {
            setIsEstelaamDastiTrue(true);
          } else {
            setIsEstelaamDastiTrue(false);
          }
          if (res?.data?.estelamAmoozesh) {
            setIsAmozeshyarTrue(true);
          } else {
            setIsAmozeshyarTrue(false);
          }

          setUserData(res?.data);
          setIsFormEmpty(false);

          form?.setFieldsValue({
            // nationalCode: res?.data?.userName,
            // phoneNo: res?.data?.mobile ?? "",
            family: res?.data?.lastName ?? "",
            name: res?.data?.firstName ?? "",
            gender: selectDefaultValueGenerator({
              id: undefined,
              title: res?.data?.sexStatus ?? undefined,
            }),
            field: res?.data?.fieldName ?? "",
            level: res?.data?.levelName ?? "",
            studentNumber: res?.data?.studentNumber ?? "",
            readOnlyNationalCode: res?.data?.userName,
            readOnlyPhoneNo: res?.data?.mobile,
          });
        }
      })
      .catch(() => {
        resetData();
        setIsFormEmpty(true);
      });
  };

  //! on Submit ثبت
  const onFormSubmit = () => {
    form?.submit();
    form
      ?.validateFields()
      .then(
        ({ family, field, gender, level, name, studentNumber, readOnlyNationalCode }) => {
          updateUser({
            firstName: name ? name : null,
            lastName: family ? family : null,
            gender: gender?.value ? gender?.title : null,
            levelName: level ? level : null,
            fieldName: field ? field : null,
            studentNumber: studentNumber ? studentNumber : null,
            nationalCode: readOnlyNationalCode ? readOnlyNationalCode : null,
          })
            .unwrap()
            .then((res) => {
              if (res?.status === 200) {
                setIsEstelaamDastiTrue(true);
                toast.success(GENERAL_UPDATE_SUCCESS, {
                  toastId: GENERAL_UPDATE_SUCCESS,
                });
              }
            });
        }
      );

    //! RETRY
    // retryUser({
    //   nationalCode: userData?.userName ? userData?.userName : "",
    //   phoneNumber: userData?.mobile ? userData?.mobile : "",
    //   studentNumber: userData?.studentNumber ? userData?.studentNumber : null,
    // })
    //   .unwrap()
    //   .then((res) => {
    //     if (res?.status === 200) {
    //       // if (res?.data?.studentNumber) {
    //       //   setIsFormReadOnly(true);
    //       // }
    //     } else {
    //       setIsFormAndBtnReadOnly(false);
    //     }
    //   })
    //   .catch(() => {
    //     setIsFormAndBtnReadOnly(false);
    //   });
  };

  // onClickEstelaamAzAmozeshyar
  const onClickEstelaamAzAmozeshyar = () => {
    retryUser({
      nationalCode: userData?.userName ? userData?.userName : "",
      phoneNumber: userData?.mobile ? userData?.mobile : "",
      studentNumber: userData?.studentNumber ? userData?.studentNumber : null,
    })
      .unwrap()
      .then((res) => {
        if (res?.status === 200) {
          setIsAmozeshyarTrue(true);
          form?.setFieldsValue({
            // nationalCode: res?.data?.userName,
            // phoneNo: res?.data?.mobile ?? "",
            family: res?.data?.lastName ?? "",
            name: res?.data?.firstName ?? "",
            gender: selectDefaultValueGenerator({
              id: 1,
              title: res?.data?.genderName ?? undefined,
            }),
            field: res?.data?.fieldName ?? "",
            level: res?.data?.degreeName ?? "",
            studentNumber: res?.data?.studentNumber ?? "",
            // readOnlyNationalCode: res?.data?.nationalCode,
            // readOnlyPhoneNo: res?.data?.,
          });
        } else {
          setIsFormAndBtnReadOnly(false);
        }
      })
      .catch(() => {
        setIsFormAndBtnReadOnly(false);
      });
  };

  // ON EDIT INFO BUTTON CLICKED
  const onEditInfo = () => {
    setIsEstelaamDastiTrue(false);
  };

  return (
    <Form className="my-users__container" form={form}>
      <CustomCard className="my-users__inputs-container">
        <Row>
          <Col span={11}>
            <CustomInput
              label="کد ملی / اتباع"
              name="nationalCode"
              placeholder="کد ملی / اتباع دانشجو را اینجا وارد نمایید"
              disabled={isNationalCodeDisabled}
              value={userName}
              onChange={(value) => setUserName(value?.target?.value)}
            />
          </Col>
          <Col span={2}>
            <p className="my-users__or">یا</p>
          </Col>
          <Col span={11}>
            <CustomInput
              label="شماره تماس"
              name="phoneNo"
              placeholder="شماره تماس دانشجو را اینجا وارد نمایید"
              disabled={isPhoneNoDisabled}
              value={phoneNo}
              onChange={(value) => setPhoneNo(value?.target?.value)}
            />
          </Col>
        </Row>
        <Row className="my-users__search-btn-container">
          <CustomButton
            icon={<AiOutlineSearch />}
            type="primary"
            iconPlacement="end"
            onClick={onSearchForm}
            htmlType="button"
            loading={isGetUserDataLoading}
          >
            جستجو
          </CustomButton>
        </Row>
      </CustomCard>
      <CustomCard
        className="my-users__main-info-container"
        loading={isGetUserDataLoading}
      >
        {isFormEmpty && (
          <div className="my-users__empty-container">
            <CustomEmpty />
            <div className="my-users__empty-text">
              لطفاً جهت مشاهده اطلاعات دانشجو کد ملی / اتباع و یا شماره تماس دانشجو مد نظر
              خود را وارد نمایید.
            </div>
          </div>
        )}

        {!isFormEmpty && (
          <>
            {/* SECTION اطلاعات دانشجو */}
            <CustomDivider
              text={
                <div className="my-users__right-side">
                  <p className="my-users__header-label">اطلاعات دانشجو</p>
                  <span>
                    {isAmozeshyarTrue ? (
                      <CustomTag color="success">دارای استعلام</CustomTag>
                    ) : (
                      <CustomTag color="error">فاقد استعلام</CustomTag>
                    )}
                  </span>
                </div>
              }
              extraContent={
                <CustomButton
                  type="link"
                  className="my-users__left-side"
                  disabled={isAmozeshyarTrue}
                  onClick={onClickEstelaamAzAmozeshyar}
                  loading={isRetryUserDataLoading}
                >
                  استعلام از آموزشیار
                </CustomButton>
              }
            />
            {/* STATIC ROW */}
            <Row gutter={[16, 16]}>
              <Col md={6} xs={12}>
                <CustomInput
                  label="کد ملی / اتباع"
                  placeholder="کد ملی / اتباع"
                  name="readOnlyNationalCode"
                  variant="filled"
                  disabled
                />
              </Col>
              <Col md={6} xs={12}>
                <CustomInput
                  label="شماره تماس"
                  placeholder="شماره تماس"
                  name="readOnlyPhoneNo"
                  variant="filled"
                  disabled
                />
              </Col>
            </Row>
            {/* SECTION اطلاعات قابل ویرایش */}
            <CustomDivider
              text={
                isAmozeshyarTrue || isEstelaamDastiTrue
                  ? "اطلاعات تکمیلی دانشجو"
                  : "اطلاعات قابل ویرایش"
              }
              extraContent={
                !isAmozeshyarTrue && !isEstelaamDastiTrue ? (
                  <CustomButton
                    type="primary"
                    htmlType="submit"
                    disabled={isFormAndBtnReadOnly}
                    onClick={onFormSubmit}
                    loading={isUpdatingUserLoading}
                  >
                    ثبت اطلاعات
                  </CustomButton>
                ) : isEstelaamDastiTrue && !isAmozeshyarTrue ? (
                  <CustomButton
                    type="default"
                    htmlType="submit"
                    onClick={onEditInfo}
                    // disabled={isMainSubmitBtnDisabled}
                  >
                    ویرایش اطلاعات
                  </CustomButton>
                ) : (
                  ""
                )
              }
              className="my-users__editable-section-container"
            />
            <Row gutter={[16, 16]}>
              <Col md={8} xs={12}>
                <CustomInput
                  name="name"
                  rules={[REQUIRED_RULE]}
                  label="نام"
                  placeholder="نام دانشجو را اینجا وارد نمایید"
                  disabled={isAmozeshyarTrue || isEstelaamDastiTrue}
                  // disabled={!!userData?.estelamAmoozesh || !!retryEstelaamData?.firstName}
                />
              </Col>
              <Col md={8} xs={12}>
                <CustomInput
                  name="family"
                  rules={[REQUIRED_RULE]}
                  label="نام خانوادگی"
                  placeholder="نام خانوادگی دانشجو را اینجا وارد نمایید"
                  disabled={isAmozeshyarTrue || isEstelaamDastiTrue}
                  // disabled={!!userData?.estelamAmoozesh || !!retryEstelaamData?.lastName}
                />
              </Col>
              <Col md={8} xs={12}>
                <CustomInput
                  name="studentNumber"
                  rules={[REQUIRED_RULE]}
                  label="شماره دانشجویی"
                  placeholder="شماره دانشجویی را اینجا وارد نمایید"
                  disabled={isAmozeshyarTrue || isEstelaamDastiTrue}
                  // disabled={
                  //   !!userData?.estelamAmoozesh || !!retryEstelaamData?.studentNumber
                  // }
                />
              </Col>
              <Col md={8} xs={12}>
                <CustomInput
                  name="level"
                  rules={[REQUIRED_RULE]}
                  label="مقطع تحصیلی"
                  placeholder="مقطع تحصیلی"
                  disabled={isAmozeshyarTrue || isEstelaamDastiTrue}
                  // disabled={
                  //   !!userData?.estelamAmoozesh || !!retryEstelaamData?.degreeName
                  // }
                />
              </Col>
              <Col md={8} xs={12}>
                <CustomInput
                  name="field"
                  rules={[REQUIRED_RULE]}
                  label="رشته تحصیلی"
                  placeholder="رشته تحصیلی"
                  disabled={isAmozeshyarTrue || isEstelaamDastiTrue}
                  // disabled={!!userData?.estelamAmoozesh || !!retryEstelaamData?.fieldName}
                />
              </Col>
              <Col md={8} xs={12}>
                <CustomSelect
                  name="gender"
                  options={usersGenderType}
                  rules={[REQUIRED_RULE]}
                  label="جنسیت"
                  form={form}
                  placeholder="انتخاب کنید"
                  disabled={isAmozeshyarTrue || isEstelaamDastiTrue}
                  // disabled={
                  //   !!userData?.estelamAmoozesh || !!retryEstelaamData?.genderName
                  // }
                />
              </Col>
            </Row>
          </>
        )}
      </CustomCard>
    </Form>
  );
};

export default MyUsers;
