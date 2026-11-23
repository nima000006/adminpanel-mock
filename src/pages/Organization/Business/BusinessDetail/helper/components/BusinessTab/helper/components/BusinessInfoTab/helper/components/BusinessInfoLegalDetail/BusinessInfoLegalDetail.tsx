import { useState } from "react";

import { Row } from "antd";
import { PiBuildings } from "react-icons/pi";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import "./_businessInfoLegalDetail.scss";

const BusinessInfoLegalDetail = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="business-info-legal-detail-container">
      {/* tag */}
      <div className="business-info-legal-detail-custom-tag-wrapper">
        <h3>نوع شخصیت:</h3>
        <CustomTag
          icon={<PiBuildings />}
          color={"blue"}
          className="business-info-legal-detail-custom-tag"
        >
          حقوقی
        </CustomTag>
      </div>

      {/* business info section */}
      <div>
        <CustomDivider text={"اطلاعات کسب و کار"} />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام کسب و کار" value={"فنی مهندسی صمیم"} />
          <SingleVerticalWithCol
            label="نوع گروه شخصیت حقوقی"
            value={"شرکت ها و موسسات غیردولتی"}
          />
          <SingleVerticalWithCol label="شناسه ثبت" value={"123456"} />
          <SingleVerticalWithCol label="شناسه ملی" value={"123456"} />
          <SingleVerticalWithCol label="شماره اقتصادی" value={"1234567891234567"} />
          <SingleVerticalWithCol
            label="کد رهگیری پرونده مالیاتی"
            value={"1234567891234567"}
          />
          <SingleVerticalWithCol
            label="نوع مالیات"
            value={"مودی مشمول ثبت نام در نظام مالیاتی"}
          />
          <SingleVerticalWithCol label="نام تجاری" value={"صمیم"} />
        </Row>
      </div>

      {/* other desc and documents*/}
      <div>
        <CustomDivider text={"سایر توضیحات و مستندات روزنامه رسمی"} />
        <div>
          <CustomUploader
            fileList={fileList}
            setFileList={setFileList}
            label={"مستندات مجوز"}
            hasVerticalLabel={true}
            isReadOnly={true}
            className="attach-file"
          />
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={
              "0912 245 بیش از بیست و چهار سال فعالیت حرفه ای در صنعت برودکست، رسانه و ارتباطات، در کنار طراحی راهکارهای پیشرفته و تولید محصولات تخصصی صدا و تصویر، شرکت مهندسی صمیم را به یکی از تامین کنندگان اصلی و شاخص سازمان ها و شرکت های بزرگ کشور تبدیل نموده است."
            }
          />
        </Row>
      </div>

      {/* uploaded files */}
      <div>
        <CustomDivider text={"فایل‌های بارگذاری شده"} />
        <div>
          <CustomUploader
            fileList={fileList}
            setFileList={setFileList}
            label={"مستندات مجوز"}
            hasVerticalLabel={true}
            isReadOnly={true}
            className="attach-file"
          />
        </div>
      </div>
    </Div>
  );
};
export default BusinessInfoLegalDetail;
