import { Key, useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetBuildingsOfDormitoryQuery,
  useLazyGetFloorsOfBuildingQuery,
} from "@infra/states/redux/Apis/dorm/base/dormBaseApi";
import {
  useAdminSubmitDisplacementMutation,
  useLazyGetBedListQuery,
  useLazyGetRoomListCountQuery,
  useLazyGetRoomListQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import { SELECT_BED_REQUIRED_ERROR_MSG } from "@pages/Dorm/Habitants/HabitantsDetail/helper/utils/HabitantDetailUtils";
import {
  BuildingsOfDormitoryType,
  FloorsOfBuildingType,
  GetBuildingsOfDormitoryResponse,
  GetFloorsOfBuildingResponse,
} from "@pages/Dorm/Planning/Admission/AdmissionModify/@types/@admissionModify";

import {
  AdminSubmitDisplacementResponse,
  BedListData,
  GetBedListResponse,
  GetRoomListResponse,
  RoomListData,
} from "./@type/@displacementDrawerContent";
import RelocationAnotherRoomAllocationBedModalContent from "./modals/RelocationAnotherRoomAllocationBedModalContent/RelocationAnotherRoomAllocationBedModalContent";
import BedListTableModel from "./models/BedListTableModel/BedListTableModel";
import RoomListTableModel from "./models/RoomListTableModel/RoomListTableModel";
import { DisplacementDrawerPropsType } from "../../../@types/@secondTabRoomInfo";

const successMovingMsg = "کاربر با موفقیت به تخت جدید از اتاق جدید منتقل شد.";

const DisplacementDrawerContent = ({
  closeDrawerHandler,
  dormId,
  setNewRoomIdHandler,
}: DisplacementDrawerPropsType) => {
  //ساختمان
  const [buildingData, setBuildingData] = useState<BuildingsOfDormitoryType[]>([]);

  // طبقه
  const [floorData, setFloorData] = useState<FloorsOfBuildingType[]>([]);
  const [selectFloorData, setSelectFloorData] = useState({
    id: -1,
  });
  const [floorPageInfo, setFloorPageInfo] = useState({ page: 1, pageSize: 8 });

  //اتاق
  const [roomSelectedRowKeys, setRoomSelectedRowKeys] = useState<React.Key[]>([]);
  const [roomListData, setRoomListData] = useState<RoomListData[]>([]);

  // تخت
  const [bedSelectedRowKeys, setBedSelectedRowKeys] = useState<React.Key[]>([]);
  const [bedListData, setBedListData] = useState<BedListData[]>([]);

  const [anotherRoomAllocation, setAnotherRoomAllocation] = useState(false);

  const [anotherRoomAllocationForm] = Form.useForm();
  const [selectForm] = Form.useForm();

  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  // get building
  const [getBuildingsOfDormitoryList, { isFetching: buildingsOfDormitoryIsLoading }] =
    useLazyGetBuildingsOfDormitoryQuery();

  // get floor
  const [getFloorsOfBuilding, { isFetching: floorsOfBuildingIsLoading }] =
    useLazyGetFloorsOfBuildingQuery();

  // get room list
  const [getRoomList, { isFetching: isGetRoomListLoading }] = useLazyGetRoomListQuery();

  const [
    getRoomListCount,
    { data: roomListCountData, isFetching: isGetRoomListCountLoading },
  ] = useLazyGetRoomListCountQuery();

  // get bed list
  const [getBedList, { isFetching: isGetBedListLoading }] = useLazyGetBedListQuery();

  //send modal data
  const [sendAdminSubmitDisplacement, { isLoading: SendAdminSubmitDisplacementLoading }] =
    useAdminSubmitDisplacementMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (dormId) {
      getBuildingsOfDormitoryList({
        maxResults: 2000,
        firstResult: 0,
        dormitoryId_EQ: dormId,
      })
        .unwrap()
        .then(getBuildingsOfDormitoryListSuccess);
    }
  }, [dormId]);

  useEffect(() => {
    if (selectFloorData?.id > 0) {
      roomList();
    }
  }, [floorPageInfo?.page, floorPageInfo?.pageSize]);

  useEffect(() => {
    if (selectFloorData?.id > 0) {
      roomList();
      roomListCount();

      setBedListData([]);
    }
  }, [selectFloorData?.id]);

  //* ================================ Util Functions ================================
  const getBuildingsOfDormitoryListSuccess = async (
    value: GetBuildingsOfDormitoryResponse
  ) => {
    if (value?.status === 200) {
      setBuildingData(value?.data);
    }
  };

  // onchange building
  const selectedBuildingHandler = (id: string) => {
    setSelectFloorData({ id: -1 });
    setFloorData([]);
    setRoomListData([]);
    setBedListData([]);
    setRoomSelectedRowKeys([]);
    setBedSelectedRowKeys([]);

    selectForm.setFieldsValue({ floor: undefined });

    if (id) {
      getFloorsOfBuilding({ maxResults: 200, firstResult: 0, buildingId_EQ: id })
        .unwrap()
        .then(getFloorsOfBuildingIsSuccess);
    }
  };

  const getFloorsOfBuildingIsSuccess = (value: GetFloorsOfBuildingResponse) => {
    if (value?.status === 200) {
      setFloorData(value.data);
    }
  };

  const roomRowSelection = {
    selectedRowKeys: roomSelectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setRoomSelectedRowKeys(selectedRowKeys);
      if (selectedRowKeys.length > 0) {
        setBedListData([]);
        getBedList({
          maxResults: 2000,
          firstResult: 0,
          roomId_EQ: selectedRowKeys[0]?.toString(),
          bedTitle_LIKE: url?.name,
          bedNumber_LIKE: url?.number,
        })
          .unwrap()
          .then(getBedListIsSuccess);
      }
    },
  };

  const getBedListIsSuccess = async (value: GetBedListResponse) => {
    if (value?.status === 200) {
      setBedListData(value?.data);
    }
  };

  const bedRowSelection = {
    selectedRowKeys: bedSelectedRowKeys,
    onChange: (selectedRowKeys: Key[]) => {
      setBedSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: BedListData) => ({
      disabled: record?.bedStateId !== 1,
    }),
  };

  // room list
  const roomList = () => {
    if (selectFloorData?.id > 0) {
      getRoomList({
        firstResult: floorPageInfo?.page
          ? (floorPageInfo.page - 1) * floorPageInfo.pageSize
          : 0,
        maxResults: floorPageInfo?.pageSize ? floorPageInfo?.pageSize : 8,
        floorid_EQ: +selectFloorData?.id,
        tarefe_EQ: +url?.tariffId,
      })
        .unwrap()
        .then(getRoomListIsSuccess);
    } else {
      setRoomListData([]);
      setBedListData([]);
    }
  };

  const roomListCount = () => {
    if (selectFloorData?.id > 0) {
      getRoomListCount({
        floorid_EQ: +selectFloorData?.id,
        tarefe_EQ: +url?.tariffId,
      });
    }
  };

  const getRoomListIsSuccess = async (value: GetRoomListResponse) => {
    if (value?.status === 200) {
      setRoomListData(value?.data);
    }
  };

  // onchange floor
  const changeFloorListHandler = (id: string) => {
    if (id) {
      setSelectFloorData({
        id: +id,
      });

      setFloorPageInfo({
        page: 1,
        pageSize: 8,
      });

      setRoomSelectedRowKeys([]);
      setBedSelectedRowKeys([]);
    }
  };

  // send modal data
  const confirmModalHandler = async () => {
    try {
      await selectForm.validateFields();
      const values = await anotherRoomAllocationForm.validateFields();

      sendAdminSubmitDisplacement({
        form: "MovingAdmin",
        data: {
          bedId: bedSelectedRowKeys[0]?.toString(),
          parentId: url?.id,
          deliverPlanId: url?.deliverPlanId,
          residenceStartDate: url?.startDate,
          residenceEndDate: url?.endDate,
          explanationsEveryWhereAdmin: values?.description,
        },
      })
        .unwrap()
        .then(sendAdminSubmitDisplacementIsSuccess);
    } catch (error: any) {
      if (error.errorFields) {
        return toast.error("لطفا تمام فیلدهای الزامی را پر کنید", {
          toastId: "validation-error",
        });
      }
      toast.error(GENERAL_ERROR_MESSAGE, {
        toastId: GENERAL_ERROR_MESSAGE,
      });
    }
  };

  const sendAdminSubmitDisplacementIsSuccess = async (
    value: AdminSubmitDisplacementResponse
  ) => {
    if (value?.status === 204) {
      toast.success(successMovingMsg, {
        toastId: successMovingMsg,
      });

      setAnotherRoomAllocation(false);

      if (roomSelectedRowKeys?.[0]) {
        setNewRoomIdHandler(roomSelectedRowKeys?.[0] as number);
      }

      closeDrawerHandler();
    }
  };

  const openAnotherRoomAllocationHandler = () => {
    if (!bedSelectedRowKeys[0]) {
      return toast.error(SELECT_BED_REQUIRED_ERROR_MSG, {
        toastId: SELECT_BED_REQUIRED_ERROR_MSG,
      });
    }
    selectForm.submit();
    selectForm.validateFields().then(() => {
      setAnotherRoomAllocation(true);
    });
  };
  const closeAnotherRoomAllocationHandler = () => setAnotherRoomAllocation(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ALLOCATION_BED_Modal */}
      {anotherRoomAllocation && (
        <ConfirmationModalWithContent
          isModalOpen={anotherRoomAllocation}
          closeModalHandler={closeAnotherRoomAllocationHandler}
          content={
            <RelocationAnotherRoomAllocationBedModalContent
              form={anotherRoomAllocationForm}
            />
          }
          onConfirmClickHandler={confirmModalHandler}
          confirmBtnText="تخصیص تخت"
          backBtnText="انصراف"
          title="تخصیص تخت"
          isConfirmButtonLoading={SendAdminSubmitDisplacementLoading}
        />
      )}

      <div>
        <CustomDrawerHeader
          title="جابجایی به یک اتاق دیگر"
          closeDrawerHandler={closeDrawerHandler}
          leftSideContent={
            <div className="flex gap-2">
              <CustomButton type="primary" onClick={openAnotherRoomAllocationHandler}>
                تخصیص تخت
              </CustomButton>
            </div>
          }
        />
        <div className="drawer-body">
          <Form form={selectForm}>
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect
                  label="ساختمان"
                  name="building"
                  form={selectForm}
                  options={buildingData}
                  onChange={(value) => selectedBuildingHandler(value as string)}
                  loading={buildingsOfDormitoryIsLoading}
                  rules={[REQUIRED_RULE]}
                  placeholder="ساختمان را انتخاب کنید"
                />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect
                  label="طبقه"
                  name="floor"
                  form={selectForm}
                  options={floorData}
                  onChange={(value) => changeFloorListHandler(value as string)}
                  loading={floorsOfBuildingIsLoading}
                  rules={[REQUIRED_RULE]}
                  placeholder="طبقه را انتخاب کنید"
                />
              </Col>
            </Row>
          </Form>

          <CustomDivider text="لیست اتاق‌ها" />
          <CustomTable
            dataSource={roomListData}
            columns={RoomListTableModel()}
            pagination={manualPaginationConfig({
              total: roomListCountData?.data,
              onChange: (page, pageSize) => {
                setFloorPageInfo({
                  page: page,
                  pageSize: pageSize,
                });
              },
              pageNumber: floorPageInfo?.page ? floorPageInfo?.page : 1,
              defaultPageSize: floorPageInfo?.pageSize ? floorPageInfo?.pageSize : 8,
            })}
            rowKey="id"
            className="floors-tab-table-model-container"
            rowSelection={{
              type: "radio",
              ...roomRowSelection,
            }}
            loading={isGetRoomListLoading || isGetRoomListCountLoading}
            key={`table-${floorPageInfo?.pageSize || "8"} `}
            {...TABLE_PROPS(roomListData?.length)}
          />
          <div>
            <CustomDivider text="لیست تخت‌ها" />
            <CustomTable
              dataSource={bedListData}
              columns={BedListTableModel()}
              pagination={paginationConfig}
              rowKey="bedId"
              rowSelection={{
                type: "radio",
                ...bedRowSelection,
              }}
              loading={isGetBedListLoading}
              className="users-requests-detail-bed-list-table-model-container"
              {...TABLE_PROPS(bedListData?.length)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default DisplacementDrawerContent;
