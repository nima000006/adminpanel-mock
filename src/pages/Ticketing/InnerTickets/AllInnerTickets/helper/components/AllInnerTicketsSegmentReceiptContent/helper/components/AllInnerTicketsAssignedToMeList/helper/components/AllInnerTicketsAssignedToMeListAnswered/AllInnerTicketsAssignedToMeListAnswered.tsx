import { useEffect, useRef, useState } from "react";

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
import { TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { useLazyAllInnerTicketReceivedAssignedToMeAnsweredQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";
import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";

import {
  AllInnerTicketReceivedAssignedToMeAnsweredRecordType,
  AllInnerTicketReceivedAssignedToMeAnsweredRequest,
  AllInnerTicketReceivedAssignedToMeAnsweredResponse,
  InnerTicketsAssignedToMeReceivedAnsweredAdvanceFilterFormType,
} from "./@types/@allInnerTicketsAssignedToMeListAnswered";
import useInnerTicketsAssignedToMeAdvanceAnsweredFilter from "./helper/hooks/useAllInnerTicketsAssignedToMeAnsweredAdvanceFilter";
import AllInnerTicketsAssignedToMeAnsweredTableModel from "./helper/models/AllInnerTicketsAssignedToMeAnsweredTableModel";
import { ViewMode } from "../../../@types/utilTypes";

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
  // modal search
  "provinceId",
  "cityId",
  "businessId",
  "branchId",
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
const AllInnerTicketsAssignedToMeListAnswered = () => {
  const [segmentViewType, setSegmentViewType] = useState<ViewMode>("card");

  const [dataList, setDataList] =
    useState<AllInnerTicketReceivedAssignedToMeAnsweredResponse>();

  const { params, setSearchParams } = useQueryParams();
  const prevSegment = useRef(params?.segment);

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [form] =
    Form.useForm<InnerTicketsAssignedToMeReceivedAnsweredAdvanceFilterFormType>();
  const { filterItemsList } = useInnerTicketsAssignedToMeAdvanceAnsweredFilter({
    isAdvanceModalOpen,
    form,
  });
  const [searchForm] = Form.useForm<{ nationalCode: string }>();
  const currentPage = params?.page ? Number(params.page) : 1;
  const pageSize = params?.pageSize ? Number(params.pageSize) : 8;

  //? ================================ API ================================

  const [getTicketsAnsweredList, { isFetching: isGetTicketsAnsweredListLoading }] =
    useLazyAllInnerTicketReceivedAssignedToMeAnsweredQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (
      params?.status !== "3" ||
      params?.type !== "receipt" ||
      params?.segment !== "answered"
    )
      return;

    const { from, to } = formatDateRangeForApi({
      from: params?.dateDateStart,
      to: params?.dateDateEnd,
    });
    const requestAdvanceFilterParams: AllInnerTicketReceivedAssignedToMeAnsweredRequest =
      {
        pageNumber: params?.page ? Number(params?.page) - 1 : 0,
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

    getTicketsAnsweredList(requestAdvanceFilterParams)
      .unwrap()
      .then((value: AllInnerTicketReceivedAssignedToMeAnsweredResponse) => {
        setDataList(value);
      });
  }, [
    params?.page,
    params?.pageSize,
    ...advanceFilterItems.map((key) => params?.[key]),
    params?.sortings,
    params?.status,
    params?.type,
    params?.segment,
  ]);

  useEffect(() => {
    if (prevSegment.current !== params?.segment) {
      setBadgeCount("0");
      form.resetFields();
    }

    prevSegment.current = params?.segment;
  }, [params?.segment]);

  //* ================================ Util Functions ================================

  // card paginate
  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      ...params,
      page: page?.toString(),
      pageSize: (pageSize || 8).toString(),
    });
  };

  const handleViewModeChange = (value: unknown) => {
    setSegmentViewType(value === "card" ? "card" : "table");
  };

  const searchBasedNationalCodeHandler = (value?: string) => {
    const nationalCodeValue = value ?? searchForm.getFieldValue("nationalCode") ?? "";

    if (!params?.nationalCode && !nationalCodeValue) {
      searchForm.setFieldsValue({ nationalCode: undefined });
      return;
    }

    if (!nationalCodeValue && params?.nationalCode) {
      const newParams = { ...params };
      delete newParams.nationalCode;

      setSearchParams(newParams);
      return;
    }

    searchForm.validateFields(["nationalCode"]).then((values) => {
      setSearchParams({
        ...params,
        nationalCode: values.nationalCode,
      });
    });
  };

  const column = AllInnerTicketsAssignedToMeAnsweredTableModel();

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

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
            {segmentViewType === "card" && (
              <Form form={searchForm}>
                <CustomSearchBox<{ nationalCode: string }>
                  urlKey="nationalCode"
                  mode="url"
                  placeholder="جستجو بر اساس کد ملی / فراگیر"
                  rules={[NATIONAL_OR_FOREIGN_CODE_RULE]}
                  className="w-65"
                  form={searchForm}
                  onChange={searchBasedNationalCodeHandler}
                  onPressEnter={() => searchBasedNationalCodeHandler()}
                  hasUrlSync={false}
                />
              </Form>
            )}
          </div>
        }
        leftSide={
          <div className="flex flex-wrap gap-2">
            <CustomSegmented
              value={segmentViewType}
              onChange={handleViewModeChange}
              options={optionType}
            />
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          </div>
        }
      />
      {segmentViewType === "card" ? (
        <Div loading={isGetTicketsAnsweredListLoading}>
          {!dataList || dataList?.content?.length === 0 ? (
            <div className="mt-50">
              <CustomEmpty description="نتیجه‌ای یافت نشد." />
            </div>
          ) : (
            <>
              <Row gutter={[16, 24]} className="mt-4">
                {dataList?.content?.map((item) => (
                  <Col key={item.ticketNumber} span={24}>
                    <TicketCard
                      ticketNumber={+item?.ticketNumber}
                      title={item?.title}
                      description={item?.description}
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
                      userCode={item.nationalCode}
                      date={convertDateToPersianTextDateWithTime(item?.createdAt)}
                      priority={
                        item?.priority?.name?.toUpperCase() as AgentTicketAllTicketPriority
                      }
                      topTag={item?.topic?.title}
                      service={item.service?.name}
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
                            pathname: TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
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
                      }
                    />
                  </Col>
                ))}
              </Row>
              <div className="mt-4 flex">
                <CustomPagination
                  current={currentPage}
                  total={dataList?.totalElements ?? 0}
                  pageSize={pageSize}
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
          <CustomTable<AllInnerTicketReceivedAssignedToMeAnsweredRecordType>
            dataSource={dataList?.content}
            loading={isGetTicketsAnsweredListLoading}
            columns={column}
            rowKey="ticketNumber"
            draggableColumns
            draggableId={
              ExcelCodes.TICKETING_ALL_RECEIVED_INNER_TICKETS_ASSIGNED_TO_ME_ANSWERED_TABLE
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
      <Div loading={isGetTicketsAnsweredListLoading}>
        <CustomTotalTableItems
          totalCount={dataList?.totalElements ?? 0}
          label="تعداد کل تیکت ها"
          className="mt-2"
        />
      </Div>
    </>
  );
};

export default AllInnerTicketsAssignedToMeListAnswered;
