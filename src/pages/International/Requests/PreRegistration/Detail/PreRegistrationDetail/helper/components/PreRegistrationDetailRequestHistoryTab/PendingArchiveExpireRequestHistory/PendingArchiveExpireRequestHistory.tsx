import { Steps } from "antd";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";

import Div from "@components/Renderers/Div/Div";

import TimeLineRequestComponent from "../TimeLineRequestComponent/TimeLineRequestComponent";

const PendingArchiveExpireRequestHistory = () => {
  const stepItem = [
    {
      title: "توضیحات ادمین در خصوص دلایل اصلاح درخواست در اینجا قرار میگیرد",
      description: <TimeLineRequestComponent color={"volcano"} text={"منقضی شده"} />,
      icon: <AiOutlineClockCircle className="text-[16px]" />,
    },
    {
      title: "توضیحات ادمین در خصوص دلایل اصلاح درخواست در اینجا قرار میگیرد",
      description: (
        <TimeLineRequestComponent
          role={"ادمین مسئول"}
          color={"gold"}
          text={"اصلاح درخواست "}
        />
      ),
      icon: <AiOutlineClockCircle className="text-[16px]" />,
    },
    {
      title: "شروع درخواست",
      description: <TimeLineRequestComponent role={"درخواست دهنده"} />,
      icon: <FaRegCircle className="text-[16px]" />,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div>
      <Steps
        orientation="vertical"
        size="small"
        items={stepItem}
        className="international-pre-registration-request-history-page-container"
      />
    </Div>
  );
};
export default PendingArchiveExpireRequestHistory;
