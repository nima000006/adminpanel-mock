import { useCallback, useEffect, useState } from "react";

import { Col, Dropdown, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowLeft, PiCopy, PiTable } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTable, {
  CustomColumnType,
} from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { convertDateToPersianTextDateWithTime } from "@infra/helpers/dateConvertor";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { TICKETING_ALL_SENDING_TICKET_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import {
  useInnerSendingSubmitRateMutation,
  useLazyInnerTicketSendingAllListAndAdvanceFilterQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import { exportMenu } from "@pages/Finance/Transactions/TransactionsList/utils/transactionUtils";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";

import {
  InnerTicketSendingAllListAndAdvanceFilterRecordType,
  InnerTicketSendingAllListAndAdvanceFilterResponse,
  InnerTicketSubmittedAllFilterItemsType,
  TicketSubmittedAllFilterFormType,
} from "./@types/@innerTicketSubmittedAllList";
import useAllInnerTicketSubmittedAllListTableModeAdvanceFilter from "./helper/modal/advanceFilter/AllInnerTicketSubmittedAllListTableModeAdvanceFilter";
import AddTicketsModalContent from "../../modal/AddTicketsModalContent/AddTicketsModalContent";
import RateTicketsModalContent from "../../modal/RateTicketsModalContent/RateTicketsModalContent";
import AllInnerTicketSubmittedTableModel from "../../model/InnerTicketSubmittedTableModel/AllInnerTicketSubmittedTableModel";

const optionType = [
  {
    value: "card",
    label: (
      <Div className="flex h-7 items-center justify-center">
        <PiCopy />
      </Div>
    ),
  },
  {
    value: "table",
    label: (
      <Div className="flex h-7 items-center justify-center">
        <PiTable />
      </Div>
    ),
  },
];

const advanceFilterItems = [
  "servicesName",
  "topicIdsId",
  "ticketStatusName",
  "rateId",
  "closeTypeName",
  "ticketDateDateStart",
  "ticketDateDateEnd",
  "ticketNumber",
];
const AllInnerTicketSubmittedAllList = ({
  refreshCount,
}: {
  refreshCount: () => void;
}) => {
  const [dataList, setDataList] =
    useState<InnerTicketSendingAllListAndAdvanceFilterResponse>();
  const [segmentViewType, setSegmentViewType] = useState<"card" | "table">("card");

  const { params, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isAddTicketsModalOpen, setIsAddTicketsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState({ isOpen: false, id: "" });
  const [form] = Form.useForm<TicketSubmittedAllFilterFormType>();
  const navigate = useNavigate();
  const { filterItemsList } = useAllInnerTicketSubmittedAllListTableModeAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });
  const [rate, setRate] = useState<number>(0);
  //? ================================  Api Calls ================================
  // all tickets
  const [getAllData, { isFetching: isGetAllDataLoading }] =
    useLazyInnerTicketSendingAllListAndAdvanceFilterQuery();

  // submit rate
  const [submitRate, { isLoading: isSubmitRateLoading }] =
    useInnerSendingSubmitRateMutation();

  //? ================================ Effects  ================================
  const parsedSortings = params?.sortings
    ? JSON.parse(decodeURIComponent(params?.sortings))
    : undefined;

  const sortParams = parsedSortings?.length
    ? {
        sortBy: parsedSortings[0].sortBy,
        sortDirection: parsedSortings[0].sortOrder?.toUpperCase(),
      }
    : {};

  const fetchList = () => {
    const { from, to } = formatDateRangeForApi({
      from: params?.ticketDateDateStart,
      to: params?.ticketDateDateEnd,
    });

    const requestParams: InnerTicketSubmittedAllFilterItemsType = {
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.topicIdsId && { topicIds: params?.topicIdsId }),
      ...(params?.ticketStatusName && { status: params?.ticketStatusName }),
      ...(params?.rateId && { rate: params?.rateId }),
      ...(params?.closeTypeName && { closeType: params?.closeTypeName }),
      ...(from && { from }),
      ...(to && { to }),
      // column search
      ...(params?.ticketNumber && { ticketNumber: params?.ticketNumber }),
    };

    getAllData({
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      ...requestParams,
      ...sortParams,
    })
      .unwrap()
      .then(getListOnSuccess);
  };

  useEffect(() => {
    fetchList();
  }, [
    params?.page,
    params?.pageSize,
    ...advanceFilterItems.map((key) => params?.[key]),
    params?.sortings,
  ]);
  //* ================================ Util Functions ================================
  // success
  const getListOnSuccess = useCallback(
    (res: InnerTicketSendingAllListAndAdvanceFilterResponse) => {
      setDataList(res);
    },
    []
  );

  // card paginate
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      ...params,
      page: page?.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  const AddTicketsModalCloseHandler = () => {
    setIsAddTicketsModalOpen(false);
  };

  const addTicketsHandler = () => {
    setIsAddTicketsModalOpen(true);
  };

  const submitRateHandler = (id: string) => {
    setIsRateModalOpen({ isOpen: true, id });
  };

  const RateModalCloseHandler = () => {
    setIsRateModalOpen({ isOpen: false, id: "" });
  };

  const RateModalConfirmHandler = (id: string) => {
    submitRate({ ticketId: id, rate })
      .unwrap()
      .then(() => submitRateSuccess());
  };

  const submitRateSuccess = () => {
    RateModalCloseHandler();
    setRate(0);
    fetchList();
  };

  const viewClickHandler = (id: string) => {
    navigate({
      pathname: TICKETING_ALL_SENDING_TICKET_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id,
      }),
    });
  };

  const closeAdvanceFilterModalHandler = () => {
    setIsAdvanceModalOpen(false);
    form?.resetFields();
  };

  const column = AllInnerTicketSubmittedTableModel("submittedAll");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterModalHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={params}
        />
      )}

      {/* ADD TICKETS MODAL */}
      {isAddTicketsModalOpen && (
        <AddTicketsModalContent
          closeModal={AddTicketsModalCloseHandler}
          refetchList={fetchList}
          isModalOpen={isAddTicketsModalOpen}
          refreshCount={refreshCount}
        />
      )}

      {/* RATE MODAL */}
      {isRateModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رضایت شما از پاسخ"
          isModalOpen={isRateModalOpen?.isOpen}
          closeModalHandler={RateModalCloseHandler}
          onConfirmClickHandler={() => RateModalConfirmHandler(isRateModalOpen?.id)}
          isConfirmButtonLoading={isSubmitRateLoading}
          isConfirmButtonDisable={rate === 0}
          content={<RateTicketsModalContent rate={rate} setRate={setRate} />}
          backBtnText="انصراف"
          confirmBtnText="ثبت امتیاز"
          showIcon={false}
        />
      )}

      <div className="mt-10">
        <ToolBox
          className="mt-4"
          rightSide={
            <div className="flex gap-2">
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={() => setIsAdvanceModalOpen(true)}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </div>
          }
          leftSide={
            <div className="flex flex-wrap gap-2">
              <CustomSegmented
                value={segmentViewType}
                onChange={(val) => setSegmentViewType(val as "card" | "table")}
                options={optionType}
              />
              {/* TODO[nima] enable when api get ready */}
              <CustomButton
                type="primary"
                icon={<FaPlus />}
                iconPlacement="start"
                onClick={addTicketsHandler}
              >
                ثبت تیکت جدید
              </CustomButton>

              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
          }
        />
        {segmentViewType === "card" ? (
          <Div loading={isGetAllDataLoading}>
            {!dataList || dataList?.content?.length === 0 ? (
              <div className="mt-50">
                <CustomEmpty description="نتیجه‌ای یافت نشد." />
              </div>
            ) : (
              <>
                <Row gutter={[16, 24]} className="mt-4">
                  {dataList?.content?.map((item) => (
                    <Col key={item?.ticketNumber} span={24}>
                      <TicketCard
                        ticketNumber={+item?.ticketNumber}
                        title={item?.title}
                        description={item?.lastMessage}
                        assign={
                          item?.status?.name?.toUpperCase() === "WAITING_FOR_REPLY" ||
                          item?.status?.name?.toUpperCase() === "REPLIED" ? (
                            <Link
                              to={{
                                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                                search: makeSearchParams({
                                  id: item?.assignedToUserId,
                                }),
                              }}
                            >
                              {item?.assignedToUserStaffIdName}
                            </Link>
                          ) : undefined
                        }
                        closedBy={
                          item?.status?.name?.toUpperCase() === "ADMIN_CLOSED" ||
                          item?.status?.name?.toUpperCase() === "USER_CLOSED" ||
                          item?.status?.name?.toUpperCase() === "AUTO_CLOSED" ? (
                            <Link
                              to={{
                                pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                                search: makeSearchParams({
                                  id: item?.closedByUserId,
                                }),
                              }}
                            >
                              {item?.closeBy}
                            </Link>
                          ) : undefined
                        }
                        date={convertDateToPersianTextDateWithTime(item?.createdAt)}
                        topTag={item?.topic?.title}
                        service={item?.service?.name}
                        rate={
                          item?.status?.name?.toUpperCase() === "ADMIN_CLOSED" ||
                          item?.status?.name?.toUpperCase() === "USER_CLOSED" ||
                          item?.status?.name?.toUpperCase() === "AUTO_CLOSED"
                            ? {
                                value: Number(item?.rate),
                                count: 5,
                              }
                            : undefined
                        }
                        ribbonStatus={
                          item?.status?.name?.toUpperCase() as keyof typeof ticketStatusMap
                        }
                        actionButtons={
                          <div className="flex flex-wrap gap-2">
                            {item?.status?.name?.toUpperCase() === "ADMIN_CLOSED" ||
                            item?.status?.name?.toUpperCase() === "USER_CLOSED" ||
                            item?.status?.name?.toUpperCase() === "AUTO_CLOSED" ? (
                              <CustomButton
                                disabled={item?.rate !== null}
                                type="default"
                                onClick={() => submitRateHandler(item?.uuid)}
                              >
                                ثبت امتیاز
                              </CustomButton>
                            ) : null}

                            <CustomButton
                              icon={<PiArrowLeft />}
                              iconPlacement="end"
                              type="primary"
                              onClick={() => viewClickHandler(item?.uuid)}
                            >
                              مشاهده
                            </CustomButton>
                          </div>
                        }
                      />
                    </Col>
                  ))}
                </Row>
                <div className="mt-4 flex">
                  <CustomPagination
                    current={params?.page ? Number(params.page) : 1}
                    total={dataList?.totalElements ?? 0}
                    pageSize={params?.pageSize ? Number(params?.pageSize) : 8}
                    onChange={handlePageChange}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={["8", "10", "20", "50", "100"]}
                  />
                </div>
              </>
            )}
          </Div>
        ) : (
          <div className="mt-4">
            <CustomTable<InnerTicketSendingAllListAndAdvanceFilterRecordType>
              dataSource={dataList?.content}
              loading={isGetAllDataLoading}
              columns={
                column as CustomColumnType<InnerTicketSendingAllListAndAdvanceFilterRecordType>[]
              }
              rowKey="uuid"
              draggableColumns
              draggableId={
                ExcelCodes.TICKETING_ALL_SUBMITTED_INNER_TICKETS_ALL_LIST_TABLE
              }
              pagination={manualPaginationConfig({
                total: dataList?.totalElements ?? 0,
                onChange: (page, pageSize) => {
                  setSearchParams({
                    ...params,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: params?.page ? Number(params?.page) : 1,
                defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
              })}
              key={`table-${params?.pageSize || "8"}`}
            />
          </div>
        )}
        <Div loading={isGetAllDataLoading}>
          <CustomTotalTableItems
            totalCount={dataList?.totalElements ?? 0}
            label="تعداد کل تیکت ها"
            className="mt-2"
          />
        </Div>
      </div>
    </>
  );
};
export default AllInnerTicketSubmittedAllList;
