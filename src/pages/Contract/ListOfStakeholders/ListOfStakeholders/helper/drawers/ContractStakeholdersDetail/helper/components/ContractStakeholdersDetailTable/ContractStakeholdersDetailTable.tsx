import { useState } from "react";

import { Modal } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";

import ContractStakeholdersDetailTableModel from "./helper/models/ContractStakeholdersDetail/ContractStakeholdersDetailTableModel";
import ContractStakeholdersDisableModalContent from "../../modal/ContractStakeholdersDisableModalContent/ContractStakeholdersDisableModalContent";

const ContractStakeholdersDetailTable = ({
  data,
}: {
  data: {
    status: string;
    startData: string;
    endDate: string;
    modifiedBy: string;
    modifiedDate: string;
  }[];
}) => {
  const [openDisableModal, setIsDisableModal] = useState({ id: -1, isOpen: false });
  const ReasonDisableClickHandler = (id: number) => {
    setIsDisableModal({ id, isOpen: true });
  };
  const closeModalHandler = () => {
    setIsDisableModal({ id: -1, isOpen: false });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <CustomTable<{
        status: string;
        startData: string;
        endDate: string;
        modifiedBy: string;
        modifiedDate: string;
      }>
        className="all-wallets-transaction-list-table-container"
        dataSource={data}
        columns={ContractStakeholdersDetailTableModel({ ReasonDisableClickHandler })}
        // loading={isTransactionListLoading}
        pagination={paginationConfig}
        // {...TABLE_PROPS(data?.length ?? 0)}
        rowKey="id"
      />

      <Modal
        title="علت غیرفعال سازی"
        open={openDisableModal?.isOpen}
        onCancel={() => closeModalHandler()}
        footer={null}
      >
        {
          <ContractStakeholdersDisableModalContent
          // data={data.find((item: any) => item.id === openDisableModal?.id)}
          />
        }
      </Modal>
    </>
  );
};

export default ContractStakeholdersDetailTable;
