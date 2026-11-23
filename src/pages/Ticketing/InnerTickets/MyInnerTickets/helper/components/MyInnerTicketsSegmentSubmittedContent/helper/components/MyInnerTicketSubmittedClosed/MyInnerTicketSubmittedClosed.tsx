import { useCallback, useEffect, useState } from "react";

import { Col, Dropdown, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
  PiArrowLeft,
  PiArrowUUpLeft,
  PiCircleDashed,
  PiCopy,
  PiTable,
} from "react-icons/pi";
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
import { TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import {
  useInnerSendingSubmitRateMutation,
  useLazyInnerTicketSendingClosedListAndAdvanceFilterQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import { exportMenu } from "@pages/Finance/Transactions/TransactionsList/utils/transactionUtils";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  InnerTicketSendingClosedListAndAdvanceFilterFormType,
  InnerTicketSendingClosedListAndAdvanceFilterItems,
  InnerTicketSendingClosedListAndAdvanceFilterRequestItemsType,
  InnerTicketSendingClosedListAndAdvanceFilterResponse,
} from "./@types/@innerTicketSubmittedClosedTypes";
import AddTicketsModalContent from "../../modal/AddTicketsModalContent/AddTicketsModalContent";
import RateTicketsModalContent from "../../modal/RateTicketsModalContent/RateTicketsModalContent";
import InnerTicketSubmittedTableModel from "../../model/InnerTicketSubmittedTableModel/MyInnerTicketSubmittedTableModel";
import useMyInnerTicketSubmittedClosedAdvanceFilter from "./helper/modal/advanceFilter/useMyInnerTicketSubmittedClosedAdvanceFilter";

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
  "dateDateStart",
  "dateDateEnd",
  "rateId",
  "closeTypeName",
  "ticketNumber",
];

const MyInnerTicketSubmittedClosed = ({ refreshCount }: { refreshCount: () => void }) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<
    InnerTicketSendingClosedListAndAdvanceFilterItems[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const [segmentViewType, setSegmentViewType] = useState<"card" | "table">("card");
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isAddTicketsModalOpen, setIsAddTicketsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState({ isOpen: false, id: "" });
  const [rate, setRate] = useState<number>(0);

  const [form] = Form.useForm<InnerTicketSendingClosedListAndAdvanceFilterFormType>();
  const navigate = useNavigate();

  const { filterItemsList } = useMyInnerTicketSubmittedClosedAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });
  //? ================================  Api Calls ================================
  const [getList, { isFetching: isListLoading }] =
    useLazyInnerTicketSendingClosedListAndAdvanceFilterQuery();

  // submit rate
  const [submitRate, { isLoading: isSubmitRateLoading }] =
    useInnerSendingSubmitRateMutation();

  //? ================================ Effects ================================
  const parsedSortings = url?.sortings
    ? JSON.parse(decodeURIComponent(url.sortings))
    : undefined;

  const sortParams = parsedSortings?.length
    ? {
        sortBy: parsedSortings[0].sortBy,
        sortDirection: parsedSortings[0].sortOrder?.toUpperCase(),
      }
    : {};

  const fetchList = () => {
    const { from, to } = formatDateRangeForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
    });
    const requestParams: InnerTicketSendingClosedListAndAdvanceFilterRequestItemsType = {
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.topicIdsId && { topicIds: url?.topicIdsId }),
      ...(from && { from }),
      ...(to && { to }),
      ...(url?.closeTypeName && {
        closeType: url?.closeTypeName,
      }),
      ...(url?.rateId && {
        rate: +url?.rateId,
      }),
      // column search
      ...(url?.ticketNumber && { ticketNumber: url?.ticketNumber }),
    };
    getList({
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      ...requestParams,
      ...sortParams,
    })
      .unwrap()
      .then(getListOnSuccess); // const { from, to } = formatDateRangeForApi({
  };

  useEffect(() => {
    fetchList();
  }, [
    url?.page,
    url?.pageSize,
    ...advanceFilterItems.map((key) => url?.[key]),
    url?.sortings,
    rate,
  ]);

  //* ================================ Util Functions ================================
  // success
  const getListOnSuccess = useCallback(
    (response: InnerTicketSendingClosedListAndAdvanceFilterResponse) => {
      setDataSource(response?.content);
      setTotalElements(response?.totalElements);
    },
    []
  );

  // handler
  const addTicketsHandler = () => {
    setIsAddTicketsModalOpen(true);
  };
  const AddTicketsModalCloseHandler = () => {
    setIsAddTicketsModalOpen(false);
  };

  const submitRateHandler = (id: string) => {
    setIsRateModalOpen({ isOpen: true, id });
  };

  const RateModalCloseHandler = () => {
    setIsRateModalOpen({ isOpen: false, id: "" });
    setRate(0);
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

  const closeAdvancedModalHandler = () => {
    setIsAdvanceModalOpen(false);
    form?.resetFields();
  };

  const viewClickHandler = (id: string) => {
    navigate({
      pathname: TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id,
      }),
    });
  };

  // card paginate
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      ...url,
      page: page?.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  // table column
  const column = InnerTicketSubmittedTableModel("closed");

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvancedModalHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
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
      {isRateModalOpen && (
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
          !dataSource || dataSource?.length === 0 ? (
            <Div loading={isListLoading}>
              <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
            </Div>
          ) : (
            <>
              <Row gutter={[16, 24]} className="mt-4">
                {dataSource?.map((item) => (
                  <Col key={item?.ticketNumber} span={24}>
                    <TicketCard
                      ticketNumber={+item?.ticketNumber}
                      topTag={item?.topic?.title}
                      title={item?.title}
                      description={item?.lastMessage}
                      closedBy={
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
                      }
                      date={convertDateToPersianTextDateWithTime(item?.createdAt)}
                      service={item?.service?.name}
                      stepIcon={
                        item?.originTicket?.title === "primary" ? (
                          <PiCircleDashed />
                        ) : (
                          <PiArrowUUpLeft />
                        )
                      }
                      rate={{ count: 5, value: item?.rate }}
                      actionButtons={
                        <div className="flex flex-wrap gap-2">
                          <CustomButton
                            type="default"
                            disabled={item?.rate !== null}
                            onClick={() => submitRateHandler(item?.uuid)}
                          >
                            ثبت امتیاز
                          </CustomButton>
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
                  current={url?.page ? Number(url?.page) : 1}
                  total={totalElements ?? 0}
                  pageSize={url?.pageSize ? Number(url?.pageSize) : 8}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                  pageSizeOptions={["8", "10", "20", "50", "100"]}
                />
              </div>
            </>
          )
        ) : (
          <div className="mt-4">
            <CustomTable<InnerTicketSendingClosedListAndAdvanceFilterItems>
              dataSource={dataSource}
              loading={isListLoading}
              columns={
                column as CustomColumnType<InnerTicketSendingClosedListAndAdvanceFilterItems>[]
              }
              rowKey="id"
              draggableColumns
              draggableId={
                ExcelCodes.TICKETING_MY_SUBMITTED_INNER_TICKETS_CLOSED_LIST_TABLE
              }
              pagination={manualPaginationConfig({
                total: totalElements ?? 0,
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
              key={`table-${url?.pageSize || "8"}`}
            />
          </div>
        )}
        <Div loading={isListLoading}>
          <CustomTotalTableItems
            totalCount={totalElements ?? 0}
            label="تعداد کل تیکت ها"
            className="mt-2"
          />
        </Div>
      </div>
    </>
  );
};
export default MyInnerTicketSubmittedClosed;
