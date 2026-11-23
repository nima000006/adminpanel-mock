import { useEffect, useState } from "react";

import { Button, Checkbox, Form, Modal } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { SendSessionGuestDataResponse } from "@pages/Committee/Committees/Meetings/SessionCreation/helper/components/SessionGuests/@types/@sessionGuestsStep";

import { AddNewSessionGuestModalProps } from "./@types/@addNewSessionGuestModal";
import manualPaginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/manualPagination";
import { CommitteeReportSubmitTableModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/Submit/CommitteeReportSubmitTableModel";
import { useGetAllUserWithFirstLastNameMutation } from "../../../../../infrastructure/states/redux/Apis/authApi";
import {
  useLazyGetAgendaListQuery,
  useLazyGetNoticesQuery,
  useSendSessionGuestDataMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  User,
  getAllUserWithFirstLastNameResponse,
} from "../../../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";

import "./_addNewSessionGuestModal.scss";

const AddNewSessionGuestModal = ({
  isModalOpen,
  setAddNewSessionGuestModal,
}: AddNewSessionGuestModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Partial<User>>({});
  const [dataSource, setDataSource] = useState([] as User[]);

  const [studentSearchForm] = Form.useForm();
  const [guestAddForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getUsers, { isLoading: isGetAllUsersLoading, data: getAllUserData }] =
    useGetAllUserWithFirstLastNameMutation();

  // get session data
  const [getAgendaList, { isLoading: isGetAgendaListLoading, data: getAgendaListData }] =
    useLazyGetAgendaListQuery();

  // notification type
  const [getNoticesType, { data: noticesTypeData, isLoading: isNoticesTypeLoading }] =
    useLazyGetNoticesQuery();

  // send guest data
  const [sendSessionGuest, { isLoading: isSendSessionGuestLoading }] =
    useSendSessionGuestDataMutation();

  //? ================================ Effects ================================
  //session list and notification type
  useEffect(() => {
    if (isModalOpen?.id > 0) {
      getAgendaList(isModalOpen.id);
      getNoticesType({ firstResult: 0, maxResults: 8 });
    }
  }, [isModalOpen?.id]);

  //* ================================ Util Functions ================================
  //student
  const studentSearchFormHandler = () => {
    const values = studentSearchForm.getFieldsValue();
    getUsers({
      firstName: values?.firstName ? values?.firstName : null,
      lastName: values?.lastName ? values?.lastName : null,
      mobileNo: values?.mobileNo ? values?.mobileNo : null,
      nationalNo: values?.nationalNo ? values?.nationalNo : null,
      pageNumber: 0,
      pageSize: 8,
      studentNo: values?.studentNo ? values?.studentNo : null,
    })
      .unwrap()
      .then(getUserOnSuccess);
  };

  const getUserOnSuccess = (value: getAllUserWithFirstLastNameResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data?.userAdvancedFilterDtos);
    }
  };

  const sendSessionGuestOnSuccess = async (value: SendSessionGuestDataResponse) => {
    if (value?.status === 200) {
      setSelectedStudent({});
      studentSearchForm?.resetFields();
      setDataSource([]);
      setSelectedRowKeys([]);
      return closeModalHandler();
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: Partial<User>[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedStudent(selectedRows[0]);
    },
  };

  const addNewSessionGuestHandler = () => {
    guestAddForm.submit();
    guestAddForm
      ?.validateFields()
      .then(
        (values: {
          notifType: number;
          sendingMessage: string;
          agend: { code: number };
        }) => {
          sendSessionGuest({
            form: "Guests",
            id: "7032080801fb4ffdb1630a2a98919060",
            _data_: {
              firstName: selectedStudent.firstName,
              phoneNumber: selectedStudent.mobile,
              notificationType: values.notifType,
              presence: true,
              lastName: selectedStudent.lastName,
              StudentNumber: selectedStudent.studentNumber,
              preliminaryMeeting: isModalOpen.id,
              sentMessage: values.sendingMessage,
              nationalCode: selectedStudent.nationalCode,
              agenda: values.agend?.code,
            },
          })
            .unwrap()
            .then(sendSessionGuestOnSuccess);
        }
      );
  };
  const closeModalHandler = () => setAddNewSessionGuestModal({ isOpen: false, id: -1 });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="افزودن مدعو"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={500}
          className="committee-session-creation-add-new-session-guest-modal-container"
        >
          <Form form={guestAddForm}>
            <div className="modal-body-container">
              <div className="bread-crumb-container">
                <CustomCard padding={PADDING_20}>
                  <CustomDivider text="دستور جلسه مربوطه" />
                  <div className="grid-cols-4">
                    <CustomSelect
                      name="agend"
                      options={getAgendaListData?.data?.map((item: any) => {
                        return {
                          title: `${item?.studentName} ${item?.studentFamily} - ${item?.nationalCode}`,
                          id: item?.id,
                        };
                      })}
                      placeholder="انتخاب کنید"
                      form={guestAddForm}
                      isLoading={isGetAgendaListLoading}
                      rules={[CUSTOM_REQUIRED_RULE("انتخاب دستور جلسه الزامیست.")]}
                      hasVerticalLabel={false}
                    />
                  </div>
                </CustomCard>
              </div>
              <Form form={studentSearchForm}>
                <CustomCard padding={PADDING_20} className="table-container">
                  <div className="border-round-box">
                    <CustomDivider text="آیتم های جستجو" />
                    <div className="grid-cols-4">
                      <CustomInput
                        type="text"
                        label="نام"
                        name="firstName"
                        placeholder="نام"
                      />
                      <CustomInput
                        type="text"
                        label="نام خانوادگی"
                        name="lastName"
                        placeholder="نام خانوادگی"
                      />
                      <CustomInput
                        type="text"
                        label="شماره ملی"
                        name="nationalNo"
                        placeholder="شماره ملی"
                      />
                      <CustomInput
                        type="text"
                        label="شماره دانشجویی/پرسنلی"
                        name="studentNo"
                        placeholder="شماره دانشجویی/پرسنلی"
                      />
                      <CustomInput
                        type="text"
                        label="شماره تماس"
                        name="mobileNo"
                        placeholder="شماره تماس"
                      />
                      <div>
                        <Button
                          className="custom-btn"
                          type="primary"
                          onClick={studentSearchFormHandler}
                        >
                          اعمال
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="table-container">
                    <CustomTable
                      dataSource={dataSource}
                      columns={CommitteeReportSubmitTableModel}
                      rowKey="nationalCode"
                      pagination={manualPaginationConfig({
                        total: getAllUserData?.data?.totalElement,
                        onChange: (page, pageSize) => {
                          getUsers({
                            pageSize: pageSize,
                            pageNumber: page - 1,
                            firstName: studentSearchForm?.getFieldsValue()?.firstName
                              ? studentSearchForm?.getFieldsValue()?.firstName
                              : null,
                            lastName: studentSearchForm?.getFieldsValue()?.lastName
                              ? studentSearchForm?.getFieldsValue()?.lastName
                              : null,
                            mobileNo: studentSearchForm?.getFieldsValue()?.mobileNo
                              ? studentSearchForm?.getFieldsValue()?.mobileNo
                              : null,
                            nationalNo: studentSearchForm?.getFieldsValue()?.nationalNo
                              ? studentSearchForm?.getFieldsValue()?.nationalNo
                              : null,
                            studentNo: studentSearchForm?.getFieldsValue()?.studentNo
                              ? studentSearchForm?.getFieldsValue()?.studentNo
                              : null,
                          });
                        },
                      })}
                      {...TABLE_PROPS(dataSource?.length)}
                      className="factor-table"
                      rowSelection={{ type: "radio", ...rowSelection }}
                      loading={isGetAllUsersLoading}
                    />
                  </div>
                </CustomCard>
              </Form>
              <CustomCard padding={PADDING_20} loading={isNoticesTypeLoading}>
                <CustomDivider text="اطلاع رسانی" />
                <div className="notification-inputs-container">
                  <CustomRadioGroup
                    name="notifType"
                    label="نوع"
                    options={noticesTypeData?.data.map((item) => {
                      return {
                        label: item?.title,
                        value: item?.id,
                      };
                    })}
                    rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع اطلاع سانی الزامیست.")]}
                    hasVerticalLabel={true}
                  />
                  <CustomTextArea
                    label="پیام ارسالی"
                    placeholder="پیام"
                    name="sendingMessage"
                    rules={[CUSTOM_REQUIRED_RULE("پیام ارسالی را وارد نمائید.")]}
                  />
                </div>
              </CustomCard>
            </div>
            <div className="modal-footer">
              <div className="submit-buttons-container">
                <Button
                  type="primary"
                  className="custom-btn"
                  onClick={addNewSessionGuestHandler}
                  htmlType="submit"
                  loading={isSendSessionGuestLoading}
                >
                  افزودن
                </Button>
                <Button className="custom-btn" onClick={closeModalHandler}>
                  بازگشت
                </Button>
              </div>
              <Checkbox className="checkbox-text" disabled>
                افزودن فرد دیگر بعد از ثبت
              </Checkbox>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AddNewSessionGuestModal;
