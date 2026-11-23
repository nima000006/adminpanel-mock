import { useState, useEffect, useRef } from "react";

import { Button, InputRef, Row, Tabs } from "antd";
import { AiOutlineEye, AiOutlinePlusSquare } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { FONTSIZE_17 } from "@infra/VARS/globalStyles/globalStyles";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import CreateApartmentModal from "../../../../components/Modals/Dorm/CreateApartmentModal/CreateApartmentModal";
import CreateFloorModal from "../../../../components/Modals/Dorm/CreateFloorModal/CreateFloorModal";
import CreateNewRoomModal from "../../../../components/Modals/Dorm/CreateNewRoomModal/CreateNewRoomModal";
import {
  ApartmentResponse,
  FloorResponse,
  ListOfManagersDormDataResponse,
} from "../../../../components/Modals/Dorm/MovingRequestModal/@types/@movingRequestModal";
import CustomDivider from "../../../../components/Renderers/CustomDivider/CustomDivider";
import Div from "../../../../components/Renderers/Div/Div";
import SingleVerticalItem from "../../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import {
  makeSearchParams,
  dataPlaceHolder,
} from "../../../../infrastructure/helpers/utils";
import { DormDetailFloorModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/DormDetailFloorModel/DormDetailFloorModel";
import {
  APARTMENT_CREATE_PAGE_ROUTE,
  DORM_ALLOCATION_PAGE_ROUTE,
  DORM_HOME_PAGE_ROUTE,
  FLOOR_CREATE_PAGE_ROUTE,
  ROOM_CREATE_PAGE_ROUTE,
} from "../../../../infrastructure/router/routes/room";
import {
  useGetBuildingInformationMutation,
  useGetDormInformationMutation,
  useListOfManagersDormDataMutation,
} from "../../../../infrastructure/states/redux/Apis/roomApi";
import { BLUE_02 } from "../../../../infrastructure/VARS/globalColors/globalColors";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";

import "./_dormDetail.scss";

const DormDetail = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [createFloorModal, setCreateFloorModal] = useState({ isOpen: false });
  const [newRoomModal, setNewRoomModal] = useState({ isOpen: false });
  const [createApartmentModal, setCreateApartmentModal] = useState({ isOpen: false });
  const [currentBuildingId, setCurrentBuildingId] = useState(-1);
  const [floorActiveKey, setFloorActiveKey] = useState("1");

  const buildingRef = useRef<HTMLDivElement | null>(null);
  const floorRef = useRef<HTMLDivElement | null>(null);

  useTitle({ text: "اطلاعات خوابگاه" });
  const { id, floorId, buildingId } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [getListOfData, { isLoading: isGetListOfDataLoading, data: listOfData }] =
    useListOfManagersDormDataMutation();

  // dorm data for custom card
  const [getDormData, { data: dormData, isLoading: isDormDataLoading }] =
    useGetDormInformationMutation();

  // get buildingData
  const [getBuildingInfo, { data: buildingData, isLoading: isBuildingDataLoading }] =
    useGetBuildingInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (!id || id === "undefined") {
      navigate(DORM_HOME_PAGE_ROUTE);
    }
  }, []);

  // set active building to it if buildId exists
  useEffect(() => {
    if (buildingId) {
      setCurrentBuildingId(+buildingId);
    }
  }, [buildingId]);

  // set active floor to it if floorId exists
  useEffect(() => {
    if (floorId) {
      setFloorActiveKey(floorId);
    }
  }, [floorId]);

  // 1 - list of total data
  useEffect(() => {
    if (id) {
      getListOfData(id).unwrap().then(onGetListOfDataSuccess);
      getDormData(id);
    }
  }, [id]);

  // get building data
  useEffect(() => {
    if (currentBuildingId && currentBuildingId > 0) {
      getBuildingInfo(currentBuildingId?.toString());
    }
  }, [currentBuildingId]);

  // useEffect(() => {
  //   if (listOfData?.status == 200) {
  //     setApartmentsActiveKey(listOfData?.data[0]?.id?.toString());
  //     setFloorActiveKey(listOfData?.data[0]?.floorLists[0]?.id?.toString());
  //   }
  // }, [listOfData?.status]);

  //* ================================ Util Functions ================================
  const onGetListOfDataSuccess = async (value: ListOfManagersDormDataResponse) => {
    if (value?.status === 200) {
      if (buildingId) {
        setCurrentBuildingId(+buildingId);
        setTimeout(
          () => document.getElementById("building" + buildingId?.toString())?.click(),
          30
        );

        // setTimeout(() => buildingRef?.click(), 30);
        if (floorId) {
          setFloorActiveKey(floorId);
          setTimeout(() => document.getElementById("floor" + floorId)?.click(), 30);
        }
      }
      if (floorId) {
        setFloorActiveKey(floorId);
        setTimeout(() => document.getElementById("floor" + floorId)?.click(), 30);
      } else if (!buildingId && !floorId) {
        if (value?.data?.[0]?.id > 0) {
          setCurrentBuildingId(value?.data?.[0]?.id);
          setTimeout(
            () =>
              document
                .getElementById("building" + value?.data?.[0]?.id?.toString())
                ?.click(),
            30
          );
          if (value?.data?.[0]?.floorLists?.length) {
            setFloorActiveKey(floorId);
            setTimeout(
              () =>
                document
                  .getElementById("floor" + value?.data?.[0]?.floorLists?.[0]?.id)
                  ?.click(),
              30
            );
          }
        }
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

  // وقتی روی اسم ساختمان کلیک می کند
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

  const onApartmentChange = (activeKey: string) => {
    setCurrentBuildingId(+activeKey);
  };

  const onFloorChange = (activeKey: string) => {
    setFloorActiveKey(activeKey?.toString());
  };

  // onApartmentEdit
  const onApartmentEdit = (
    _: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      // onApartmentNameClickHandler()
      return navigate({
        pathname: APARTMENT_CREATE_PAGE_ROUTE,
        search: makeSearchParams({
          dormId: id,
          buildingId: buildingId?.toString(),
          floorId,
        }),
      });
    }
  };

  // onAddFloor
  const onAddFloor = (
    _: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove",
    buildingId: number
  ) => {
    if (action === "add") {
      navigate({
        pathname: FLOOR_CREATE_PAGE_ROUTE,
        search: makeSearchParams({
          buildingId: buildingId?.toString(),
          dormId: id,
          floorId,
        }),
      });
    }
  };

  // وقتی یوزر دکمه ویرایش در جدول اتاق ها را میزند
  const onClickRoomDetailHandler = (roomId: number, floorId: number, dormId: string) => {
    navigate({
      pathname: ROOM_CREATE_PAGE_ROUTE,
      search: makeSearchParams({ roomId, mode: EDIT, floorId, dormId, buildingId }),
    });
  };

  // وقتی یوزر دکمه مشاهده در جدول اتاق ها را میزند
  const onClickRoomAssignHandler = (id: number) => {
    navigate({
      pathname: DORM_ALLOCATION_PAGE_ROUTE,
      search: makeSearchParams({ id, floorId, buildingId }),
    });
  };

  // ایجاد اتاق جدید
  const onCreateNewRoomClickHandler = ({ floorId }: { floorId: number }) => {
    navigate({
      pathname: ROOM_CREATE_PAGE_ROUTE,
      search: makeSearchParams({ floorId, dormId: id, buildingId }),
    });
  };

  // دکمه ویرایش ساختمان ایکون
  const onApartmentLabelEditBtnClickHandler = (item: ApartmentResponse) => {
    navigate({
      pathname: APARTMENT_CREATE_PAGE_ROUTE,
      search: makeSearchParams({ dormId: id, buildingId: item?.id, mode: EDIT }),
    });
  };

  // دکمه ویرایش طبقه ایکون
  const onFloorLabelEditBtnClickHandler = ({
    buildingId,
    floorId,
  }: {
    buildingId: number;
    floorId: number;
  }) => {
    navigate({
      pathname: FLOOR_CREATE_PAGE_ROUTE,
      search: makeSearchParams({ buildingId, mode: EDIT, floorId, dormId: id }),
    });
  };

  // dormNameGenerator
  const dormNameGenerator = () => {
    if (
      dormData?.data?.name?.includes("خوابگاه") ||
      dormData?.data?.name?.includes("مهمانسرا")
    ) {
      return <>{"اطلاعات کلی " + " " + (dormData?.data?.name ?? "")}</>;
    } else {
      return <>{"اطلاعات کلی خوابگاه" + " " + (dormData?.data?.name ?? "")}</>;
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
              // text={"اطلاعات کلی خوابگاه" + " " + (dormData?.data?.name ?? "")}
              text={dormNameGenerator()}
              className="dorm-detail-title"
            />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                xl={8}
                lg={8}
                md={12}
                label="ظرفیت کل خوابگاه‌"
                value={dormData?.data?.copacity?.toString()}
                hasCountUpEffect
              />

              <SingleVerticalWithCol
                xl={8}
                lg={8}
                md={12}
                label="حداقل قیمت"
                value={dormData?.data?.fromprice?.toString()}
                isPriceWithExtraNumbers
              />

              <SingleVerticalWithCol
                xl={8}
                lg={8}
                md={12}
                label="حداکثر قیمت"
                value={dormData?.data?.toprice?.toString()}
                isPriceWithExtraNumbers
              />
            </Row>
          </CustomCard>
          <Tabs
            type="editable-card"
            onChange={onApartmentChange}
            defaultActiveKey={currentBuildingId?.toString()}
            key="BuildingTab"
            // key={currentBuildingId}
            onEdit={onApartmentEdit}
            // activeKey={"65"}
            // destroyInactiveTabPane={true}
            // onTabClick={(e, a) => console.log(e, a.target)}
            items={(listOfData?.data as any)?.map((item: ApartmentResponse) => {
              return {
                key: item?.id,
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
                    {item?.id === currentBuildingId && (
                      <CustomTooltip title="برای ویرایش ساختمان روی آیکون کلیک کنید">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            onApartmentNameClickHandler({
                              id,
                              buildingId: item?.id,
                              floorId: floorId ? +floorId : item?.floorLists[0]?.id,
                            });
                            onApartmentLabelEditBtnClickHandler(item);
                          }}
                          className="apartment-icon"
                        >
                          <AiOutlineEye />
                        </div>
                      </CustomTooltip>
                    )}
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
                          type="editable-card"
                          onChange={onFloorChange}
                          defaultActiveKey={floorActiveKey}
                          key={listOfData?.status}
                          onEdit={(e, action) => onAddFloor(e, action, item?.id)}
                          items={(item?.floorLists as any)?.map(
                            (floor: FloorResponse) => ({
                              closeIcon: false,
                              key: floor?.id,
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
                                  <div className="apartment-icon-label">
                                    {floor?.name}
                                  </div>
                                  {floor?.id?.toString() === floorActiveKey && (
                                    <CustomTooltip title="برای ویرایش طبقه ی این ساختمان روی آیکون کلیک کنید">
                                      <div
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onFloorLabelEditBtnClickHandler({
                                            buildingId: item?.id,
                                            floorId: floor?.id,
                                          });
                                        }}
                                        className="apartment-icon"
                                      >
                                        <AiOutlineEye />
                                      </div>
                                    </CustomTooltip>
                                  )}
                                </div>
                              ),
                              children: (
                                <>
                                  <Button
                                    type="default"
                                    className="new-room-btn"
                                    onClick={() =>
                                      onCreateNewRoomClickHandler({ floorId: floor?.id })
                                    }
                                  >
                                    ایجاد اتاق جدید
                                    <AiOutlinePlusSquare className="create-new-room-icon" />
                                  </Button>
                                  <CustomTable
                                    columns={DormDetailFloorModel({
                                      floorId: floor?.id,
                                      dormId: id,
                                      onClickRoomAssignHandler: onClickRoomAssignHandler,
                                      onClickRoomDetailHandler: onClickRoomDetailHandler,
                                      searchInput,
                                      searchedColumn,
                                      setSearchedColumn,
                                      searchText,
                                      setSearchText,
                                    })}
                                    dataSource={floor?.roomLists}
                                    pagination={{
                                      ...paginationConfig,
                                      defaultPageSize: 100,
                                    }}
                                    loading={isGetListOfDataLoading}
                                    {...TABLE_PROPS(floor?.roomLists?.length)}
                                    draggableColumns
                                    draggableId={ExcelCodes.ROOM_DORM_DETAIL_TABLE}
                                  />
                                </>
                              ),
                            })
                          )}
                          className="floors-tabs-container"
                          addIcon={
                            <div className="add-apartment-btn">
                              <span className="add-apartment-btn-label">ایجاد طبقه</span>
                              <span>
                                <AiOutlinePlusSquare
                                  style={{ color: BLUE_02, fontSize: FONTSIZE_17 }}
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
                  <AiOutlinePlusSquare
                    style={{ color: BLUE_02, fontSize: FONTSIZE_17 }}
                  />
                </span>
              </div>
            }
          />
        </>
      </Div>
    </>
  );
};

export default DormDetail;
