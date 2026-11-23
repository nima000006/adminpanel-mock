import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  TICKETING_BASIC_INFO_AGENT_PAGE_ROUTE,
  TICKETING_BASIC_INFO_ISSUES_SUBJECT_PAGE_ROUTE,
  TICKETING_BASIC_INFO_TICKET_ROLE_PAGE_ROUTE,
} from "@infra/router/routes/ticketing";
import { BasicInfoListType } from "@pages/Ticketing/BasicInfo/BasicInfoList/@types/@BasicInfoListType";

const BASIC_INFO_ROUTE_MAP: Record<number, string> = {
  1: TICKETING_BASIC_INFO_ISSUES_SUBJECT_PAGE_ROUTE,
  2: TICKETING_BASIC_INFO_TICKET_ROLE_PAGE_ROUTE,
  3: TICKETING_BASIC_INFO_AGENT_PAGE_ROUTE,
};

const BasicInfoListTableModel = (): CustomColumnType<BasicInfoListType>[] => {
  return [
    {
      title: "نوع اطلاعات پایه",
      dataIndex: "baseInfoType",
      key: "baseInfoType",
      width: 250,
      render: (value: string) => (
        <CustomTag variant="outlined" className="w-fit" color="geekblue">
          {value}
        </CustomTag>
      ),
    },
    {
      title: "تعداد رکورد‌ها",
      dataIndex: "recordCount",
      key: "recordCount",
      width: 70,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (id: number) => {
        const baseRoute = BASIC_INFO_ROUTE_MAP[id];

        if (!baseRoute) return null;

        return (
          <CustomButton type="link">
            <Link to={baseRoute}>مشاهده</Link>
          </CustomButton>
        );
      },
    },
  ];
};

export default BasicInfoListTableModel;
