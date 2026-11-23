import { useEffect, useRef, useState } from "react";

import { Modal } from "antd";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import {
  AdminActionModalProps,
  StudentCardModalProps,
  UpdateStudentCardStatusResponse,
  getStudentInfoResponse,
} from "./@types/@studentCardModal";
import MainStudentModalData from "./MainModalData/MainStudentModalData";
import StudentAdminDescriptionModal from "./StudentAdminDescriptionModal/StudentAdminDescriptionModal";
import StudentCardConfirmModal from "./StudentCardConfirmModal/StudentCardConfirmModal";
import { actionInfoButton, userData } from "../../infrastructure/models/general.model";
import { CLOSED_CODE } from "../../infrastructure/models/studentStatus";
import {
  useGetStudentInfoMutation,
  useGetStudentPrevOrNextMutation,
  useUpdateStudentCardStatusMutation,
} from "../../infrastructure/states/redux/Apis/studentApi";
import {
  STATUS_CHANGE_ERROR,
  STATUS_CHANGE_SUCCESS,
  STUDENT_ID_IS_NOT_VALID,
} from "../../infrastructure/VARS/globalToasts/globalToasts";
import StudentCardToPrint from "../PrintingHelpers/StudentCardToPrint/StudentCardToPrint";
import Div from "../Renderers/Div/Div";
import "./_studentCardModal.scss";

