import { useEffect, useMemo, useRef, useState } from "react";

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
import { useLazyTicketingAgentAssignedToMeAnsweredListQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  TicketingAgentAssignedToMeAnsweredAdvanceFilterFormType,
  TicketingAgentAssignedToMeAnsweredListRequest,
  TicketingAgentAssignedToMeAnsweredListResponse,
  TicketingAgentAssignedToMeAnsweredPriority,
  TicketingAgentAssignedToMeAnsweredRecord,
  TicketingAgentAssignedToMeAnsweredType,
} from "./@types/@agentTicketAssignedToMeAnsweredList";
import useAgentTicketAssignedToMeAnsweredAdvanceFilter from "./helper/hooks/useAgentTicketAssignedToMeAnsweredAdvanceFilter";
import AgentTicketAssignedToMeAnsweredTableModel from "./helper/models/AgentTicketAssignedToMeAnsweredTableModel";
import { ViewMode } from "../../../@types/@agentTicketAssignedToTypes";

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

const advanceFilterItems = [
  // modal search
  "servicesName",
  "topicIdsId",
  "originName",
  "priorityName",
  "dateDateStart",
  "dateDateEnd",
  // column search
  "ticketNumber",
  "nationalCode",
  "personalityCode",
  "mobileNumber",
];

const AgentTicketAssignedToMeAnsweredList = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [data, setData] = useState<TicketingAgentAssignedToMeAnsweredRecord[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const { params, setSearchParams } = useQueryParams();
  const prevSegment = useRef(params?.segment);
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [searchForm] = Form.useForm<{ nationalCode: string }>();
  const [form] = Form.useForm<TicketingAgentAssignedToMeAnsweredAdvanceFilterFormType>();
  const { filterItemsList } = useAgentTicketAssignedToMeAnsweredAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const currentPage = params?.page ? Number(params.page) : 1;
  const pageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================ API ================================

  const [getData, { isFetching: isGetDataLoading }] =
    useLazyTicketingAgentAssignedToMeAnsweredListQuery();
  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.status !== "1" || params?.segment !== "answered") return;

    const { from, to } = formatDateRangeForApi({
      from: params?.dateDateStart,
      to: params?.dateDateEnd,
    });

    const requestAdvanceFilterParams: TicketingAgentAssignedToMeAnsweredListRequest = {
      pageNumber: params?.page ? Number(params?.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
      // modal search
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.topicIdsId && { topicIds: params?.topicIdsId }),
      ...(params?.originName && { origin: params?.originName }),
      ...(params?.priorityName && { priorities: params?.priorityName }),
      ...(from && { from }),
      ...(to && { to }),
      // column search
      ...(params?.ticketNumber && { ticketNumber: params?.ticketNumber }),
      ...(params?.nationalCode && { nationalCode: params?.nationalCode }),
      ...(params?.personalityCode && { personalCode: params?.personalityCode }),
      ...(params?.mobileNumber && { mobileNumber: params?.mobileNumber }),
    };

    // sortings
    if (params?.sortings) {
      const sorting = JSON.parse(params?.sortings)?.[0];

      if (sorting?.sortBy) {
        requestAdvanceFilterParams.sortBy = sorting.sortBy;
      } else {
        delete requestAdvanceFilterParams.sortBy;
      }

      if (sorting?.sortOrder) {
        requestAdvanceFilterParams.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete requestAdvanceFilterParams.sortDirection;
      }
    }

    getData(requestAdvanceFilterParams)
      .unwrap()
      .then((value: TicketingAgentAssignedToMeAnsweredListResponse) => {
        setData(value?.content);
        setTotalElements(value?.totalElements);
      });
  }, [
    params?.page,
    params?.pageSize,
    ...advanceFilterItems.map((key) => params?.[key]),
    params?.sortings,
    params?.segment,
    params?.status,
  ]);

  useEffect(() => {
    if (prevSegment.current !== params?.segment) {
      setBadgeCount("0");
      form.resetFields();
    }

    prevSegment.current = params?.segment;
  }, [params?.segment]);

  //* ================================ Derived Data (Card mode) ================================
  const paginatedCardData = useMemo(() => {
    return data ?? [];
  }, [data]);
  //* ================================ Util Functions ================================
  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    setSearchParams({
      ...params,
      page: newPageSize !== pageSize ? "1" : page.toString(),
      pageSize: newPageSize.toString(),
    });
  };

  const searchBasedNationalCodeHandler = (value: string) => {
    if (!params?.nationalCode && !value) {
      searchForm.setFieldsValue({ nationalCode: undefined });
      return;
    }

    if (!value && params?.nationalCode) {
      const newParams = { ...params };
      delete newParams.nationalCode;

      setSearchParams(newParams);
      return;
    }

    searchForm.validateFields(["nationalCode"]).then(() => {
      setSearchParams({
        ...params,
        nationalCode: value,
      });
    });
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const columns = AgentTicketAssignedToMeAnsweredTableModel();

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
          defaultParams={params}
        />
      )}

      <ToolBox
        className="mt-4"
        rightSide={
          <div className="flex flex-wrap gap-3">
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
                  hasUrlSync={false}
                  onChange={searchBasedNationalCodeHandler}
                />
              </Form>
            )}
          </div>
        }
        leftSide={
          <div className="flex flex-wrap gap-3">
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
        !data || data?.length === 0 ? (
          <Div loading={isGetDataLoading}>
            <div className="mt-50">
              <CustomEmpty description="نتیجه‌ای یافت نشد." />
            </div>
          </Div>
        ) : (
          <Div loading={isGetDataLoading}>
            <Row gutter={[16, 24]} className="mt-4">
              {paginatedCardData.map((item) => (
                <Col key={item?.ticketNumber} span={24}>
                  <TicketCard
                    ticketNumber={item?.ticketNumber}
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
                      item?.priority?.name?.toUpperCase() as TicketingAgentAssignedToMeAnsweredPriority
                    }
                    topTag={item?.topic?.title}
                    service={item?.service?.name}
                    step={
                      item?.originTicket?.name?.toUpperCase() as TicketingAgentAssignedToMeAnsweredType
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
                    waitingTime={item?.waitingDays?.toString()}
                  />
                </Col>
              ))}
            </Row>

            <div className="mt-4 flex">
              <CustomPagination
                current={currentPage}
                total={totalElements}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger
                showQuickJumper
                pageSizeOptions={["8", "10", "20", "50", "100"]}
              />
            </div>
          </Div>
        )
      ) : (
        <CustomTable<TicketingAgentAssignedToMeAnsweredRecord>
          className="mt-4"
          dataSource={data}
          columns={columns}
          rowKey="ticketNumber"
          loading={isGetDataLoading}
          draggableColumns
          draggableId={ExcelCodes.TICKETING_AGENT_ASSIGNED_TO_ME_ANSWERED_LIST_TABLE}
          pagination={manualPaginationConfig({
            total: totalElements,
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
        />
      )}

      <Div loading={isGetDataLoading}>
        <CustomTotalTableItems
          totalCount={totalElements}
          label="تعداد کل تیکت ها"
          className="mt-2"
        />
      </Div>
    </>
  );
};

export default AgentTicketAssignedToMeAnsweredList;
