import { useState, useEffect } from "react";

import { Button, Col, Form, RadioChangeEvent, Row, Switch } from "antd";
import { Key } from "antd/es/table/interface";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useLazyGetAllBranchesQuery } from "@infra/states/redux/Apis/business/business/businessApi";

import {
  GetAllUserResponse,
  NotificationAdvanceFilterType,
  NotificationItemsProps,
  NotificationSingleFormSubmitType,
  NotificationUserInfoType,
  PostNotificationResponse,
  SingleUserInUserList,
} from "./@types/@notificationSingle";
import UniversityInfo from "./helper/component/UniversityInfo/UniversityInfo";
import UserInfo from "./helper/component/UserInfo/UserInfo";
import CustomCard from "../../../../../../components/CustomCard/CustomCard";
import CustomInput from "../../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import SubmitButton from "../../../../../../components/CustomInputs/SubmitButton/SubmitButton";
import CustomDivider from "../../../../../../components/Renderers/CustomDivider/CustomDivider";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { NotificationTableModel } from "../../../../../../infrastructure/models/tableModels/NotificationTableModel/NotificationTableModel";
import { NOTIFICATION_PRODUCT_SELECTOR_PAGE_ROUTE } from "../../../../../../infrastructure/router/routes/notification";
import {
  useGetAllUserByUserInfoMutation,
  useGetAllUserMutation,
} from "../../../../../../infrastructure/states/redux/Apis/authApi";
import { usePostNotificationMutation } from "../../../../../../infrastructure/states/redux/Apis/notificationApi";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../../infrastructure/validation/validationSchema";
import {
  NOTIFICATION_SEND_FAIL,
  NOTIFICATION_SEND_SUCCESS,
  NOT_ENOUGH_PERMISSION,
} from "../../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_notificationSingle.scss";

