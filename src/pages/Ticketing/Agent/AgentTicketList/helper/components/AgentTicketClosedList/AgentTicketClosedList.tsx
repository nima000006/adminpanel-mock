import { useEffect, useState } from "react";

import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import {
  PiArrowLeft,
  PiArrowUUpLeft,
  PiCircleDashed,
  PiCopy,
  PiTable,
} from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSearchBox from "@components/CustomInputs/CustomSearchBox/CustomSearchBox";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import { convertDateToPersianTextDateWithTime } from "@infra/helpers/dateConvertor";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { useLazyAgentClosedListAndAdvanceFilterQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";

import {
  AgentClosedListAndAdvanceFilterItems,
  AgentClosedListAndAdvanceFilterRequest,
  AgentClosedListAndAdvanceFilterResponse,
  AgentTicketClosedAdvanceFilterFormType,
  TicketClosedSearchFormType,
} from "./@types/@agentTicketClosedTypes";
import useAgentTicketClosedAdvanceFilter from "./helper/hooks/useAgentTicketClosedAdvanceFilter";
import AgentTicketClosedTableModel from "./helper/models/AgentTicketClosedTableModel";
import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
} from "../AgentTicketAllList/@types/@agentTicketAllTypes";

const advanceFilterItems = [
  "servicesName",
  "topicIdsId",
  "originName",
  "rateId",
  "dateDateStart",
  "dateDateEnd",
  "ticketStatusName",
  // column search
  "ticketNumber",
  "nationalCode",
  "personalityCode",
  "mobileNumber",
];

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const AgentTicketClosedList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<AgentClosedListAndAdvanceFilterItems[]>(
    []
  );
  const [totalElements, setTotalElements] = useState(0);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [searchForm] = Form.useForm<TicketClosedSearchFormType>();
  const [form] = Form.useForm<AgentTicketClosedAdvanceFilterFormType>();
  const { filterItemsList } = useAgentTicketClosedAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isListLoading }] =
    useLazyAgentClosedListAndAdvanceFilterQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const { from, to } = formatDateRangeForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
    });

    const requestParams: AgentClosedListAndAdvanceFilterRequest = {
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,

      // modal search
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.topicIdsId && { topicIds: url?.topicIdsId }),
      ...(url?.originName && { origin: url?.originName }),
      ...(url?.rateId && {
        rates: url?.rateId,
      }),
      ...(from && { from }),
      ...(to && { to }),
      ...(url?.ticketStatusName && {
        status: url?.ticketStatusName,
      }),

      // column search
      ...(url?.ticketNumber && { ticketNumber: url?.ticketNumber }),
      ...(url?.nationalCode && { nationalCode: url?.nationalCode }),
      ...(url?.personalityCode && { personalCode: url?.personalityCode }),
      ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber }),
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestParams.sortBy = sorting.sortBy;
      } else {
        delete requestParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestParams.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestParams.sortDirection;
      }
    }

    getList(requestParams)
      .unwrap()
      .then((value: AgentClosedListAndAdvanceFilterResponse) => {
        setDataSource(value?.content);
        setTotalElements(value?.totalElements);
      });
  }, [
    url?.page,
    url?.pageSize,
    ...advanceFilterItems.map((key) => url?.[key]),
    url?.sortings,
  ]);

  //* ================================ Util Functions ================================

  // handler
  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  // search
  const searchBasedNationalCodeHandler = (value: string) => {
    if (!url?.nationalCode && !value) {
      searchForm.setFieldsValue({ nationalCode: undefined });
    } else {
      if (!value && url?.nationalCode) {
        const newParams = { ...url };
        delete newParams?.nationalCode;

        setSearchParams(newParams);
      } else {
        searchForm.validateFields().then((value) => {
          setSearchParams({
            ...url,
            nationalCode: value?.nationalCode,
          });
        });
      }
    }
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
  const column = AgentTicketClosedTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}

      <div className="mt-10">
        <ToolBox
          className="mt-4"
          rightSide={
            <div className="flex flex-wrap gap-2">
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={() => setIsAdvanceModalOpen(true)}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
              {viewMode === "card" && (
                <Form form={searchForm}>
                  <CustomSearchBox<{ nationalCode: string }>
                    urlKey="nationalCode"
                    mode="url"
                    placeholder="جستجو بر اساس کد ملی / فراگیر"
                    rules={[NATIONAL_OR_FOREIGN_CODE_RULE]}
                    className="w-65"
                    form={searchForm}
                    onChange={searchBasedNationalCodeHandler}
                    hasUrlSync={false}
                  />
                </Form>
              )}
            </div>
          }
          leftSide={
            <div className="flex flex-wrap gap-2">
              <CustomSegmented
                value={viewMode}
                onChange={handleViewModeChange}
                options={[
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
                ]}
              />
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
          }
        />
        {viewMode === "card" ? (
          !dataSource || dataSource?.length === 0 ? (
            <Div loading={isListLoading}>
              <div className="mt-50">
                <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
              </div>
            </Div>
          ) : (
            <Div loading={isListLoading}>
              <Row gutter={[16, 24]} className="mt-4">
                {dataSource.map((item) => (
                  <Col key={item?.uuid} span={24}>
                    <TicketCard
                      ribbonStatus={
                        item?.status?.name?.toUpperCase() as keyof typeof ticketStatusMap
                      }
                      ticketNumber={+item?.ticketNumber}
                      title={item?.title}
                      description={item?.lastMessage}
                      userName={
                        <Link
                          to={{
                            pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
                            search: makeSearchParams({
                              id: item?.userId,
                            }),
                          }}
                        >
                          {item?.fullName}
                        </Link>
                      }
                      userCode={item?.nationalCode}
                      date={convertDateToPersianTextDateWithTime(item?.createdAt)}
                      priority={
                        item?.priority?.name?.toUpperCase() as AgentTicketAllTicketPriority
                      }
                      topTag={item?.topic?.title}
                      service={item?.service?.name}
                      step={
                        item?.originTicket?.name?.toUpperCase() as AgentTicketAllTicketType
                      }
                      borderColor={
                        item?.originTicket?.name?.toUpperCase() === "REFERENCED"
                          ? "border-orange-500"
                          : undefined
                      }
                      stepIcon={
                        item?.originTicket?.name?.toUpperCase() === "PRIMARY" ? (
                          <PiCircleDashed />
                        ) : (
                          <PiArrowUUpLeft />
                        )
                      }
                      actionButtons={
                        <Link
                          to={{
                            pathname: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
                            search: makeSearchParams({
                              ticketId: item?.uuid,
                            }),
                          }}
                        >
                          <CustomButton
                            icon={<PiArrowLeft />}
                            iconPlacement="end"
                            type="primary"
                          >
                            مشاهده
                          </CustomButton>
                        </Link>
                      }
                      rate={{ count: 5, value: item?.rate }}
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
            </Div>
          )
        ) : (
          <div className="mt-4">
            <CustomTable<AgentClosedListAndAdvanceFilterItems>
              dataSource={dataSource}
              loading={isListLoading}
              columns={column}
              rowKey="id"
              draggableColumns
              draggableId={ExcelCodes.TICKETING_AGENT_CLOSED_LIST_TABLE}
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
            />
          </div>
        )}
        <Div loading={isListLoading}>
          <CustomTotalTableItems
            totalCount={totalElements}
            label="تعداد کل تیکت ها"
            className="mt-2"
          />
        </Div>
      </div>
    </>
  );
};

export default AgentTicketClosedList;
