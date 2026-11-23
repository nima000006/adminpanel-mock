import { PiFolder } from "react-icons/pi";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { viewRoleListItem } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/@types/@modifyTicketRoleDrawerContentTypes";

const ViewDrawerContentTableModel = (): CustomColumnType<viewRoleListItem>[] => {
  return [
    {
      title: "موضوع مشکل",
      dataIndex: "title",
      width: 280,
      render: (value: string) => {
        return (
          <div className="flex flex-wrap gap-1">
            <CustomTag className="w-fit gap-1" variant="outlined" icon={<PiFolder />}>
              {dataPlaceHolder({ data: value })}
            </CustomTag>
          </div>
        );
      },
    },

    {
      title: "سرویس ها",
      dataIndex: "samimService",
      width: 220,
      render: (_: string, records: viewRoleListItem) => {
        return (
          <div className="flex flex-wrap gap-1">
            <SamimServiceTag
              service={dataPlaceHolder({ data: records?.samimService?.name })}
            />
          </div>
        );
      },
    },
  ];
};
export default ViewDrawerContentTableModel;
