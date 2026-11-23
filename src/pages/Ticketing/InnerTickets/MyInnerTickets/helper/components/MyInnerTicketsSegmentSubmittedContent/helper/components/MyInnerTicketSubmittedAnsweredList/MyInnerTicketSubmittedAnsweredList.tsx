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
import { useLazyGetInnerTicketSubmittedAnsweredQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import { exportMenu } from "@pages/Finance/Transactions/TransactionsList/utils/transactionUtils";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  GetInnerTicketSubmittedAnsweredResponse,
  InnerTicketSubmittedAnsweredFilterItemsType,
  InnerTicketSubmittedAnsweredRecordType,
  TicketSubmittedRepliedAdvancedFilterFormType,
} from "./@types/@innerTicketSubmittedAnsweredList";
import AddTicketsModalContent from "../../modal/AddTicketsModalContent/AddTicketsModalContent";
import InnerTicketSubmittedTableModel from "../../model/InnerTicketSubmittedTableModel/MyInnerTicketSubmittedTableModel";
import useMyInnerTicketSubmittedAnsweredTableModeAdvanceFilter from "./helper/modal/advanceFilter/useMyInnerTicketSubmittedAnsweredTableModeAdvanceFilter";

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
  "ticketDateDateStart",
  "ticketDateDateEnd",
  "ticketNumber",
];
const MyInnerTicketSubmittedAnsweredList = ({
  refreshCount,
}: {
  refreshCount: () => void;
}) => {
  const [dataList, setDataList] = useState<GetInnerTicketSubmittedAnsweredResponse>();
  const [segmentViewType, setSegmentViewType] = useState<"card" | "table">("card");

  const { params, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isAddTicketsModalOpen, setIsAddTicketsModalOpen] = useState(false);

  const [form] = Form.useForm<TicketSubmittedRepliedAdvancedFilterFormType>();
  const navigate = useNavigate();

  const { filterItemsList } = useMyInnerTicketSubmittedAnsweredTableModeAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });

  const column = InnerTicketSubmittedTableModel("submittedReplied");

  //? ================================  Api Calls ================================

  const [getRepliedData, { isFetching: isGetRepliedDataLoading }] =
    useLazyGetInnerTicketSubmittedAnsweredQuery();

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

  const refetchList = () => {
    const { from, to } = formatDateRangeForApi({
      from: params?.ticketDateDateStart,
      to: params?.ticketDateDateEnd,
    });

    const requestParams: InnerTicketSubmittedAnsweredFilterItemsType = {
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.topicIdsId && { topicIds: params?.topicIdsId }),
      ...(from && { from }),
      ...(to && { to }),
      // column search
      ...(params?.ticketNumber && { ticketNumber: params?.ticketNumber }),
    };

    getRepliedData({
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
  const getListOnSuccess = useCallback((res: GetInnerTicketSubmittedAnsweredResponse) => {
    setDataList(res);
  }, []);

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

  const viewClickHandler = (id: string) => {
    navigate({
      pathname: TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id,
      }),
    });
  };

  const closeAdvanceFilterModalHandler = () => {
    setIsAdvanceModalOpen(false);
    form?.resetFields();
  };

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
          refetchList={refetchList}
          isModalOpen={isAddTicketsModalOpen}
          refreshCount={refreshCount}
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
          !dataList?.content || dataList?.content?.length === 0 ? (
            <Div loading={isGetRepliedDataLoading}>
              <div className="mt-50">
                <CustomEmpty description="نتیجه‌ای یافت نشد." />
              </div>
            </Div>
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
                      topTag={item?.topic?.title}
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
          )
        ) : (
          <div className="mt-4">
            <CustomTable<InnerTicketSubmittedAnsweredRecordType>
              dataSource={dataList?.content}
              loading={isGetRepliedDataLoading}
              columns={
                column as CustomColumnType<InnerTicketSubmittedAnsweredRecordType>[]
              }
              rowKey="ticketNumber"
              draggableColumns
              draggableId={
                ExcelCodes.TICKETING_MY_SUBMITTED_INNER_TICKETS_ANSWERED_LIST_TABLE
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
        <Div loading={isGetRepliedDataLoading}>
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
export default MyInnerTicketSubmittedAnsweredList;
