import { Steps } from "antd";

import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { ItemType } from "./@types/@requestsFinancialHistory";

import type { StepsProps } from "antd";
import "./_requestsFinancialHistory.scss";

const RequestsFinancialHistory = () => {
  const mockDataDetailFourthTab = [
    {
      id: 1,
      title: "صدور بیمه نامه",
      date: new Date().toISOString(),
      status: "wait",
    },
    {
      id: 2,
      title: "ارسال اطلاعات برای بیمه گر",
      date: new Date().toISOString(),
      status: "wait",
    },
    {
      id: 3,
      title: "پرداخت قسط اول",
      date: new Date().toISOString(),
      status: "wait",
    },
    {
      id: 4,
      title: "ثبت درخواست",
      date: new Date().toISOString(),
      status: "wait",
    },
  ];

  const stepItem = (item: ItemType): NonNullable<StepsProps["items"]>[number] => {
    return {
      title: (
        <div className="insurance-fourth-tab-steps-title">
          <h3>{item?.title}</h3>
          <p>
            {dataPlaceHolder({
              data: item?.date,
              isDate: true,
              customDateFormat: "HH:mm - YYYY/M/D",
            })}
          </p>
        </div>
      ),
      status: item?.status as "wait" | "process" | "finish" | "error",
    };
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="insurance-fourth-tab-steps-title-container">
      <Steps
        orientation="vertical"
        size="small"
        current={mockDataDetailFourthTab ? mockDataDetailFourthTab?.length - 1 : 0}
        items={mockDataDetailFourthTab?.map((item: ItemType) => stepItem(item))}
      />
    </Div>
  );
};

export default RequestsFinancialHistory;
