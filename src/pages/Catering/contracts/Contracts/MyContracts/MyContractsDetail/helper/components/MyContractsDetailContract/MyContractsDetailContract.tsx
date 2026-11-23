import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { getCateringContractStatusTypeTagConfig } from "@pages/Catering/contracts/_shared/utils";
import { MyContractsDetailContractProps } from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsDetail/helper/components/MyContractsDetailContract/@types/@myContractsDetailContract";

const MyContractsDetailContract = ({
  contractDetail,
  isLoading = false,
}: MyContractsDetailContractProps) => {
  const [firstFile, setFirstFile] = useState<UploadFile[]>([]);
  const [secondFile, setSecondFile] = useState<UploadFile[]>([]);
  const [thirdFile, setThirdFile] = useState<UploadFile[]>([]);
  const [fourthFile, setFourthFile] = useState<UploadFile[]>([]);

  const statusTagConfig = getCateringContractStatusTypeTagConfig(
    contractDetail?.statusType
  );

  const contractDateRange =
    contractDetail?.startedDate || contractDetail?.endDate
      ? `${dataPlaceHolder({
          data: contractDetail?.startedDate,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })} — ${dataPlaceHolder({
          data: contractDetail?.endDate,
          isDate: true,
          customDateFormat: "YYYY/MM/DD",
        })}`
      : undefined;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!contractDetail) {
      setFirstFile([]);
      setSecondFile([]);
      setThirdFile([]);
      setFourthFile([]);
      return;
    }

    if (contractDetail.file1) {
      setFirstFile([
        {
          uid: contractDetail.file1,
          name: contractDetail.file1,
          status: "done",
          url: contractDetail.file1,
        },
      ]);
    } else {
      setFirstFile([]);
    }

    if (contractDetail.file2) {
      setSecondFile([
        {
          uid: contractDetail.file2,
          name: contractDetail.file2,
          status: "done",
          url: contractDetail.file2,
        },
      ]);
    } else {
      setSecondFile([]);
    }

    if (contractDetail.file3) {
      setThirdFile([
        {
          uid: contractDetail.file3,
          name: contractDetail.file3,
          status: "done",
          url: contractDetail.file3,
        },
      ]);
    } else {
      setThirdFile([]);
    }

    if (contractDetail.file4) {
      setFourthFile([
        {
          uid: contractDetail.file4,
          name: contractDetail.file4,
          status: "done",
          url: contractDetail.file4,
        },
      ]);
    } else {
      setFourthFile([]);
    }
  }, [contractDetail]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isLoading}>
      <section className="flex flex-col gap-6">
        <CustomDivider
          text="اطلاعات قرارداد"
          extraContent={
            statusTagConfig ? (
              <div className="flex items-center gap-2">
                <CustomTag color={statusTagConfig.color}>
                  {statusTagConfig.label}
                </CustomTag>
              </div>
            ) : null
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="عنوان قرارداد" value={contractDetail?.title} />
          <SingleVerticalWithCol
            label="تأمین کننده"
            value={contractDetail?.vendorTitle}
          />
          <SingleVerticalWithCol label="سلف" value={contractDetail?.restaurantTitle} />
          <SingleVerticalWithCol
            label="شماره قرارداد"
            value={contractDetail?.contractUUID}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="شروع و پایان قرارداد"
            value={contractDateRange}
          />
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                lg={8}
                md={8}
                sm={12}
                xs={24}
                label="سهم تأمین کننده"
                value={
                  contractDetail?.vendorPercentage != null
                    ? `${contractDetail.vendorPercentage} %`
                    : undefined
                }
              />
              <SingleVerticalWithCol
                lg={8}
                md={8}
                sm={12}
                xs={24}
                label="سهم دانشجویار"
                value={
                  contractDetail?.providerPercentage != null
                    ? `${contractDetail.providerPercentage} %`
                    : undefined
                }
              />
              <SingleVerticalWithCol
                lg={8}
                md={8}
                sm={12}
                xs={24}
                label="سهم دانشگاه"
                value={
                  contractDetail?.restaurantPercentage != null
                    ? `${contractDetail.restaurantPercentage} %`
                    : undefined
                }
              />
            </Row>
          </Col>
          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={contractDetail?.description}
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
      </section>
    </Div>
  );
};

export default MyContractsDetailContract;
