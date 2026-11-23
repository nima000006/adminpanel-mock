import { useState, useEffect } from "react";

import { Form } from "antd";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ChangeToPaidModalContentForm } from "@pages/Dorm/Requests/helpers/components/PendingRequests/PendingChangeToPaidModal/@types/@changeToPaidModalContent";
import ChangeToPaidModalContent from "@pages/Dorm/Requests/helpers/components/PendingRequests/PendingChangeToPaidModal/ChangeToPaidModalContent";

import { ManualPaymentSuccessResponse } from "./@types/@roomPendingRequests";
import ConfirmationModalWithContent from "../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import { RejectPendingUserResponse } from "../../../../infrastructure/states/redux/Apis/models/roomApi.model";
import {
  useGetListOfDormResidentsWithStatusCodeMutation,
  useManualPaymentSuccessMutation,
  useRejectUserMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import { RoomActiveUserType } from "../ActiveRequests/@types/@roomActiveRequests";
import RoomAssignConfirmModal from "../ActiveRequests/Modals/RoomAssignConfirmModal";
import { RoomSemesterProps } from "../AllRequests/@types/allRequestTypes";
import CustomDormRequestsExcelButton from "../helpers/CustomExcelButton/CustomExcelButton";
import { PENDING_REQUESTS } from "../RequestTypes";

import "./_roomPendingRequests.scss";

const PAGE_TITLE = "لیست درخواست های در انتظار پرداخت";

const RoomPendingRequests = ({ semester }: RoomSemesterProps) => {
  useTitle({ text: PAGE_TITLE });
  const [form] = Form.useForm();

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, key: 0 });
  const [changeToPaidModal, setChangeToPaidModal] = useState<{
    isOpen: boolean;
    info: Partial<RoomActiveUserType>;
  }>({ isOpen: false, info: {} });

  //? ================================  Api Calls ================================
  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  const [manualPaymentSuccess, { isLoading: isManualPaymentSuccessLoading }] =
    useManualPaymentSuccessMutation();

  // Rejecting the student's request
  const [rejectUser, { isLoading: isRejectUserLoading }] = useRejectUserMutation();

  //? ================================ Effects ================================
  // Get the pending list of students' requests on every mount
  useEffect(() => {
    getListData();
  }, [semester]);

  //* ================================ Util Functions ================================
  const getListData = () => {
    getListOfRequests({ statusCode: PENDING_REQUESTS, semester });
    // getListOfRequests(PENDING_REQUESTS);
    setConfirmModal({ isOpen: false, key: 0 });
  };

  const onRoomCancelClickHandler = (key: number) => {
    setConfirmModal({ isOpen: true, key });
  };

  const onRejectSuccess = async (response: RejectPendingUserResponse) => {
    if (response?.status === 200) {
      getListData();
    }
  };

  const onClickRejectUser = (id: number) => {
    rejectUser(id).unwrap().then(onRejectSuccess);
  };

  const onPendingChangeToPaidClickHandler = (info: any) => {
    setChangeToPaidModal({
      isOpen: true,
      info,
    });
  };

  const onManualPaymentSuccess = async (responseInfo: ManualPaymentSuccessResponse) => {
    if (responseInfo?.status === 200) {
      getListData();
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      setChangeToPaidModal({ isOpen: false, info: {} });
      form?.resetFields();
    }
  };

  // onConfirmChangeToPaid
  const onConfirmChangeToPaid = () => {
    form?.submit();
    form.validateFields().then((formData: ChangeToPaidModalContentForm) => {
      if (changeToPaidModal?.info?.id) {
        manualPaymentSuccess({
          requestId: changeToPaidModal?.info?.id,
          description: formData?.description,
          paymentDate: formData?.paymentDate,
          refrenceNumber: formData?.paymentReferenceNumber,
          trackNo: formData?.paymentTransactionNumber,
          paymentType: +formData?.paymentType,
        })
          .unwrap()
          .then(onManualPaymentSuccess);
      }
    });
  };

  const closeChangeModalHandler = () => {
    form?.resetFields();
    setChangeToPaidModal({ isOpen: false, info: {} });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {confirmModal?.isOpen && (
        <RoomAssignConfirmModal
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          onClickRejectUser={onClickRejectUser}
        />
      )}

      {changeToPaidModal?.isOpen && (
        <ConfirmationModalWithContent
          content={
            <Form form={form}>
              <ChangeToPaidModalContent
                changeToPaidModal={changeToPaidModal?.info}
                form={form}
              />
            </Form>
          }
          showIcon={false}
          title="پرداخت"
          backBtnText="انصراف"
          confirmBtnText="ثبت"
          closeModalHandler={closeChangeModalHandler}
          onConfirmClickHandler={onConfirmChangeToPaid}
          isModalOpen={changeToPaidModal?.isOpen}
          width={1000}
          isConfirmButtonLoading={isManualPaymentSuccessLoading}
        />
      )}

      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status={PENDING_REQUESTS?.toString()}
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={listOfRoomRequestData?.data}
          columns={RoomRequestTableColumns({
            from: PENDING_REQUESTS,
            onRoomCancelClickHandler: onRoomCancelClickHandler,
            onPendingChangeToPaidClickHandler: onPendingChangeToPaidClickHandler,
            semester,
          })}
          // rowSelection={{
          //   type: "checkbox",
          //   //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          {...TABLE_PROPS(listOfRoomRequestData?.data?.length || 0)}
          loading={isListOfRoomRequestsLoading || isRejectUserLoading}
          draggableColumns
          draggableId={ExcelCodes.ROOM_ROOM_PENDING_REQUESTS_TABLE}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های در انتظار پرداخت"
        className="mt-1"
      />
    </>
  );
};

export default RoomPendingRequests;
