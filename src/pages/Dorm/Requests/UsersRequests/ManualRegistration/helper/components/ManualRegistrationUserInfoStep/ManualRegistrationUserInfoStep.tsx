import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useLazyUserNationalCodeInquiryQuery,
  useLazyUserStudentNumberInquiryQuery,
} from "@infra/states/redux/Apis/authApi";
import {
  UserNationalCodeInquiryResponse,
  UserSearchInquiry,
  UserStudentNumberInquiryResponse,
} from "@infra/states/redux/Apis/models/authApi.model";

import {
  ManualRegistrationUserInfoStepFormData,
  ManualRegistrationUserInfoStepProps,
} from "./@types/@manualRegistrationUserInfoStep";
import ManualRegistrationUserInfoTableModel from "./helper/Models/ManualRegistrationUserInfoTableModel";

import "./_manualRegistrationUserInfoStep.scss";

const STUDENT_NUMBER = "studentNumber";
const NATIONAL_NUMBER = "nationalNumber";

const SELECT_USER_WARN_MSG = "انتخاب کاربر الزامیست";

const ManualRegistrationUserInfoStep = ({
  setCurrent,
}: ManualRegistrationUserInfoStepProps) => {
  const [isSearchItemEnable, setIsSearchItemEnable] = useState({
    studentNumber: true,
    nationalNumber: true,
  });

  const [dataSource, setDataSource] = useState<UserSearchInquiry[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { params, setSearchParams } = useQueryParams();

  const navigate = useNavigate();

  const [form] = Form.useForm<ManualRegistrationUserInfoStepFormData>();
  //? ================================  Api Calls ================================
  const [getUsersByNationalCode, { isFetching: isGetAllUsersByNationalCodeLoading }] =
    useLazyUserNationalCodeInquiryQuery();

  const [getUsersByStudentNumber, { isFetching: isGetAllUsersByStudentNumberLoading }] =
    useLazyUserStudentNumberInquiryQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.username) {
      form.setFieldValue(NATIONAL_NUMBER, params?.username);
      setIsSearchItemEnable({
        studentNumber: false,
        nationalNumber: true,
      });

      getUsersByNationalCode(params?.username)
        .unwrap()
        .then((value) => {
          setSelectedRowKeys([value?.data?.[0]?.nationalCode]);
          onGetUsersByNationalCodeSuccess(value);
        });
    }
  }, []);

  //* ================================ Util Functions ================================
  const searchItemHandler = (e: React.ChangeEvent<HTMLInputElement>, item: string) => {
    if (item === STUDENT_NUMBER) {
      if (e?.target?.value) {
        setIsSearchItemEnable((prev) => ({ ...prev, nationalNumber: false }));
      } else {
        setIsSearchItemEnable((prev) => ({ ...prev, nationalNumber: true }));
      }
    } else {
      if (e?.target?.value) {
        setIsSearchItemEnable((prev) => ({ ...prev, studentNumber: false }));
      } else {
        setIsSearchItemEnable((prev) => ({ ...prev, studentNumber: true }));
      }
    }
  };

  const searchUserHandler = (values: ManualRegistrationUserInfoStepFormData) => {
    setSearchParams("");
    setSelectedRowKeys([]);

    if (values?.studentNumber) {
      getUsersByStudentNumber(values?.studentNumber)
        .unwrap()
        .then(onGetUsersByStudentNumberSuccess);
    } else if (values?.nationalNumber) {
      getUsersByNationalCode(values?.nationalNumber)
        .unwrap()
        .then(onGetUsersByNationalCodeSuccess);
    }
  };

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

  const rowSelection = {
    selectedRowKeys,
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: Partial<UserSearchInquiry>[]
    ) => {
      setSelectedRowKeys(selectedRowKeys);
      if (selectedRows[0]?.nationalCode) {
        setSearchParams({ username: selectedRows[0]?.nationalCode?.toString() });
      }
    },
  };

  const nextBtnHandler = () => {
    if (params?.username) {
      setCurrent(1);
    } else {
      toast.warn(SELECT_USER_WARN_MSG, { toastId: SELECT_USER_WARN_MSG });
    }
  };

  const backBtnHandler = () => {
    navigate({ pathname: DORM_USERS_REQUESTS_LIST_PAGE_ROUTE });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="manual-registration-user-info-step-container">
      <Form className="form-container" onFinish={searchUserHandler} form={form}>
        <div>
          <CustomDivider text="جستجوی کاربر" />
          <Row gutter={16}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="جستجو براساس شماره دانشجویی / پرسنلی"
                name="studentNumber"
                placeholder="جستجو"
                onChange={(e) => searchItemHandler(e, STUDENT_NUMBER)}
                disabled={!isSearchItemEnable.studentNumber}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="جستجو براساس کد ملی / اتباع"
                name="nationalNumber"
                placeholder="جستجو"
                onChange={(e) => searchItemHandler(e, NATIONAL_NUMBER)}
                disabled={!isSearchItemEnable.nationalNumber}
              />
            </Col>
          </Row>
        </div>
        <div className="search-btn-container">
          <CustomButton
            type="primary"
            htmlType="submit"
            loading={
              isGetAllUsersByNationalCodeLoading || isGetAllUsersByStudentNumberLoading
            }
          >
            جستجو
          </CustomButton>
        </div>
      </Form>

      <div>
        <CustomDivider text="نتایج جستجو" />
        <CustomTable
          dataSource={dataSource}
          columns={ManualRegistrationUserInfoTableModel()}
          pagination={paginationConfig}
          rowKey="nationalCode"
          loading={
            isGetAllUsersByNationalCodeLoading || isGetAllUsersByStudentNumberLoading
          }
          rowSelection={{ type: "radio", ...rowSelection }}
          className="users-requests-manual-registration-table-model-container"
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
      <div className="step-btn-container">
        <CustomButton type="primary" ghost onClick={backBtnHandler}>
          انصراف
        </CustomButton>
        <CustomButton type="primary" onClick={nextBtnHandler}>
          مرحله بعد
        </CustomButton>
      </div>
    </div>
  );
};

export default ManualRegistrationUserInfoStep;
