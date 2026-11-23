import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { StudentCardProps } from "../../../../infrastructure/models/general.model";
import { GET_ALL, REJECTED_CODE } from "../../../../infrastructure/models/studentStatus";
import GeneralStudentTable from "../../../../infrastructure/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import { useGetAllStudentCardMutation } from "../../../../infrastructure/states/redux/Apis/studentApi";
import StatusHistoryModal from "../../../Modals/StudentModule/StatusHistory/StatusHistoryModal";
import StudentCardModal from "../../../StudentCardModal/StudentCardModal";
import { getAllStudentCardResponse } from "../../@types/@requests";

const RejectedRequests = () => {
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);

  //? ================================  Api Calls ================================
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  //! get list data
  const getListData = () => {
    getAllStudents({
      status: REJECTED_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ============================= Util Functions ============================
  const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList);
    }
  };

  return (
    <>
      <StudentCardModal
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        getListData={getListData}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />
      <div className="action-bar-container ready-to-print-action-bar-container">
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          size="middle"
          //   onClick={onClickHomeActionBarFilter}
        >
          فیلتر پیشرفته
        </Button>
      </div>
      <CustomTable
        loading={isGetAllStudentsLoading}
        dataSource={dataSource}
        columns={GeneralStudentTable({
          // onCheckoutModalClick,
        })}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </>
  );
};

export default RejectedRequests;
