import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import StudentCardModal from "@components/StudentCardModal/StudentCardModal";
import { getAllStudentCardResponse } from "@components/StudentModules/@types/@requests";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { DELIVERED_FINAL_CODE, GET_ALL } from "@infra/models/studentStatus";
import GeneralStudentTable from "@infra/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_deliveredFinalRequests.scss";

const DeliveredFinalRequests = () => {
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);

  //? ================================  Api Calls ================================
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ================================ Util Functions ================================
  const onGetAllStudentSuccess = (info: getAllStudentCardResponse) => {
    if (info?.status === 200) {
      setDataSource(info?.data?.studentCardDtoList ?? []);
    }
  };

  const getListData = () => {
    getAllStudents({
      status: DELIVERED_FINAL_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  const onCheckoutModalClick = (key: number) => {
    if (key > 0) {
      return setStudentModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  const onStatusHistoryClickHandler = (key: number) => {
    if (key > 0) {
      setHistoryModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <StudentCardModal
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        getListData={getListData}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />

      <div className="student-delivered-final-container">
        <div className="action-bar-container">
          {/* <div style={{ display: "none" }}>
              <StudentGroupCardToPrint ref={studentGroupCardRef} data={selectedUsers} />
            </div> */}
          <ToolBox
            rightSide={
              <CustomButton
                type="primary"
                icon={<AiOutlineFilter />}
                size="middle"
                // onClick={onClickHomeActionBarFilter}
              >
                فیلتر پیشرفته
              </CustomButton>
            }
            leftSide={
              <div className="action-bar-btns-left-side-container">
                <CustomButton
                  type="default"
                  className="action-btn action-btn-disabled"
                  size="middle"
                  // disabled={!selectedUsers || selectedUsers?.length === 0}
                  disabled={true}
                  // key={item.id}
                  onClick={() => {
                    //onReadyToInPersonDeliverClickHandler();
                  }}
                >
                  خروجی اکسل
                </CustomButton>
              </div>
            }
          />
        </div>
        <CustomTable
          loading={isGetAllStudentsLoading}
          dataSource={dataSource}
          columns={GeneralStudentTable({
            onCheckoutModalClick,
            onStatusHistoryClickHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default DeliveredFinalRequests;
