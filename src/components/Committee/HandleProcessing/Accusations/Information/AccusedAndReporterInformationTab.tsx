import { memo, useEffect } from "react";

import { Collapse, Row } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import {
  ReporterInfoPropsType,
  StudentInfoPropsType,
} from "./@types/@accusedAndReporterInformationTab";
import { useLazyGetInfoInvestigationChargesSecondTabQuery } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import "./_AccusedAndReporterInformationTab.scss";

// reporterInfo

const reporterInfo = ({ data }: { data?: ReporterInfoPropsType }) => {
  return [
    {
      label: (
        <Row gutter={[12, 12]}>
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

// studentInfo

const studentInfo = ({ data }: { data?: StudentInfoPropsType }) => {
  return [
    {
      label: (
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol md={12} label="نام" value={data?.studentName} />

          <SingleVerticalWithCol
            md={12}
            label="نام خانوادگی"
            value={data?.studentFamily}
          />

          <SingleVerticalWithCol md={12} label="شماره ملی" value={data?.nationalCode} />

          <SingleVerticalWithCol
            md={12}
            label="شماره دانشجویی"
            value={data?.studentNumber}
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
            value={data?.studentPhoneNumber}
          />
        </>
      ),
    },
  ];
};

// اطلاعات هویتی طرفین

const AccusationCaseAccusedAndReporterInformationTab = memo(({ id }: { id: string }) => {
  //? ================================  Api Calls ================================
  const [getInfo, { data: infoData, isFetching: isInfoDataLoading }] =
    useLazyGetInfoInvestigationChargesSecondTabQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getInfo({ id, maxResults: 1 });
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="accusation-case-accused-and-reporter-tab-container"
      loading={isInfoDataLoading}
    >
      <div className="around-box">
        <CustomDivider text="اطلاعات متهم" />
        <Collapse
          expandIcon={({ isActive }) => (
            <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
          )}
          ghost
          items={studentInfo({ data: infoData?.data?.[0] })}
        />
      </div>
      <div className="around-box">
        <CustomDivider text="اطلاعات شاکی" />
        <Collapse
          expandIcon={({ isActive }) => (
            <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
          )}
          ghost
          items={reporterInfo({ data: infoData?.data?.[0] })}
        />
      </div>
    </Div>
  );
});
AccusationCaseAccusedAndReporterInformationTab.displayName =
  "AccusationCaseAccusedAndReporterInformationTab";

export default AccusationCaseAccusedAndReporterInformationTab;
