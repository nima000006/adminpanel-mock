import { useState } from "react";

import { Form, Modal } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { isObjectEmpty } from "../../../../../infrastructure/helpers/utils";
import { CommitteeReportSubmitTableModel } from "../../../../../infrastructure/models/tableModels/CommitteeTableModel/Submit/CommitteeReportSubmitTableModel";
import {
  useLazyUserNationalCodeInquiryQuery,
  useLazyUserStudentNumberInquiryQuery,
} from "../../../../../infrastructure/states/redux/Apis/authApi";
import {
  UserNationalCodeInquiryResponse,
  UserSearchInquiry,
  UserStudentNumberInquiryResponse,
} from "../../../../../infrastructure/states/redux/Apis/models/authApi.model";
import {
  PLEASE_ENTER_THE_NATIONAL_CODE,
  PLEASE_ENTER_THE_STUDENT_NUMBER,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  ACCUSED_ID,
  REPORTER_ID,
} from "../../../../../pages/Committee/HandleProcessing/Reports/ReportSubmit/reportSubmitUtils/reportSubmitUtils";
import { User } from "../../../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import "./_studentSearchModal.scss";

type StudentSearchModalProps = {
  isModalOpen: boolean;
  closeModalHandler: () => void;
  setAccusedDataHandler?: (data: Partial<User>) => void;
  setReporterDataHandler?: (data: Partial<User>) => void;
  from: number;
  hasManualSet?: boolean;
};

