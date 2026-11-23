import React, { useEffect, useState } from "react";

import { Button, Form, Modal, Tabs } from "antd";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import {
  MovingRequestModalPropType,
  TransferUserWithoutExitResponse,
  UserType,
} from "./@types/@movingRequestModal";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  PriceSeparatorWithExtraNumbers,
  dataPlaceHolder,
  isObjectEmpty,
} from "../../../../infrastructure/helpers/utils";
import { RoomAssignModalModelColumn } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomAssignModalModel/RoomAssignModalModel";
import {
  useListOfManagersDormDataMutation,
  useTransferByAddBedMutation,
  useTransferUserWithoutExitMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { PADDING_20 } from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  STATUS_CHANGE_SUCCESS,
} from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import { ListOfResidentUserType } from "../../../../pages/Room/ListOfResidents/ListOfResidentsMain/@types/@listOfResidentsMain";
import CustomCard from "../../../CustomCard/CustomCard";
import CustomEmpty from "../../../Renderers/CustomEmpty/CustomEmpty";
import SingleVerticalItem from "../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_movingRequestModal.scss";

const MovingRequestModal = ({
  movingModalRequest,
  setMovingModalRequest,
  setIsDataRefreshed,
  setTransferRequestModalData, // isExtraInfoDisable,
}: MovingRequestModalPropType) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Partial<UserType>>({});

  const ROOM_HAS_NO_ID = "اتاق انتخابی شناسه ندارد";
  const USER_HAS_NO_NATIONAL_NUMBER = "فرد انتخابی کد ملی ندارد";

  //? ================================  Api Calls ================================
  const [getListOfData, { isLoading: isGetListOfDataLoading, data: listOfData }] =
    useListOfManagersDormDataMutation();

  // transferUserWithoutExit
  const [transferUserWithoutExit, { isLoading: isTransferDataLoading }] =
    useTransferUserWithoutExitMutation();

  const [transferByAddBed, { isLoading: isTransferBedLoading }] =
    useTransferByAddBedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (movingModalRequest?.id && movingModalRequest?.isOpen) {
      getListOfData(movingModalRequest?.id);
    }
  }, [movingModalRequest?.id]);

  //* ================================ Util Functions ================================
  // On row check box selection change
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserType[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRoom(selectedRows[0]);
    },
  };

  const tabOnChangeHandler = () => {
    setSelectedRowKeys([]);
    setSelectedRoom({});
  };

  const onTransferButtonClick = (primaryUser: Partial<ListOfResidentUserType>) => {
    setMovingModalRequest({ isOpen: false, id: 0, userInfo: {} });
    tabOnChangeHandler();
    if (selectedRoom?.id) {
      setTransferRequestModalData({ isOpen: true, id: selectedRoom?.id, primaryUser });
    }
  };
  const transferUserWithoutExitCallback = () => {
    toast.success(STATUS_CHANGE_SUCCESS, { toastId: STATUS_CHANGE_SUCCESS });
    setMovingModalRequest({ isOpen: false, id: -1, userInfo: {} });
    setIsDataRefreshed((prev) => !prev);
  };

  // onNormalTransferClickHandler
  const onNormalTransferClickHandler = () => {
    if (!selectedRoom?.id) {
      return toast.error(ROOM_HAS_NO_ID, { toastId: ROOM_HAS_NO_ID });
    }

    if (
      !movingModalRequest?.userInfo?.nationalnumber ||
      !movingModalRequest?.userInfo?.requestId
    ) {
      return toast.error(USER_HAS_NO_NATIONAL_NUMBER, {
        toastId: USER_HAS_NO_NATIONAL_NUMBER,
      });
    }

    transferUserWithoutExit({
      roomId: selectedRoom?.id,
      userName: movingModalRequest?.userInfo?.nationalnumber,
      adminUserName: "123", //CTO
      requestId: movingModalRequest?.userInfo?.requestId,
    })
      .unwrap()
      .then(transferUserWithoutExitCallback);
  };

  // onTransferByAddBedSuccess
  const onTransferByAddBedSuccess = (value: TransferUserWithoutExitResponse) => {
    if (value?.status === 200) {
      toast.success(STATUS_CHANGE_SUCCESS, { toastId: STATUS_CHANGE_SUCCESS });
      setMovingModalRequest({ isOpen: false, id: -1, userInfo: {} });
      setIsDataRefreshed((prev) => !prev);
    }
  };

  // onAddBedClickHandler
  const onAddBedClickHandler = () => {
    if (!selectedRoom?.id) {
      return toast.error("اتاق انتخابی شناسه ندارد", { toastId: "" });
    }

    if (!movingModalRequest?.userInfo?.nationalnumber) {
      return toast.error(USER_HAS_NO_NATIONAL_NUMBER, {
        toastId: USER_HAS_NO_NATIONAL_NUMBER,
      });
    }

    if (!movingModalRequest?.userInfo?.requestId) {
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }

    transferByAddBed({
      roomId: selectedRoom?.id,
      userName: movingModalRequest?.userInfo?.nationalnumber,
      adminUserName: "123", //CTO
      requestId: movingModalRequest?.userInfo?.requestId,
    })
      .unwrap()
      .then(onTransferByAddBedSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {movingModalRequest?.isOpen && (
        <Modal
          title="درخواست جابجایی"
          open={movingModalRequest?.isOpen}
          footer={null}
          onCancel={() => {
            setMovingModalRequest({ isOpen: false, id: 0, userInfo: {} });
            tabOnChangeHandler();
          }}
          className="room-delivered-modal-container"
          width={1200}
        >
          <Form className="form-container">
            <CustomCard
              className="user-profile-container row"
              padding={PADDING_20}
              loading={isGetListOfDataLoading}
            >
              <SingleVerticalItem
                label="نام"
                value={dataPlaceHolder({ data: movingModalRequest?.userInfo?.name })}
              />
              <SingleVerticalItem
                label="نام خانوادگی"
                value={dataPlaceHolder({ data: movingModalRequest?.userInfo?.family })}
              />
              <SingleVerticalItem
                label="شماره ملی"
                value={dataPlaceHolder({
                  data: movingModalRequest?.userInfo?.nationalnumber,
                })}
              />
              <SingleVerticalItem
                label="شماره دانشجویی"
                value={dataPlaceHolder({
                  data: movingModalRequest?.userInfo?.studentnumber?.length
                    ? movingModalRequest?.userInfo?.studentnumber
                    : "-",
                })}
              />
              <SingleVerticalItem
                label="شماره موبایل"
                value={dataPlaceHolder({ data: movingModalRequest?.userInfo?.mobile })}
              />
              <SingleVerticalItem
                label="خوابگاه"
                value={dataPlaceHolder({
                  data: movingModalRequest?.userInfo?.dormitoryname,
                })}
              />
              <SingleVerticalItem
                label="ساختمان"
                value={dataPlaceHolder({
                  data: movingModalRequest?.userInfo?.buildingname,
                })}
              />
              <SingleVerticalItem
                label="طبقه"
                value={dataPlaceHolder({ data: movingModalRequest?.userInfo?.floorname })}
              />
              <SingleVerticalItem
                label="اتاق"
                value={dataPlaceHolder({ data: movingModalRequest?.userInfo?.roomname })}
              />

              <SingleVerticalItem
                label="مبلغ"
                value={dataPlaceHolder({
                  data: PriceSeparatorWithExtraNumbers(
                    movingModalRequest?.userInfo?.amount ?? ""
                  ),
                })}
              />
            </CustomCard>

            {/* <CustomCard className="input-fields-container">
          <CustomInput
            label="علت"
            name="reason"
            defaultValue="4"
            disabled={isExtraInfoDisable}
            type="text"
            placeholder="علت را وارد کنید"
          />
          <CustomTextArea
            label="پیشنهاد و توضیحات"
            name="description"
            defaultValue="پیشنهاد"
            disabled={isExtraInfoDisable}
            placeholder="پیشنهاد و توضیحات را وارد کنید"
          />
        </CustomCard> */}
            {listOfData && listOfData?.data?.length ? (
              <div className="tab-main-container">
                <Tabs
                  type="card"
                  onChange={() => tabOnChangeHandler()}
                  items={
                    listOfData && listOfData?.data?.length > 0
                      ? listOfData?.data?.map((item: any) => ({
                          key: item?.id,
                          label: item?.name,
                          children: (
                            <Tabs
                              className="tabs-container"
                              defaultActiveKey="1"
                              onChange={() => tabOnChangeHandler()}
                              items={item?.floorLists.map((item: any) => ({
                                key: item?.id,
                                label: item?.name,
                                children: (
                                  <div className="table-container">
                                    <CustomTable
                                      dataSource={item?.roomLists}
                                      columns={RoomAssignModalModelColumn()}
                                      // loading={isGetListOfDataLoading}
                                      rowSelection={{
                                        type: "radio",
                                        ...rowSelection,
                                      }}
                                      pagination={paginationConfig}
                                      bordered={true}
                                      direction="rtl"
                                      scroll={{ x: "max-content", y: 380 }}
                                      size="small"
                                      showSorterTooltip={true}
                                    />
                                  </div>
                                ),
                              }))} //
                              // onChange={onTabsChange}
                              dir="rtl"
                            />
                          ),
                        }))
                      : []
                  }
                />
              </div>
            ) : (
              <CustomEmpty />
            )}

            <div className="action-btns-container">
              {!isObjectEmpty(selectedRoom) ? (
                selectedRoom?.freecapacity && selectedRoom?.freecapacity > 0 ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onNormalTransferClickHandler}
                    loading={isTransferDataLoading}
                  >
                    ثبت
                  </Button>
                ) : (
                  <>
                    <Button
                      type="primary"
                      onClick={() => onTransferButtonClick(movingModalRequest?.userInfo)}
                    >
                      جابجایی با شخص دیگر
                    </Button>
                    <Button
                      type="primary"
                      onClick={onAddBedClickHandler}
                      loading={isTransferBedLoading}
                    >
                      افزایش تخت در اتاق
                    </Button>
                  </>
                )
              ) : (
                <Button type="primary" disabled={true}>
                  ثبت
                </Button>
              )}
              <Button
                type="default"
                onClick={() => {
                  setMovingModalRequest({ isOpen: false, id: 0, userInfo: {} });
                  tabOnChangeHandler();
                }}
              >
                برگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default MovingRequestModal;
