import { useEffect } from "react";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { useLazyTicketBasicInfoListCountQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

import { BasicInfoListType } from "./@types/@BasicInfoListType";
import BasicInfoListTableModel from "./helper/models/BasicInfoListTableModel/BasicInfoListTableModel";

const BasicInfoList = () => {
  useTitle({ text: "اطلاعات پایه" });

  //? ================================ API ================================
  const [getBasicInfoListCount, { data, isLoading: isTicketBasicInfoListCountLoading }] =
    useLazyTicketBasicInfoListCountQuery();

  const dataSource: BasicInfoListType[] = [
    {
      id: 1,
      baseInfoType: "موضوع مشکلات",
      recordCount: data?.topicCount ? data?.topicCount : 0,
    },
    {
      id: 2,
      baseInfoType: "نقش‌های تیکت",
      recordCount: data?.roleCount ? data?.roleCount : 0,
    },
  ];

  //? ================================ Effects ================================
  useEffect(() => {
    getBasicInfoListCount();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="h-fit">
      <CustomDivider text="اطلاعات پایه تیکت" />
      <CustomTable<BasicInfoListType>
        dataSource={dataSource}
        rowKey="id"
        columns={BasicInfoListTableModel()}
        key={`table-${dataSource?.length || "8"} `}
        loading={isTicketBasicInfoListCountLoading}
      />
    </div>
  );
};

export default BasicInfoList;
