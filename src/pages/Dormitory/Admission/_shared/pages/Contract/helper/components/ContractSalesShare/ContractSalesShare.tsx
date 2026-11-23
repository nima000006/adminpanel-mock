import { Row } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  ContractSalesShareProps,
  ContractSalesShareServiceItem,
} from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractSalesShare/@types/@contractSalesShare";
import ContractSalesShareTableModel from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractSalesShare/helper/models/ContractSalesShare/ContractSalesShareTableModel";

const ContractSalesShare = ({ data }: ContractSalesShareProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="کسب و کار (ذینفع)" value={data.business} lg={8} />
        <SingleVerticalWithCol label="شعبه / واحد (ذینفع)" value={data.branch} lg={8} />
      </Row>

      <CustomTable<ContractSalesShareServiceItem>
        dataSource={data.services}
        rowKey="id"
        columns={ContractSalesShareTableModel()}
        pagination={false}
      />
    </div>
  );
};

export default ContractSalesShare;