const StudentSearchModal = ({
  isModalOpen,
  closeModalHandler,
  setAccusedDataHandler,
  setReporterDataHandler,
  from,
}: StudentSearchModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Partial<UserSearchInquiry>>({});
  const [dataSource, setDataSource] = useState([] as UserSearchInquiry[]);
  const [isBasedOnNationalCode, setIsBasedOnNationalCode] = useState(false);

  const [form] = Form.useForm();

  //! onGetUsersByNationalCodeSuccess
  const onGetUsersByNationalCodeSuccess = async (
    info: UserNationalCodeInquiryResponse
  ) => {
    if (info?.status === 200) {
      setDataSource(info?.data);
    }
  };

  //! onGetUsersByStudentNumberSuccess
  const onGetUsersByStudentNumberSuccess = async (
    info: UserStudentNumberInquiryResponse
  ) => {
    if (info?.status === 200) {
      setDataSource(Array.isArray(info?.data) ? info?.data : [info.data]);
    }
  };

  //todo [saman]: other method success for estelam
  // const onGetUserSuccess = async (info: getAllUserWithFirstLastNameResponse) => {
  //   if (info?.status === 200) {
  //     setDataSource(info?.data?.userAdvancedFilterDtos);
  //   }
  // };

  //!
  const [getUsersByNationalCode, { isFetching: isGetAllUsersByNationalCodeLoading }] =
    useLazyUserNationalCodeInquiryQuery();

  const [getUsersByStudentNumber, { isFetching: isGetAllUsersByStudentNumberLoading }] =
    useLazyUserStudentNumberInquiryQuery();

  //!
  // const [getUsers, { isLoading: isGetAllUsersLoading, data: getAllUserData }] =
  //   useGetAllUserWithFirstLastNameMutation();

  //!
  const onFormFinishHandler = (values: { searchMode?: boolean; searchText?: string }) => {
    if (isBasedOnNationalCode) {
      if (values?.searchText) {
        getUsersByNationalCode(values?.searchText)
          .unwrap()
          .then(onGetUsersByNationalCodeSuccess);
      } else {
        toast.error(PLEASE_ENTER_THE_NATIONAL_CODE);
      }
    } else {
      if (values?.searchText) {
        getUsersByStudentNumber(values?.searchText)
          .unwrap()
          .then(onGetUsersByStudentNumberSuccess);
      } else {
        toast.error(PLEASE_ENTER_THE_STUDENT_NUMBER);
      }
    }

    //todo [saman]: other method for estelam
    // getUsers({
    //   firstName: values?.firstName ? values?.firstName : null,
    //   lastName: values?.lastName ? values?.lastName : null,
    //   mobileNo: values?.mobileNo ? values?.mobileNo : null,
    //   nationalNo: values?.nationalNo ? values?.nationalNo : null,
    //   pageNumber: 0,
    //   pageSize: 8,
    //   studentNo: values?.studentNo ? values?.studentNo : null,
    // })
    //   .unwrap()
    //   .then(onGetUserSuccess);
  };

  //!
  const rowSelection = {
    selectedRowKeys,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: Partial<UserSearchInquiry>[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedStudent(selectedRows[0]);
    },
  };

  //!
  const resetModalToClosed = () => {
    setSelectedStudent({});
    form?.resetFields();
    setDataSource([]);
    setSelectedRowKeys([]);
    return closeModalHandler();
  };

  //!
  const selectedUserHandler = () => {
    if (from === REPORTER_ID && selectedStudent) {
      setReporterDataHandler?.(selectedStudent);
      return resetModalToClosed();
    }
    if (from === ACCUSED_ID && selectedStudent) {
      setAccusedDataHandler?.(selectedStudent);
      return resetModalToClosed();
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          title={from === 1 ? "جستجوی کاربر" : "جستجوی دانشجو"}
          open={isModalOpen}
          onCancel={resetModalToClosed}
          footer={null}
          width={800}
          className="committee-submit-student-search-modal-container"
        >
          <Form onFinish={onFormFinishHandler} form={form}>
            <CustomCard className="modal-body">
              <div className="search-box-container">
                <CustomDivider text="آیتم های جستجو" />
                <div>
                  <CustomSwitch
                    label="جستجو بر اساس"
                    checkedChildren="کد ملی"
                    unCheckedChildren="شماره دانشجویی"
                    valuePropName="searchmode"
                    onChange={(checked: boolean) => setIsBasedOnNationalCode(checked)}
                  />
                  <div className="input-btn-container">
                    <CustomInput
                      type="text"
                      label="جستجو"
                      name="searchText"
                      placeholder={isBasedOnNationalCode ? "کد ملی" : "شماره دانشجویی"}
                    />
                    <CustomButton
                      type="primary"
                      htmlType="submit"
                      key="searchBtn"
                      loading={
                        isGetAllUsersByNationalCodeLoading ||
                        isGetAllUsersByStudentNumberLoading
                      }
                    >
                      {isBasedOnNationalCode ? "جستجو کد ملی" : "جستجو شماره دانشجویی"}
                    </CustomButton>
                  </div>
                </div>
                {/* <div className="grid-cols-3">
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
              <div className="search-box-btn-container">
                <Button className="custom-btn" type="primary" htmlType="submit">
                  جستجو
                </Button>
              </div>
            </div> */}
              </div>
              <div className="table-container">
                <CustomTable
                  dataSource={dataSource}
                  columns={CommitteeReportSubmitTableModel}
                  rowKey="studentNumber"
                  pagination={
                    paginationConfig
                    //   manualPaginationConfig({
                    //   total: getAllUserData?.data?.totalElement,
                    //   onChange: (page, pageSize) => {
                    //     getUsers({
                    //       pageSize: pageSize,
                    //       pageNumber: page - 1,
                    //       firstName: form?.getFieldsValue()?.firstName
                    //         ? form?.getFieldsValue()?.firstName
                    //         : null,
                    //       lastName: form?.getFieldsValue()?.lastName
                    //         ? form?.getFieldsValue()?.lastName
                    //         : null,
                    //       mobileNo: form?.getFieldsValue()?.mobileNo
                    //         ? form?.getFieldsValue()?.mobileNo
                    //         : null,
                    //       nationalNo: form?.getFieldsValue()?.nationalNo
                    //         ? form?.getFieldsValue()?.nationalNo
                    //         : null,
                    //       studentNo: form?.getFieldsValue()?.studentNo
                    //         ? form?.getFieldsValue()?.studentNo
                    //         : null,
                    //     });
                    //   },
                    // })
                  }
                  {...TABLE_PROPS(dataSource?.length)}
                  className="factor-table"
                  rowSelection={{ type: "radio", ...rowSelection }}
                  loading={
                    isGetAllUsersByNationalCodeLoading ||
                    isGetAllUsersByStudentNumberLoading
                  }
                />
              </div>
            </CustomCard>
            <div className="submit-buttons-container">
              <CustomButton
                type="primary"
                className="custom-btn"
                onClick={selectedUserHandler}
                disabled={isObjectEmpty(selectedStudent)}
              >
                {from === 1 ? "انتخاب کاربر" : "انتخاب دانشجو"}
              </CustomButton>
              <CustomButton className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </CustomButton>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default StudentSearchModal;
