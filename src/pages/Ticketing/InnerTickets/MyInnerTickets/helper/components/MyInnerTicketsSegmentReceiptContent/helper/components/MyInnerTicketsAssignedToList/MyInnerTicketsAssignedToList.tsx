import { useCallback, useMemo, useState } from "react";

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
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import TicketCard from "@pages/Ticketing/_shared/components/TicketCard/TicketCard";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";
import {
  AgentTicketAllTicketPriority,
  AgentTicketAllTicketType,
} from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAllList/@types/@agentTicketAllTypes";

import useInnerTicketsAssignedToAdvanceFilter from "./helper/hooks/useMyInnerTicketsAssignedToAdvanceFilter";
import MyInnerTicketsAssignedToTableModel from "./helper/models/MyInnerTicketsAssignedToTableModel";
import {
  InnerTicketsAssignedToAdvanceFilterFormType,
  InnerTicketsAssignedToListTypes,
} from "../MyInnerTicketsAllList/helper/components/@types/@InnerTicketsAssignedToListTypes";
import {
  SortOrder,
  ViewMode,
} from "../MyInnerTicketsAllList/helper/components/@types/utilTypes";

const mockData: InnerTicketsAssignedToListTypes[] = [
  {
    id: 1,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-02-14T10:30:00.000Z",
    registrationDate: "2026-02-03T08:45:00.000Z",
    city: "تهران",
    province: "تهران",
    branch: "واحد تهران جنوب",
    originBranch: "تهران جنوب",
    studentOrPersonnelNumber: "9801234567",
    nationalCode: "0012345678",
    userName: "فاطمه قاسمی",
    ticketType: "REFERENCED",
    subjectIssue: "مشکلات مربوط به نمونه ثبت",
    service: "FOOD",
    priority: "CRITICAL",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "waiting",
  },
  {
    id: 2,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-02-04T14:20:00.000Z",
    registrationDate: "2026-02-02T09:15:00.000Z",
    city: "اصفهان",
    province: "اصفهان",
    branch: "واحد اصفهان (خوراسگان)",
    originBranch: "اصفهان (خوراسگان)",
    studentOrPersonnelNumber: "9912345678",
    nationalCode: "1234567890",
    userName: "ابراهیم حسنی",
    ticketType: "PRIMARY",
    subjectIssue: "مشکلات مربوط به نمونه ثبت",
    service: "FOOD",
    priority: "HIGH",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "waiting",
  },
  {
    id: 3,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-02-13T11:00:00.000Z",
    registrationDate: "2026-02-14T16:30:00.000Z",
    city: "تبریز",
    province: "آذربایجان شرقی",
    branch: "واحد تبریز",
    originBranch: "تبریز",
    studentOrPersonnelNumber: "9801237890",
    nationalCode: "2345678901",
    userName: "مریم رضایی",
    subjectIssue: "مشکلات در تنظیم سامانه اناد",
    ticketType: "PRIMARY",
    service: "INSURANCE",
    priority: "MEDIUM",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "answered",
  },
  {
    id: 4,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-02-02T09:45:00.000Z",
    registrationDate: "2026-01-31T10:00:00.000Z",
    city: "شیراز",
    province: "فارس",
    branch: "واحد شیراز",
    originBranch: "شیراز",
    studentOrPersonnelNumber: "9912340000",
    nationalCode: "3456789012",
    userName: "علی محمدی",
    subjectIssue: "مشکل پرداخت آنلاین",
    ticketType: "PRIMARY",
    service: "ROOM",
    priority: "LOW",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "answered",
  },
  {
    id: 5,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-02-01T15:30:00.000Z",
    registrationDate: "2026-01-30T12:20:00.000Z",
    city: "مشهد",
    province: "خراسان رضوی",
    branch: "واحد مشهد",
    originBranch: "مشهد",
    studentOrPersonnelNumber: "9801239999",
    nationalCode: "4567890123",
    userName: "سارا احمدی",
    subjectIssue: "مشکلات مربوط به انتخاب واحد",
    ticketType: "PRIMARY",
    service: "FOOD",
    priority: "HIGH",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "waiting",
  },
  {
    id: 6,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-01-31T08:10:00.000Z",
    registrationDate: "2026-01-29T14:00:00.000Z",
    city: "اهواز",
    province: "خوزستان",
    branch: "واحد اهواز",
    originBranch: "اهواز",
    studentOrPersonnelNumber: "9912341111",
    nationalCode: "5678901234",
    userName: "حسین عباسی",
    subjectIssue: "مشکلات انتقالی و مهمان",
    ticketType: "PRIMARY",
    service: "FOOD",
    priority: "CRITICAL",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "waiting",
  },
  {
    id: 7,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-01-30T17:50:00.000Z",
    registrationDate: "2026-01-28T11:30:00.000Z",
    city: "کرج",
    province: "البرز",
    branch: "واحد کرج",
    originBranch: "کرج",
    studentOrPersonnelNumber: "9801232222",
    nationalCode: "6789012345",
    userName: "زهرا کریمی",
    subjectIssue: "مشکلات مربوط به نمونه تحویل لباس",
    ticketType: "PRIMARY",
    service: "ROOM",
    priority: "MEDIUM",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "waiting",
  },
  {
    id: 8,
    title: "اختلال در سیستم پرداخت سلف سرویس",
    description: "سلام برای غذا زودتر وارد وب‌سایت میرم و وارد حساب کاربری‌ام می‌شوم...",
    ticketNumber: "1234567890",
    lastResponseDate: "2026-01-29T13:25:00.000Z",
    registrationDate: "2026-01-27T09:00:00.000Z",
    city: "یزد",
    province: "یزد",
    branch: "واحد یزد",
    originBranch: "یزد",
    studentOrPersonnelNumber: "9912343333",
    nationalCode: "7890123456",
    userName: "رضا موسوی",
    subjectIssue: "مشکلات مربوط به نمونه ثبت",
    ticketType: "PRIMARY",
    service: "ROOM",
    priority: "LOW",
    mobileNumber: "09123456789",
    asignTo: "فاطمه قاسمی",
    status: "answered",
  },
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

const CARD_PAGE_SIZE = 7;
const MyInnerTicketsAssignedToList = () => {
  const { params } = useQueryParams();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm<InnerTicketsAssignedToAdvanceFilterFormType>();
  const { filterItemsList } = useInnerTicketsAssignedToAdvanceFilter();

  //* ================================ Util Functions ================================

  const handleViewModeChange = (value: unknown) => {
    setViewMode(value === "card" ? "card" : "table");
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
    setCurrentPage(1);
  };

  const sortIcon = useMemo(() => {
    return (
      <div className="flex flex-col">
        <PiCaretUpFill
          className={`text-[10px] ${sortOrder === "asc" ? "text-blue-500" : ""}`}
        />
        <PiCaretDownFill
          className={`text-[10px] ${sortOrder === "desc" ? "text-blue-500" : ""}`}
        />
      </div>
    );
  }, [sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchText((prev) => {
      if (prev !== value) {
        setCurrentPage(1);
      }
      return value;
    });
  }, []);

  const closeAdvanceFilterModalHandler = () => {
    setIsAdvanceModalOpen(false);
  };

  //* ================================ Derived Data (Card mode) ================================
  const filteredAndSortedCardData = useMemo(() => {
    let data = [...mockData];

    // Search by nationalCode
    if (searchText.trim()) {
      data = data.filter((item) => item.nationalCode.includes(searchText.trim()));
    }

    // Sort by waiting time (lastResponseDate)
    if (sortOrder !== "none") {
      data.sort((a, b) => {
        const dateA = new Date(a.lastResponseDate).getTime();
        const dateB = new Date(b.lastResponseDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return data;
  }, [mockData, searchText, sortOrder]);

  const paginatedCardData = useMemo(() => {
    const start = (currentPage - 1) * CARD_PAGE_SIZE;
    return filteredAndSortedCardData.slice(start, start + CARD_PAGE_SIZE);
  }, [filteredAndSortedCardData, currentPage]);

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
      <ToolBox
        className="mt-4"
        rightSide={
          <div className="flex flex-wrap gap-2">
            <CustomBadge count={badgeCount}>
              <CustomButton
                disabled={mockData.length === 0}
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
            {viewMode === "card" && (
              <>
                <CustomButton
                  disabled={mockData.length === 0}
                  icon={sortIcon}
                  iconPlacement="end"
                  onClick={toggleSortOrder}
                >
                  زمان انتظار
                </CustomButton>
                <CustomSearchBox
                  disabled={mockData.length === 0}
                  placeholder="جستجو بر اساس کد ملی / فراگیر"
                  onChange={handleSearchChange}
                />
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
      {mockData.length === 0 ? (
        <div className="mt-50">
          <CustomEmpty description="تیکتی برای نمایش وجود ندارد." />
        </div>
      ) : viewMode === "card" ? (
        filteredAndSortedCardData.length === 0 ? (
          <div className="mt-50">
            <CustomEmpty description="نتیجه‌ای یافت نشد." />
          </div>
        ) : (
          <>
            <Row gutter={[16, 24]} className="mt-4">
              {paginatedCardData.map((item) => (
                <Col key={item.id} span={24}>
                  <TicketCard
                    ribbonStatus={
                      item?.status?.toUpperCase() as keyof typeof ticketStatusMap
                    }
                    ticketNumber={+item.ticketNumber}
                    title={item.title}
                    description={item.description}
                    userName={
                      <Link to={MANAGEMENT_ALL_DETAIL_PAGE_ROUTE}>{item.userName}</Link>
                    }
                    userCode={item.nationalCode}
                    date={convertDateToPersianTextDateWithTime(item.registrationDate)}
                    priority={
                      item?.priority?.toUpperCase() as AgentTicketAllTicketPriority
                    }
                    topTag={item.subjectIssue}
                    service={item.service}
                    step={item?.ticketType?.toUpperCase() as AgentTicketAllTicketType}
                    borderColor={
                      item?.ticketType?.toUpperCase() === "REFERENCED"
                        ? "border-orange-500"
                        : undefined
                    }
                    stepIcon={
                      item?.ticketType?.toUpperCase() === "PRIMARY" ? (
                        <PiCircleDashed />
                      ) : (
                        <PiArrowUUpLeft />
                      )
                    }
                    waitingTime={item.lastResponseDate}
                    actionButtons={
                      <Link
                        to={{
                          pathname: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
                          search: makeSearchParams({
                            ticketId: item?.id,
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
                    assign={item.asignTo}
                  />
                </Col>
              ))}
            </Row>
            <div className="mt-4 flex">
              <CustomPagination
                current={currentPage}
                total={filteredAndSortedCardData.length}
                pageSize={CARD_PAGE_SIZE}
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
          <CustomTable<InnerTicketsAssignedToListTypes>
            dataSource={mockData}
            draggableColumns
            draggableId={ExcelCodes.TICKETING_MY_RECEIVED_INNER_TICKETS_ASSIGNED_TABLE}
            columns={MyInnerTicketsAssignedToTableModel()}
            rowKey="id"
          />
        </div>
      )}
      <Div>
        <CustomTotalTableItems totalCount={0} label="تعداد کل تیکت ها" className="mt-2" />
      </Div>
    </>
  );
};
export default MyInnerTicketsAssignedToList;
