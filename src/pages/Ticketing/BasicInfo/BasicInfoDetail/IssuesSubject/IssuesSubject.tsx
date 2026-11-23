import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { TICKETING_BASIC_INFO_LIST_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { useLazyTicketIssuesSubjectListQuery } from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

import {
  IssuesSubjectListType,
  TicketIssuesSubjectListRequest,
  TicketIssuesSubjectListResponse,
} from "./@types/@ticketingIssuesSubject";
import ModifyIssueSubjectDrawerContent from "./helper/components/AddIssueSubjectDrawerContent/ModifyIssueSubjectDrawerContent";
import useIssuesSubjectAdvanceFilter from "./helper/hooks/useIssuesSubjectAdvanceFilter";
import IssuesSubjectTableModel from "./helper/models/IssuesSubjectTableModel/IssuesSubjectTableModel";

import "./_issuesSubject.scss";

const advanceFilterItems = [
  "servicesName",
  "priorityName",
  "displayStatusId",
  // column
  "title",
];

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
  ],
};

const IssuesSubject = () => {
  const [dataSource, setDataSource] = useState<
    TicketIssuesSubjectListResponse | undefined
  >();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [modifyIssueSubjectDrawer, setModifyIssueSubjectDrawer] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { params, setSearchParams } = useQueryParams();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [form] = Form.useForm();

  const { filterItemsList } = useIssuesSubjectAdvanceFilter();

  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link className="text-neutral-500!" to={TICKETING_BASIC_INFO_LIST_PAGE_ROUTE}>
            اطلاعات پایه
          </Link>
        ),
      },
      { title: "موضوع مشکلات" },
    ],
  });

  //? ================================ API ================================
  const [getData, { isFetching: isGetDataLoading }] =
    useLazyTicketIssuesSubjectListQuery();

  //? ================================ Effects ================================
  const refetchList = () => {
    const requestAdvanceFilterParams: TicketIssuesSubjectListRequest = {
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      // modal search
      ...(params?.servicesName && { samimServices: params?.servicesName }),
      ...(params?.priorityName && { priorities: params?.priorityName }),
      ...(params?.displayStatusId && {
        activationStatus: params?.displayStatusId === "2" ? false : true,
      }),
      // column search
      ...(params?.title && { topicName: params?.title }),
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
      .then((value: TicketIssuesSubjectListResponse) => {
        setDataSource(value);
      });
  };
  useEffect(() => {
    refetchList();
  }, [
    params?.page,
    params?.pageSize,
    params?.sortings,
    ...advanceFilterItems.map((key) => params?.[key]),
  ]);

  //* ================================ Util Functions ================================
  // handler
  const modifyIssueSubjectHandler = (id?: number) => {
    if (id) {
      setSelectedId(id);
      setSearchParams({ ...params, id: id.toString() });
    }
    setModifyIssueSubjectDrawer(true);
  };

  const closeModifyIssueDrawerHandler = () => {
    const { id, ...restParams } = params;
    setSearchParams(restParams);
    setModifyIssueSubjectDrawer(false);
    setSelectedId(undefined);
  };

  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);

  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilter}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={params}
          form={form}
        />
      )}

      {/* MODIFY */}
      {modifyIssueSubjectDrawer && (
        <CustomDrawer
          content={
            <ModifyIssueSubjectDrawerContent
              closeDrawer={closeModifyIssueDrawerHandler}
              refetchList={refetchList}
              topicId={params?.id ? Number(params.id) : selectedId}
            />
          }
          open={modifyIssueSubjectDrawer}
          closeIcon={<AiOutlineClose />}
          onClose={closeModifyIssueDrawerHandler}
        />
      )}

      <div className="ticketing-issue-subject-container">
        <ToolBox
          className="mb-4"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilter}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2 max-[530px]:flex-col">
              <CustomButton
                type="primary"
                onClick={() => modifyIssueSubjectHandler()}
                icon={<AiOutlinePlus />}
                iconPlacement="end"
              >
                افزودن به لیست
              </CustomButton>
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            </div>
          }
        />

        <CustomTable<IssuesSubjectListType>
          dataSource={dataSource?.content}
          loading={isGetDataLoading}
          columns={IssuesSubjectTableModel(modifyIssueSubjectHandler)}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.TICKETING_BASIC_INFO_ISSUES_SUBJECT_TABLE}
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements ?? 0,
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
    </>
  );
};

export default IssuesSubject;
