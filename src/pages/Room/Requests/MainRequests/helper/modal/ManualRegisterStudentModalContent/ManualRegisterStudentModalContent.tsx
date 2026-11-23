/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";
import { toast } from "react-toastify";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "@components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import ManualDormRegisterModel from "@infra/models/tableModels/RoomTableModel/DormRequests/ManualDormRegisterModel/ManualDormRegisterModel";
import {
  useLazyUserNationalCodeInquiryQuery,
  useLazyUserStudentNumberInquiryQuery,
} from "@infra/states/redux/Apis/authApi";
import {
  UserNationalCodeInquiryResponse,
  UserSearchInquiry,
  UserStudentNumberInquiryResponse,
} from "@infra/states/redux/Apis/models/authApi.model";
// import { ManualDormRegistrationResponse } from "@infra/states/redux/Apis/models/roomApi.model";
import {
  useGetListOfDormsMutation,
  // useManualDormRegistrationMutation,
} from "@infra/states/redux/Apis/roomApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import {
  GENERAL_ERROR_MESSAGE,
  // GENERAL_SUBMIT_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import { ManualRegisterStudentModalContentFormData } from "@pages/Dorm/Requests/helpers/components/ManualRegisterStudentModalContent/@types/@manualRegisterStudentModalContentTypes";
import { semestersOption } from "@pages/Room/_shared/lib/config";
import "./_manualRegisterStudentModalContent.scss";

type ManualRegisterStudentModalContentProps = {
  manualRegisterModal: {
    isOpen: boolean;
  };
  setManualRegisterModal: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
    }>
  >;
  setIsKeyUpdated: React.Dispatch<React.SetStateAction<1 | 2>>;
};

