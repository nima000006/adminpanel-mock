import { useEffect, useMemo, useState } from "react";

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
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
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
import {
  useLazyInnerTicketReceivedAllListQuery,
  useTicketingMyAssignToMeMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";
import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";

import {
  InnerTicketReceivedAllListRequest,
  InnerTicketReceivedAllListResponse,
  InnerTicketReceivedAllRecord,
  InnerTicketsAllAdvanceFilterFormType,
} from "./@types/@InnerTicketsAllTypes";
import { SortOrder, ViewMode } from "./helper/components/@types/utilTypes";
import useInnerTicketsAllAdvanceFilter from "./helper/hooks/useMyInnerTicketsAllAdvanceFilter";
import MyInnerTicketsAllTableModel from "./helper/models/MyInnerTicketsAllTableModel";

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
  "priorityName",
  "ticketStatusName",
  "dateDateStart",
  "dateDateEnd",
  // column search
  "ticketNumber",
  "nationalCode",
  "personalityCode",
  "mobileNumber",
];

const MyInnerTicketsAllList = ({
  getBannerHandler,
}: {
  getBannerHandler: () => void;
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("card");

  const [data, setData] = useState<InnerTicketReceivedAllRecord[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const { params, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState({ isOpen: false, id: "-1" });
  const [form] = Form.useForm<InnerTicketsAllAdvanceFilterFormType>();
  const { filterItemsList } = useInnerTicketsAllAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const [searchForm] = Form.useForm<{ nationalCode: string }>();

  const currentPage = params?.page ? Number(params.page) : 1;
  const pageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================ API ================================
  const [getAllTickets, { isFetching: isGetAllTicketsLoading }] =
    useLazyInnerTicketReceivedAllListQuery();

  const [assignToMe, { isLoading: isAssignToMeLoading }] =
    useTicketingMyAssignToMeMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListHandler();
  }, [
    params?.page,
    params?.pageSize,
    ...advanceFilterItems.map((key) => params?.[key]),
    params?.sortings,
  ]);

  //* ================================ Derived Data (Card mode) ================================
  const paginatedCardData = useMemo(() => {
    return data ?? [];
  }, [data]);

  //* ================================ Util Functions ================================
  const getListHandler = (page: string = params?.page) => {
    if (params?.status !== "5" && params?.type !== "receipt") return;

    const { from, to } = formatDateRangeForApi({
      from: params?.dateDateStart,
      to: params?.dateDateEnd,
    });

    const requestAdvanceFilterParams: InnerTicketReceivedAllListRequest = {
      pageNumber: page ? Number(page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
      // modal search
      ...(params?.provinceId && { provinceIds: params?.provinceId }),
      ...(params?.cityId && { cityIds: params?.cityId }),
      ...(params?.businessId && { businessIds: params?.businessId }),
      ...(params?.branchId && { branchIds: params?.branchId }),
      ...(params?.servicesName && { services: params?.servicesName }),
      ...(params?.topicIdsId && { topicIds: params?.topicIdsId }),
      ...(params?.originName && { origin: params?.originName }),
      ...(params?.priorityName && { priority: params?.priorityName }),
      ...(params?.ticketStatusName && { status: params?.ticketStatusName }),
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

    getAllTickets(requestAdvanceFilterParams)
      .unwrap()
      .then((value: InnerTicketReceivedAllListResponse) => {
        setData(value?.content);
        setTotalElements(value?.totalElements);
      });
  };

  // Assign To Me
  const assignHandler = (ticketId: string) => {
    setIsConfirmOpen({ isOpen: true, id: ticketId });
  };

  const closeAssignToMeHandler = () => {
    setIsConfirmOpen({ isOpen: false, id: "-1" });
  };

  const onConfirmClickHandler = () => {
    assignToMe(isConfirmOpen.id)
      .unwrap()
      .then(() => {
        closeAssignToMeHandler();
        getBannerHandler();

        // if the last item of the page assigned to other, go to the previous page
        // if the page is one, we don't need to go to the previous page, because it will be empty and we will have no data to show
        if (data?.length === 1 && params?.page && Number(params?.page) > 1) {
          setSearchParams({ ...params, page: String(Number(params.page) - 1) });
          getListHandler(String(Number(params.page) - 1));
        } else {
          getListHandler();
        }
      });
  };

  const sortOrder = useMemo<SortOrder>(() => {
    if (!params?.sortings) return "none";

    try {
      const sorting = JSON.parse(params.sortings)?.[0];

      return sorting?.sortOrder || "none";
    } catch {
      return "none";
    }
  }, [params?.sortings]);

  // card sorting
  const toggleSortOrder = () => {
    const next = sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";

    const newParams = { ...params };

    if (next === "none") {
      delete newParams.sortings;

      setSearchParams(newParams);
    } else {
      setSearchParams({
        ...newParams,
        sortings: JSON.stringify([
          {
            sortBy: "modifiedDate",
            sortOrder: next,
          },
        ]),
      });
    }
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

  const columns = MyInnerTicketsAllTableModel({
    onAssignHandler: assignHandler,
  });

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      ...params,
      page: page?.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  const searchBasedNationalCodeHandler = (value: string) => {
    if (!params?.nationalCode && !value) {
      searchForm.setFieldsValue({ nationalCode: undefined });
    } else {
      if (!value && params?.nationalCode) {
        const newParams = { ...params };
        delete newParams?.nationalCode;

        setSearchParams(newParams);
      } else {
        searchForm.validateFields().then((value) => {
          setSearchParams({
            ...params,
            nationalCode: value?.nationalCode,
          });
        });
      }
    }
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isConfirmOpen?.isOpen && (
        <ConfirmationModalWithContent
          isModalOpen={isConfirmOpen?.isOpen}
          closeModalHandler={closeAssignToMeHandler}
          title="تخصیص تیکت!"
          content="آیا از تخصیص تیکت به خود اطمینان دارید؟"
          confirmBtnText="تایید و تخصیص"
          backBtnText="انصراف"
          onConfirmClickHandler={onConfirmClickHandler}
          isConfirmButtonLoading={isAssignToMeLoading}
        />
      )}
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
              <>
                <CustomButton
                  icon={sortIcon}
                  disabled={data?.length === 0}
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
          <Div loading={isGetAllTicketsLoading}>
            <div className="mt-50">
              <CustomEmpty description="نتیجه‌ای یافت نشد." />
            </div>
          </Div>
        ) : (
          <Div loading={isGetAllTicketsLoading}>
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
                    ribbonStatus={
                      item?.status?.name?.toUpperCase() as keyof typeof ticketStatusMap
                    }
                    assign={
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
                      ) : null
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
                          {item?.closedBy}
                        </Link>
                      ) : null
                    }
                    waitingTime={
                      item?.status?.name?.toUpperCase() === "UNASSIGNED" ||
                      item?.status?.name?.toUpperCase() === "WAITING_FOR_REPLY"
                        ? item?.waitingDays?.toString()
                        : undefined
                    }
                    rate={
                      item?.status?.name?.toUpperCase() === "ADMIN_CLOSED" ||
                      item?.status?.name?.toUpperCase() === "USER_CLOSED" ||
                      item?.status?.name?.toUpperCase() === "AUTO_CLOSED"
                        ? {
                            value: Number(item?.rating),
                            count: 5,
                          }
                        : undefined
                    }
                    actionButtons={
                      <div className="flex flex-wrap items-center gap-2">
                        {item?.status?.name?.toUpperCase() === "UNASSIGNED" && (
                          <CustomButton onClick={() => assignHandler(item.uuid)}>
                            تخصیص
                          </CustomButton>
                        )}
                        {item?.status?.name?.toUpperCase() === "WAITING_FOR_REPLY" ? (
                          <Link
                            to={{
                              pathname: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
                              search: makeSearchParams({
                                ticketId: item?.uuid,
                                from: "innerTicket",
                              }),
                            }}
                          >
                            <CustomButton
                              icon={<PiArrowLeft />}
                              iconPlacement="end"
                              type="primary"
                            >
                              پاسخ
                            </CustomButton>
                          </Link>
                        ) : (
                          <Link
                            to={{
                              pathname: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
                              search: makeSearchParams({
                                ticketId: item?.uuid,
                                from: "innerTicket",
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
                        )}
                      </div>
                    }
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
              />
            </div>
          </Div>
        )
      ) : (
        <CustomTable<InnerTicketReceivedAllRecord>
          className="mt-4"
          dataSource={data}
          columns={columns}
          rowKey="ticketNumber"
          loading={isGetAllTicketsLoading}
          draggableColumns
          draggableId={ExcelCodes.TICKETING_MY_RECEIVED_INNER_TICKETS_ALL_TABLE}
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
      <Div loading={isGetAllTicketsLoading}>
        <CustomTotalTableItems
          totalCount={totalElements ?? 0}
          label="تعداد کل تیکت ها"
          className="mt-2"
        />
      </Div>
    </>
  );
};

export default MyInnerTicketsAllList;
