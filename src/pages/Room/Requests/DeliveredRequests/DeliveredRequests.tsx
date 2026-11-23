import { useState, useEffect } from "react";

import { Form } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useAdminBranchCode from "@infra/hooks/useAdminBranchCode";
import { ManualRevertRequestResponse } from "@infra/states/redux/Apis/models/roomApi.model";
import {
  GENERAL_KEY_ERROR_MSG,
  GENERAL_SUBMIT_SUCCESS,
} from "@infra/VARS/globalToasts/globalToasts";
import {
  GetListOfDormResidentsResponse,
  ListOfDormResidents,
} from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";

import RevertBulkDeliverModalContent from "./Modals/RevertBulkDeliverModalContent/RevertBulkDeliverModalContent";
import RevertDeliverModalContent from "./Modals/RevertDeliverModal/RevertDeliverModal";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import {
  useBulkRevertRequestMutation,
  useGetListOfDormResidentsWithStatusCodeMutation,
  useManualRevertRequestMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { RoomSemesterProps } from "../AllRequests/@types/allRequestTypes";
import CustomDormRequestsExcelButton from "../helpers/CustomExcelButton/CustomExcelButton";
import { DELIVERED_REQUESTS } from "../RequestTypes";

import "./_deliveredRequest.scss";

type bulkRevertModalType = {
  ids: React.Key[];
  isOpen: boolean;
};

const PAGE_TITLE = "لیست درخواست های تحویل شده";

const RoomDeliveredRequests = ({ semester }: RoomSemesterProps) => {
  useTitle({ text: PAGE_TITLE });
  const [form] = Form.useForm();
  const [bulkRevertForm] = Form.useForm();

  const [revertModal, setRevertModal] = useState({ id: -1, isOpen: false });
  const [bulkRevertModal, setBulkRevertModal] = useState<bulkRevertModalType>({
    ids: [],
    isOpen: false,
  });
  const [dataSource, setDataSource] = useState<ListOfDormResidents[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isAdminBranchCode] = useAdminBranchCode();
  //? ================================  Api Calls ================================
  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  const [manualRevertRequest, { isLoading: isManualRevertRequestsLoading }] =
    useManualRevertRequestMutation();

  const [bulkRevertRequest, { isLoading: isBulkRevertRequestLoading }] =
    useBulkRevertRequestMutation();

  //? ================================ Effects ================================
  // Get the delivered list of students' requests on every mount
  useEffect(() => {
    getData();
  }, [semester]);

  //* ================================ Util Functions ================================
  const getData = () => {
    // getListOfRequests(DELIVERED_REQUESTS)
    getListOfRequests({ statusCode: DELIVERED_REQUESTS, semester })
      .unwrap()
      .then(onGetListOfRequestSuccess);
  };

  const onGetListOfRequestSuccess = async (response: GetListOfDormResidentsResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data);
    }
  };

  const onRevertDeliveredClickHandler = (id: number) => {
    setRevertModal({ id, isOpen: true });
  };

  const onManualRevertRequestSuccess = async (response: ManualRevertRequestResponse) => {
    if (response?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      setRevertModal({ id: -1, isOpen: false });
      getData();
      form?.resetFields();
    }
  };

  // onConfirmRevertModalHandler
  const onConfirmRevertModalHandler = () => {
    form?.submit();
    form?.validateFields().then((values) => {
      if (revertModal?.id > 1) {
        manualRevertRequest({
          description: values?.description,
          price: values?.price,
          requestId: revertModal?.id,
          paymentDate: "",
        })
          .unwrap()
          .then(onManualRevertRequestSuccess);
      } else {
        toast.error(GENERAL_KEY_ERROR_MSG, { toastId: GENERAL_KEY_ERROR_MSG });
      }
    });
  };

  const rowSelection: TableRowSelection<ListOfDormResidents> = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // onClickBulkRevertBtn
  const onClickBulkRevertBtn = () => {
    setBulkRevertModal({ ids: selectedRowKeys, isOpen: true });
  };

  const onConfirmBulkRevertModalHandler = () => {
    bulkRevertForm?.submit();
    bulkRevertForm
      ?.validateFields()
      .then((values: { price: number; description: string }) => {
        if (bulkRevertModal?.ids?.length > 0) {
          bulkRevertRequest({
            description: values?.description,
            price: values?.price,
            paymentDate: "",
            requestIds: bulkRevertModal?.ids,
            adminUsername: "1111",
          })
            .unwrap()
            .then(onManualRevertRequestSuccess);
        } else {
          toast.error(GENERAL_KEY_ERROR_MSG, { toastId: GENERAL_KEY_ERROR_MSG });
        }
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {bulkRevertModal?.isOpen && (
        <ConfirmationModalWithContent
          content={
            <Form form={bulkRevertForm}>
              <RevertBulkDeliverModalContent />
            </Form>
          }
          title="بازگردانی گروهی"
          closeModalHandler={() => setBulkRevertModal({ isOpen: false, ids: [] })}
          onConfirmClickHandler={onConfirmBulkRevertModalHandler}
          backBtnText="برگشت"
          confirmBtnText="ثبت"
          isModalOpen={bulkRevertModal?.isOpen}
          isConfirmButtonLoading={isBulkRevertRequestLoading}
          centered
          showIcon={false}
        />
      )}
      {revertModal?.isOpen && (
        <ConfirmationModalWithContent
          content={
            <Form form={form}>
              <RevertDeliverModalContent
                isOpen={revertModal?.isOpen}
                id={revertModal?.id}
              />
            </Form>
          }
          title="بازگردانی"
          closeModalHandler={() => setRevertModal({ isOpen: false, id: -1 })}
          onConfirmClickHandler={onConfirmRevertModalHandler}
          backBtnText="برگشت"
          confirmBtnText="ثبت"
          isModalOpen={revertModal?.isOpen}
          isConfirmButtonLoading={isManualRevertRequestsLoading}
          centered
          showIcon={false}
        />
      )}
      <div className="delivered-room-container">
        <div className="room-request-delivered-btn">
          {isAdminBranchCode ? (
            <CustomButton
              danger
              disabled={selectedRowKeys?.length < 1}
              onClick={onClickBulkRevertBtn}
            >
              بازگردانی موارد انتخاب شده
            </CustomButton>
          ) : (
            ""
          )}
          <CustomDormRequestsExcelButton
            semester={semester}
            status={DELIVERED_REQUESTS?.toString()}
            title={PAGE_TITLE}
          />
        </div>

        {/* <CustomButton danger>بازگردانی موارد انتخاب شده</CustomButton> */}

        <CustomTable
          dataSource={dataSource}
          columns={RoomRequestTableColumns({
            from: DELIVERED_REQUESTS,
            onRevertDeliveredClickHandler: onRevertDeliveredClickHandler,
          })}
          rowSelection={{ ...rowSelection }}
          pagination={{
            ...paginationConfig,
          }}
          loading={isListOfRoomRequestsLoading}
          {...TABLE_PROPS(dataSource?.length)}
          draggableColumns
          draggableId={ExcelCodes.ROOM_DELIVERED_REQUESTS_TABLE}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های تحویل شده:"
        className="mt-1"
      />
    </>
  );
};

export default RoomDeliveredRequests;
