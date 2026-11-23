import { Col, Row } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { FoodMySelfContractsDrawerInfoProps } from "./@types/FoodMySelfContractsDrawerInfoProps";

const FoodMySelfContractsDrawerInfo = ({
  firstFile,
  secondFile,
  thirdFile,
  fourthFile,
  listData,
  setFirstFile,
  setSecondFile,
  setThirdFile,
  setFourthFile,
}: FoodMySelfContractsDrawerInfoProps) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="عنوان قرارداد"
        value={listData?.title}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نام تأمین کننده"
        value={listData?.vendorTitle}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نام سلف"
        value={listData?.restaurantTitle}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="شماره قرارداد"
        value={listData?.contractUUID}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="شروع قرارداد"
        value={listData?.startedDate}
        isDate
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="پایان قرارداد"
        value={listData?.endDate}
        isDate
      />
      <SingleVerticalWithCol span={24} label="توضیحات" value={listData?.description} />

      <Col span={24}>
        <Row>
          <Col lg={6} md={6} sm={8} xs={12}>
            <CustomUploader
              fileList={firstFile}
              setFileList={setFirstFile}
              isReadOnly={true}
              maxCount={3}
              name="upload"
              hasNullText
              uploaderText="فایل اول"
            />
          </Col>
          <Col lg={6} md={6} sm={8} xs={12}>
            <CustomUploader
              fileList={secondFile}
              setFileList={setSecondFile}
              isReadOnly={true}
              maxCount={3}
              name="upload"
              hasNullText
              uploaderText="فایل دوم"
            />
          </Col>
          <Col lg={6} md={6} sm={8} xs={12}>
            <CustomUploader
              fileList={thirdFile}
              setFileList={setThirdFile}
              isReadOnly={true}
              maxCount={3}
              name="upload"
              hasNullText
              uploaderText="فایل سوم"
            />
          </Col>
          <Col lg={6} md={8} sm={6} xs={12}>
            <CustomUploader
              fileList={fourthFile}
              setFileList={setFourthFile}
              isReadOnly={true}
              maxCount={3}
              name="upload"
              hasNullText
              uploaderText="فایل چهارم"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default FoodMySelfContractsDrawerInfo;
