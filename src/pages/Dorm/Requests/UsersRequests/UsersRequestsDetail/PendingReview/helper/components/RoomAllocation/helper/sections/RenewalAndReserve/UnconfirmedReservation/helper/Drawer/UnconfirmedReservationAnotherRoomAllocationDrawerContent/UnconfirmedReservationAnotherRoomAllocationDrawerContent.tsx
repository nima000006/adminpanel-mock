import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import UnconfirmedReservationAnotherRoomAllocationDrawerTableModel from "./helper/Models/UnconfirmedReservationAnotherRoomAllocationDrawerTableModel/UnconfirmedReservationAnotherRoomAllocationDrawerTableModel";
import UnconfirmedReservationAnotherRoomAllocationModalContent from "./helper/Modals/UnconfirmedReservationAnotherRoomAllocationModalContent/UnconfirmedReservationAnotherRoomAllocationModalContent";

import UsersRequestsDetailBedListTableModel from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/PendingList/helper/components/RoomAllocation/helper/drawers/PendingListRoomAllocationBedAllocationDrawerContent/helper/models/UsersRequestsDetailBedListTableModel/UsersRequestsDetailBedListTableModel";

import { UnconfirmedReservationAnotherRoomAllocationDrawerContentProps } from "./@types/@unconfirmedReservationAnotherRoomAllocationDrawerContent";

