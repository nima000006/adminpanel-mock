import { Col, Row } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";

import { PreRegistrationUploadedDocumentProps } from "./@types/@preRegistrationUploadedDocumentType";

const PreRegistrationUploadedDocument = ({
  degreeCertificate,
  setDegreeCertificate,
  transcriptCertificate,
  setTranscriptCertificate,
  passport,
  setPassport,
  passportPhoto,
  setPassportPhoto,
  resume,
  setResume,
  statementOfPurpose,
  setStatementOfPurpose,
  preUniversityCertificate,
  setPreUniversityCertificate,
  residenceCertificate,
  setResidenceCertificate,
}: PreRegistrationUploadedDocumentProps) => {
  return (
    <div>
      <CustomDivider text="اسناد و مدارک بارگذاری شده" />
      <Row gutter={[16, 16]}>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={degreeCertificate}
            setFileList={setDegreeCertificate}
            isReadOnly={true}
            name="degreeCertificate"
            uploaderText="مدرک تحصیلی"
            label="مدرک تحصیلی"
            hasVerticalLabel
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={transcriptCertificate}
            setFileList={setTranscriptCertificate}
            isReadOnly={true}
            name="transcriptCertificate"
            uploaderText="ریز نمرات"
            label="ریز نمرات"
            hasVerticalLabel
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={passport}
            setFileList={setPassport}
            isReadOnly={true}
            name="passport"
            uploaderText="صفحه اول پاسپورت"
            label="صفحه اول پاسپورت"
            hasVerticalLabel
          />
        </Col>
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={passportPhoto}
            setFileList={setPassportPhoto}
            isReadOnly={true}
            name="passPortPhoto"
            uploaderText="عکس پرسنلی (3*4)"
            label="عکس پرسنلی (3*4)"
            hasVerticalLabel
          />
        </Col>

        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={resume}
            setFileList={setResume}
            isReadOnly={true}
            name="resume"
            uploaderText="رزومه"
            label="رزومه"
            hasVerticalLabel
          />
        </Col>

        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={statementOfPurpose}
            setFileList={setStatementOfPurpose}
            isReadOnly={true}
            name="statementOfPurpose"
            uploaderText="انگیزه نامه"
            label="انگیزه نامه"
            hasVerticalLabel
          />
        </Col>

        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={preUniversityCertificate}
            setFileList={setPreUniversityCertificate}
            isReadOnly={true}
            name="preUniversityCertificate"
            uploaderText="مدرک پیش دانشگاهی"
            label="مدرک پیش دانشگاهی"
            hasVerticalLabel
          />
        </Col>

        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomUploader
            fileList={residenceCertificate}
            setFileList={setResidenceCertificate}
            isReadOnly={true}
            name="residenceCertificate"
            uploaderText="کارت آمایشی هوشمند"
            label="کارت آمایشی هوشمند"
            hasVerticalLabel
          />
        </Col>
      </Row>
    </div>
  );
};
export default PreRegistrationUploadedDocument;