const ManualRegisterStudentModalContent = ({
  setManualRegisterModal,
  manualRegisterModal,
  // setIsKeyUpdated,
}: ManualRegisterStudentModalContentProps) => {
  const [dataSource, setDataSource] = useState<UserSearchInquiry[] | UserSearchInquiry>();
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Partial<UserSearchInquiry>>({});
  const [form] = Form.useForm<ManualRegisterStudentModalContentFormData>();

  const [isBasedOnNationalCode, setIsBasedOnNationalCode] = useState(false);

  //? ================================  Api Calls ================================
  const [getListOfDorm, { data: listOfDormData, isLoading: isListOfDormLoading }] =
    useGetListOfDormsMutation();

  const [getUsersByNationalCode, { isFetching: isGetAllUsersByNationalCodeLoading }] =
    useLazyUserNationalCodeInquiryQuery();

  const [getUsersByStudentNumber, { isFetching: isGetAllUsersByStudentNumberLoading }] =
    useLazyUserStudentNumberInquiryQuery();

  // const [manualRegister, { isLoading: isManualRegisterLoading }] =
  //   useManualDormRegistrationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (manualRegisterModal?.isOpen) {
      getListOfDorm();
      form.setFieldsValue({
        term: selectDefaultValueGenerator(semestersOption[5]),
      });
    }
  }, [manualRegisterModal?.isOpen]);

  //* ================================ Util Functions ================================
  const onGetUsersByNationalCodeSuccess = (response: UserNationalCodeInquiryResponse) => {
    if (response.status === 200) {
      return setDataSource(
        Array.isArray(response?.data) ? response?.data : [response?.data]
      );
    }
  };

  const onGetUsersByStudentNumberSuccess = async (
    response: UserStudentNumberInquiryResponse
  ) => {
    if (response.status === 200) {
      setDataSource(Array.isArray(response?.data) ? response?.data : [response?.data]);
    }
  };

  const onClickSearchStudent = () => {
    setDataSource([]);
    setSelectedStudent({});
    // setSelectedRowKeys([]);
    if (form?.getFieldValue("fieldNumber")) {
      if (isBasedOnNationalCode) {
        return getUsersByNationalCode(form?.getFieldValue("fieldNumber"))
          .unwrap()
          .then(onGetUsersByNationalCodeSuccess);
      } else {
        return getUsersByStudentNumber(form?.getFieldValue("fieldNumber"))
          .unwrap()
          .then(onGetUsersByStudentNumberSuccess);
      }
    }
  };

  // On row check box selection change
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: UserSearchInquiry[]) => {
  //     setSelectedRowKeys(selectedRowKeys);
  //     setSelectedStudent(selectedRows[0]);
  //   },
  // };

  const closeModal = () => {
    setManualRegisterModal({ isOpen: false });
    form?.resetFields();
    setSelectedStudent({});
    // setSelectedRowKeys([]);
    setDataSource([]);
  };

  // const onManualRegisterSuccess = async (response: ManualDormRegistrationResponse) => {
  //   if (response?.status === 200) {
  //     toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
  //     setIsKeyUpdated((prev) => (prev === 1 ? 2 : 1));
  //     closeModal();
  //   }
  // };

  const onFormSubmit = (/*formData: ManualRegisterStudentModalContentFormData*/) => {
    if (
      selectedStudent?.branchCode &&
      selectedStudent?.genderName &&
      selectedStudent?.firstName &&
      selectedStudent?.lastName &&
      selectedStudent?.studentNumber &&
      selectedStudent?.nationalCode &&
      selectedStudent?.mobile &&
      selectedStudent?.firstName &&
      selectedStudent?.levelName
    ) {
      // return console.log({ dataSource });
      // manualRegister({
      //   branchCode: +selectedStudent?.branchCode?.slice(-3),
      //   dormitoryId: formData?.dorm?.code,
      //   gender: selectedStudent?.genderName === "مرد" ? 0 : 1,
      //   name: selectedStudent?.firstName ? selectedStudent?.firstName : "",
      //   lastName: selectedStudent?.lastName ? selectedStudent?.lastName : "",
      //   mobile: selectedStudent?.mobile ? selectedStudent?.mobile : "",
      //   studentNumber: selectedStudent?.studentNumber
      //     ? selectedStudent?.studentNumber
      //     : "",
      //   username: selectedStudent?.nationalCode ? selectedStudent?.nationalCode : "",
      //   term: formData?.term?.key,
      //   fieldName: selectedStudent?.fieldName ? selectedStudent?.fieldName : "",
      //   levelName: selectedStudent?.levelName ? selectedStudent?.levelName : "",
      // })
      //   .unwrap()
      //   .then(onManualRegisterSuccess);
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {manualRegisterModal?.isOpen && (
        <Modal
          open={manualRegisterModal?.isOpen}
          footer={null}
          onCancel={closeModal}
          title="ثبت نام دستی دانشجو"
          width={900}
          centered={true}
          className="manual-register-dorm-modal-container"
        >
          <Form
            className="manual-register-modal-content-container"
            form={form}
            onFinish={onFormSubmit}
          >
            <CustomCard>
              <CustomSelect
                name="dorm"
                label="خوابگاه"
                form={form}
                options={listOfDormData?.data?.map((item) => {
                  return {
                    id: item?.id,
                    title: item?.name,
                  };
                })}
                isLoading={isListOfDormLoading}
                rules={[REQUIRED_RULE]}
                hasVerticalLabel={false}
              />
            </CustomCard>
            <CustomCard className="manual-semester-container">
              <CustomSelect
                form={form}
                label="نیمسال"
                options={semestersOption}
                name="term"
                placeholder="نیمسال تحصیلی را انتخاب فرمائید"
                rules={[REQUIRED_RULE]}
                hasVerticalLabel={false}
                // onChange={(value: any) => setSemester(value)}
              />
            </CustomCard>
            <CustomCard>
              <CustomDivider text="آیتم های جستجو" />
              <div className="search-items-container">
                <CustomSwitch
                  label="جستجو بر اساس"
                  checkedChildren="کد ملی"
                  unCheckedChildren="شماره دانشجویی"
                  valuePropName="searchmode"
                  onChange={(checked: boolean) => setIsBasedOnNationalCode(checked)}
                />

                <CustomInput
                  label={isBasedOnNationalCode ? "کد ملی" : "شماره دانشجویی"}
                  name="fieldNumber"
                  placeholder={isBasedOnNationalCode ? "کد ملی" : "شماره دانشجویی"}
                  rules={[REQUIRED_RULE]}
                />
              </div>
              <Button
                type="primary"
                className="search-btn"
                onClick={onClickSearchStudent}
                loading={
                  isGetAllUsersByNationalCodeLoading ||
                  isGetAllUsersByStudentNumberLoading
                }
              >
                جستجو
              </Button>
            </CustomCard>
            <CustomCard>
              <CustomTable
                dataSource={dataSource as any}
                columns={ManualDormRegisterModel}
                rowKey="studentNumber"
                pagination={paginationConfig}
                loading={
                  isGetAllUsersByNationalCodeLoading ||
                  isGetAllUsersByStudentNumberLoading
                }
                // rowSelection={{
                //   type: "radio",
                //   ...rowSelection,
                // }}
                {...TABLE_PROPS(Array.isArray(dataSource) ? dataSource?.length : 0)}
              />
            </CustomCard>
            <div className="btn-container">
              <CustomButton
                htmlType="submit"
                type="primary"
                disabled={!selectedStudent?.nationalCode}
                // loading={isManualRegisterLoading}
              >
                ثبت نام
              </CustomButton>
              <CustomButton onClick={closeModal}>انصراف</CustomButton>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ManualRegisterStudentModalContent;
