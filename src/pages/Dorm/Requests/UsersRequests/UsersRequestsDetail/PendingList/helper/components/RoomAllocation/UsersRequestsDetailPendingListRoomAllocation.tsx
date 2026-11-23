import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_USERS_REQUESTS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  useDormRequestsStatusMutation,
  useGetDormPendingReviewStatusMutation,
  useLazyGetDormRequestRoomListCountQuery,
  useLazyGetDormRequestRoomListQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  useLazyGetDormResidenceBuildingListQuery,
  useLazyGetDormResidenceFloorListQuery,
} from "@infra/states/redux/Apis/dorm/residence/dormResidenceApi";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  GetDormResidenceBuildingListResponse,
  GetDormResidenceBuildingListTypes,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataBuilding/@types/@residenceCardsDataBuilding";
import {
  GetDormResidenceFloorListResponse,
  GetDormResidenceFloorListTypes,
} from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/ResidenceCardsData/sections/ResidenceCardsDataFloor/@types/@residenceCardsDataFloor";

import PendingListRoomAllocationBedAllocationDrawerContent from "./helper/drawers/PendingListRoomAllocationBedAllocationDrawerContent/PendingListRoomAllocationBedAllocationDrawerContent";
import PendingListRoomAllocationViewDetailDrawerContent from "./helper/drawers/PendingListRoomAllocationViewDetailDrawerContent/PendingListRoomAllocationViewDetailDrawerContent";
import PendingListRoomAllocationRejectModalContent from "./helper/modals/PendingListRoomAllocationRejectModalContent/PendingListRoomAllocationRejectModalContent";
import PendingListRoomAllocationTableModel from "./helper/models/PendingListRoomAllocationTableModel/PendingListRoomAllocationTableModel";
import {
  DormRequestRoomListType,
  DormRequestsStatusResponse,
  GetDormPendingReviewStatusResponse,
  GetDormRequestRoomListResponse,
} from "../../../../@types/@usersRequestsDetail";
import "./_usersRequestsDetailPendingListRoomAllocation.scss";

const REJECT_SUCCESS_MSG = "درخواست مورد نظر رد شد.";

