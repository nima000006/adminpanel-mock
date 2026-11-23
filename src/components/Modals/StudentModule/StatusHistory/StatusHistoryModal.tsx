import { useEffect } from "react";

import { Modal, Spin } from "antd";
import moment from "jalali-moment";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import { useGetStudentDateHistoryInfoMutation } from "../../../../infrastructure/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_statusHistoryModal.scss";
import { StatusHistoryModalProps } from "./@types/@statusHistoryModal";

import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

const StatusHistoryTableColumns = [
  {
    title: "#",
    dataIndex: "rowIndex",
    key: "rowIndex",
    width: 25,
  },
  {
    title: "تاریخ و زمان",
    dataIndex: "requestDate",
    key: "requestDate",
    width: 100,
    render: (value: string) => {
      return (
        <span>
          {moment(value ?? new Date())
            .locale("fa")
            .format("HH:mm - D / M / YYYY")}
        </span>
      );
    },
  },
  {
    title: "وضعیت جدید",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
];

const StatusHistoryModal = ({
  historyModal,
  setHistoryModal,
}: StatusHistoryModalProps) => {
  //? ================================  Api Calls ============================
  const [getStudentDateHistory, { data, isLoading, isSuccess }] =
    useGetStudentDateHistoryInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (historyModal?.id > 0 && historyModal?.isOpen) {
      getStudentDateHistory(historyModal?.id?.toString());
    }
  }, [historyModal?.id]);

  //* ================================ Util Functions ================================
  const source = data?.data.map((item, index) => {
    return {
      rowIndex: index + 1,
      key: item.id,
      id: item.id,
      name: item.name,
      requestDate: item.requestDate,
    };
  });

  if (isSuccess && data?.status !== 200) {
    toast.error(GENERAL_ERROR_MESSAGE, {
      toastId: GENERAL_ERROR_MESSAGE,
    });
    setHistoryModal({ isOpen: false, id: -1 });
  }

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {historyModal?.isOpen && (
        <Modal
          title="سوابق تغییر وضعیت"
          open={historyModal?.isOpen}
          onCancel={() => setHistoryModal({ isOpen: false, id: -1 })}
          footer={null}
          className="status-history-modal-container"
        >
          {isLoading ? (
            <div className="spin-container">
              <Spin />
            </div>
          ) : (
            <CustomTable
              dataSource={data?.data && source}
              columns={StatusHistoryTableColumns}
              pagination={false}
              {...TABLE_PROPS(data?.data?.length || 0)}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default StatusHistoryModal;
