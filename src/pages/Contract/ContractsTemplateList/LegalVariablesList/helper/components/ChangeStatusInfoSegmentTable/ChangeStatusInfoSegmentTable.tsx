import { useState } from "react";

import { Modal } from "antd";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import DisableModalContent from "../../modal/DisableModalContent";
import ChangeStatusInfoSegmentTableModel from "../../model/ChangeStatusInfoSegmentTableModel";

const ChangeStatusInfoSegmentTable = ({ data }: { data: any }) => {
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
      <Modal
        title="علت غیرفعال سازی"
        open={openDisableModal?.isOpen}
        onCancel={() => closeModalHandler()}
        footer={null}
      >
        {
          <DisableModalContent
          // data={data.find((item: any) => item.id === openDisableModal?.id)}
          />
        }
      </Modal>
      <CustomTable
        dataSource={data}
        columns={ChangeStatusInfoSegmentTableModel({ ReasonDisableClickHandler })}
        // loading={}
        pagination={paginationConfig}
        {...TABLE_PROPS(data.length ?? 0)}
        rowKey="id"
      />
    </>
  );
};
export default ChangeStatusInfoSegmentTable;
