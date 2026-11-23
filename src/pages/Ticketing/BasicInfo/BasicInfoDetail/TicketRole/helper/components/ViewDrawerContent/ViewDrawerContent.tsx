import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { viewRoleListItem } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/@types/@modifyTicketRoleDrawerContentTypes";
import { ViewDrawerContentProps } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ViewDrawerContent/@types/@viewDrawerContentTypes";
import ViewDrawerContentTableModel from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ViewDrawerContent/helper/model/ViewDrawerContentTableModel/ViewDrawerContentTableModel";

const ViewDrawerContent = ({ closeDrawer, loading, data }: ViewDrawerContentProps) => {
  const { params } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده موضوع مشکلات در نقش"
        closeDrawerHandler={closeDrawer}
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol span={24} label="نقش" value={params?.roleParam} />
      </Row>

      <CustomDivider text="لیست موضوع مشکلات تخصیص داده شده" />

      <CustomTable<viewRoleListItem>
        dataSource={data}
        loading={loading}
        rowKey="id"
        columns={ViewDrawerContentTableModel()}
        key={`table-${data || "8"} `}
      />
    </div>
  );
};
export default ViewDrawerContent;
