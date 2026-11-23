import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { GET_ALL, RETURNED_CODE } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_returnedRequests.scss";

const ReportStudentReturnedRequests = () => {
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);

  //!
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  //!
  useEffect(() => {
    getAllStudents({
      status: RETURNED_CODE,
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
      <div className="student-returned-container">
        <div className="action-bar-container ready-to-print-action-bar-container">
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

export default ReportStudentReturnedRequests;
