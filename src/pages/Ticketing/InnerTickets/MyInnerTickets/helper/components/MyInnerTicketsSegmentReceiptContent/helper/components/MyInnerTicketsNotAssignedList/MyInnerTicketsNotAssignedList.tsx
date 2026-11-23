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
  useLazyInnerTicketReceivedUnAssignedListAndAdvanceFilterQuery,
  useTicketingMyAssignToMeMutation,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import { NATIONAL_OR_FOREIGN_CODE_RULE } from "@infra/validation/validationSchema";
import { formatDateRangeForApi } from "@pages/_shared/utils/formatDateRangeForApi";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";

import {
  InnerTicketReceivedUnAssignedListAndAdvanceFilterItems,
  InnerTicketReceivedUnAssignedListAndAdvanceFilterRequest,
  InnerTicketReceivedUnAssignedListAndAdvanceFilterResponse,
  InnerTicketsReceivedUnAssignedAdvanceFilterFormType,
} from "./@types/@InnerTicketsNotAssignedListTypes";
import useMyInnerTicketsNotAssignedAdvanceFilter from "./helper/hooks/useMyInnerTicketsNotAssignedAdvanceFilter";
import InnerTicketsNotAssignedTableModel from "./helper/models/MyInnerTicketsNotAssignedTableModel";
import { ViewMode } from "../MyInnerTicketsAllList/helper/components/@types/utilTypes";
import { SortOrder } from "../MyInnerTicketsAssignedToMeList/@types/utilTypes";

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
  "waitingDayId",
  "dateDateStart",
  "dateDateEnd",
  // column search
  "ticketNumber",
  "nationalCode",
  "personalityCode",
  "mobileNumber",
];

const MyInnerTicketsNotAssignedList = ({
  getBannerHandler,
}: {
  getBannerHandler: () => void;
}) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [dataSource, setDataSource] = useState<
    InnerTicketReceivedUnAssignedListAndAdvanceFilterItems[]
  >([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState({ isOpen: false, id: "-1" });
  const [form] = Form.useForm<InnerTicketsReceivedUnAssignedAdvanceFilterFormType>();

  const { filterItemsList } = useMyInnerTicketsNotAssignedAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  const [searchForm] = Form.useForm<{ nationalCode: string }>();

  //? ================================  Api Calls ================================
  const [getList, { isFetching: isListLoading }] =
    useLazyInnerTicketReceivedUnAssignedListAndAdvanceFilterQuery();

  const [assignToMe, { isLoading: isAssignToMeLoading }] =
    useTicketingMyAssignToMeMutation();
  //? ================================ Effects ================================

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
    const requestParams: InnerTicketReceivedUnAssignedListAndAdvanceFilterRequest = {
      pageNumber: page ? Number(page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url?.pageSize) : 8,
      // modal search
      ...(url?.provinceId && { provinceIds: url?.provinceId }),
      ...(url?.cityId && { cityIds: url?.cityId }),
      ...(url?.businessId && { businessIds: url?.businessId }),
      ...(url?.branchId && { branchIds: url?.branchId }),
      ...(url?.servicesName && { services: url?.servicesName }),
      ...(url?.topicIdsId && { topicIds: url?.topicIdsId }),
      ...(url?.originName && { origin: url?.originName }),
      ...(url?.priorityName && { priority: url?.priorityName }),
      ...(url?.waitingDayId && { waitingDay: url?.waitingDayId }),
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
  };

  // success
  const getListOnSuccess = useCallback(
    (response: InnerTicketReceivedUnAssignedListAndAdvanceFilterResponse) => {
      setDataSource(response?.content);
      setTotalElements(response?.totalElements);
    },
    []
  );

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

  // Assign To Me
  const notAssignedToMeHandler = (ticketId: string) => {
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
        if (dataSource?.length === 1 && url?.page && Number(url?.page) > 1) {
          setSearchParams({ ...url, page: String(Number(url.page) - 1) });
          getListHandler(String(Number(url.page) - 1));
        } else {
          getListHandler();
        }
      });
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
  const column = InnerTicketsNotAssignedTableModel({
    onNotAssignedToMeHandler: notAssignedToMeHandler,
  });

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
          closeModalHandler={() => setIsAdvanceModalOpen(false)}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
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
                  disabled={dataSource?.length === 0}
                  icon={sortIcon}
                  iconPlacement="end"
                  onClick={toggleSortOrder}
                >
                  زمان انتظار
                </CustomButton>
                <Form form={searchForm}>
                  <CustomSearchBox<{ nationalCode: string }>
                    className="w-65"
                    urlKey="nationalCode"
                    mode="url"
                    placeholder="جستجو بر اساس کد ملی / فراگیر"
                    rules={[NATIONAL_OR_FOREIGN_CODE_RULE]}
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
              onChange={(val) => setViewMode(val as "card" | "table")}
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
        <Div loading={isListLoading}>
          {!dataSource || dataSource?.length === 0 ? (
            <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
          ) : (
            <>
              <Row gutter={[16, 24]} className="mt-4">
                {dataSource?.map((item) => (
                  <Col key={item?.uuid} span={24}>
                    <TicketCard
                      ticketNumber={+item?.ticketNumber}
                      title={item?.title}
                      topTag={item?.topic?.title}
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
                      priority={item?.priority?.name}
                      service={item?.service?.name}
                      step={item?.originTicket?.name}
                      borderColor={
                        item?.originTicket?.name?.toUpperCase() === "REFERENCED"
                          ? "border-orange-500"
                          : undefined
                      }
                      stepIcon={
                        item?.originTicket?.name === "PRIMARY" ? (
                          <PiCircleDashed />
                        ) : (
                          <PiArrowUUpLeft />
                        )
                      }
                      actionButtons={
                        <div className="flex flex-wrap gap-2">
                          <CustomButton onClick={() => notAssignedToMeHandler(item.uuid)}>
                            تخصیص
                          </CustomButton>
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
            </>
          )}
        </Div>
      ) : (
        <div className="mt-4">
          <CustomTable<InnerTicketReceivedUnAssignedListAndAdvanceFilterItems>
            dataSource={dataSource}
            loading={isListLoading}
            columns={column}
            rowKey="ticketNumber"
            draggableColumns
            draggableId={
              ExcelCodes.TICKETING_MY_RECEIVED_INNER_TICKETS_NOT_ASSIGNED_LIST_TABLE
            }
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
    </>
  );
};
export default MyInnerTicketsNotAssignedList;
