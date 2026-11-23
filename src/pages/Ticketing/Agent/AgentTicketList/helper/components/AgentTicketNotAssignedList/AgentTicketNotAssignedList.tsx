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
  useLazyTicketAgentAnAssignedListAndAdvanceFilterQuery,
  useTicketingMyAssignToMeMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  AgentTicketNotAssignedAdvanceFilterFormType,
  AgentTicketNotAssignedListAndAdvanceFilterItems,
  AgentTicketNotAssignedListAndAdvanceFilterResponse,
  SortOrder,
  TicketOnAssignedSearchFormType,
  UnAssignListFilterItemsType,
  ViewMode,
} from "./@types/@agentTicketNotAssignedTypes";
import useAgentTicketNotAssignedAdvanceFilter from "./helper/hooks/useAgentTicketNotAssignedAdvanceFilter";
import AgentTicketNotAssignedTableModel from "./helper/models/AgentTicketNotAssignedTableModel";
import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
} from "../AgentTicketAllList/@types/@agentTicketAllTypes";

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
  "servicesName",
  "topicIdsId",
  "originName",
  "priorityName",
  "waitingTimeId",
  "dateDateStart",
  "dateDateEnd",
  "ticketNumber",
  "nationalCode",
  "personalityCode",
  "mobileNumber",
  "dateDateStart",
  "dateDateEnd",
];

