import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import StudentGroupPacketToPrint from "@components/PrintingHelpers/studentGroupPacketToPrint/studentGroupPacketToPrint";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { GET_ALL, PACKET_GETTING_READY_CODE } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_packetGettingReadyRequests.scss";

const ReportStudentPacketGettingReadyRequests = () => {
  const studentGroupPacketRef = useRef<HTMLDivElement>(null);
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<StudentCardProps[]>();

  //!
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  //!
  useEffect(() => {
    getAllStudents({
      status: PACKET_GETTING_READY_CODE,
      requestType: GET_ALL,
    });
  }, []);

  //! On student get all request status change below things 👇 happens
  useEffect(() => {
    // it has to change to to if getAllStudentData's status is equal to 200
    setDataSource(getAllStudentData?.data?.studentCardDtoList ?? []);
    //todo [saman]: Add error handling in the case of request status other than 200
    // else {
    //   toast.error(GETTING_DATA_ERROR_MESSAGE, { toastId: GETTING_DATA_ERROR_MESSAGE });
    // }
  }, [getAllStudentData?.status]);

  //! On row check box selection change
  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: StudentCardProps[]) => {
      setSelectedUsers(selectedRows);
    },
  };

  //!
  const onStatusHistoryClickHandler = (key: number) => {
    if (key > 0) {
      setHistoryModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  return (
    <>
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />
      <div className="student-packet-getting-ready-container">
        <div style={{ display: "none" }}>
          <StudentGroupPacketToPrint ref={studentGroupPacketRef} data={selectedUsers} />
        </div>

        <CustomTable
          loading={isGetAllStudentsLoading}
          dataSource={dataSource}
          columns={ReportGeneralStudentTableModel({
            onStatusHistoryClickHandler,
          })}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ReportStudentPacketGettingReadyRequests;
