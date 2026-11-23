import { Key, useState } from "react";

import { Form, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { getGenderLabel } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/utils/UsersRequestsDetail";
import UsersRequestsDetailBedListTableModel from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingList/helper/components/RoomAllocation/helper/drawers/PendingListRoomAllocationBedAllocationDrawerContent/helper/models/UsersRequestsDetailBedListTableModel/UsersRequestsDetailBedListTableModel";

import RelocationBedAllocationModalContent from "./helper/modals/RelocationBedAllocationModalContent/RelocationBedAllocationModalContent";

const data = {
  residenceName: "خوابگاه شهید چمران",
  buildingName: "ساختمان شماره یک",
  floorName: "طبقه اول",
  roomName: "اتاق 314",
  quality: "درجه یک",
  gender: 1,
  area: 50,
  bedsCountInRoom: "4",
  roomId: 45645454,
  roomType: "مستقل",
  parentRoom: "",
  description: "خوابگاه شهید چمران متعلق به دانشگاه آزاد اسلامی واحد تهران شمال می‌باشد.",
  registerDate: "2024-09-11T08:00:41.977Z",
  lastModifiedDate: "2024-09-11T08:00:41.977Z",
  lastModifier: "مهندس سیانکی",
  id: 2,
};

const PendingReviewRelocationDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  const [bedAllocation, setBedAllocation] = useState({
    isOpen: false,
    id: -1,
  });
  const [selectBedId, setSelectBedId] = useState(-1);

  const [allocationForm] = Form.useForm();

  //* ================================ Util Functions ================================
  const rowSelection = {
    onChange: (_: Key[], selectedRows: { id: number }[]) => {
      if (selectedRows[0]?.id) {
        setSelectBedId(selectedRows[0].id);
      }
    },
  };

  const openBedAllocation = () => {
    setBedAllocation({
      isOpen: true,
      id: selectBedId,
    });
  };
  const closeBedAllocation = () => {
    setBedAllocation({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* BED ALLOCATION MODAL */}
      {bedAllocation?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={bedAllocation?.isOpen}
          closeModalHandler={closeBedAllocation}
          content={<RelocationBedAllocationModalContent form={allocationForm} />}
          onConfirmClickHandler={() => {}}
          confirmBtnText="تخصیص تخت"
          backBtnText="انصراف"
          title="تخصیص تخت"
          // isConfirmButtonLoading={}
        />
      )}

      <div>
        <CustomDrawerHeader
          title="تخصیص تخت"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <CustomButton type="primary" onClick={openBedAllocation}>
              تخصیص تخت
            </CustomButton>
          }
        />
        <div className="pending-list-room-allocation-bed-allocation-drawer-content-container">
          <CustomDivider text="اتاق" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام اقامتگاه"
              value={data?.residenceName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام ساختمان"
              value={data?.buildingName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام طبقه"
              value={data?.floorName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام اتاق"
              value={data?.roomName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="درجه کیفی"
              value={data?.quality}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="جنسیت"
              value={getGenderLabel(data?.gender)}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="مساحت (متر مربع)"
              value={data?.area?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تعداد استاندارد تخت در اتاق"
              value={data?.bedsCountInRoom?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شناسه اتاق"
              value={data?.roomId?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع اتاق"
              value={data?.roomType}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="اتاق والد"
              value={data?.parentRoom}
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات اتاق"
              value={data?.description}
            />
          </Row>
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
              // rowClassName={(record) => (record?.status !== 1 ? "disabled-row" : "")} // پر شده و در انتظار
              //   loading={isRestaurantFoodScheduleListLoading}
              className="users-requests-detail-bed-list-table-model-container"
              {...TABLE_PROPS(0)}
            />
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان ثبت"
              value={data?.registerDate}
              isDate
              customDateFormat="YYYY/MM/HH , HH:mm"
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان آخرین ویرایش"
              value={data?.lastModifiedDate}
              isDate
              customDateFormat="YYYY/MM/HH , HH:mm"
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="آخرین ویرایش‌کننده"
              value={data?.lastModifier}
            />
          </Row>
        </div>
      </div>
    </>
  );
};

export default PendingReviewRelocationDrawerContent;
