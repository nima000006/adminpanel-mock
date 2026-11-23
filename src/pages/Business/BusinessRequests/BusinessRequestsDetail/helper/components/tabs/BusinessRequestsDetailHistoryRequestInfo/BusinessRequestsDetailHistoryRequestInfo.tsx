import { Col, Row, Timeline } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import "./_businessRequestsDetailHistoryRequestInfo.scss";
import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";

const BusinessRequestsDetailHistoryRequestInfo = () => {
  return (
    <div className="business-request-detail-history-request-container">
      <CustomAlert
        showIcon
        message="تاریخچه درخواست‌ها شامل:"
        description={
          <ul className="custom-list">
            <li>تاریخچه ایجاد و ویرایش تاپ چارت</li>
            <li>تاریخچه ایجاد و ویرایش اطلاعات پایه</li>
            <li>تاریخچه عودت، رد و تأیید درخواست</li>
          </ul>
        }
        type="info"
        className="custom-alert"
      />
      <Row
        gutter={[16, 16]}
        className="business-request-detail-history-request-filter-container"
      >
        <Col md={6} lg={6}>
          <CustomSelect
            placeholder="انتخاب کنید"
            label="نوع اقدام"
            options={undefined}
            name={""}
          />
        </Col>
        <Col md={6} lg={6}>
          <CustomRangePicker label="نوع اقدام" name={""} />
        </Col>
        <Col md={6} lg={6}>
          <CustomSelect
            placeholder="انتخاب کنید"
            label="مسئول"
            options={undefined}
            name={""}
          />
        </Col>
      </Row>
      <Timeline mode="left">
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
        >
          شروع
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تاپ چارت: واحد با عنوان “مدیریت فرهنگی” ایجاد شد</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag
            color={"processing"}
            staticWidth="fit-content"
            className="tag-container"
          >
            ایجاد
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تاپ چارت: واحد با عنوان “معاونت آموزشی” ویرایش شد.</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag color={"purple"} staticWidth="fit-content" className="tag-container">
            ویرایش
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تاپ چارت: واحد با عنوان “معاونت آموزشی” ویرایش شد.</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag color={"purple"} staticWidth="fit-content" className="tag-container">
            ویرایش
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تاپ چارت: واحد با عنوان “معاونت آموزشی” ویرایش شد.</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag color={"purple"} staticWidth="fit-content" className="tag-container">
            ویرایش
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تاپ چارت: واحد با عنوان “معاونت آموزشی” ویرایش شد.</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag color={"purple"} staticWidth="fit-content" className="tag-container">
            ویرایش
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تأیید درخواست</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag
            color={"success"}
            staticWidth="fit-content"
            className="tag-container"
          >
            تأیید درخواست
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>تاپ چارت: واحد با عنوان “معاونت آموزشی” ویرایش شد.</p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag color={"purple"} staticWidth="fit-content" className="tag-container">
            ویرایش
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>رد درخواست</p>
          <p>
            توضیجات: درخواست شما به دلیل عدم ارائه اطلاعات کافی در خصوص کسب کارتان رد شد!
            در خصوص دلایل رد درخواست با بخش پشتیبانی تماس حاصل فرمایید.
          </p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag color={"error"} staticWidth="fit-content" className="tag-container">
            رد درخواست
          </CustomTag>
        </Timeline.Item>
        <Timeline.Item
          label={
            <div className="custom-label">
              <span>1403/12/12</span>
              <span>22:22</span>
            </div>
          }
          dot={<AiOutlineClockCircle />}
        >
          <p>عودت درخواست</p>
          <p>
            توضیحات: فایلهای تاپ چارت بارگذاری شده توسط شما ناقص میباشد. لطفاً موارد زیر
            را به صورت فایل pdf برای ما ارسال بفرمایید: 1.ارتباط واحدهای تاپ چارت به چه
            صورت میباشد؟ 2.لیست تمامی واحد ها و نوع آنها را به وضوح مشخص
          </p>
          <p>توسط: مجید سیانکی</p>
          <CustomTag
            color={"warning"}
            staticWidth="fit-content"
            className="tag-container"
          >
            عودت درخواست
          </CustomTag>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
export default BusinessRequestsDetailHistoryRequestInfo;
