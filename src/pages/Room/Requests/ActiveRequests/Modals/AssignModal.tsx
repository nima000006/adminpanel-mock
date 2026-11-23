import { useEffect, useState } from "react";

import { Button, Col, Form, Modal, Row, Tabs } from "antd";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomInputNumber from "../../../../../components/CustomInputs/InputNumber/CustomInputNumber";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "../../../../../components/Renderers/CustomEmpty/CustomEmpty";
import Div from "../../../../../components/Renderers/Div/Div";
import SingleVerticalItem from "../../../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  dataPlaceHolder,
  PriceSeparator,
} from "../../../../../infrastructure/helpers/utils";
import { RoomAssignModalModelColumn } from "../../../../../infrastructure/models/tableModels/RoomTableModel/RoomAssignModalModel/RoomAssignModalModel";
import { acceptRequestByMangerResponse } from "../../../../../infrastructure/states/redux/Apis/models/roomApi.model";
import {
  useAcceptRequestByManagerMutation,
  useListOfManagersDormDataMutation,
} from "../../../../../infrastructure/states/redux/Apis/roomApi";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  GENERAL_KEY_ERROR_MSG,
  SUCCESS_ROOM_REQUEST,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { AssignModalType } from "../@types/@roomActiveRequests";

import "./_assignModal.scss";

type AssignModalProps = {
  confirmLoading: boolean;
  assignModal: AssignModalType;
  setAssignModal: React.Dispatch<React.SetStateAction<AssignModalType>>;
  getData: () => void;
};
type SelectedRoomProps = {
  id?: number;
  key?: number;
  name?: string;
  bedcount?: number;
  allcapacity?: number;
  freecapacity?: number;
  price?: string;
  type?: null;
  grade?: string;
  timeType?: null;
};

const PRICE_NOT_NEGATIVE_ERROR = "قیمت نهایی فاکتور نمی تواند منفی باشد";

