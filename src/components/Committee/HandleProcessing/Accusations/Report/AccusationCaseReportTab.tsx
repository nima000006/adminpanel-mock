import { memo, useEffect } from "react";

import { Button, Col, Collapse, Form, Row, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { GetAccusationDetailFirstTabReportData } from "./@types/@report";
import { useLazyGetAccusationDetailFirstTabReportQuery } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";

import "./_accusationCaseReportTab.scss";

const reporterInfo = ({ data }: { data?: GetAccusationDetailFirstTabReportData }) => {
  return [
    {
      label: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol md={12} label="نام" value={data?.reporterName} />

          <SingleVerticalWithCol
            md={12}
            label="نام خانوادگی"
            value={data?.reporterFamily}
          />

          <SingleVerticalWithCol
            md={12}
            label="شماره ملی"
            value={data?.reporterNationalcode}
          />

          <SingleVerticalWithCol
            md={12}
            label="شماره دانشجویی"
            value={data?.reporterNumber}
          />
        </Row>
      ),
      children: (
        <>
          {/* <SingleVerticalItem label="دپارتمان" value="-" />
          <SingleVerticalItem label="سمت" value="-" />
          <SingleVerticalItem label="سن" value="-" />
          <SingleVerticalItem label="سال ورود" value="-" /> */}
          {/* <SingleVerticalItem label="رشته" value="-" /> */}
          {/* <SingleVerticalItem label="مقطع" value="-" /> */}
          {/* <SingleVerticalItem label="معدل" value="-" />
          <SingleVerticalItem label="تعداد واحدهای گذرانده" value="-" />
          <SingleVerticalItem label="تعداد گزارشات دوره" value="-" />
          <SingleVerticalItem label="تعداد اتهامات دوره" value="-" />
          <SingleVerticalItem label="بومی/ غیربومی" value="-" /> */}

          <SingleVerticalWithCol
            md={12}
            label="شماره موبایل"
            value={data?.reporterPhoneNumber}
          />
        </>
      ),
    },
  ];
};

const AccusationCaseReportTab = memo(({ id }: { id: string }) => {
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getData, { data: reportData, isLoading: isReportDataLoading }] =
    useLazyGetAccusationDetailFirstTabReportQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getData({ id, maxResults: 1 });
  }, [id]);

  useEffect(() => {
    if (reportData?.status === 200) {
      form.setFieldsValue({
        eventLocation: reportData?.data?.[0]?.eventLocation,
        eventReport: reportData?.data?.[0]?.eventReport,
      });
    }
  }, [reportData?.status]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="accusation-case-report-tab-container" loading={isReportDataLoading}>
      <div className="around-box reporter-info-container">
        <CustomDivider text="اطلاعات گزارشگر" />
        <Collapse
          expandIcon={({ isActive }) => (
            <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
          )}
          ghost
          items={reporterInfo({ data: reportData?.data?.[0] })}
        />
      </div>
      <Form className="around-box" form={form}>
        <CustomDivider text="جزئیات گزارش" />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              placeholder="توضیحات"
              name="eventReport"
              disabled={true}
            />
          </Col>

          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomTextArea
              label="محل وقوع"
              placeholder="توضیحات"
              name="eventLocation"
              disabled={true}
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={24}>
            <CustomDatePicker
              label="تاریخ وقوع"
              name="eventDate"
              placeholder="تاریخ"
              form={form}
              defaultValue={reportData?.data?.[0]?.eventDate}
              key={reportData?.data?.[0]?.eventDate}
              disabled={true}
            />
          </Col>
        </Row>
      </Form>
      <div className="around-box">
        <CustomDivider text="پیوست ها" />
        <Upload className="upload-container" listType="picture" multiple disabled>
          <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
            بارگذاری تصاویر
          </Button>
        </Upload>
      </div>
    </Div>
  );
});

AccusationCaseReportTab.displayName = "AccusationCaseReportTab";

export default AccusationCaseReportTab;