const AgentTicketNotAssignedList = ({
  getBannerHandler,
}: {
  getBannerHandler: () => void;
}) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [dataSource, setDataSource] = useState<
    AgentTicketNotAssignedListAndAdvanceFilterItems[]
  >([]);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState({ isOpen: false, id: "-1" });
  const [totalElements, setTotalElements] = useState(0);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [form] = Form.useForm<AgentTicketNotAssignedAdvanceFilterFormType>();
  const { filterItemsList } = useAgentTicketNotAssignedAdvanceFilter({
    form,
    isAdvanceModalOpen,
  });
  const [searchForm] = Form.useForm<TicketOnAssignedSearchFormType>();

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isListLoading }] =
    useLazyTicketAgentAnAssignedListAndAdvanceFilterQuery();

  const [assignToMe, { isLoading: isAssignToMeLoading }] =
    useTicketingMyAssignToMeMutation();

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

  useEffect(() => {
    getListHandler();
  }, [
    url?.page,
    url?.pageSize,
    ...advanceFilterItems.map((key) => url?.[key]),
    url?.sortings,
  ]);

  //* ================================ Util Functions ================================
  const getListHandler = (page: string = url?.page) => {
    const { from, to } = formatDateRangeForApi({
      from: url?.dateDateStart,
      to: url?.dateDateEnd,
    });

    const requestParams: UnAssignListFilterItemsType = {
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.topicIdsId && { topicIds: url?.topicIdsId }),
      ...(url?.originName && { origin: url?.originName }),
      ...(url?.priorityName && {
        priorities: url?.priorityName,
      }),
      ...(url?.waitingTimeId && { waitingDays: url?.waitingTimeId }),

      // column search
      ...(url?.ticketNumber && { ticketNumber: url?.ticketNumber }),
      ...(url?.nationalCode && { nationalCode: url?.nationalCode }),
      ...(url?.personalityCode && { personalCode: url?.personalityCode }),
      ...(url?.mobileNumber && { mobileNumber: url?.mobileNumber }),

      ...(from && { from }),
      ...(to && { to }),
    };

    getList({
      pageNumber: page ? Number(page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      ...requestParams,
      ...sortParams,
    })
      .unwrap()
      .then(getListOnSuccess);
  };

  // success
  const getListOnSuccess = useCallback(
    (response: AgentTicketNotAssignedListAndAdvanceFilterResponse) => {
      setDataSource(response?.content);
      setTotalElements(response?.totalElements);
    },
    []
  );

  // change view
  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  const sortOrder = useMemo<SortOrder>(() => {
    if (!url?.sortings) return "none";

    try {
      const sorting = JSON.parse(url.sortings)?.[0];

      return sorting?.sortOrder || "none";
    } catch {
      return "none";
    }
  }, [url?.sortings]);

  // card sorting
  const toggleSortOrder = () => {
    const next = sortOrder === "none" ? "asc" : sortOrder === "asc" ? "desc" : "none";

    const newParams = { ...url };

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
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`cursor-pointer text-[10px] ${
            sortOrder === "asc" ? "text-blue-500" : ""
          }`}
        />
        <PiCaretDownFill
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`cursor-pointer text-[10px] ${
            sortOrder === "desc" ? "text-blue-500" : ""
          }`}
        />
      </div>
    );
  }, [sortOrder]);

  // card paginate
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      ...url,
      page: page?.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  const assignToMeHandler = (ticketId: string) => {
    setIsConfirmOpen({ isOpen: true, id: ticketId });
  };

  const closeAdvanceFilterModalHandler = () => {
    setIsAdvanceModalOpen(false);
    form.resetFields();
  };

  // table column
  const column = AgentTicketNotAssignedTableModel({
    onAssignToMeHandler: assignToMeHandler,
  });

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
        if (dataSource?.length === 1 && url?.page && Number(url?.page) > 1) {
          setSearchParams({ ...url, page: String(Number(url.page) - 1) });
          getListHandler(String(Number(url.page) - 1));
        } else {
          getListHandler();
        }
      });
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
          isConfirmButtonLoading={isAssignToMeLoading}
          onConfirmClickHandler={confirmAssignedToMeHandler}
          iconType="alert"
        />
      )}
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
                <>
                  <CustomButton
                    icon={sortIcon}
                    disabled={dataSource?.length === 0}
                    iconPlacement="end"
                    onClick={toggleSortOrder}
                  >
                    زمان انتظار
                  </CustomButton>
                  <Form form={searchForm}>
                    <CustomSearchBox<TicketOnAssignedSearchFormType>
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
            <div className="flex gap-2 max-[470px]:flex-wrap">
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
          !dataSource || dataSource?.length === 0 ? (
            <Div loading={isListLoading}>
              <div className="mt-50">
                <CustomEmpty description="نتیجه‌ای یافت نشد." />
              </div>
            </Div>
          ) : (
            <Div loading={isListLoading}>
              <Row gutter={[16, 24]} className="mt-4">
                {dataSource?.map((item) => (
                  <Col key={item.uuid} span={24}>
                    <TicketCard
                      ticketNumber={item?.ticketNumber}
                      topTag={item?.topic?.title}
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
                      service={item?.service.name}
                      step={
                        item?.originTicket?.name?.toUpperCase() as AgentTicketAllTicketType
                      }
                      priority={
                        item?.priority?.name?.toUpperCase() as AgentTicketAllTicketPriority
                      }
                      stepIcon={
                        item?.originTicket?.name?.toUpperCase() === "PRIMARY" ? (
                          <PiCircleDashed />
                        ) : (
                          <PiArrowUUpLeft />
                        )
                      }
                      borderColor={
                        item?.originTicket?.name?.toUpperCase() === "REFERENCED"
                          ? "border-orange-500"
                          : undefined
                      }
                      actionButtons={
                        <div className="flex flex-wrap gap-2">
                          <CustomButton onClick={() => assignToMeHandler(item.uuid)}>
                            تخصیص به من
                          </CustomButton>

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
                        </div>
                      }
                      waitingTime={item?.waitingDays?.toString()}
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
            <CustomTable<AgentTicketNotAssignedListAndAdvanceFilterItems>
              dataSource={dataSource}
              loading={isListLoading}
              columns={column}
              rowKey="id"
              draggableColumns
              draggableId={ExcelCodes.TICKETING_AGENT_NOT_ASSIGNED_LIST_TABLE}
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
            totalCount={totalElements}
            label="تعداد کل تیکت ها"
            className="mt-2"
          />
        </Div>
      </Div>
    </>
  );
};

export default AgentTicketNotAssignedList;
