import { useEffect, useState } from "react";

import { Col, Dropdown, Form, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowLeft, PiCopy, PiTable } from "react-icons/pi";
import { useNavigate } from "react-router";

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
import { TICKETING_SENDING_TICKET_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { useLazyGetInnerTicketSendingUnAssignedListQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import { exportMenu } from "@pages/Finance/Transactions/TransactionsList/utils/transactionUtils";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  GetInnerTicketSendingUnAssignedListResponse,
  InnerTicketSegmentNotAssignedFormType,
  InnerTicketSendingUnAssignedRecordType,
} from "./@types/@innerTicketSubmittedNotAssignedList";
import useMyInnerTicketSegmentNotAssignedTableModeAdvanceFilter from "./helper/modal/advanceFilter/MyInnerTicketSegmentNotAssignedTableModeAdvanceFilter";
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
  "ticketNumber",
  "servicesName",
  "topicIdsId",
  "dateDateStart",
  "dateDateEnd",
];

const MyInnerTicketSubmittedNotAssignedList = ({
  refreshCount,
}: {
  refreshCount: () => void;
}) => {
  const [segmentViewType, setSegmentViewType] = useState<"card" | "table">("card");

  const [dataSource, setDataSource] = useState<InnerTicketSendingUnAssignedRecordType[]>(
    []
  );
  const [totalElements, setTotalElements] = useState(0);

  const { params, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isAddTicketsModalOpen, setIsAddTicketsModalOpen] = useState(false);

  const [form] = Form.useForm<InnerTicketSegmentNotAssignedFormType>();

  const { filterItemsList } = useMyInnerTicketSegmentNotAssignedTableModeAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isGetListLoading }] =
    useLazyGetInnerTicketSendingUnAssignedListQuery();

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
    const requestAdvanceFilterParams = {
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.topicIdsId && { topicIds: params?.topicIdsId }),
      ...(from && { from }),
      ...(to && { to }),
      // column search
      ...(params?.ticketNumber && { ticketNumber: params?.ticketNumber }),
    };

    getList({
      pageNumber: params?.page ? Number(params?.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
      ...requestAdvanceFilterParams,
      ...sortParams,
    })
      .unwrap()
      .then((value: GetInnerTicketSendingUnAssignedListResponse) => {
        setDataSource(value?.content);
        setTotalElements(value?.totalElements);
      });
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

  // table column
  const column = InnerTicketSubmittedTableModel("notAssigned");

  const closeAdvanceFilterModalHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
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
          dataSource?.length === 0 ? (
            <div className="mt-50">
              <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
            </div>
          ) : (
            <Div loading={isGetListLoading}>
              <Row gutter={[16, 24]} className="mt-4">
                {dataSource?.map((item) => (
                  <Col key={item.uuid} span={24}>
                    <TicketCard
                      ticketNumber={item?.ticketNumber}
                      topTag={item?.topic?.title}
                      title={item?.title}
                      description={item?.lastMessage}
                      date={convertDateToPersianTextDateWithTime(item?.createdAt)}
                      service={item?.service.name}
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
                  total={totalElements ?? 0}
                  pageSize={params?.pageSize ? Number(params?.pageSize) : 8}
                  onChange={handlePageChange}
                  showSizeChanger
                  showQuickJumper
                  pageSizeOptions={["8", "10", "20", "50", "100"]}
                />
              </div>
            </Div>
          )
        ) : (
          <div className="mt-4">
            <CustomTable<InnerTicketSendingUnAssignedRecordType>
              dataSource={dataSource}
              loading={isGetListLoading}
              columns={
                column as CustomColumnType<InnerTicketSendingUnAssignedRecordType>[]
              }
              rowKey="id"
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
              draggableColumns
              draggableId={
                ExcelCodes.TICKETING_MY_SUBMITTED_INNER_TICKETS_NOT_ASSIGNED_LIST_TABLE
              }
              key={`table-${params?.pageSize || "8"}`}
            />
          </div>
        )}
        <Div loading={isGetListLoading}>
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
export default MyInnerTicketSubmittedNotAssignedList;
