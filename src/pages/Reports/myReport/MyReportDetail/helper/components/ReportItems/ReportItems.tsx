import { Col, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";

import {
  mapMyReportDetailsResponseToDto,
  getColPropsByType,
  ReportTypes,
} from "../../utils";
import ReportInfoRenderer from "../ReportInfoRenderer/ReportInfoRenderer";
import { ReportItemsProps } from "./@types/@ReportItemsProps";

const REPORT_TYPE_LABELS: Record<number, string> = {
  [ReportTypes.TABLE]: "جداول",
  [ReportTypes.NUMBER]: "اعداد",
  [ReportTypes.PIE_CHART]: "نمودار دایره‌ای",
  [ReportTypes.LINE_CHART]: "نمودار خطی",
  [ReportTypes.REC_CHART]: "نمودار میله‌ای",
};
const ReportItems = ({
  detailDataWithId = [],
  loadingReportIds,
  onReportIdChange,
  sectionReportsByType,
  selectedReportsByType,
  detailDataParamsFilled,
  filterParams,
}: ReportItemsProps) => {
  // اگر هیچ فیلد required پر نیست یا پاک شده → CustomEmpty
  if (!detailDataParamsFilled) {
    return (
      <div className="mt-5!">
        <CustomAlert
          type="warning"
          message="برای مشاهده گزارش، لطفاً فیلدهای اجباری را پر کنید."
          showIcon
        />
        <div className="mt-5!">
          <CustomEmpty />
        </div>
      </div>
    );
  }

  // اگر هیچ report انتخاب نشده → CustomEmpty
  const allSelectedReportsEmpty = Object.entries(sectionReportsByType).every(
    ([reportTypeStr]) => {
      const reportTypeId = Number(reportTypeStr);
      const selectedReportId = selectedReportsByType[reportTypeId];
      return !selectedReportId;
    }
  );

  if (allSelectedReportsEmpty) {
    return (
      <div className="mt-5!">
        <CustomEmpty />
      </div>
    );
  }

  return (
    <div className="mt-5!">
      {Object.entries(sectionReportsByType).map(([reportTypeStr, reports]) => {
        const reportTypeId = Number(reportTypeStr);
        const selectedReportId = selectedReportsByType[reportTypeId];

        if (!selectedReportId) return null;

        const selectedReportData = detailDataWithId.find(
          (item) =>
            item.reportId === selectedReportId && item.reportTypeId === reportTypeId
        );

        const isLoading = loadingReportIds.has(selectedReportId);

        if (!selectedReportData) {
          return (
            <div key={reportTypeId} className="mb-6">
              {reports.length > 1 && (
                <Row gutter={[16, 16]} className="mb-4">
                  <Col span={24}>
                    <CustomSelect
                      label={REPORT_TYPE_LABELS[reportTypeId]}
                      className="w-full"
                      placeholder={`یک ${REPORT_TYPE_LABELS[reportTypeId]} را انتخاب کنید`}
                      value={selectedReportId}
                      defaultValue={reports[0]?.reportTitle}
                      loading={isLoading}
                      options={reports.map((report) => ({
                        title: report.reportTitle,
                        id: report.reportId,
                      }))}
                      onChange={(reportId) =>
                        onReportIdChange(reportTypeId, Number(reportId))
                      }
                      name="dataSelect"
                    />
                  </Col>
                </Row>
              )}
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Div loading={isLoading}>
                    <div></div>
                  </Div>
                </Col>
              </Row>
            </div>
          );
        }

        const dto = mapMyReportDetailsResponseToDto(selectedReportData);
        const colProps = getColPropsByType(reportTypeId, detailDataWithId);

        return (
          <div key={reportTypeId} className="mb-6">
            {reports.length > 1 && (
              <Row gutter={[16, 16]} className="mb-4">
                <Col span={24}>
                  <CustomSelect
                    label={REPORT_TYPE_LABELS[reportTypeId]}
                    className="w-full"
                    value={selectedReportId}
                    defaultValue={reports[0]?.reportTitle}
                    options={reports.map((report) => ({
                      title: report.reportTitle,
                      id: report.reportId,
                    }))}
                    onChange={(reportId) =>
                      onReportIdChange(reportTypeId, Number(reportId))
                    }
                    name="dataSelect"
                  />
                </Col>
              </Row>
            )}
            <Row gutter={[16, 16]}>
              <Col {...colProps}>
                <Div loading={isLoading}>
                  <div key={selectedReportId}>
                    <ReportInfoRenderer {...dto} filterParams={filterParams} />
                  </div>
                </Div>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ReportItems;
