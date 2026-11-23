import { useEffect, useState } from "react";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import GeneticsRequestsListFreeConsultation from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListFreeConsultation/GeneticsRequestsListFreeConsultation";
import GeneticsRequestsListTest from "@pages/MyDoctor/Genetics/GeneticsRequests/GeneticsRequestsList/helper/components/GeneticsRequestsListTest/GeneticsRequestsListTest";

const options = [
  {
    label: "درخواست مشاوره رایگان",
    value: "free_consultation_request",
  },
  {
    label: "درخواست تست",
    value: "test_request",
  },
];

const GeneticsRequestsList = () => {
  const { isMobile } = useResponsive();
  const { params, setSearchParams } = useQueryParams();

  const [segmentType, setSegmentType] = useState<
    "free_consultation_request" | "test_request"
  >("free_consultation_request");

  useTitle({ text: "درخواست‌ها" });

  //? ================================ Effects  ================================

  // ✅ sync state from URL on load / change
  useEffect(() => {
    const type = params?.type as "free_consultation_request" | "test_request" | undefined;
    const status = params?.status as string | undefined;
    const surveyId = params?.surveyId;
    const testId = params?.testId;

    if (type === "free_consultation_request" || type === "test_request") {
      setSegmentType(type);

      // Status UI only applies when exam + test are selected.
      // Do not spread all params — that reintroduces cleared advance-filter keys.
      if (!status && surveyId && testId) {
        setSearchParams({
          type,
          surveyId: String(surveyId),
          testId: String(testId),
          status: "1", // default status
        });
      }
    } else {
      // invalid/missing type -> reset to defaults without keeping stale filter params
      setSegmentType("free_consultation_request");
      setSearchParams({
        type: "free_consultation_request",
        status: "1", // default status
      });
    }
  }, [params?.type, params?.status, params?.surveyId, params?.testId, setSearchParams]);

  //* ================================ Util Functions ================================

  const changeSegmentHandler = (val: "free_consultation_request" | "test_request") => {
    setSegmentType(val);

    // when switching segment, update `type` and ensure `status` exists (default to "1")
    setSearchParams({
      type: val,
      status: "1",
    });
  };

  const activeType =
    params?.type === "free_consultation_request" || params?.type === "test_request"
      ? params.type
      : segmentType;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div className="inner-ticket-list-container mt-10">
      <CustomSegmented
        vertical={isMobile}
        size="large"
        block
        value={segmentType}
        onChange={(val) =>
          changeSegmentHandler(val as "free_consultation_request" | "test_request")
        }
        options={options}
      />

      {activeType === "free_consultation_request" ? (
        <GeneticsRequestsListFreeConsultation />
      ) : (
        <GeneticsRequestsListTest />
      )}
    </Div>
  );
};

export default GeneticsRequestsList;