const UsersRequestsDetailPendingListRoomAllocation = () => {
  //تخصیص اتاق جزئیات صفحه در انتظار بررسی
  const [viewDetailDrawer, setViewDetailDrawer] = useState({
    isOpen: false,
    id: -1,
  });
  const [bedAllocation, setBedAllocation] = useState({
    isOpen: false,
    id: -1,
  });
  const [rejectRequest, setRejectRequest] = useState(false);

  //ساختمان
  const [buildingData, setBuildingData] = useState<GetDormResidenceBuildingListTypes[]>(
    []
  );
  const [selectBuildingData, setSelectBuildingData] = useState({
    title: "",
    genderTitle: "",
    statusTitle: "",
    statusId: -1,
  });

  // طبقه
  const [floorData, setFloorData] = useState<GetDormResidenceFloorListTypes[]>([]);
  const [selectFloorData, setSelectFloorData] = useState({
    title: "",
    genderTitle: "",
    statusTitle: "",
    statusId: -1,
    id: -1,
  });

  // اتاق
  const [roomList, setRoomList] = useState<DormRequestRoomListType[]>([]);

  const { params: url, setSearchParams } = useQueryParams();

  const navigate = useNavigate();

  const [residenceForm] = Form.useForm();
  const [rejectForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getBuildingsOfDormitoryList, { isFetching: isGetBuildingsOfDormitoryLoading }] =
    useLazyGetDormResidenceBuildingListQuery();

  const [getFloorsOfBuildingList, { isFetching: isGetFloorsOfBuildingLoading }] =
    useLazyGetDormResidenceFloorListQuery();

  const [getRoomList, { isFetching: isRoomListLoading }] =
    useLazyGetDormRequestRoomListQuery();

  const [getRoomListCount, { data: roomTotalCount, isFetching: isRoomListCountLoading }] =
    useLazyGetDormRequestRoomListCountQuery();

  const [getDormPendingReviewStatus] = useGetDormPendingReviewStatusMutation();

  const [dormRequestsStatus, { isLoading: isDormStatusLoading }] =
    useDormRequestsStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.dormId) {
      getBuildingsOfDormitoryList({
        dormitoryId_IN: +url?.dormId,
        firstResult: 0,
        maxResults: 2000,
      }) // we should set 0 and 2000 to get data
        .unwrap()
        .then(getBuildingsOfDormitoryListSuccess);
    }
  }, [url?.dormId]);

  useEffect(() => {
    getRoomListData();
  }, [url?.page, url?.pageSize, selectFloorData?.id]);

  //* ================================ Util Functions ================================
  const getBuildingsOfDormitoryListSuccess = (
    value: GetDormResidenceBuildingListResponse
  ) => {
    if (value?.status === 200) {
      setBuildingData(value?.data);
    }
  };

  const changeBuildingListHandler = (value: any) => {
    if (value) {
      getFloorsOfBuildingList(value).unwrap().then(getFloorsOfBuildingListSuccess);

      const buildingData = residenceForm?.getFieldsValue()?.building?.item;

      setSelectBuildingData({
        title: buildingData?.title,
        genderTitle: buildingData?.AssociationGender_title,
        statusTitle: buildingData?.AssociationActiveStatus_title,
        statusId: buildingData?.recordStatus,
      });
    }
  };

  const getFloorsOfBuildingListSuccess = async (
    value: GetDormResidenceFloorListResponse
  ) => {
    if (value?.status === 200) {
      setFloorData(value?.data);
    }
  };
  const changeFloorListHandler = () => {
    const floorData = residenceForm?.getFieldsValue()?.floor?.item;

    setSelectFloorData({
      title: floorData?.title,
      genderTitle: floorData?.AssociationGender_title,
      statusTitle: floorData?.AssociationActiveStatus_title,
      statusId: floorData?.recordStatus,
      id: floorData?.id,
    });
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
      });
    }
  };

  const getRoomListSuccess = (value: GetDormRequestRoomListResponse) => {
    if (value?.status === 200) {
      setRoomList(value?.data);
    }
  };

  const openBedAllocationHandler = (id: number) => {
    setBedAllocation({
      isOpen: true,
      id,
    });
  };
  const closeBedAllocationHandler = () =>
    setBedAllocation({
      isOpen: false,
      id: -1,
    });

  const openViewDetailHandler = (id: number) => {
    setViewDetailDrawer({
      isOpen: true,
      id,
    });
  };
  const closeViewDetailHandler = () =>
    setViewDetailDrawer({
      isOpen: false,
      id: -1,
    });

  const openRejectRequestHandler = () => setRejectRequest(true);
  const closeRejectRequestHandler = () => {
    setRejectRequest(false);
    rejectForm.resetFields();
  };

  const rejectRequestHandler = () => {
    rejectForm.submit();
    rejectForm.validateFields().then((value) => {
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
          .then((res) => getDormPendingReviewStatusSuccess(res, value?.description));
      }
    });
  };

  const getDormPendingReviewStatusSuccess = async (
    res: GetDormPendingReviewStatusResponse,
    desc: string
  ) => {
    if (res?.status === 200) {
      dormRequestsStatus({
        body: {
          variables: {
            resultReview: {
              value: "3",
            },
            descAdmin: {
              value: desc,
            },
          },
        },
        statusCode: res?.data?.[0]?.id,
      })
        .unwrap()
        .then(dormRequestsStatusSuccess);
    }
  };

  const dormRequestsStatusSuccess = async (value: DormRequestsStatusResponse) => {
    if (value?.status === 204) {
      closeRejectRequestHandler();
      toast.success(REJECT_SUCCESS_MSG, { toastId: REJECT_SUCCESS_MSG });
      navigate({
        pathname: DORM_USERS_REQUESTS_LIST_PAGE_ROUTE,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* BED ALLOCATION DRAWER */}
      {bedAllocation?.isOpen && (
        <CustomDrawer
          onClose={closeBedAllocationHandler}
          open={bedAllocation?.isOpen}
          content={
            <PendingListRoomAllocationBedAllocationDrawerContent
              closeDrawerHandler={closeBedAllocationHandler}
              roomId={bedAllocation?.id}
            />
          }
        />
      )}

      {/* REJECT MODAL */}
      {rejectRequest && (
        <ConfirmationModalWithContent
          isModalOpen={rejectRequest}
          closeModalHandler={closeRejectRequestHandler}
          content={<PendingListRoomAllocationRejectModalContent form={rejectForm} />}
          onConfirmClickHandler={rejectRequestHandler}
          confirmBtnText="رد درخواست"
          backBtnText="انصراف"
          isDangerous
          title="رد درخواست"
          isConfirmButtonLoading={isDormStatusLoading}
        />
      )}

      {/* VIEW DETAIL DRAWER */}
      {viewDetailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeViewDetailHandler}
          open={viewDetailDrawer?.isOpen}
          content={
            <PendingListRoomAllocationViewDetailDrawerContent
              closeDrawerHandler={closeViewDetailHandler}
              id={viewDetailDrawer?.id}
            />
          }
        />
      )}

      <div className="users-requests-detail-pending-list-room-allocation-container">
        <Form form={residenceForm}>
          <CustomDivider text="مشخصات اقامتگاه" />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row>
                <SingleVerticalWithCol label="نام اقامتگاه" value={url?.residenceTitle} />
              </Row>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                label="ساختمان"
                name="building"
                form={residenceForm}
                isLoading={isGetBuildingsOfDormitoryLoading}
                onChange={changeBuildingListHandler}
                options={buildingData}
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
              />
            </Col>
          </Row>
        </Form>
        <div>
          <CustomDivider
            text="ساختمان"
            extraContent={
              <CustomTag color={dormVisibilityStatusColor[selectBuildingData?.statusId]}>
                {selectBuildingData?.statusTitle}
              </CustomTag>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="نام ساختمان"
              value={selectBuildingData?.title}
            />
            <SingleVerticalWithCol
              label="جنسیت"
              value={selectBuildingData?.genderTitle}
            />
          </Row>

          <CustomDivider
            text="طبقه"
            extraContent={
              <CustomTag color={dormVisibilityStatusColor[selectFloorData?.statusId]}>
                {selectFloorData?.statusTitle}
              </CustomTag>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="نام طبقه" value={selectFloorData?.title} />
            <SingleVerticalWithCol label="جنسیت" value={selectFloorData?.genderTitle} />
          </Row>
          <CustomDivider text="لیست اتاق‌ها" />
          <CustomTable
            dataSource={roomList}
            columns={PendingListRoomAllocationTableModel({
              openBedAllocationHandler,
              openViewDetailHandler,
            })}
            loading={isRoomListLoading || isRoomListCountLoading}
            pagination={manualPaginationConfig({
              total: roomTotalCount?.data,
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
            rowKey="id"
            // //todo[Atefeh]: uncomment
            // rowClassName={(record) =>
            //   record?.bookableCapacity === 0 ? "disabled-row" : ""
            // }
            className="pending-list-table-model-container"
            key={`table-${url?.pageSize || "8"} `}
            {...TABLE_PROPS(roomList?.length)}
          />
        </div>
        <div>
          <CustomButton danger onClick={openRejectRequestHandler}>
            رد درخواست
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default UsersRequestsDetailPendingListRoomAllocation;
