import React, { useState } from "react";

import { Col, Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import UsersRequestsDetailBedListTableModel from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingList/helper/components/RoomAllocation/helper/drawers/PendingListRoomAllocationBedAllocationDrawerContent/helper/models/UsersRequestsDetailBedListTableModel/UsersRequestsDetailBedListTableModel";

import { PendingReviewRelocationToAnotherRoomDrawerContentProps } from "./@types/@pendingReviewRelocationToAnotherRoomDrawerContent";
import RelocationAnotherRoomAllocationModalContent from "./helper/modals/RelocationAnotherRoomAllocationModalContent/RelocationAnotherRoomAllocationModalContent";
import UnconfirmedReservationAnotherRoomAllocationDrawerTableModel from "../../../../RenewalAndReserve/UnconfirmedReservation/helper/Drawer/UnconfirmedReservationAnotherRoomAllocationDrawerContent/helper/Models/UnconfirmedReservationAnotherRoomAllocationDrawerTableModel/UnconfirmedReservationAnotherRoomAllocationDrawerTableModel";

const PendingReviewRelocationToAnotherRoomDrawerContent = ({
  closeDrawerHandler,
}: PendingReviewRelocationToAnotherRoomDrawerContentProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [anotherRoomAllocation, setAnotherRoomAllocation] = useState(false);
  const [anotherRoomAllocationForm] = Form.useForm();
  const [selectForm] = Form.useForm();

  //* ================================ Util Functions ================================
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const openAnotherRoomAllocationHandler = () => setAnotherRoomAllocation(true);
  const closeAnotherRoomAllocationHandler = () => setAnotherRoomAllocation(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* ALLOCATION_ROOM_Modal */}
      {anotherRoomAllocation && (
        <ConfirmationModalWithContent
          isModalOpen={anotherRoomAllocation}
          closeModalHandler={closeAnotherRoomAllocationHandler}
          content={
            <RelocationAnotherRoomAllocationModalContent
              form={anotherRoomAllocationForm}
            />
          }
          onConfirmClickHandler={() => {}}
          confirmBtnText="تخصیص تخت"
          backBtnText="انصراف"
          title="تخصیص تخت"
          // isConfirmButtonLoading={}
        />
      )}

      <div className="unconfirmed-reservation-another-room-allocation-drawer-content-container">
        <CustomDrawerHeader
          title="جابجایی به یک اتاق دیگر"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="action-btn-container">
              <CustomButton type="primary" onClick={openAnotherRoomAllocationHandler}>
                تخصیص تخت
              </CustomButton>
            </div>
          }
        />

        <CustomDivider text="مشخصات سکونت فعلی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label=" ساختمان"
            value={"data?.buildingName"}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label=" طبقه"
            value={"data?.floorName"}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            label="نام اتاق"
            value={"data?.roomName"}
          />
          <SingleVerticalWithCol xl={12} lg={12} label="تخت" value={"data?.bed"} />
        </Row>
        <div className="drawer-body">
          <Form form={selectForm}>
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect
                  label="ساختمان"
                  name="building"
                  form={selectForm}
                  options={[]}
                />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect label="طبقه" name="floor" form={selectForm} options={[]} />
              </Col>
            </Row>
          </Form>

          <CustomDivider text="لیست اتاق‌ها" />
          <CustomTable
            dataSource={[]}
            columns={UnconfirmedReservationAnotherRoomAllocationDrawerTableModel()}
            pagination={paginationConfig}
            {...TABLE_PROPS(0)}
            rowKey="id"
            className="floors-tab-table-model-container"
            rowSelection={{
              type: "radio",
              ...rowSelection,
            }}
            // todo[Atefeh]: uncomment when api got ready
            // rowClassName={(record) =>
            //   record?.capacityToReserve === 0 ? "disabled-row" : ""
            // }
          />
          <div>
            <CustomDivider text="لیست تخت‌ها" />
            <CustomTable
              dataSource={[]}
              columns={UsersRequestsDetailBedListTableModel()}
              pagination={paginationConfig}
              rowKey="id"
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              // todo[Atefeh]: uncomment when api got ready
              // rowClassName={(record) => (record?.status !== 1 ? "disabled-row" : "")} // پر شده و در انتظار
              //   loading={isRestaurantFoodScheduleListLoading}
              className="users-requests-detail-bed-list-table-model-container"
              {...TABLE_PROPS(0)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingReviewRelocationToAnotherRoomDrawerContent;
