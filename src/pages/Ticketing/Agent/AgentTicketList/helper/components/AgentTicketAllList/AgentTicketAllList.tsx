import { useEffect, useMemo, useState } from "react";

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
  useLazyTicketAllAdvancedFilterByExpertQuery,
  useTicketingMyAssignToMeMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  AgentTicketAllAdvanceFilterFormType,
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
  AllTicketSearchFormType,
  TicketAllAdvancedFilterByExpertItems,
  TicketAllAdvancedFilterByExpertRequest,
  TicketAllAdvancedFilterByExpertResponse,
  ViewMode,
} from "./@types/@agentTicketAllTypes";
import useAgentTicketAllAdvanceFilter from "./helper/hooks/useAgentTicketAllAdvanceFilter";
import AgentTicketAllTableModel from "./helper/models/AgentTicketAllTableModel";
import { ticketStatusMap } from "../../../../../_shared/utils/utils";

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

const AgentTicketAllList = ({ getBannerHandler }: { getBannerHandler: () => void }) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [data, setData] = useState<TicketAllAdvancedFilterByExpertResponse>();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState({ isOpen: false, id: "-1" });
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [form] = Form.useForm<AgentTicketAllAdvanceFilterFormType>();
  const [searchForm] = Form.useForm<AllTicketSearchFormType>();
  const { filterItemsList } = useAgentTicketAllAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });

  const currentPage = url?.page ? Number(url.page) : 1;
  const pageSize = url?.pageSize ? Number(url.pageSize) : 8;

  //? ================================ API ================================
  const [getAllTicketsAgent, { isFetching: isGetAllTicketsAgentLoading }] =
    useLazyTicketAllAdvancedFilterByExpertQuery();

  const [assignToMe, { isLoading: isAssignToMeLoading }] =
    useTicketingMyAssignToMeMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    getListHandler();
  }, [
    url?.page,
    url?.pageSize,
    url?.status,
    url?.topicIdsId,
    url?.servicesName,
    url?.originName,
    url?.dateDateStart,
    url?.dateDateEnd,
    url?.ticketNumber,
    url?.nationalCode,
    url?.personalCode,
    url?.mobileNumber,
    url?.priorityName,
    url?.ticketStatusName,
    url?.sortings,
  ]);

  //* ================================ Util Functions ================================
  const getListHandler = (page: string = url?.page) => {
    if (url?.status !== "4") return;

    const filters: Partial<TicketAllAdvancedFilterByExpertRequest> = {};
    // ================= Dates =================
    const { from, to } = formatDateRangeForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
    });

    if (from) filters.from = from;
    if (to) filters.to = to;
    // ================= Topic =================
    if (url?.topicIdsId) {
      filters.topicIds = url.topicIdsId;
    }

    // ================= Services =================
    if (url?.servicesName) {
      filters.services = url.servicesName;
    }

    // ================= Origin =================
    if (url?.originId) {
      filters.origin = url.originName;
    }

    // ================= ticket number =================
    if (url?.ticketNumber) {
      filters.ticketNumber = url.ticketNumber;
    }

    // ================= ticket status =================
    if (url?.ticketStatusName) {
      filters.status = url.ticketStatusName;
    }

    // ================= ticket status =================
    if (url?.priorityName) {
      filters.priorities = url.priorityName;
    }

    // ================= personal code  =================
    if (url?.personalCode) {
      filters.personalCode = url.personalCode;
    }

    // ================= national code  =================
    if (url?.nationalCode) {
      filters.nationalCode = url.nationalCode;
    }

    // ================= mobile number  =================
    if (url?.mobileNumber) {
      filters.mobileNumber = url.mobileNumber;
    }

    // ================= sortings =================
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        filters.sortBy = sorting.sortBy;
      } else {
        delete filters.sortBy;
      }

      if (sorting?.sortOrder) {
        filters.sortDirection = sorting.sortOrder.toUpperCase();
      } else {
        delete filters.sortDirection;
      }
    }

    getAllTicketsAgent({
      pageNumber: page ? Number(page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      ...filters,
    })
      .unwrap()
      .then((res) => {
        setData(res);
      });
  };

  const assignToMeHandler = (ticketId: string) => {
    setIsConfirmOpen({ isOpen: true, id: ticketId });
  };

  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setSearchParams({
      ...url,
      page: page.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  const closeAdvanceFilterHandler = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  const columns = AgentTicketAllTableModel({ onAssignToMeHandler: assignToMeHandler });

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

  // Assign To Me
  const closeAssignToMeHandler = () => {
    setIsConfirmOpen({ isOpen: false, id: "-1" });
  };

  const confirmAssignedToMeHandler = () => {
    assignToMe(isConfirmOpen.id)
      .unwrap()
      .then(() => {
        closeAssignToMeHandler();
        getBannerHandler();

        // if the last item of the page assigned to other, go to the previous page
        // if the page is one, we don't need to go to the previous page, because it will be empty and we will have no data to show
        if (data?.content?.length === 1 && url?.page && Number(url?.page) > 1) {
          setSearchParams({ ...url, page: String(Number(url.page) - 1) });
          getListHandler(String(Number(url.page) - 1));
        } else {
          getListHandler();
        }
      });
  };

  //* ================================ Derived Data (Card mode) ================================

  const paginatedCardData = useMemo(() => {
    return data?.content ?? [];
  }, [data?.content]);

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
          isConfirmButtonLoading={isAssignToMeLoading}
          onConfirmClickHandler={confirmAssignedToMeHandler}
        />
      )}
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
      <Div className="agent-ticket-assigned-to-list-container mt-10">
        <ToolBox
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
                  <CustomSearchBox<AllTicketSearchFormType>
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
          !data || data?.content?.length === 0 ? (
            <Div loading={isGetAllTicketsAgentLoading}>
              <div className="mt-50">
                <CustomEmpty description="نتیجه‌ای یافت نشد." />
              </div>
            </Div>
          ) : (
            <Div loading={isGetAllTicketsAgentLoading}>
              <Row gutter={[16, 24]} className="mt-4">
                {paginatedCardData.map((item) => (
                  <Col key={item?.ticketNumber} span={24}>
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
                              value: Number(item?.rate),
                              count: 5,
                            }
                          : undefined
                      }
                      actionButtons={
                        <div className="flex items-center gap-2">
                          {item?.status?.name?.toUpperCase() === "UNASSIGNED" && (
                            <CustomButton onClick={() => assignToMeHandler(item.uuid)}>
                              تخصیص به من
                            </CustomButton>
                          )}
                          {item?.status?.name?.toUpperCase() === "WAITING_FOR_REPLY" ? (
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
                                پاسخ
                              </CustomButton>
                            </Link>
                          ) : (
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
                  total={data?.totalElements}
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
          <CustomTable<TicketAllAdvancedFilterByExpertItems>
            className="mt-4"
            dataSource={data?.content}
            columns={columns}
            rowKey="ticketNumber"
            loading={isGetAllTicketsAgentLoading}
            draggableColumns
            draggableId={ExcelCodes.TICKETING_AGENT_ALL_LIST_TABLE}
            pagination={manualPaginationConfig({
              total: data?.totalElements,
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
        )}

        <Div loading={isGetAllTicketsAgentLoading}>
          <CustomTotalTableItems
            totalCount={data?.totalElements ?? 0}
            label="تعداد کل تیکت ها"
            className="mt-2"
          />
        </Div>
      </Div>
    </>
  );
};

export default AgentTicketAllList;
