import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useDormRequestsStatusMutation,
  useGetDormPendingReviewStatusMutation,
  useLazyGetDormRequestBedListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { useGetResidenceRoomInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  DormRequestsStatusResponse,
  GetDormPendingReviewStatusResponse,
  GetDormRequestBedList,
  GetDormRequestBedListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import {
  GetResidenceRoomInfoResponse,
  ResidenceRoomInfoType,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";

import { PendingListRoomAllocationBedAllocationDrawerContentProps } from "./@types/@pendingListRoomAllocationBedAllocationDrawerContent";
import PendingListConfirmBedAllocationModalContent from "./helper/modals/PendingListConfirmBedAllocationModalContent/PendingListConfirmBedAllocationModalContent";
import UsersRequestsDetailBedListTableModel from "./helper/models/UsersRequestsDetailBedListTableModel/UsersRequestsDetailBedListTableModel";
import "./_pendingListRoomAllocationBedAllocationDrawerContent.scss";

const BED_ALLOCATION_SUCCESS_MSG = "تخت مورد نظر با موفقیت به کاربر تخصیص داده شد.";
const SELECT_BED_ERROR_MSG = "ابتدا یک تخت انتخاب کنید.";

const PendingListRoomAllocationBedAllocationDrawerContent = ({
  closeDrawerHandler,
  roomId,
}: PendingListRoomAllocationBedAllocationDrawerContentProps) => {
  const [roomData, setRoomData] = useState<ResidenceRoomInfoType | null>(null);
  const [bedList, setBedList] = useState<GetDormRequestBedList[]>([]);
  const [bedAllocation, setBedAllocation] = useState(false);
  const [bedSelectedRowKeys, setBedSelectedRowKeys] = useState<React.Key[]>([]);

  const { params } = useQueryParams();

  const [allocationForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getRoomInfo, { isLoading: isRoomDataLoading }] =
    useGetResidenceRoomInfoMutation();

  const [getBedList, { isFetching: isBedListLoading }] =
    useLazyGetDormRequestBedListQuery();

  const [getDormPendingReviewStatus] = useGetDormPendingReviewStatusMutation();

  const [dormRequestsStatus, { isLoading: isDormStatusLoading }] =
    useDormRequestsStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (roomId) {
      getRoomInfo({
        body: {
          _data_: {
            id: roomId?.toString(),
          },
        },
        params: {
          relation: "e137dbff61d049dea81ef1bc30047c1b", // we should set this to get data
        },
      })
        .unwrap()
        .then(getRoomInfoSuccess);

      getBedList(roomId?.toString()).unwrap().then(getBedListSuccess);
    }
  }, [roomId]);

  //* ================================ Util Functions ================================
  const getRoomInfoSuccess = async (value: GetResidenceRoomInfoResponse) => {
    if (value?.status === 200) {
      setRoomData(value?.data);
    }
  };

  const getBedListSuccess = async (value: GetDormRequestBedListResponse) => {
    if (value?.status === 200) {
      setBedList(value?.data);
    }
  };

  const rowSelection = {
    bedSelectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setBedSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: GetDormRequestBedList) => ({
      disabled: record?.bedStateId !== 1,
    }),
  };

  const openBedAllocation = () => {
    if (bedSelectedRowKeys?.[0]) {
      setBedAllocation(true);
    } else {
      toast.error(SELECT_BED_ERROR_MSG, { toastId: SELECT_BED_ERROR_MSG });
    }
  };
  const closeBedAllocation = () => {
    setBedAllocation(false);
    allocationForm.resetFields();
  };

  const bedAllocationHandler = () => {
    allocationForm.submit();
    if (params?.id) {
      getDormPendingReviewStatus({
        processVariables: [{ name: "id", operator: "eq", value: +params?.id }],
        taskVariables: [],
        firstResult: 0,
        maxResults: 15,
        sorting: [{ sortBy: "created", sortOrder: "desc" }],
        active: true,
        readStatus: true,
      })
        .unwrap()
        .then(getDormPendingReviewStatusSuccess);
    }
  };

  const getDormPendingReviewStatusSuccess = async (
    value: GetDormPendingReviewStatusResponse
  ) => {
    if (value?.status === 200) {
      const formData = allocationForm.getFieldsValue();
      const bedId = bedSelectedRowKeys?.[0];

      dormRequestsStatus({
        body: {
          variables: {
            resultReview: {
              value: "1",
            },
            descAdmin: {
              value: formData?.description,
            },
            bedId: {
              value: bedId?.toString(),
            },
            paymentMethod: {
              value: formData?.paymentMethod,
            },
          },
        },
        statusCode: value?.data?.[0]?.id,
      })
        .unwrap()
        .then(dormRequestsStatusSuccess)
        .catch(dormRequestsStatusError);
    }
  };

  const dormRequestsStatusSuccess = async (value: DormRequestsStatusResponse) => {
    if (value?.status === 204) {
      closeBedAllocation();
      toast.success(BED_ALLOCATION_SUCCESS_MSG, { toastId: BED_ALLOCATION_SUCCESS_MSG });
      closeDrawerHandler();
    }
  };

  const dormRequestsStatusError = async () => {
    closeBedAllocation();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* BED ALLOCATION MODAL */}
      {bedAllocation && (
        <ConfirmationModalWithContent
          isModalOpen={bedAllocation}
          closeModalHandler={closeBedAllocation}
          content={<PendingListConfirmBedAllocationModalContent form={allocationForm} />}
          onConfirmClickHandler={bedAllocationHandler}
          confirmBtnText="تخصیص تخت"
          backBtnText="انصراف"
          title="تخصیص تخت"
          isConfirmButtonLoading={isDormStatusLoading}
        />
      )}

      <Div loading={isRoomDataLoading}>
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
              value={
                roomData?.AssociationFloor?.AssociationBuilding
                  ?.AssociationCategoryDormitory?.title
              }
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام ساختمان"
              value={roomData?.AssociationFloor?.AssociationBuilding?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام طبقه"
              value={roomData?.AssociationFloor?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام اتاق"
              value={roomData?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="درجه کیفی"
              value={roomData?.AssociationQuality?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="جنسیت"
              value={
                roomData?.AssociationFloor?.AssociationBuilding?.AssociationGender?.title
              }
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="مساحت (متر مربع)"
              value={roomData?.area?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تعداد استاندارد تخت در اتاق"
              value={roomData?.numberStandardBedInRoom?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شناسه اتاق"
              value={roomData?.id?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع اتاق"
              value={roomData?.AssociationRoomType?.title}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="اتاق والد"
              value={roomData?.AssociationRoom?.title}
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات اتاق"
              value={roomData?.description}
            />
          </Row>
          <div>
            <CustomDivider text="لیست تخت‌ها" />
            <CustomTable
              dataSource={bedList}
              columns={UsersRequestsDetailBedListTableModel()}
              pagination={paginationConfig}
              rowKey="id"
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              rowClassName={(record) => (record?.bedStateId !== 1 ? "disabled-row" : "")} // پر شده
              loading={isBedListLoading}
              className="users-requests-detail-bed-list-table-model-container"
              {...TABLE_PROPS(bedList?.length)}
            />
          </div>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان ثبت"
              value={dateTimeCombiner(roomData?.createDate, roomData?.createTime)}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="زمان آخرین ویرایش"
              value={dateTimeCombiner(roomData?.updateDate, roomData?.updateTime)}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="آخرین ویرایش‌کننده"
              value={`${roomData?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${roomData?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
            />
          </Row>
        </div>
      </Div>
    </>
  );
};

export default PendingListRoomAllocationBedAllocationDrawerContent;
