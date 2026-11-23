import { Key, useEffect, useState } from "react";

import { Form, Row } from "antd";
import { useNavigate } from "react-router";
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
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useDormRequestsStatusMutation,
  useGetDormPendingReviewStatusMutation,
  useLazyGetDormRequestBedListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { useGetResidenceRoomInfoMutation } from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  DormRequestResidenceInfo,
  DormRequestsStatusResponse,
  GetDormPendingReviewStatusResponse,
  GetDormRequestBedList,
  GetDormRequestBedListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import UsersRequestsDetailBedListTableModel from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingList/helper/components/RoomAllocation/helper/drawers/PendingListRoomAllocationBedAllocationDrawerContent/helper/models/UsersRequestsDetailBedListTableModel/UsersRequestsDetailBedListTableModel";
import {
  GetResidenceRoomInfoResponse,
  ResidenceRoomInfoType,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";

import UnconfirmedReservationRoomAllocationModalContent from "./helper/modals/UnconfirmedReservationRoomAllocationModalContent/UnconfirmedReservationRoomAllocationModalContent";
import "./_unconfirmedReservationRoomAllocationDrawerContent.scss";

const BED_ALLOCATION_SUCCESS_MSG = "تخت مورد نظر با موفقیت به کاربر تخصیص داده شد.";

const UnconfirmedReservationRoomAllocationDrawerContent = ({
  closeDrawerHandler,
  roomId,
  residenceInfo,
}: {
  roomId: number | undefined;
  closeDrawerHandler: () => void;
  residenceInfo: DormRequestResidenceInfo | null;
}) => {
  const [roomData, setRoomData] = useState<ResidenceRoomInfoType | null>(null);
  const [bedList, setBedList] = useState<GetDormRequestBedList[]>([]);

  const [bedAllocation, setBedAllocation] = useState({
    isOpen: false,
    id: -1,
  });
  const [selectBedId, setSelectBedId] = useState(-1);

  const { params } = useQueryParams();
  const navigate = useNavigate();

  const [allocationForm] = Form.useForm<{ description: string }>();

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

  useEffect(() => {
    if (residenceInfo?.bedId && bedList.length > 0) {
      setSelectBedId(residenceInfo.bedId);
    }
  }, [residenceInfo, bedList]);

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
    selectedRowKeys: selectBedId !== -1 ? [selectBedId] : [],
    onChange: (_: Key[], selectedRows: { id: number }[]) => {
      if (selectedRows[0]?.id) {
        setSelectBedId(selectedRows[0].id);
      }
    },
    getCheckboxProps: (record: GetDormRequestBedList) => ({
      disabled: record?.bedStateId !== 1,
    }),
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
      dormRequestsStatus({
        body: {
          variables: {
            resultReview: {
              value: "1",
            },
            descAdmin: {
              value: allocationForm?.getFieldValue("description"),
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
      navigate({
        pathname: DORM_USERS_REQUESTS_LIST_PAGE_ROUTE,
      });
    }
  };

  const dormRequestsStatusError = async () => {
    closeBedAllocation();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* BED_ALLOCATION_MODAL */}
      {bedAllocation?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={bedAllocation?.isOpen}
          closeModalHandler={closeBedAllocation}
          content={
            <UnconfirmedReservationRoomAllocationModalContent form={allocationForm} />
          }
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
        <div className="unconfirmed-reservation-room-allocation-drawer-content-container">
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

export default UnconfirmedReservationRoomAllocationDrawerContent;
