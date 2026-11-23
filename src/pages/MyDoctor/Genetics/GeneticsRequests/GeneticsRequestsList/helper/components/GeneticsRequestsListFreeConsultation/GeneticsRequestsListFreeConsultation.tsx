import { useEffect } from "react";

import { Col, Form, Row } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import {
  useMyDoctorGeneticAllTypesQuery,
  useMyDoctorSurveyAllQuery,
  useMyDoctorSurveyDetailFourthTabTestStatusQuery,
} from "@infra/states/redux/Apis/myDoctor/genetic/geneticApis";
import GeneticsRequestsListFreeConsultationTable from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListFreeConsultation/helper/components/GeneticsRequestsListFreeConsultationTable/GeneticsRequestsListFreeConsultationTable";

const ALL_STATUS = "all";

const GeneticsRequestsListFreeConsultation = () => {
  const { isLarge } = useResponsive();
  const { params, setSearchParams } = useQueryParams();
  const [form] = Form.useForm<{ exam?: string | null; test?: string | null }>();

  const selectedSurveyId = Number(params?.surveyId) || 0;
  const selectedTestId = Number(params?.testId) || 0;

  //? ================================  Api Calls ================================

  const { data, isFetching: isGetAllSurveyLoading } = useMyDoctorSurveyAllQuery({
    page: 0,
    size: 100,
  });

  const { data: allTypes, isFetching: isGetAllTypesLoading } =
    useMyDoctorGeneticAllTypesQuery(
      {
        surveyId: selectedSurveyId,
        testType: 0, // 0: free consultation tab
        page: 0,
        size: 100,
      },
      { skip: !selectedSurveyId, refetchOnMountOrArgChange: true }
    );

  const { data: statusResults, isFetching: isGetStatusLoading } =
    useMyDoctorSurveyDetailFourthTabTestStatusQuery(
      { testId: selectedTestId },
      { skip: !selectedTestId }
    );

  //? ================================ Effects ================================

  // Keep Form.Item selects in sync with URL (Form.Item otherwise overrides `value` on reload).
  useEffect(() => {
    form.setFieldsValue({
      exam: selectedSurveyId ? String(selectedSurveyId) : null,
      test: selectedTestId ? String(selectedTestId) : null,
    });
  }, [form, selectedSurveyId, selectedTestId]);

  useEffect(() => {
    if (!selectedTestId || !statusResults?.length) {
      return;
    }

    const statusIds = statusResults.map((item) => String(item.id));
    const currentStatus = params?.status;
    const isValidStatus =
      currentStatus === ALL_STATUS ||
      (currentStatus && statusIds.includes(currentStatus));

    if (!isValidStatus) {
      setSearchParams({
        type: "free_consultation_request",
        surveyId: String(selectedSurveyId),
        testId: String(selectedTestId),
        status: statusIds[0],
        page: "1",
      });
    }
  }, [statusResults, params?.status, selectedSurveyId, selectedTestId, setSearchParams]);

  //* ================================ Util Functions ================================
  const changeSegmentHandler = (val: string) => {
    setSearchParams({
      type: "free_consultation_request",
      surveyId: String(selectedSurveyId),
      testId: String(selectedTestId),
      status: val,
      page: "1",
    });
  };

  const examOptions =
    data?.content?.map((item) => ({
      id: item?.id,
      title: item?.title,
    })) ?? [];

  const testOptions = selectedSurveyId
    ? (allTypes?.content?.map((item) => ({
        id: item?.id,
        title: item?.title,
      })) ?? [])
    : [];

  const statusOptions = statusResults
    ? [
        ...statusResults.map((item) => ({
          value: String(item.id),
          label: item.title,
        })),
        {
          value: ALL_STATUS,
          label: "همه",
        },
      ]
    : [];

  const selectedStatusId =
    params?.status && params.status !== ALL_STATUS ? Number(params.status) : undefined;

  const onChangeExamHandler = (id: unknown) => {
    if (!id) {
      setSearchParams({
        type: "free_consultation_request",
      });

      return;
    }

    setSearchParams({
      type: "free_consultation_request",
      surveyId: String(id),
    });
  };

  const onChangeTestHandler = (id: unknown) => {
    if (!id) {
      setSearchParams({
        type: "free_consultation_request",
        surveyId: String(selectedSurveyId),
      });

      return;
    }

    setSearchParams({
      type: "free_consultation_request",
      surveyId: String(selectedSurveyId),
      testId: String(id),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲*/
  return (
    <>
      <Form form={form} component={false}>
        <Row className="mt-5" gutter={[16, 16]}>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect
              className="w-full!"
              options={examOptions}
              name="exam"
              loading={isGetAllSurveyLoading}
              placeholder="انتخاب کنید"
              label="آزمون ها"
              onChange={onChangeExamHandler}
              allowClear
            />
          </Col>
          <Col xl={6} lg={8} md={12} xs={24}>
            <CustomSelect
              key={selectedSurveyId || "no-survey"}
              className="w-full!"
              options={testOptions}
              name="test"
              loading={isGetAllTypesLoading}
              placeholder="انتخاب کنید"
              label="تست ها"
              onChange={onChangeTestHandler}
              allowClear
              disabled={!selectedSurveyId}
            />
          </Col>
        </Row>
      </Form>

      {selectedSurveyId && selectedTestId ? (
        <>
          <ToolBox
            rightSide={
              <div
                className={`my-10 flex gap-1 ${
                  isLarge ? "items-center" : "w-full flex-col items-start"
                }`}
              >
                <span>نمایش لیست بر اساس:</span>
                <CustomSegmented
                  className={!isLarge ? "w-full!" : undefined}
                  vertical={!isLarge}
                  block={!isLarge}
                  value={params?.status}
                  onChange={(val) => changeSegmentHandler(String(val))}
                  options={statusOptions}
                  disabled={isGetStatusLoading}
                />
              </div>
            }
          />
          {params?.status ? (
            <GeneticsRequestsListFreeConsultationTable
              surveyId={selectedSurveyId}
              testId={selectedTestId}
              statusId={selectedStatusId}
            />
          ) : null}
        </>
      ) : (
        <CustomEmpty
          description={
            !selectedSurveyId
              ? "ابتدا یک آزمون انتخاب کنید."
              : "ابتدا یک تست انتخاب کنید."
          }
        />
      )}
    </>
  );
};

export default GeneticsRequestsListFreeConsultation;
