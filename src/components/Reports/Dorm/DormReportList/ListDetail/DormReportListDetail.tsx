import { useState, useEffect, useRef } from "react";

import { Row, Tabs } from "antd";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  makeSearchParams,
  dataPlaceHolder,
} from "../../../../../infrastructure/helpers/utils";
import { DormReportDetailFloorModel } from "../../../../../infrastructure/models/tableModels/RoomTableModel/DormReportDetailFloorModel/DormDetailFloorModel";
import {
  DORM_ALLOCATION_PAGE_ROUTE,
  DORM_HOME_PAGE_ROUTE,
  FLOOR_CREATE_PAGE_ROUTE,
} from "../../../../../infrastructure/router/routes/room";
import {
  useGetBuildingInformationMutation,
  useGetDormInformationMutation,
  useListOfManagersDormDataMutation,
} from "../../../../../infrastructure/states/redux/Apis/roomApi";
import { BLUE_02 } from "../../../../../infrastructure/VARS/globalColors/globalColors";
import CustomCard from "../../../../CustomCard/CustomCard";
import CreateApartmentModal from "../../../../Modals/Dorm/CreateApartmentModal/CreateApartmentModal";
import CreateFloorModal from "../../../../Modals/Dorm/CreateFloorModal/CreateFloorModal";
import CreateNewRoomModal from "../../../../Modals/Dorm/CreateNewRoomModal/CreateNewRoomModal";
import {
  ApartmentResponse,
  FloorResponse,
  ListOfManagersDormDataResponse,
} from "../../../../Modals/Dorm/MovingRequestModal/@types/@movingRequestModal";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_dormReportListDetail.scss";

