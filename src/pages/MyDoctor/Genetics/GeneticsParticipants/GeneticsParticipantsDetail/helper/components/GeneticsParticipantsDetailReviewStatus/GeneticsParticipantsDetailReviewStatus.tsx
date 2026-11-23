import { Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";
import { useResponsive } from "@infra/hooks/useResponsive";
import GeneticsParticipantsDetailReviewStatusConsultation from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusConsultation/GeneticsParticipantsDetailReviewStatusConsultation";
import GeneticsParticipantsDetailReviewStatusTest from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/GeneticsParticipantsDetailReviewStatusTest";

import "./_geneticsParticipantsDetailReviewStatus.scss";

const GeneticsParticipantsDetailReviewStatus = () => {
  const { params, setSearchParams } = useQueryParams();
  const { isMobile } = useResponsive();

  //* ================================ Util Functions ================================

  const items = [
    {
      key: "1",
      label: "وضعیت  مشاوره",
      children: <GeneticsParticipantsDetailReviewStatusConsultation />,
    },
    {
      key: "2",
      label: "وضعیت تست",
      children: <GeneticsParticipantsDetailReviewStatusTest />,
    },
  ];

  const activeKey =
    params?.tab && items.some((item) => item.key === params.tab)
      ? params.tab
      : items[0].key;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex w-full">
      <Tabs
        activeKey={activeKey}
        tabPlacement={isMobile ? "top" : "start"}
        className="genetics-participants-review-tabs-container w-full"
        items={items}
        onChange={(key) => setSearchParams({ ...params, tab: key })}
      />
    </div>
  );
};

export default GeneticsParticipantsDetailReviewStatus;
