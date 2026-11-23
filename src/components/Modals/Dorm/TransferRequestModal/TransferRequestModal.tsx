import React, { useEffect, useState } from "react";

import { Button, Modal } from "antd";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import {
  DirectTransferResponse,
  RoomResidentType,
  TransferRequestModalProps,
} from "./@types/@transferRequestModal";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { isObjectEmpty } from "../../../../infrastructure/helpers/utils";
import { RoomTransferRequestColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/TransferRequestModel/TransferRequestModel";
import {
  useDirectTransferMutation,
  useLazyGetPersonInRoomByRoomIdQuery,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { GENERAL_ERROR_MESSAGE } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomCard from "../../../CustomCard/CustomCard";
import CustomDivider from "../../../Renderers/CustomDivider/CustomDivider";
import "./_transferRequestModal.scss";

const TransferRequestModal = ({
  setTransferRequestModalData,
  transferRequestModalData,
  setIsDataRefreshed,
}: TransferRequestModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedUser, setSelectedUser] = useState<Partial<RoomResidentType>>({});
  // const [isNoticeCheckboxChecked, setIsNoticeCheckboxChecked] = useState(false);

  const TRANSFER_SUCCESS = "درخواست جابجایی با موفقیت انجام شد";

  //? ================================  Api Calls ================================
  const [getPeople, { data: peopleData, isLoading: isPeopleDataLoading }] =
    useLazyGetPersonInRoomByRoomIdQuery();

  const [directTransfer, { isLoading: isTransferDataLoading }] =
    useDirectTransferMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (transferRequestModalData?.id && transferRequestModalData?.isOpen) {
      getPeople({
        roomId: transferRequestModalData?.id?.toString(),
        term: "2",
      });
    }
  }, [transferRequestModalData?.id]);

  //* ================================ Util Functions ================================
  // On row check box selection change
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: RoomResidentType[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedUser(selectedRows[0]);
    },
  };
  // const onCheckBoxChange = (e: CheckboxChangeEvent) => {
  //   setIsNoticeCheckboxChecked(e.target.checked);
  // };

  const onDirectTransferSuccess = async (value: DirectTransferResponse) => {
    if (value?.status === 200) {
      toast.success(TRANSFER_SUCCESS, {
        toastId: TRANSFER_SUCCESS,
      });
      setTransferRequestModalData({ isOpen: false, id: 0, primaryUser: {} });
      setIsDataRefreshed((prev) => !prev);
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  const onSubmitClickHandler = () => {
    if (
      selectedUser &&
      selectedUser?.userName &&
      transferRequestModalData?.primaryUser?.nationalnumber
    ) {
      directTransfer({
        userName1: transferRequestModalData?.primaryUser?.nationalnumber,
        userName2: selectedUser?.userName,
      })
        .unwrap()
        .then(onDirectTransferSuccess);
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {transferRequestModalData?.isOpen && (
        <Modal
          title="درخواست جابجایی"
          open={transferRequestModalData?.isOpen}
          footer={null}
          onCancel={() =>
            setTransferRequestModalData({ isOpen: false, id: 0, primaryUser: {} })
          }
          className="room-modal-transfer-container"
          width={1200}
        >
          <CustomCard>
            <>
              <div className="label-container">
                {/* <div className="price-container">
              <span className="price-label">اختلاف قیمت</span>
              <span className="price">1,400,000</span>
            </div> */}
                <div className="label">تخت مورد نظر برای تخلیه را انتخاب کنید.</div>
              </div>
              <CustomDivider text=" ساکنین اتاق" />
              <CustomTable
                dataSource={peopleData?.data}
                columns={RoomTransferRequestColumns() as any}
                bordered={true}
                rowKey="userName"
                rowSelection={{
                  type: "radio",
                  ...rowSelection,
                }}
                pagination={paginationConfig}
                direction="rtl"
                scroll={{ x: "max-content", y: 380 }}
                size="small"
                showSorterTooltip={true}
                loading={isPeopleDataLoading}
              />
            </>
          </CustomCard>
          {/* <CustomCard>
        <div className="exchange-with-notice-container">
          <span className="checkbox">
            <Checkbox onChange={onCheckBoxChange} checked={isNoticeCheckboxChecked} />
          </span>
          <span className="label">
            جابجایی نظیر به نظیر (جایگیری شخص بیرون شونده در تخت شخص فعلی)
          </span>
        </div>
      </CustomCard> */}
          <div className="action-btns-container">
            <Button
              type="primary"
              disabled={isObjectEmpty(selectedUser)}
              onClick={onSubmitClickHandler}
              loading={isTransferDataLoading}
            >
              ثبت جابجایی
            </Button>
            <Button
              type="default"
              onClick={() =>
                setTransferRequestModalData({ isOpen: false, id: -1, primaryUser: {} })
              }
            >
              بستن
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TransferRequestModal;
