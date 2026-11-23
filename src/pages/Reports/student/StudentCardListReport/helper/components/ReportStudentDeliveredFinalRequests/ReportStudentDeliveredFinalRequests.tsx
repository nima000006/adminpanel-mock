import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { DELIVERED_FINAL_CODE, GET_ALL } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_deliveredFinalRequests.scss";

const ReportStudentDeliveredFinalRequests = () => {
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);

  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  //!
  useEffect(() => {
    getAllStudents({
      status: DELIVERED_FINAL_CODE,
      requestType: GET_ALL,
    });
  }, []);

  useEffect(() => {
    // it has to change to to if getAllStudentData's status is equal to 200
    setDataSource(getAllStudentData?.data?.studentCardDtoList ?? []);
    //todo [saman]: Add error handling in the case of request status other than 200
    // else {
    //   toast.error(GETTING_DATA_ERROR_MESSAGE, { toastId: GETTING_DATA_ERROR_MESSAGE });
    // }
  }, [getAllStudentData?.status]);

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

      <div className="student-delivered-final-container">
        <div className="action-bar-container ready-to-print-action-bar-container">
          {/* <div style={{ display: "none" }}>
              <StudentGroupCardToPrint ref={studentGroupCardRef} data={selectedUsers} />
            </div> */}
          <CustomButton
            type="primary"
            icon={<AiOutlineFilter />}
            size="middle"
            // onClick={onClickHomeActionBarFilter}
          >
            فیلتر پیشرفته
          </CustomButton>
        </div>
        <CustomTable
          loading={isGetAllStudentsLoading}
          dataSource={dataSource}
          columns={ReportGeneralStudentTableModel({
            onStatusHistoryClickHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ReportStudentDeliveredFinalRequests;
