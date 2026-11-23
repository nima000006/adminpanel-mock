import { PiFolder } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { AgentListType } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/Agent/@types/@AgentListType";

import { AgentTableModelProps } from "./@types/@AgentTableModelProps";

const AgentTableModel = ({
  onEditClick,
  onAddClick,
}: AgentTableModelProps): CustomColumnType<AgentListType>[] => {
  return [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      searchable: true,
      width: 180,
      render: (_: unknown, records: AgentListType) =>
        dataPlaceHolder({ data: records?.name }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      searchable: true,
      width: 180,
      render: (_: unknown, records: AgentListType) =>
        dataPlaceHolder({ data: records?.lastName }),
    },
    {
      title: "سرویس‌های در دسترس",
      dataIndex: "service",
      width: 220,
      render: (_: unknown, records: AgentListType) => {
        if (!records?.service?.length) return <></>;
        const [first, ...rest] = records.service;
        return (
          <div className="flex flex-wrap gap-1">
            <SamimServiceTag key={first} service={first} />
            {rest.length > 0 && (
              <CustomTag className="w-fit" variant="outlined">
                {rest.length}+
              </CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "موضوع مشکلات",
      dataIndex: "subjectIssue",
      width: 280,
      render: (_: unknown, records: AgentListType) => {
        if (!records?.subjectIssue?.length) return <></>;
        const [first, ...rest] = records.subjectIssue;
        return (
          <div className="flex flex-wrap gap-1">
            <CustomTag
              className="w-fit gap-1"
              variant="outlined"
              icon={<PiFolder />}
              key={first}
            >
              {first}
            </CustomTag>
            {rest.length > 0 && (
              <CustomTag className="w-fit" variant="outlined">
                {rest.length}+
              </CustomTag>
            )}
          </div>
        );
      },
    },
    {
      title: "کد ملی / فراگیر",
      dataIndex: "internationalCode",
      width: 130,
      searchable: true,
      render: (_: unknown, records: AgentListType) => (
        <CustomButton type="link">
          <Link to={MANAGEMENT_ALL_DETAIL_PAGE_ROUTE}>{records?.internationalCode}</Link>
        </CustomButton>
      ),
    },
    {
      title: "شماره پرسنلی",
      dataIndex: "personalCode",
      width: 130,
      searchable: true,
      render: (_: unknown, records: AgentListType) =>
        dataPlaceHolder({ data: records.personalCode }),
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobilePhone",
      width: 140,
      searchable: true,
      render: (_: unknown, records: AgentListType) =>
        dataPlaceHolder({ data: records?.mobilePhone }),
    },
    {
      title: "کسب‌و‌کار",
      dataIndex: "business",
      width: 150,
      render: (_: unknown, records: AgentListType) =>
        dataPlaceHolder({ data: records?.business }),
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branch",
      width: 150,
      render: (_: unknown, records: AgentListType) => (
        <CustomTag className="w-fit">{records?.branch}</CustomTag>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: unknown, records: AgentListType) => {
        const isEmpty = !records?.service?.length;
        return (
          <CustomButton
            type="link"
            onClick={() =>
              isEmpty ? onAddClick?.(records.id) : onEditClick?.(records.id)
            }
          >
            {isEmpty ? "افزودن دسترسی" : "ویرایش دسترسی"}
          </CustomButton>
        );
      },
    },
  ];
};
export default AgentTableModel;
