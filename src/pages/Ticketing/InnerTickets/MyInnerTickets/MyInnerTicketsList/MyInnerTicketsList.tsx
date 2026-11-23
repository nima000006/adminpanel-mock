import { useEffect, useState } from "react";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";

import MyInnerTicketsSegmentReceiptContent from "../helper/components/MyInnerTicketsSegmentReceiptContent/MyInnerTicketsSegmentReceiptContent";
import MyInnerTicketsSegmentSubmittedContent from "../helper/components/MyInnerTicketsSegmentSubmittedContent/MyInnerTicketsSegmentSubmittedContent";
import "./_myInnerTicketsList.scss";

const options = [
  {
    label: <div className="flex h-9 items-center justify-center gap-2">دریافتی</div>,
    value: "receipt",
  },
  {
    label: <div className="flex h-9 items-center justify-center gap-2">ارسالی</div>,
    value: "submitted",
  },
];

const MyInnerTicketsList = () => {
  const { isMobile } = useResponsive();
  const { params, setSearchParams } = useQueryParams();

  const [segmentType, setSegmentType] = useState<"receipt" | "submitted">("receipt");

  useTitle({ text: "تیکت های داخلی من" });

  //? ================================ Effects  ================================

  // ✅ sync state from URL on load / change
  useEffect(() => {
    const type = params?.type as "receipt" | "submitted" | undefined;

    if (type === "receipt" || type === "submitted") {
      setSegmentType(type);
    } else {
      setSegmentType("receipt");
      setSearchParams((prev) => ({
        ...prev,
        type: "receipt",
        status: 1,
      }));
    }
  }, [params?.type, params?.status]);

  const changeSegmentHandler = (val: "receipt" | "submitted") => {
    setSegmentType(val);

    setSearchParams((prev) => ({
      ...prev,
      type: val,
    }));
  };

  const activeType = params?.type ?? segmentType;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div className="inner-ticket-list-container mt-10">
      <CustomSegmented
        vertical={isMobile}
        size="large"
        block
        value={segmentType}
        onChange={(val) => changeSegmentHandler(val as "receipt" | "submitted")}
        options={options}
      />

      {activeType === "receipt" ? (
        <MyInnerTicketsSegmentReceiptContent />
      ) : (
        <MyInnerTicketsSegmentSubmittedContent />
      )}
    </Div>
  );
};

export default MyInnerTicketsList;
