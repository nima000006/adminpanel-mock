import { useCallback, useEffect, useState } from "react";

import { Col, Dropdown, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowLeft, PiCopy, PiTable } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
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
import { useLazyInnerTicketSendingPendingListAndAdvanceFilterQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import { exportMenu } from "@pages/Finance/Transactions/TransactionsList/utils/transactionUtils";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  InnerTicketSendingPendingListAndAdvanceFilterFormType,
  InnerTicketSendingPendingListAndAdvanceFilterItems,
  InnerTicketSendingPendingListAndAdvanceFilterRequestItemsType,
  InnerTicketSendingPendingListAndAdvanceFilterResponse,
} from "./@types/@innerTicketSubmittedWaitingListTypes";
import useMyInnerTicketSubmittedWaitingTableModeAdvanceFilter from "./helper/modal/advanceFilter/MyInnerTicketSubmittedWaitingTableModeAdvanceFilter";
import AddTicketsModalContent from "../../modal/AddTicketsModalContent/AddTicketsModalContent";
import InnerTicketSubmittedTableModel from "../../model/InnerTicketSubmittedTableModel/MyInnerTicketSubmittedTableModel";

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
  "ticketNumber",
];

const MyInnerTicketSubmittedWaitingList = ({
  refreshCount,
}: {
  refreshCount: () => void;
}) => {
  const [segmentViewType, setSegmentViewType] = useState<"card" | "table">("card");

  const { params, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<
    InnerTicketSendingPendingListAndAdvanceFilterItems[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isAddTicketsModalOpen, setIsAddTicketsModalOpen] = useState(false);

  const [form] = Form.useForm<InnerTicketSendingPendingListAndAdvanceFilterFormType>();
  const navigate = useNavigate();

  const { filterItemsList } = useMyInnerTicketSubmittedWaitingTableModeAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });
  //? ================================  Api Calls ================================
  const [getList, { isFetching: isListLoading }] =
    useLazyInnerTicketSendingPendingListAndAdvanceFilterQuery();

  //? ================================ Effects ================================
  const parsedSortings = params?.sortings
    ? JSON.parse(decodeURIComponent(params.sortings))
    : undefined;

  const sortParams = parsedSortings?.length
    ? {
        sortBy: parsedSortings[0].sortBy,
        sortDirection: parsedSortings[0].sortOrder?.toUpperCase(),
      }
    : {};

  const refetchList = () => {
    const { from, to } = formatDateRangeForApi({
      from: params?.dateDateStart,
      to: params?.dateDateEnd,
    });
    const requestParams: InnerTicketSendingPendingListAndAdvanceFilterRequestItemsType = {
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.topicIdsId && { topicIds: params?.topicIdsId }),
      ...(from && { from }),
      ...(to && { to }),
      ...(params?.closeTypeName && {
        closeType: params?.closeTypeName,
      }),
      ...(params?.rateId && {
        rate: params?.rateId,
      }),
      // column search
      ...(params?.ticketNumber && { ticketNumber: params?.ticketNumber }),
    };

    getList({
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      ...requestParams,
      ...sortParams,
    })
      .unwrap()
      .then(getListOnSuccess);
  };

  useEffect(() => {
    refetchList();
  }, [
    params?.page,
    params?.pageSize,
    ...advanceFilterItems.map((key) => params?.[key]),
    params?.sortings,
  ]);

  //* ================================ Util Functions ================================
  // success
  const getListOnSuccess = useCallback(
    (response: InnerTicketSendingPendingListAndAdvanceFilterResponse) => {
      setDataSource(response?.content);
      setTotalElements(response?.totalElements);
    },
    []
  );

  // handler
  const AddTicketsModalCloseHandler = () => {
    setIsAddTicketsModalOpen(false);
  };

  const addTicketsHandler = () => {
    setIsAddTicketsModalOpen(true);
  };

  const viewClickHandler = (id: string) => {
    navigate({
      pathname: TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id,
      }),
    });
  };

  const closeAdvancedModalHandler = () => {
    setIsAdvanceModalOpen(false);
    form?.resetFields();
  };

  // card paginate
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      ...params,
      page: page?.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  // table column
  const column = InnerTicketSubmittedTableModel("waiting");

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
          defaultParams={params}
        />
      )}

      {/* ADD TICKETS MODAL */}
      {isAddTicketsModalOpen && (
        <AddTicketsModalContent
          closeModal={AddTicketsModalCloseHandler}
          refetchList={refetchList}
          refreshCount={refreshCount}
          isModalOpen={isAddTicketsModalOpen}
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
          <Div loading={isListLoading}>
            {!dataSource || dataSource?.length === 0 ? (
              <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
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
                        assign={
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
                        }
                        date={convertDateToPersianTextDateWithTime(item?.createdAt)}
                        service={item?.service?.name}
                        actionButtons={
                          <CustomButton
                            icon={<PiArrowLeft />}
                            iconPlacement="end"
                            type="primary"
                            onClick={() => viewClickHandler(item?.uuid)}
                          >
                            مشاهده
                          </CustomButton>
                        }
                      />
                    </Col>
                  ))}
                </Row>
                <div className="mt-4 flex">
                  <CustomPagination
                    current={params?.page ? Number(params?.page) : 1}
                    total={totalElements ?? 0}
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
            <CustomTable<InnerTicketSendingPendingListAndAdvanceFilterItems>
              dataSource={dataSource}
              loading={isListLoading}
              columns={
                column as CustomColumnType<InnerTicketSendingPendingListAndAdvanceFilterItems>[]
              }
              rowKey="id"
              draggableColumns
              draggableId={
                ExcelCodes.TICKETING_MY_SUBMITTED_INNER_TICKETS_WAITING_LIST_TABLE
              }
              pagination={manualPaginationConfig({
                total: totalElements ?? 0,
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
export default MyInnerTicketSubmittedWaitingList;