import {
  GetDormResidenceBuildingListResponse,
  GetDormResidenceBuildingListTypes,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import {
  GetDormResidenceFloorListResponse,
  GetDormResidenceFloorListTypes,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";
import {
  DormRequestRoomListType,
  DormRequestsStatusResponse,
  GetDormPendingReviewStatusResponse,
  GetDormRequestBedList,
  GetDormRequestBedListResponse,
  GetDormRequestRoomListResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import { CountResponse } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useDormRequestsStatusMutation,
  useGetDormPendingReviewStatusMutation,
  useLazyGetDormRequestBedListQuery,
  useLazyGetDormRequestRoomListCountQuery,
  useLazyGetDormRequestRoomListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import "./_unconfirmedReservationAnotherRoomAllocationDrawerContent.scss";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

const BED_ALLOCATION_SUCCESS_MSG = "تخت مورد نظر با موفقیت به کاربر تخصیص داده شد.";
const SELECT_BED_ERROR_MSG = "ابتدا یک تخت انتخاب کنید.";

const UnconfirmedReservationAnotherRoomAllocationDrawerContent = ({
  closeDrawerHandler,
  dormId,
  residenceInfo,
}: UnconfirmedReservationAnotherRoomAllocationDrawerContentProps) => {
  const [roomSelectedRowKeys, setRoomSelectedRowKeys] = useState<React.Key[]>([]);
  const [bedSelectedRowKeys, setBedSelectedRowKeys] = useState<React.Key[]>([]);
  const [anotherRoomAllocation, setAnotherRoomAllocation] = useState(false);

  //ساختمان
  const [buildingData, setBuildingData] = useState<GetDormResidenceBuildingListTypes[]>(
    []
  );

  // طبقه
  const [floorData, setFloorData] = useState<GetDormResidenceFloorListTypes[]>([]);
  const [selectFloorData, setSelectFloorData] = useState({
    id: -1,
  });
  const [isFloorChanged, setIsFloorChanged] = useState(false);

  // اتاق
  const [roomList, setRoomList] = useState<DormRequestRoomListType[]>([]);
  const [roomTotalCount, setRoomTotalCount] = useState<number>(0);

  //تخت
  const [bedList, setBedList] = useState<GetDormRequestBedList[]>([]);

  const { params: url, setSearchParams } = useQueryParams();
  const navigate = useNavigate();

  const [anotherRoomAllocationForm] = Form.useForm<{ description: string }>();
  const [residenceForm] = Form.useForm<{ floor: string; building: string }>();

  //? ================================  Api Calls ================================
  const [getBuildingsOfDormitoryList, { isFetching: isGetBuildingsOfDormitoryLoading }] =
    useLazyGetDormResidenceBuildingListQuery();

  const [getFloorsOfBuildingList, { isFetching: isGetFloorsOfBuildingLoading }] =
    useLazyGetDormResidenceFloorListQuery();

  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormRequestRoomListQuery();

  const [getRoomListCount, { isFetching: isRoomListCountLoading }] =
    useLazyGetDormRequestRoomListCountQuery();

  const [getBedList, { isFetching: isBedListLoading }] =
    useLazyGetDormRequestBedListQuery();

  const [getDormPendingReviewStatus] = useGetDormPendingReviewStatusMutation();

  const [dormRequestsStatus, { isLoading: isDormStatusLoading }] =
    useDormRequestsStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (dormId) {
      getBuildingsOfDormitoryList({
        dormitoryId_IN: +dormId,
        firstResult: 0,
        maxResults: 2000,
      }) // we should set 0 and 2000 to get data
        .unwrap()
        .then(getBuildingsOfDormitoryListSuccess);
    }

    if (residenceInfo) {
      residenceForm.setFieldsValue({
        building: residenceInfo?.AssociationBed_AssociationCategoryBuliding_title,
        floor: residenceInfo?.AssociationBed_AssociationCategoryFloor_title,
      });

      if (residenceInfo?.AssociationBed_floorId) {
        setSelectFloorData({
          id: residenceInfo?.AssociationBed_floorId,
        });
      }
    }
  }, [dormId, residenceInfo]);

  useEffect(() => {
    if (selectFloorData?.id > 0) {
      if (isFloorChanged) {
        setBedList([]);
        setRoomSelectedRowKeys([]);
        setBedSelectedRowKeys([]);
      }

      getRoomListData();
    }
  }, [selectFloorData?.id, url?.page, url?.pageSize]);

  useEffect(() => {
    if (!isFloorChanged && residenceInfo?.AssociationBed_roomId && roomList.length > 0) {
      setRoomSelectedRowKeys([residenceInfo.AssociationBed_roomId]);
    }
  }, [roomList, residenceInfo]);

  useEffect(() => {
    if (roomSelectedRowKeys?.[0]) {
      getBedList(roomSelectedRowKeys[0].toString())
        .unwrap()
        .then((data) => {
          setBedList(data?.data || []);
          if (!isFloorChanged && residenceInfo?.bedId) {
            setBedSelectedRowKeys([residenceInfo.bedId]);
          }
        });
    } else {
      setBedList([]);
    }
  }, [roomSelectedRowKeys]);

  //* ================================ Util Functions ================================

  const getBuildingsOfDormitoryListSuccess = async (
    value: GetDormResidenceBuildingListResponse
  ) => {
    if (value?.status === 200) {
      setBuildingData(value?.data);
    }
  };

  const changeBuildingListHandler = (value: any) => {
    if (value) {
      residenceForm.setFieldsValue({
        floor: "",
      });

      setSelectFloorData({ id: -1 });
      setFloorData([]);
      setRoomList([]);
      setBedList([]);
      setRoomSelectedRowKeys([]);
      setBedSelectedRowKeys([]);
      setRoomTotalCount(0);
      resetUrlPage();
      getFloorsOfBuildingList(value).unwrap().then(getFloorsOfBuildingListSuccess);
    }
  };

  const getFloorsOfBuildingListSuccess = async (
    value: GetDormResidenceFloorListResponse
  ) => {
    if (value?.status === 200) {
      setFloorData(value?.data);
    }
  };
  const changeFloorListHandler = (value: any) => {
    setIsFloorChanged(true);
    setSelectFloorData({
      id: value,
    });
    resetUrlPage();
  };

  const getRoomListData = () => {
    if (selectFloorData?.id > 0) {
      getRoomList({
        firstResult: url?.page ? Number((+url.page - 1) * +url.pageSize) : 0,
        maxResults: url?.pageSize ? Number(url?.pageSize) : 8,
        floorId: +selectFloorData?.id,
        tariffId: +url?.tariffId,
      })
        .unwrap()
        .then(getRoomListSuccess);

      getRoomListCount({
        floorId: +selectFloorData?.id,
        tariffId: +url?.tariffId,
      })
        .unwrap()
        .then(getRoomListCountSuccess);
    } else {
      setRoomList([]);
      setBedList([]);
      setRoomTotalCount(0);
    }
  };

  const getRoomListSuccess = async (value: GetDormRequestRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };
  const getRoomListCountSuccess = async (value: CountResponse) => {
    if (value?.status === 200) {
      setRoomTotalCount(value?.data);
    }
  };

  const getBedListSuccess = async (value: GetDormRequestBedListResponse) => {
    if (value?.status === 200) {
      setBedList(value?.data);
    }
  };

  const resetUrlPage = () => {
    if (url?.page) {
      delete url.page;
    }
    if (url?.pageSize) {
      delete url.pageSize;
    }
    setSearchParams({
      ...url,
    });
  };

  const roomRowSelection = {
    selectedRowKeys: roomSelectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setRoomSelectedRowKeys(selectedRowKeys);

      if (selectedRowKeys.length > 0) {
        setBedList([]);
        getBedList(selectedRowKeys[0]?.toString()).unwrap().then(getBedListSuccess);
      }
    },

    getCheckboxProps: (record: DormRequestRoomListType) => ({
      disabled: record?.freebed === 0,
    }),
  };

  const bedRowSelection = {
    selectedRowKeys: bedSelectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setBedSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: GetDormRequestBedList) => ({
      disabled: record?.bedStateId !== 1,
    }),
  };

  const bedAllocationHandler = () => {
    anotherRoomAllocationForm.submit();
    if (url?.id) {
      getDormPendingReviewStatus({
        processVariables: [{ name: "id", operator: "eq", value: +url?.id }],
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
      const bedId = bedSelectedRowKeys?.[0];

      dormRequestsStatus({
        body: {
          variables: {
            resultReview: {
              value: "1",
            },
            descAdmin: {
              value: anotherRoomAllocationForm?.getFieldValue("description"),
            },
            bedId: {
              value: bedId?.toString(),
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
      closeAnotherRoomAllocationHandler();
      toast.success(BED_ALLOCATION_SUCCESS_MSG, { toastId: BED_ALLOCATION_SUCCESS_MSG });
      navigate({
        pathname: DORM_USERS_REQUESTS_LIST_PAGE_ROUTE,
      });
    }
  };

  const dormRequestsStatusError = async () => {
    closeAnotherRoomAllocationHandler();
  };

  const openAnotherRoomAllocationHandler = () => {
    const bedId = bedSelectedRowKeys?.[0];
    if (bedId) {
      setAnotherRoomAllocation(true);
    } else {
      toast.error(SELECT_BED_ERROR_MSG, { toastId: SELECT_BED_ERROR_MSG });
    }
  };
  const closeAnotherRoomAllocationHandler = () => {
    setAnotherRoomAllocation(false);
    anotherRoomAllocationForm.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* ALLOCATION_ROOM_Modal */}
      {anotherRoomAllocation && (
        <ConfirmationModalWithContent
          isModalOpen={anotherRoomAllocation}
          closeModalHandler={closeAnotherRoomAllocationHandler}
          content={
            <UnconfirmedReservationAnotherRoomAllocationModalContent
              form={anotherRoomAllocationForm}
            />
          }
          onConfirmClickHandler={bedAllocationHandler}
          confirmBtnText="تخصیص تخت"
          backBtnText="انصراف"
          title="تخصیص تخت"
          isConfirmButtonLoading={isDormStatusLoading}
        />
      )}

      <div className="unconfirmed-reservation-another-room-allocation-drawer-content-container">
        <CustomDrawerHeader
          title="تخصیص یک اتاق دیگر"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="action-btn-container">
              <CustomButton type="primary" onClick={openAnotherRoomAllocationHandler}>
                تخصیص تخت
              </CustomButton>
            </div>
          }
        />

        <div className="drawer-body">
          <Form form={residenceForm}>
            <CustomDivider text="مشخصات سکونت فعلی" />
            <Row
              gutter={[16, 16]}
              className="another-room-allocation-drawer-content-info-address"
            >
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                label=" ساختمان"
                value={residenceInfo?.AssociationBed_AssociationCategoryBuliding_title}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                label=" طبقه"
                value={residenceInfo?.AssociationBed_AssociationCategoryFloor_title}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                label=" اتاق"
                value={residenceInfo?.AssociationBed_AssociationCategorRoom_title}
              />
              <SingleVerticalWithCol
                xl={12}
                lg={12}
                label="تخت"
                value={residenceInfo?.AssociationBed_title}
              />
            </Row>
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect
                  label="ساختمان"
                  name="building"
                  form={residenceForm}
                  isLoading={isGetBuildingsOfDormitoryLoading}
                  onChange={changeBuildingListHandler}
                  options={buildingData}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect
                  label="طبقه"
                  name="floor"
                  form={residenceForm}
                  onChange={changeFloorListHandler}
                  isLoading={isGetFloorsOfBuildingLoading}
                  options={floorData}
                  rules={[REQUIRED_RULE]}
                />
              </Col>
            </Row>
          </Form>

          <CustomDivider text="لیست اتاق‌ها" />
          <CustomTable
            dataSource={roomList}
            columns={UnconfirmedReservationAnotherRoomAllocationDrawerTableModel()}
            loading={isRoomListLoading || isRoomListCountLoading}
            pagination={manualPaginationConfig({
              total: roomTotalCount,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url?.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
            })}
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(roomList?.length)}
            rowKey="id"
            className="floors-tab-table-model-container"
            rowSelection={{
              type: "radio",
              ...roomRowSelection,
            }}
            rowClassName={(record) => (record?.freebed === 0 ? "disabled-row" : "")} // پر شده
          />
          <div>
            <CustomDivider text="لیست تخت‌ها" />
            <CustomTable
              dataSource={bedList}
              columns={UsersRequestsDetailBedListTableModel()}
              pagination={paginationConfig}
              rowKey="id"
              rowSelection={{
                type: "radio",
                ...bedRowSelection,
              }}
              rowClassName={(record) => (record?.bedStateId !== 1 ? "disabled-row" : "")} // پر شده
              loading={isBedListLoading}
              className="users-requests-detail-bed-list-table-model-container"
              {...TABLE_PROPS(bedList?.length)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnconfirmedReservationAnotherRoomAllocationDrawerContent;