const NotificationSingle = ({ setIsTableShow, isTableShow }: NotificationItemsProps) => {
  const navigate = useNavigate();
  const [universityForm] = Form.useForm();
  const [contentForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [radioOption, setRadioOption] = useState<"1" | "2">("1");
  const [messageRadioOption, setMessageRadioOption] = useState<"1" | "2" | "3">("1");
  const [tableData, setTableData] = useState<SingleUserInUserList[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const [isOpenFirstSwitch, setIsOpenFirstSwitch] = useState(false);
  const [isOpenSecondSwitch, setIsOpenSecondSwitch] = useState(false);
  const [isOpenThirdSwitch, setIsOpenThirdSwitch] = useState(false);

  const [selectedUsers, setSelectedUsers] = useState<SingleUserInUserList[]>([]);

  const [searchParams] = useSearchParams();
  const { id, label } = Object.fromEntries([...searchParams]);

  // const [getUserList, { data: notificationListData, error: getUserListError }] =
  //   useLazyGetUserListQuery();

  const [postNotification] = usePostNotificationMutation();

  const [getAllUniversity, { data: universityData, isLoading: isUniversityDataLoading }] =
    useLazyGetAllBranchesQuery();

  //!
  const [getAllUserByUserInfo, { isLoading: isGetAllUserByUserInfoLoading }] =
    useGetAllUserByUserInfoMutation();
  //
  const [getAllUsersList, { isLoading: isUsersListLoading }] = useGetAllUserMutation();

  useEffect(() => {
    getAllUniversity();
  }, []);

  // useEffect(() => {
  //   getUserList({ page: 1, pageSize: 8 });
  // }, []);

  //!
  const onRadioOptionChange = (e: RadioChangeEvent) => {
    setRadioOption(e.target.value);
  };

  //! change switch
  const handelFirstSwitch = (checked: boolean) => {
    setIsOpenFirstSwitch(checked);
  };
  const handelSecondSwitch = (checked: boolean) => {
    setIsOpenSecondSwitch(checked);
  };
  const handelThirdSwitch = (checked: boolean) => {
    setIsOpenThirdSwitch(checked);
  };
  //! on radio message change
  const onMessageRadioOptionChange = (e: RadioChangeEvent) => {
    setMessageRadioOption(e.target.value);
  };
  // const handleChangeUni = (_: string[], options: any) => {
  //   setUniName(options);
  // };
  //! onGetUsersSuccess
  const onGetUsersSuccess = async (allUsersData: GetAllUserResponse) => {
    if (allUsersData?.status === 200) {
      setIsTableShow(true);
      setTableData(allUsersData?.data?.userList);
    }
  };
  //! get ALL USER by university
  const getAllTableUsers = (universityId?: string) => {
    if (universityId) {
      getAllUsersList({
        branchCode: universityId ?? selectedUniversity,
        fieldCode: 0,
        levelCode: 0,
        pageNumber: 0,
        pageSize: 1000000,
      })
        .unwrap()
        .then(onGetUsersSuccess);
    }
  };

  const onGetAllTableUsersBySuccess = async (value: GetAllUserResponse) => {
    if (value?.status === 200) {
      setIsTableShow(true);
      setTableData(value?.data?.userList);
    }
  };

  //! get ALL USER by user
  const getAllTableUsersBy = ({
    nationalCode,
    phoneNumber,
    studentNumber,
  }: NotificationUserInfoType) => {
    getAllUserByUserInfo({
      pageNumber: 0,
      pageSize: 100000,
      nationalCode,
      phoneNumber,
      studentNumber,
    })
      .unwrap()
      .then(onGetAllTableUsersBySuccess);
  };
  const advanceFilterHandler = (data: NotificationAdvanceFilterType) => {
    setSelectedUniversity(data?.university?.value);
    getAllTableUsers(data?.university?.value);
  };
  const onUserInfoSubmit = ({
    nationalCode,
    studentNumber,
    phoneNumber,
  }: NotificationUserInfoType) => {
    getAllTableUsersBy({ nationalCode, studentNumber, phoneNumber });
  };
  //! On row check box selection change
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: Key[], selectedRows: SingleUserInUserList[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedUsers(selectedRows);
    },
  };

  // const sendNotificationHandler = (e: any) => {
  //   postNotification({
  //     nationalNumber: selectedUsers?.map((item) => item.nationalCode),
  //     title: e.title,
  //     message: e.message,
  //     serviceName: label ?? "",
  //     serviceId: id ? +id : 0 ?? 0,
  //     paramOneName: e.codeTitleFirst,
  //     paramOneValue: e.codeFirst,
  //     paramTwoName: e.codeTitleSecond,
  //     paramTwoValue: e.codeSecond,
  //     paramThreeName: e.codeTitleThird,
  //     paramThreeValue: e.codeThird,
  //   });
  // };
  const onPostNotificationSuccess = (data: PostNotificationResponse) => {
    if (data?.status === 200) {
      toast.success(NOTIFICATION_SEND_SUCCESS, { toastId: NOTIFICATION_SEND_SUCCESS });
      navigate({ pathname: NOTIFICATION_PRODUCT_SELECTOR_PAGE_ROUTE });
    }
  };

  const onFormSubmit = (values: NotificationSingleFormSubmitType) => {
    postNotification({
      nationalNumber: selectedUsers?.map((item) => item.nationalCode),
      title: values?.title,
      message: values?.message,
      serviceName: label ?? "",
      serviceId: id ? +id : 0,
      paramOneName: values?.codeTitleFirst,
      paramOneValue: values?.codeFirst,
      paramTwoName: values?.codeTitleSecond,
      paramTwoValue: values?.codeSecond,
      paramThreeName: values?.codeTitleThird,
      paramThreeValue: values?.codeThird,
    })
      .unwrap()
      .then(onPostNotificationSuccess)
      .catch((error) => {
        if (error?.status === 403) {
          return toast.error(NOT_ENOUGH_PERMISSION, { toastId: NOT_ENOUGH_PERMISSION });
        } else {
          toast.error(NOTIFICATION_SEND_FAIL, { toastId: NOTIFICATION_SEND_FAIL });
        }
      });
  };

  return (
    <div className="notification-page-container">
      <div className="table-container">
        <CustomDivider
          text={isTableShow ? "جستجو کاربر" : "جستجو دسته بندی ها"}
          extraContent={
            isTableShow ? (
              <Button
                type="primary"
                size="small"
                className="return-to-search-btn"
                onClick={() => setIsTableShow(false)}
              >
                برگشت به جستجو
              </Button>
            ) : null
          }
        />
        {!isTableShow ? (
          <section className="advanced-filter-container">
            <div className="title">
              لطفا برای مشاهده جدول کاربران، دانشگاه مد نظر را انتخاب کنید یا از اطلاعات
              فردی استفاده نمایید
            </div>
            <CustomCard>
              <CustomRadioGroup
                label="جستجو براساس:"
                options={[
                  { label: "اطلاعات دانشگاهی", value: "1" },
                  { label: "اطلاعات فردی", value: "2" },
                ]}
                value={radioOption}
                onChange={onRadioOptionChange}
              />
              {radioOption === "1" ? (
                <UniversityInfo
                  form={universityForm}
                  advanceFilterHandler={advanceFilterHandler}
                  universityData={universityData}
                  isUniversityDataLoading={isUniversityDataLoading}
                  isUsersListLoading={isUsersListLoading}
                />
              ) : (
                <UserInfo
                  form={userForm}
                  onUserInfoSubmit={onUserInfoSubmit}
                  isGetAllUserByUserInfoLoading={isGetAllUserByUserInfoLoading}
                />
              )}
            </CustomCard>
          </section>
        ) : (
          <>
            <CustomTable
              dataSource={tableData}
              columns={NotificationTableModel()}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              rowKey="id"
              {...TABLE_PROPS(tableData?.length)}
              pagination={
                paginationConfig
                //   manualPaginationConfig({
                //   total: notificationListData?.data?.totalElement,
                //   onChange: (page, pageSize) => {
                //     getUserList({ page: page - 1, pageSize });
                //   },
                // })
              }
            />
            <CustomDivider text="محتوای اعلان" />

            <Form form={contentForm} onFinish={onFormSubmit}>
              <CustomCard className="content-form">
                {/* <div className="message-container"> */}
                <Row gutter={[12, 12]} className="row">
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <CustomSelect
                      name="product"
                      label="محصول"
                      options={[]}
                      placeholder="انتخاب کنید"
                      defaultValue={label}
                      disabled={true}
                      form={contentForm}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <CustomInput
                      type="text"
                      label="عنوان اعلان"
                      name="title"
                      placeholder="عنوان اعلان"
                    />
                  </Col>
                  <Col span={24}>
                    <CustomTextArea
                      showCount={true}
                      // maxLength={100}
                      label="پیام ارسالی"
                      name="message"
                      placeholder="پیام ارسالی"
                    />
                  </Col>
                  <Col span={24}>
                    <CustomRadioGroup
                      label="نوع"
                      name="messageRadio"
                      rules={[REQUIRED_RULE]}
                      options={[
                        {
                          label: "پیامک",
                          value: "1",
                        },
                        {
                          label: "ایمیل",
                          value: "2",
                        },
                        {
                          label: "اعلان",
                          value: "3",
                        },
                      ]}
                      value={messageRadioOption}
                      onChange={onMessageRadioOptionChange}
                      hasVerticalLabel={true}
                    />
                  </Col>
                </Row>
                {/* </div> */}
                {/* مقدار اول */}
                <CustomCard className="card-margins">
                  <CustomDivider
                    text="مقدار اول"
                    extraContent={
                      <div className="switch-container">
                        <Switch onChange={handelFirstSwitch} />
                      </div>
                    }
                  />
                  {isOpenFirstSwitch ? (
                    <>
                      <CustomInput
                        type="text"
                        label="عنوان کد"
                        name="codeTitleFirst"
                        placeholder="عنوان"
                      />
                      <CustomInput
                        type="text"
                        label="کد"
                        name="codeFirst"
                        placeholder="کد"
                      />
                    </>
                  ) : null}
                </CustomCard>
                {/*مقدار دوم */}
                <CustomCard className="card-margins">
                  <div>
                    <CustomDivider
                      text="مقدار دوم"
                      extraContent={
                        <div className="switch-container">
                          <Switch onChange={handelSecondSwitch} />
                        </div>
                      }
                    />
                  </div>
                  {isOpenSecondSwitch ? (
                    <>
                      <CustomInput
                        type="text"
                        label="عنوان کد"
                        name="codeTitleSecond"
                        placeholder="عنوان"
                        rules={[
                          CUSTOM_REQUIRED_RULE("لطفا عنوان اعلان خود را وارد کنید"),
                        ]}
                      />
                      <CustomInput
                        type="text"
                        label="کد"
                        name="codeSecond"
                        placeholder="کد"
                      />
                    </>
                  ) : null}
                </CustomCard>
                {/* مقدار سوم */}
                <CustomCard className="card-margins">
                  <CustomDivider
                    text="مقدار سوم"
                    extraContent={
                      <div className="switch-container">
                        <Switch onChange={handelThirdSwitch} />
                      </div>
                    }
                  />
                  {isOpenThirdSwitch ? (
                    <>
                      <CustomInput
                        type="text"
                        label="عنوان کد"
                        name="codeTitleThird"
                        placeholder="عنوان"
                      />
                      <CustomInput
                        type="text"
                        label="کد"
                        name="codeThird"
                        placeholder="کد"
                      />
                    </>
                  ) : null}
                </CustomCard>
                <div>
                  <SubmitButton
                    form={contentForm}
                    label="ارسال اعلان"
                    type="primary"
                    icon={<AiOutlineSend />}
                    disabled={selectedUsers?.length === 0}
                  />
                </div>
              </CustomCard>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};
export default NotificationSingle;
