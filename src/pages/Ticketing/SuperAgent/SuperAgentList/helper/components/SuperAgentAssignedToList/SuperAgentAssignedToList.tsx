import { useCallback, useEffect, useMemo, useState } from "react";

import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import {
  PiArrowLeft,
  PiArrowUUpLeft,
  PiCaretDownFill,
  PiCaretUpFill,
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
import { TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { useLazySuperAgentAssignedListAndAdvanceFilterQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";

import {
  SuperAgentAssignedAdvanceFilterFormType,
  SuperAgentAssignedListAndAdvanceFilterItems,
  SuperAgentAssignedListAndAdvanceFilterRequest,
  SuperAgentAssignedListAndAdvanceFilterResponse,
  SuperAgentAssignedToTicketPriority,
  SuperAgentAssignedToTicketType,
} from "./@types/@SuperAgentAssignedToListTypes";
import useSuperAgentAssignedToAdvanceFilter from "./helper/hooks/useSuperAgentAssignedToAdvanceFilter";
import SuperAgentAssignedToTableModel from "./helper/models/SuperAgentAssignedToTableModel";
import { ViewMode } from "../_shared/@types/utilTypes";

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
  "provinceId",
  "cityId",
  "businessId",
  "branchId",
  "servicesName",
  "topicIdsId",
  "originName",
  "ticketStatusName",
  "dateDateStart",
  "dateDateEnd",
  // column search
  "ticketNumber",
  "nationalCode",
  "personalityCode",
  "mobileNumber",
];

const SuperAgentAssignedToList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<
    SuperAgentAssignedListAndAdvanceFilterItems[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [form] = Form.useForm<SuperAgentAssignedAdvanceFilterFormType>();
  const [searchForm] = Form.useForm<{ nationalCode: string }>();

  const { filterItemsList } = useSuperAgentAssignedToAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isListLoading }] =
    useLazySuperAgentAssignedListAndAdvanceFilterQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    const { from, to } = formatDateRangeForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
    });
    const requestParams: SuperAgentAssignedListAndAdvanceFilterRequest = {
      pageNumber: url?.page ? Number(url?.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      // modal search
      ...(url?.provinceId && { provinceIds: url?.provinceId }),
      ...(url?.cityId && { cityIds: url?.cityId }),
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.topicIdsId && { topicIds: url?.topicIdsId }),
      ...(url?.originName && { origin: url?.originName }),
      ...(url?.ticketStatusName && { status: url?.ticketStatusName }),
      ...(from && { from }),
      ...(to && { to }),

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

    getList(requestParams).unwrap().then(getListOnSuccess);
  }, [
    url?.page,
    url?.pageSize,
    ...advanceFilterItems.map((key) => url?.[key]),
    url?.sortings,
  ]);

  //* ================================ Util Functions ================================
  // success
  const getListOnSuccess = useCallback(
    (response: SuperAgentAssignedListAndAdvanceFilterResponse) => {
      setDataSource(response?.content);
      setTotalElements(response?.totalElements);
    },
    []
  );

  // handler
  const closeAdvanceFilterModalHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  // card sorting
  const sortOrder = useMemo(() => {
    if (!url?.sortings) return "none";

    try {
      const parsed = JSON.parse(url.sortings);
      return parsed?.[0]?.sortOrder || "none";
    } catch {
      return "none";
    }
  }, [url?.sortings]);

  const toggleSortOrder = () => {
    const next = sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";
    const newParams = { ...url };

    if (next === "none") {
      delete newParams.sortings;
      setSearchParams(newParams);
      return;
    }

    const sortings = [
      {
        sortBy: "modifiedDate",
        sortOrder: next,
      },
    ];

    setSearchParams({ ...newParams, sortings: JSON.stringify(sortings) });
  };

  const sortIcon = useMemo(() => {
    return (
      <div className="flex flex-col">
        <PiCaretUpFill
          className={`cursor-pointer text-[10px] ${
            sortOrder === "asc" ? "text-blue-500" : ""
          }`}
        />
        <PiCaretDownFill
          className={`cursor-pointer text-[10px] ${
            sortOrder === "desc" ? "text-blue-500" : ""
          }`}
        />
      </div>
    );
  }, [sortOrder]);

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
  const column = SuperAgentAssignedToTableModel();

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
          defaultParams={url}
        />
      )}
      <div className="agent-ticket-super-agent-list-container">
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
                <>
                  <CustomButton
                    disabled={dataSource?.length === 0}
                    icon={sortIcon}
                    iconPlacement="end"
                    onClick={toggleSortOrder}
                  >
                    زمان انتظار
                  </CustomButton>
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
                </>
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
                      <div className="flex h-7 items-center justify-center">
                        <PiCopy />
                      </div>
                    ),
                  },
                  {
                    value: "table",
                    label: (
                      <div className="flex h-7 items-center justify-center">
                        <PiTable />
                      </div>
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
          <Div loading={isListLoading}>
            {!dataSource || dataSource?.length === 0 ? (
              <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
            ) : (
              <>
                <Row gutter={[16, 24]} className="mt-4">
                  {dataSource.map((item) => (
                    <Col key={item?.uuid} span={24}>
                      <TicketCard
                        ribbonStatus={
                          item?.status?.name?.toUpperCase() as keyof typeof ticketStatusMap
                        }
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
                          item?.priority?.name?.toUpperCase() as SuperAgentAssignedToTicketPriority
                        }
                        topTag={item?.topic?.title}
                        service={item?.service?.name}
                        step={
                          item?.originTicket?.name?.toUpperCase() as SuperAgentAssignedToTicketType
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
                        waitingTime={item?.waitingDays?.toString()}
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
                        actionButtons={
                          <Link
                            to={{
                              pathname: TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
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
            )}
          </Div>
        ) : (
          <div className="mt-4">
            <CustomTable<SuperAgentAssignedListAndAdvanceFilterItems>
              dataSource={dataSource}
              loading={isListLoading}
              columns={column}
              rowKey="ticketNumber"
              draggableColumns
              draggableId={ExcelCodes.TICKETING_SUPER_AGENT_ASSIGN_LIST_TABLE}
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
export default SuperAgentAssignedToList;