const AssignModal = ({
  confirmLoading,
  assignModal,
  setAssignModal,
  getData,
}: AssignModalProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoomProps>({}); //roomTypeProps
  const [form] = Form.useForm();
  // const [discount, setDiscount] = useState(false);
  // const [discountValue, setDiscountValue] = useState("0");
  // const [textMsgValue, setTextMsgValue] = useState(
  //   "دانشجوی عزیز , درخواست شما برای تخصیص خوابگاه مورد تایید قرار گرفت و فاکتور مربوطه صادر گردید. لطفا جهت پرداخت فاکتور و نهایی کردن رزرو به اپلیکیشن مراجعه کنید."
  // );
  // const [customPrice, setCustomPrice] = useState(false);

  //? ================================  Api Calls ================================
  const [getListOfData, { isLoading: isGetListOfDataLoading, data: listOfData }] =
    useListOfManagersDormDataMutation();

  const [acceptRequest, { isLoading: isAcceptRequestLoading }] =
    useAcceptRequestByManagerMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (assignModal?.isOpen && assignModal?.key) {
      getListOfData(assignModal?.key);
    }
  }, [assignModal?.isOpen]);

  //* ================================ Util Functions ================================
  // On row check box selection change
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: SelectedRoomProps[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRoom(selectedRows[0]);
    },
  };

  const onAcceptRequestSuccess = async (response: acceptRequestByMangerResponse) => {
    if (response?.status === 200) {
      // onTabsChange meaning reset
      onTabsChange();
      toast.success(SUCCESS_ROOM_REQUEST, { toastId: SUCCESS_ROOM_REQUEST });
      setAssignModal({
        isOpen: false,
        key: 0,
        id: 0,
        userData: {},
      });
      getData();
    }
  };

  const onClickSendReservationRequest = () => {
    if (!selectedRoom?.id) return;

    if (form.getFieldsValue().discountAmount) {
      const priceWithoutDot = Number(selectedRoom?.price?.toString()?.split(".")?.[0]);

      const priceWithDiscountAmount =
        priceWithoutDot - +form.getFieldsValue().discountAmount;

      if (priceWithDiscountAmount < 0)
        return toast.error(PRICE_NOT_NEGATIVE_ERROR, {
          toastId: PRICE_NOT_NEGATIVE_ERROR,
        });
    }

    form?.submit();
    form
      .validateFields()
      .then(
        (formData: {
          discount?: number;
          description?: string;
          discountAmount?: number;
        }) => {
          if (selectedRoom?.id && assignModal?.id) {
            acceptRequest({
              roomid: selectedRoom?.id,
              discount: formData?.discount ?? 0,
              description: formData?.description ?? "",
              reqid: assignModal?.id,
              discountAmount: formData?.discountAmount ?? 0,
            })
              .unwrap()
              .then(onAcceptRequestSuccess);
          } else {
            toast.error(GENERAL_KEY_ERROR_MSG, { toastId: GENERAL_KEY_ERROR_MSG });
          }
        }
      );
  };

  // notZeroCapacityReturner
  const notZeroCapacityReturner = (data: SelectedRoomProps[]) => {
    return data?.filter((item) => item?.freecapacity && item?.freecapacity > 0);
  };

  // TABS CHANGE
  const onTabsChange = () => {
    setSelectedRowKeys([]);
    setSelectedRoom({});
    form.resetFields();
    setTotalPrice(0);
  };

  // onUpdateFactorPreviewClickHandler
  const onUpdateFactorPreviewClickHandler = () => {
    const priceWithoutDot = Number(selectedRoom?.price?.toString()?.split(".")?.[0]);

    const priceWithDiscountAmount =
      priceWithoutDot - +(form.getFieldValue("discountAmount") ?? 0);

    const discountAmount = form.getFieldValue("discount") ?? 0;

    if (priceWithDiscountAmount) {
      setTotalPrice(priceWithDiscountAmount * ((100 - discountAmount) / 100));
    }
  };
  // console.log(selectedRoom?.id);

  const onModalCancel = () => {
    setAssignModal({ isOpen: false, key: 0, id: 0, userData: {} });
    onTabsChange();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {assignModal?.isOpen && (
        <Modal
          title="تخصیص اتاق"
          open={assignModal?.isOpen}
          confirmLoading={confirmLoading}
          //   onOk={handleOk}
          onCancel={onModalCancel}
          footer={null}
          className="room-assign-modal-container"
          centered={true}
          bodyStyle={{ overflowY: "auto" }}
        >
          <CustomCard
            className="user-profile-container"
            padding={PADDING_20}
            loading={isGetListOfDataLoading}
          >
            <SingleVerticalItem
              label="نام"
              value={dataPlaceHolder({ data: assignModal?.userData?.name })}
            />
            <SingleVerticalItem
              label="نام خانوادگی"
              value={dataPlaceHolder({ data: assignModal?.userData?.family })}
            />
            <SingleVerticalItem
              label="شماره ملی"
              value={dataPlaceHolder({
                data: assignModal?.userData?.nationalcode,
              })}
            />
            <SingleVerticalItem
              label="شماره دانشجویی"
              value={dataPlaceHolder({
                data: (assignModal?.userData as any)?.studntNumber,
              })}
            />
            <SingleVerticalItem
              label="شماره موبایل"
              value={dataPlaceHolder({ data: assignModal?.userData?.mobile })}
            />
            <SingleVerticalItem
              label="خوابگاه"
              value={dataPlaceHolder({ data: assignModal?.userData?.dormitoryname })}
            />
          </CustomCard>
          {listOfData?.data && listOfData?.data?.length ? (
            <Div className="room-assign-modal-content" loading={isGetListOfDataLoading}>
              <div className="tabs-container">
                <Tabs
                  type="card"
                  onChange={onTabsChange}
                  items={listOfData?.data?.map((item: any) => {
                    return {
                      key: item?.id,
                      label: item?.name,
                      children: (
                        <>
                          {item?.floorLists && item?.floorLists.length ? (
                            <Tabs
                              defaultActiveKey="1"
                              onChange={onTabsChange}
                              items={item?.floorLists.map((item: any) => {
                                return {
                                  key: item?.id,
                                  label: item?.name,
                                  children: (
                                    <div className="table-container">
                                      {item?.roomLists && item?.roomLists.length ? (
                                        <CustomTable
                                          dataSource={notZeroCapacityReturner(
                                            item?.roomLists
                                          )}
                                          columns={RoomAssignModalModelColumn()}
                                          loading={isGetListOfDataLoading}
                                          key={item?.id}
                                          rowSelection={{
                                            type: "radio",
                                            ...rowSelection,
                                          }}
                                          pagination={paginationConfig}
                                          {...TABLE_PROPS(
                                            notZeroCapacityReturner(item?.roomLists)
                                              ?.length || 0
                                          )}
                                        />
                                      ) : (
                                        <CustomEmpty />
                                      )}
                                    </div>
                                  ),
                                };
                              })}
                            />
                          ) : (
                            <CustomEmpty />
                          )}
                        </>
                      ),
                    };
                  })}
                />
              </div>
              <CustomCard>
                <Form form={form}>
                  <CustomDivider text="تخفیف" />
                  <Row gutter={16}>
                    <Col lg={12} md={12} sm={12} xs={24}>
                      <CustomInputNumber
                        label="تخفیف (درصد)"
                        name="discount"
                        placeholder="تخفیف"
                        maxLength={2}
                        min={0}
                      />
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={24}>
                      <CustomInputNumber
                        label="تخفیف (مقدار)"
                        name="discountAmount"
                        isPrice={true}
                        placeholder="تخفیف"
                        min={0}
                      />
                    </Col>
                    <Col span={24}>
                      <CustomTextArea
                        label="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                  </Row>
                </Form>
              </CustomCard>
              <CustomCard>
                <CustomDivider text="قیمت نهایی" />
                <Row gutter={[16, 16]} className="row-container">
                  <SingleVerticalWithCol
                    xl={16}
                    lg={16}
                    md={18}
                    sm={18}
                    label="قیمت نهایی فاکتور(ریال)"
                    value={PriceSeparator(totalPrice?.toString())}
                  />

                  <Col lg={8} md={12} sm={12} span={24}>
                    <Button type="primary" onClick={onUpdateFactorPreviewClickHandler}>
                      بروزرسانی قیمت فاکتور
                    </Button>
                  </Col>
                </Row>
              </CustomCard>

              <div className="room-assign-action-container">
                <Button
                  type="primary"
                  onClick={onClickSendReservationRequest}
                  loading={isAcceptRequestLoading}
                  disabled={!selectedRoom?.id}
                >
                  رزرو و ارسال پیام
                </Button>
                <Button onClick={onModalCancel}>انصراف</Button>
              </div>
            </Div>
          ) : (
            <CustomEmpty />
          )}
        </Modal>
      )}
    </>
  );
};

export default AssignModal;
