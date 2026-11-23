import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { TicketRolesListItem } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/@types/@ticketRoleListType";

import { TicketRoleTableModelProps } from "./@types/@ticketRoleTableModelTypes";

const TicketRoleTableModel = ({
  onEditClick,
  onViewClick,
}: TicketRoleTableModelProps): CustomColumnType<TicketRolesListItem>[] => {
  return [
    {
      title: "نقش",
      dataIndex: "role",
      key: "role",
      width: 180,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سرویس ها",
      dataIndex: "samimServices",
      width: 220,
      render: (_: unknown, records: TicketRolesListItem) => {
        if (!records?.samimServices?.length) return;
        const [first, ...rest] = records.samimServices;
        return (
          <div className="flex flex-wrap gap-1">
            <SamimServiceTag key={first.id} service={first?.name} />
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
      dataIndex: "topicCount",
      width: 280,
      render: (value: string) => {
        return dataPlaceHolder({ data: value });
      },
    },

    {
      title: "",
      dataIndex: "",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (_: string, records: TicketRolesListItem) => {
        return (
          <div className="flex gap-1">
            <CustomButton type="link" onClick={() => onEditClick?.(records?.role)}>
              ویرایش
            </CustomButton>
            <CustomButton type="link" onClick={() => onViewClick?.(records?.role)}>
              مشاهده
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default TicketRoleTableModel;
