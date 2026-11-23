import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { RequestMyContractsListWaitedCreatedDrawerContentDetailsProps } from "@pages/Catering/contracts/Requests/RequestMyContractsList/helper/components/RequestMyContractsListWaited/helper/components/RequestMyContractsListWaitedCreatedDrawerContent/helper/components/RequestMyContractsListWaitedCreatedDrawerContentDetails/@types/@requestMyContractsListWaitedCreatedDrawerContentDetails";

function RequestMyContractsListWaitedCreatedDrawerContentDetails({
  data,
}: RequestMyContractsListWaitedCreatedDrawerContentDetailsProps) {
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
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <Row gutter={[16, 16]} className="mt-5!">
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
          span={12}
        />
      </Row>
      <Row gutter={[16, 16]} className="mt-5!">
        <SingleVerticalWithCol
          label="توضیحات"
          value={data?.description || emptyString}
          span={24}
        />
        <Col span={24} className="mb-10!">
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
    </>
  );
}

export default RequestMyContractsListWaitedCreatedDrawerContentDetails;