const StudentCardModal = ({
  getListData,
  studentModal,
  setStudentModal, // modalData,
}: StudentCardModalProps) => {
  const [adminActionModal, setAdminActionModal] = useState<AdminActionModalProps>({
    isModalOpen: false,
    title: "",
    id: -1,
  });
  const [isCloseRequestModalOpen, setIsCloseRequestModalOpen] = useState<boolean>(false);
  const studentCardRef = useRef<any>(null);
  const [adminComment, setAdminComment] = useState<string>("");
  const [infoData, setInfoData] = useState<Partial<userData>>({});

  //? ================================  Api Calls ================================
  const [getUserInfo, { data: userInfoData, isLoading: isUserInfoLoading }] =
    useGetStudentInfoMutation();

  // MODAL NEXT OR PREV BUTTONS
  const [
    getStudentPrevOrNext,
    { data: nextStudentData, isLoading: isNextStudentDataLoading },
  ] = useGetStudentPrevOrNextMutation();

  const [updateStudentCardStatus, { isLoading: isUpdateStudentCardStatusLoading }] =
    useUpdateStudentCardStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (studentModal?.id && studentModal?.isOpen) {
      getUserInitDataWithId();
    }
  }, [studentModal?.id]);

  // useEffect(() => {
  //   if (updateStudentCardStatusData?.status === 200 && studentModal?.id) {
  //     toast.success(STATUS_CHANGE_SUCCESS, { toastId: STATUS_CHANGE_SUCCESS });
  //     setAdminActionModal({ isModalOpen: false, id: -1, title: "" });
  //     getUserInitDataWithId();
  //     // getUserInfo(studentModal?.id?.toString());
  //     setIsModalStatusChanged((prev) => !prev);
  //   } else if (updateStudentCardStatusData?.status === 400) {
  //     toast.error(STATUS_CHANGE_ERROR, { toastId: STATUS_CHANGE_ERROR });
  //   }
  // }, [updateStudentCardStatusData?.status]);

  // useEffect(() => {
  //   if (nextStudentData?.status === 200 && nextStudentData?.data) {
  //     setInfoData(nextStudentData?.data);
  //   }
  // }, [nextStudentData?.status]);

  //* ================================ Util Functions ===============================
  const onGetUserInfoSuccess = async (response: getStudentInfoResponse) => {
    if (response?.status === 200) {
      setInfoData(response?.data);
    }
  };

  const getUserInitDataWithId = () => {
    getUserInfo(studentModal?.id?.toString()).unwrap().then(onGetUserInfoSuccess);
  };

  const onPrevOrNextSuccess = async (response: getStudentInfoResponse) => {
    if (response?.status === 200 && response?.data) {
      setInfoData(response?.data);
    }
  };

  // on click Next
  const onClickNextStudent = () => {
    if (!infoData?.id) {
      return toast.warn(STUDENT_ID_IS_NOT_VALID, { toastId: STUDENT_ID_IS_NOT_VALID });
    }
    getStudentPrevOrNext({ state: "next", studentCardId: infoData?.id })
      .unwrap()
      .then(onPrevOrNextSuccess);
  };

  const onUpdateStudentCardStatusSuccess = async (
    response: UpdateStudentCardStatusResponse
  ) => {
    if (response?.status === 200 && studentModal?.id) {
      toast.success(STATUS_CHANGE_SUCCESS, { toastId: STATUS_CHANGE_SUCCESS });
      setAdminActionModal({ isModalOpen: false, id: -1, title: "" });
      getUserInitDataWithId();
      getListData();
    } else if (response?.status === 400) {
      toast.error(STATUS_CHANGE_ERROR, { toastId: STATUS_CHANGE_ERROR });
    }
  };

  const onAdminModalConfirmHandler = ({
    isClosingRequest = false,
  }: {
    isClosingRequest?: boolean;
  }) => {
    if (isClosingRequest && infoData?.id) {
      updateStudentCardStatus({
        comment: adminComment,
        id: infoData?.id,
        status: CLOSED_CODE,
      })
        .unwrap()
        .then(onUpdateStudentCardStatusSuccess);
      return;
    }
    if (infoData?.id && adminActionModal?.id && adminActionModal?.id > -1) {
      updateStudentCardStatus({
        comment: adminComment,
        id: infoData?.id,
        status: adminActionModal?.id,
      })
        .unwrap()
        .then(onUpdateStudentCardStatusSuccess);
    } else {
      toast.warning("در حال حاضر امکان ثبت اطلاعات وجود ندارد لطفا دوباره تلاش فرمائید");
    }
  };

  const onStudentCardPrintHandler = useReactToPrint({
    contentRef: studentCardRef, // or studentCardRef.current ?
  });

  const onTextAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdminComment(e.target.value);
  };

  const onAdminStateChangeHandler = (item: actionInfoButton) => {
    setAdminActionModal({ isModalOpen: true, title: item.name, id: item.id });
  };

  const onCloseRequestHandler = () => {
    setIsCloseRequestModalOpen(true);
  };

  // on click Prev
  const onClickPrevStudent = () => {
    if (!infoData?.id) {
      return toast.warn(STUDENT_ID_IS_NOT_VALID, { toastId: STUDENT_ID_IS_NOT_VALID });
    }
    getStudentPrevOrNext({ state: "prev", studentCardId: infoData?.id })
      .unwrap()
      .then(onPrevOrNextSuccess);
  };

  const mainModalCloseHandler = () => {
    setInfoData({});
    setStudentModal({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <div style={{ display: "none", padding: "0 !important", margin: "0 !important" }}>
        <StudentCardToPrint ref={studentCardRef} data={infoData} />
      </div>

      {studentModal?.isOpen && (
        <Modal
          title=""
          centered
          open={studentModal?.isOpen}
          onOk={mainModalCloseHandler}
          onCancel={mainModalCloseHandler}
          width={1200}
          className="student-card-modal"
          footer={null}
        >
          <StudentAdminDescriptionModal
            setAdminActionModal={setAdminActionModal}
            adminActionModal={adminActionModal}
            isUpdateStudentCardStatusLoading={isUpdateStudentCardStatusLoading}
            onTextAreaChangeHandler={onTextAreaChangeHandler}
            onAdminModalConfirmHandler={onAdminModalConfirmHandler}
          />
          <StudentCardConfirmModal
            isCloseRequestModalOpen={isCloseRequestModalOpen}
            setIsCloseRequestModalOpen={setIsCloseRequestModalOpen}
            isUpdateStudentCardStatusLoading={isUpdateStudentCardStatusLoading}
            onAdminModalConfirmHandler={onAdminModalConfirmHandler}
            setAdminActionModal={setAdminActionModal}
          />
          <Div
            loading={isUserInfoLoading || isNextStudentDataLoading}
            customHeight="50vh"
          >
            <MainStudentModalData
              infoData={infoData}
              onCloseRequestHandler={onCloseRequestHandler}
              onClickNextStudent={onClickNextStudent}
              onClickPrevStudent={onClickPrevStudent}
              nextStudentData={nextStudentData}
              userInfoData={userInfoData}
              onStudentCardPrintHandler={onStudentCardPrintHandler}
              onAdminStateChangeHandler={onAdminStateChangeHandler}
              mainModalCloseHandler={mainModalCloseHandler}
            />
          </Div>
        </Modal>
      )}
    </>
  );
};

export default StudentCardModal;
