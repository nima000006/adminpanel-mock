import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetHabitantNewIdAfterMovingQuery,
  useLazyGetHabitantsRoomCountQuery,
  useLazyGetHabitantsRoomQuery,
} from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";

import {
  GetHabitantNewIdAfterMovingResponse,
  GetHabitantsRoomResponse,
  HabitantsRoomData,
} from "./@types/@secondTabRoomInfo";
import ResidentsInfoSection from "./helper/components/ResidentsInfoSection/ResidentsInfoSection";
import DisplacementDrawerContent from "./helper/drawer/DisplacementDrawerContent/DisplacementDrawerContent";
import DormHabitantsRoomTableModel from "./helper/model/DormHabitantsRoomTableModel/DormHabitantsRoomTableModel";

const TABLE_DEPENDENCIES = ["name", "lastName", "studentNumber", "nationalCode"];

const SecondTabRoomInfo = () => {
  const [isDisplacementOpen, setIsDisplacementOpen] = useState(false);
  const [dataSource, setDataSource] = useState<HabitantsRoomData[]>([]);
  const [displacementRoomId, setDisplacementRoomId] = useState<number | null>(null);
  const [newHabitantId, setNewHabitantId] = useState<number | null>(null);

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getHabitantRoom, { isFetching: isHabitantRoomLoading }] =
    useLazyGetHabitantsRoomQuery();

  const [
    getHabitantRoomCount,
    { data: habitantsListCount, isFetching: isHabitantRoomCountLoading },
  ] = useLazyGetHabitantsRoomCountQuery();

  const [getHabitantNewIdAfterMoving] = useLazyGetHabitantNewIdAfterMovingQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getHabitantRoomList();
  }, [
    params?.roomId,
    params?.habitantRoomPage,
    params?.habitantRoomPageSize,
    ...TABLE_DEPENDENCIES.map((item) => params?.[item]),
  ]);

  useEffect(() => {
    getHabitantRoomListCount();
  }, [params?.roomId, ...TABLE_DEPENDENCIES.map((item) => params?.[item])]);

  useEffect(() => {
    if (displacementRoomId) {
      delete params.id;

      let newParams = { ...params };

      if (newHabitantId?.toString()) {
        newParams = { id: newHabitantId?.toString(), ...params };
      }

      setSearchParams({ ...newParams, roomId: displacementRoomId?.toString() });
    }
  }, [displacementRoomId, newHabitantId]);

  //* ================================ Util Functions ================================
  //success
  const getHabitantRoomListIsSuccess = (value: GetHabitantsRoomResponse) => {
    if (value?.status === 200) {
      setDataSource(value?.data);
    }
  };

  const getHabitantRoomList = () => {
    getHabitantRoom({
      firstResult: params?.habitantRoomPage
        ? Number((+params.habitantRoomPage - 1) * +params.habitantRoomPageSize)
        : 0,
      maxResults: params?.habitantRoomPageSize ? Number(params?.habitantRoomPageSize) : 8,
      AssociationBed_roomId_EQ: +params?.roomId,
      AssociationCustomer_AssociationCustomerUser_firstName_LIKE: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_LIKE: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_LIKE: params?.studentNumber,
      AssociationCustomer_AssociationCustomerUser_nationalCode_LIKE: params?.nationalCode,
    })
      .unwrap()
      .then(getHabitantRoomListIsSuccess);
  };

  const getHabitantRoomListCount = () => {
    getHabitantRoomCount({
      AssociationBed_roomId_EQ: params?.roomId,
      AssociationCustomer_AssociationCustomerUser_firstName_IN: params?.name,
      AssociationCustomer_AssociationCustomerUser_lastName_IN: params?.lastName,
      AssociationCustomer_AssociationStudent_studentNumber_IN: params?.studentNumber,
      AssociationCustomer_AssociationCustomerUser_nationalCode_IN: params?.nationalCode,
    });
  };

  //drawer handler
  const displacementHandler = () => {
    setIsDisplacementOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsDisplacementOpen(false);
    if (params?.floorId) {
      delete params.floorId;
    }
    setSearchParams({
      ...params,
    });
  };

  const setNewRoomIdHandler = (roomId: number) => {
    setDisplacementRoomId(roomId);
    if (params?.id) {
      getHabitantNewIdAfterMoving({
        maxResults: 2000,
        firstResult: 0,
        parentId_EQ: params?.id,
      })
        .unwrap()
        .then(getHabitantNewIdAfterMovingSuccess);
    }
  };

  const getHabitantNewIdAfterMovingSuccess = async (
    value: GetHabitantNewIdAfterMovingResponse
  ) => {
    if (value?.status === 200) {
      setNewHabitantId(value?.data?.[0]?.id);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDisplacementOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isDisplacementOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <DisplacementDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              dormId={params?.dormId}
              setNewRoomIdHandler={setNewRoomIdHandler}
            />
          }
        />
      )}

      <div className="flex flex-col gap-4">
        <ResidentsInfoSection />
        <div>
          <CustomDivider text="ساکنین اتاق" />
          <CustomTable
            dataSource={dataSource}
            rowKey="id"
            columns={DormHabitantsRoomTableModel()}
            loading={isHabitantRoomLoading || isHabitantRoomCountLoading}
            pagination={manualPaginationConfig({
              total: habitantsListCount?.data,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...params,
                  habitantRoomPage: page?.toString(),
                  habitantRoomPageSize: pageSize?.toString(),
                });
              },
              pageNumber: params?.habitantRoomPage ? Number(params?.habitantRoomPage) : 1,
              defaultPageSize: params?.habitantRoomPageSize
                ? Number(params?.habitantRoomPageSize)
                : 8,
            })}
            key={`table-${params?.habitantRoomPageSize || "8"} `}
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
        <div className="text-end!">
          <CustomButton type="primary" onClick={displacementHandler}>
            جابجایی
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default SecondTabRoomInfo;