const DormReportListDetail = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [createFloorModal, setCreateFloorModal] = useState({ isOpen: false });
  const [newRoomModal, setNewRoomModal] = useState({ isOpen: false });
  const [createApartmentModal, setCreateApartmentModal] = useState({ isOpen: false });
  const [currentBuildingId, setCurrentBuildingId] = useState(-1);
  const [floorActiveKey, setFloorActiveKey] = useState("1");

  const buildingRef = useRef<HTMLDivElement | null>(null);
  const floorRef = useRef<HTMLDivElement | null>(null);

  useTitle({ text: "اطلاعات خوابگاه" });

  // دیتای اصلی صفحه
  const [getListOfData, { isLoading: isGetListOfDataLoading, data: listOfData }] =
    useListOfManagersDormDataMutation();

  //! dorm data for custom card
  const [getDormData, { data: dormData, isLoading: isDormDataLoading }] =
    useGetDormInformationMutation();

  //! get buildingData
  const [getBuildingInfo, { data: buildingData, isLoading: isBuildingDataLoading }] =
    useGetBuildingInformationMutation();

  const { id, floorId, buildingId } = Object.fromEntries([...searchParams]);

  useEffect(() => {
    if (!id || id === "undefined") {
      navigate(DORM_HOME_PAGE_ROUTE);
    }
  }, []);

  //! set active building to it if buildId exists
  useEffect(() => {
    if (buildingId) {
      setCurrentBuildingId(+buildingId);
    }
  }, [buildingId]);

  //! set active floor to it if floorId exists
  useEffect(() => {
    if (floorId) {
      setFloorActiveKey(floorId);
    }
  }, [floorId]);

  const onGetListOfDataSuccess = (value: ListOfManagersDormDataResponse) => {
    if (value?.status === 200) {
      if (buildingId) {
        setCurrentBuildingId(+buildingId);
        setTimeout(
          () => document.getElementById("building" + buildingId?.toString())?.click(),
          200
        );

        // setTimeout(() => buildingRef?.click(), 200);
        if (floorId) {
          setFloorActiveKey(floorId);
          setTimeout(() => document.getElementById("floor" + floorId)?.click(), 200);
        }
      }
      if (floorId) {
        setFloorActiveKey(floorId);
        setTimeout(() => document.getElementById("floor" + floorId)?.click(), 200);
      }
      // else {
      //   setCurrentBuildingId(value?.data?.[0]?.id);
      //   document.getElementById("building" + value?.data?.[0]?.id?.toString())?.click();
      //   if (floorId) {
      //     setFloorActiveKey(floorId);
      //     document.getElementById("floor" + floorId?.toString())?.click();
      //   }
      // else {
      //   if (floorId) {
      //     setFloorActiveKey(floorId);
      //     document
      //       .getElementById("floor" + value?.data?.[0]?.floorLists?.[0]?.id)
      //       ?.click();
      //   }
      // }
      // }
    }
  };

  // useEffect(() => {
  //   if (listOfData?.status == 200) {
  //     setApartmentsActiveKey(listOfData?.data[0]?.id?.toString());
  //     setFloorActiveKey(listOfData?.data[0]?.floorLists[0]?.id?.toString());
  //   }
  // }, [listOfData?.status]);

  //! 1 - list of total data
  useEffect(() => {
    if (id) {
      getListOfData(id).unwrap().then(onGetListOfDataSuccess);
      getDormData(id);
    }
  }, [id]);

  //! get building data
  useEffect(() => {
    if (currentBuildingId && currentBuildingId > 0) {
      getBuildingInfo(currentBuildingId?.toString());
    }
  }, [currentBuildingId]);

  //! وقتی روی اسم ساختمان کلیک می کند
  const onApartmentNameClickHandler = ({
    id,
    buildingId,
    floorId,
  }: {
    id: string;
    buildingId: number;
    floorId?: number;
  }) => {
    if (floorId) {
      setSearchParams({
        id,
        buildingId: buildingId?.toString(),
        floorId: floorId?.toString(),
      });
      setCurrentBuildingId(buildingId);
      setFloorActiveKey(floorId?.toString());
    } else {
      setSearchParams({
        id,
        buildingId: buildingId?.toString(),
      });
      setCurrentBuildingId(buildingId);
    }
  };

  //!
  const onFloorNameClickHandler = ({
    id,
    buildingId,
    floorId,
  }: {
    id: string;
    buildingId: number;
    floorId?: number;
  }) => {
    if (floorId) {
      setSearchParams({
        id,
        buildingId: buildingId?.toString(),
        floorId: floorId?.toString(),
      });
      setCurrentBuildingId(buildingId);
      setFloorActiveKey(floorId?.toString());
    } else {
      setSearchParams({
        id,
        buildingId: buildingId?.toString(),
      });
      setCurrentBuildingId(buildingId);
    }
  };

  //!
  const onApartmentChange = (activeKey: string) => {
    setCurrentBuildingId(+activeKey);
  };

  //!
  const onFloorChange = (activeKey: string) => {
    setFloorActiveKey(activeKey?.toString());
  };

  //! onAddFloor
  const onAddFloor = (
    _: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove",
    buildingId: number
  ) => {
    if (action === "add") {
      navigate({
        pathname: FLOOR_CREATE_PAGE_ROUTE,
        search: makeSearchParams({ buildingId: buildingId?.toString(), dormId: id }),
      });
    }
  };

  //! وقتی یوزر دکمه مشاهده در جدول اتاق ها را میزند
  const onClickRoomAssignHandler = (id: string) => {
    navigate({
      pathname: DORM_ALLOCATION_PAGE_ROUTE,
      search: makeSearchParams({ id, floorId, buildingId }),
    });
  };

  return (
    <>
      <CreateApartmentModal
        createApartmentModal={createApartmentModal}
        setCreateApartmentModal={setCreateApartmentModal}
      />
      <CreateFloorModal
        createFloorModal={createFloorModal}
        setCreateFloorModal={setCreateFloorModal}
      />
      <CreateNewRoomModal newRoomModal={newRoomModal} setNewRoomModal={setNewRoomModal} />
      <Div className="dorm-detail-container" loading={isGetListOfDataLoading}>
        <>
          <CustomCard loading={isDormDataLoading}>
            <CustomDivider
              className="title-dorm"
              text={"اطلاعات کلی خوابگاه" + " " + (dormData?.data?.name ?? "")}
            />

            <Row gutter={[16, 16]} className="room-stat-container">
              <SingleVerticalWithCol
                label="ظرفیت کل خوابگاه‌"
                value={dormData?.data?.copacity?.toString()}
              />
              <SingleVerticalWithCol
                label="حداقل قیمت"
                value={dataPlaceHolder({
                  data: dormData?.data?.fromprice?.toString(),
                  isPriceWithExtraNumbers: true,
                })}
              />
              <SingleVerticalWithCol
                label="حداکثر قیمت"
                value={dataPlaceHolder({
                  data: dormData?.data?.toprice?.toString(),
                  isPriceWithExtraNumbers: true,
                })}
              />
            </Row>
          </CustomCard>
          <Tabs
            type="card"
            onChange={onApartmentChange}
            defaultActiveKey={currentBuildingId?.toString()}
            key="BuildingTab"
            // key={currentBuildingId}
            // onEdit={onApartmentEdit}
            // activeKey={"65"}
            // destroyInactiveTabPane={true}
            // onTabClick={(e, a) => console.log(e, a.target)}
            items={listOfData?.data?.map((item: ApartmentResponse) => {
              return {
                key: `${item?.id}`,
                closeIcon: false,
                label: (
                  <div
                    className="apartment-icon-holder"
                    ref={buildingRef}
                    id={"building" + item?.id?.toString()}
                    onClick={() => {
                      onApartmentNameClickHandler({
                        id,
                        buildingId: item?.id,
                        floorId: floorId ? +floorId : item?.floorLists[0]?.id,
                      });
                    }}
                  >
                    <div className="apartment-icon-label">{item?.name}</div>
                  </div>
                ),
                children: (
                  <>
                    <CustomCard loading={isBuildingDataLoading}>
                      <CustomDivider text="اطلاعات کلی ساختمان" />
                      <Div className="apartment-stat-container">
                        <SingleVerticalItem
                          label="شماره تلفن ساختمان"
                          value={dataPlaceHolder({ data: buildingData?.data?.phone })}
                        />
                      </Div>
                    </CustomCard>
                    <div className="apartment-detail-container">
                      <div className="floors-list-container">
                        <Tabs
                          type="card"
                          onChange={onFloorChange}
                          defaultActiveKey={floorActiveKey}
                          key={listOfData?.status}
                          onEdit={(e, action) => onAddFloor(e, action, item?.id)}
                          items={item?.floorLists?.map((floor: FloorResponse) => ({
                            closeIcon: false,
                            key: `${floor?.id}`,
                            label: (
                              <div
                                className="apartment-icon-holder"
                                id={"floor" + floor?.id?.toString()}
                                ref={floorRef}
                                onClick={() => {
                                  onFloorNameClickHandler({
                                    id,
                                    buildingId: item?.id,
                                    floorId: floor?.id,
                                  });
                                }}
                              >
                                <div className="apartment-icon-label">{floor?.name}</div>
                              </div>
                            ),
                            children: (
                              <CustomTable
                                columns={DormReportDetailFloorModel({
                                  onClickRoomAssignHandler: onClickRoomAssignHandler,
                                })}
                                dataSource={floor?.roomLists}
                                pagination={paginationConfig}
                                {...TABLE_PROPS(floor?.roomLists?.length)}
                                loading={isGetListOfDataLoading}
                              />
                            ),
                          }))}
                          className="floors-tabs-container"
                          addIcon={
                            <div className="add-apartment-btn">
                              <span className="add-apartment-btn-label">ایجاد طبقه</span>
                              <span>
                                <AiOutlinePlusSquare
                                  style={{ color: BLUE_02, fontSize: "1.1rem" }}
                                />
                              </span>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </>
                ),
              };
            })}
            className="apartment-tabs-container"
            addIcon={
              <div className="add-apartment-btn">
                <span className="add-apartment-btn-label">ایجاد ساختمان</span>
                <span>
                  <AiOutlinePlusSquare style={{ color: BLUE_02, fontSize: "1.1rem" }} />
                </span>
              </div>
            }
          />
        </>
      </Div>
    </>
  );
};

export default DormReportListDetail;
