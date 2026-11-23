import { useState, useEffect } from "react";

import { Col, Form, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  getRequestContractRowStatusByStatus,
  getRequestContractTypeByStatus,
  REQUEST_CONTRACT_STATUS,
  REQUEST_CONTRACT_TYPE_TEXT,
} from "@pages/Catering/contracts/_shared/utils";
import { MyContractsListRequestsRenewedDrawerContentProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/components/MyContractsListRequestsRenewedDrawerContent/@types/@myContractsListRequestsRenewedDrawerContent";
import MyContractsListRequestsRenewedDrawerContentFoods from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/helper/components/MyContractsListRequestsRenewedDrawerContent/helper/components/MyContractsListRequestsRenewedDrawerContentFoods/MyContractsListRequestsRenewedDrawerContentFoods";

function MyContractsListRequestsRenewedDrawerContent({
  onClose,
  data,
  isLoading,
}: MyContractsListRequestsRenewedDrawerContentProps) {
  const [foodsCount, setFoodsCount] = useState(0);
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [thirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);

  //* ================================ Effects  ================================
  useEffect(() => {
    if (data?.file1) {
      setFirstFile([
        {
          uid: data?.file1,
          name: data?.file1,
          status: "done",
          url: data?.file1,
        },
      ]);
    } else {
      setFirstFile([]);
    }
    if (data?.file2) {
      setSecondFile([
        {
          uid: data?.file2,
          name: data?.file2,
          status: "done",
          url: data?.file2,
        },
      ]);
    } else {
      setSecondFile([]);
    }
    if (data?.file3) {
      setThirdFile([
        {
          uid: data?.file3,
          name: data?.file3,
          status: "done",
          url: data?.file3,
        },
      ]);
    } else {
      setThirdFile([]);
    }
    if (data?.file4) {
      setFourthFile([
        {
          uid: data?.file4,
          name: data?.file4,
          status: "done",
          url: data?.file4,
        },
      ]);
    } else {
      setFourthFile([]);
    }
  }, [data?.file1, data?.file2, data?.file3, data?.file4]);

  //* ================================ Util Functions ================================
  const requestType =
    data?.status != null ? getRequestContractTypeByStatus(data.status) : null;
  const rowStatus =
    data?.status != null ? getRequestContractRowStatusByStatus(data.status) : null;

  const rejectDescription =
    data?.rejectDescription || data?.rejectReasonTitle || emptyString;

  const renderStatusAlert = () => {
    if (rowStatus === REQUEST_CONTRACT_STATUS.pendingCompletion) {
      return (
        <CustomAlert
          title="در انتظار تکمیل!"
          description="درخواست شما در انتظار تکمیل می‌باشد."
          type="warning"
          className="mb-5!"
          showIcon={true}
        />
      );
    }

    if (rowStatus === REQUEST_CONTRACT_STATUS.waited) {
      return (
        <CustomAlert
          title="در انتظار بررسی!"
          description="درخواست شما در انتظار بررسی می‌باشد."
          type="warning"
          className="mb-5!"
          showIcon={true}
        />
      );
    }

    if (rowStatus === REQUEST_CONTRACT_STATUS.accepted) {
      return (
        <CustomAlert
          title="تایید شده!"
          type="success"
          className="mb-5!"
          showIcon={true}
        />
      );
    }

    if (rowStatus === REQUEST_CONTRACT_STATUS.rejected) {
      return (
        <CustomAlert
          title="رد شده!"
          description={rejectDescription}
          type="error"
          className="mb-5!"
          showIcon={true}
        />
      );
    }

    return null;
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form>
      <CustomDrawerHeader title="مشاهده درخواست" closeDrawerHandler={onClose} />
      <Div loading={!!isLoading}>
        {renderStatusAlert()}
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="شماره درخواست"
            value={data?.id?.toString() || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="نوع درخواست"
            value={requestType ? REQUEST_CONTRACT_TYPE_TEXT[requestType] : emptyString}
            span={12}
          />
        </Row>
        <Row gutter={[16, 16]} className="mt-10!">
          <SingleVerticalWithCol
            label="عنوان قرارداد"
            value={data?.title || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="تأمین کننده"
            value={data?.vendorTitle || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="سلف"
            value={data?.restaurantTitle || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="شماره قرارداد"
            value={data?.contractUUID || emptyString}
            span={12}
          />
          <SingleVerticalWithCol
            label="شروع و پایان قرارداد"
            value={`${dataPlaceHolder({
              data: data?.startedDate,
              isDate: true,
              customDateFormat: "YYYY/MM/DD",
            })} — ${dataPlaceHolder({
              data: data?.endDate,
              isDate: true,
              customDateFormat: "YYYY/MM/DD",
            })}`}
            span={24}
          />
        </Row>
        <Row gutter={[16, 16]} className="mt-6!">
          <SingleVerticalWithCol
            label="توضیحات"
            value={data?.description || emptyString}
            span={24}
          />
          <Col span={24}>
            <p className="mb-4 text-right">اسناد مربوطه</p>
            <Row>
              <Col lg={6} md={6} sm={8} xs={12}>
                <CustomUploader
                  fileList={firstFile}
                  setFileList={setFirstFile}
                  isReadOnly={true}
                  maxCount={1}
                  name="file1"
                  hasNullText
                  hasUploaderIcon={false}
                />
              </Col>
              <Col lg={6} md={6} sm={8} xs={12}>
                <CustomUploader
                  fileList={secondFile}
                  setFileList={setSecondFile}
                  isReadOnly={true}
                  maxCount={1}
                  name="file2"
                  hasNullText
                  hasUploaderIcon={false}
                />
              </Col>
              <Col lg={6} md={6} sm={8} xs={12}>
                <CustomUploader
                  fileList={thirdFile}
                  setFileList={setThirdFile}
                  isReadOnly={true}
                  maxCount={1}
                  name="file3"
                  hasNullText
                  hasUploaderIcon={false}
                />
              </Col>
              <Col lg={6} md={6} sm={8} xs={12}>
                <CustomUploader
                  fileList={fourthFile}
                  setFileList={setFourthFile}
                  isReadOnly={true}
                  maxCount={1}
                  name="file4"
                  hasNullText
                  hasUploaderIcon={false}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="mt-10!">
          <p className="mb-4! text-right text-base font-medium text-[#1f1f1f]">
            {`غذاهای قرارداد (${foodsCount})`}
          </p>
          <MyContractsListRequestsRenewedDrawerContentFoods
            contractId={data?.id}
            onFoodsCountChange={setFoodsCount}
          />
        </div>
      </Div>
    </Form>
  );
}

export default MyContractsListRequestsRenewedDrawerContent;
