import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
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
import {
  useLazyTicketRolesListQuery,
  useLazyViewRoleListQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";
import {
  TicketRolesListItem,
  TicketRolesListRequest,
  TicketRolesListResponse,
} from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/@types/@ticketRoleListType";
import { viewRoleListResponse } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/@types/@modifyTicketRoleDrawerContentTypes";
import ModifyTicketRoleDrawerContent from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/ModifyTicketRoleDrawerContent";
import ViewDrawerContent from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ViewDrawerContent/ViewDrawerContent";
import TicketRoleTableModel from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/models/TicketRoleTableModel/TicketRoleTableModel";

import useTicketRoleAdvanceFilter from "./helper/hooks/useTicketRoleAdvanceFilter";

import "./_ticketRole.scss";

const advanceFilterItems = ["servicesName"];

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

const SuperAgent = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link className="text-neutral-500!" to={TICKETING_BASIC_INFO_LIST_PAGE_ROUTE}>
            اطلاعات پایه
          </Link>
        ),
      },
      { title: "نقش های تیکت" },
    ],
  });

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [modifyDrawer, setModifyDrawer] = useState({ isOpen: false, roleParam: "" });
  const [viewDrawer, setViewDrawer] = useState(false);
  const [viewData, setViewData] = useState<viewRoleListResponse | undefined>();
  const { params, setSearchParams } = useQueryParams();

  const [dataSource, setDataSource] = useState<TicketRolesListResponse | undefined>();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  const [form] = Form.useForm();
  const { filterItemsList } = useTicketRoleAdvanceFilter();

  //? ================================ API ================================
  // get list
  const [getData, { isFetching: isGetDataLoading }] = useLazyTicketRolesListQuery();

  // get view
  const [getViewList, { isFetching: isGetViewListLoading }] = useLazyViewRoleListQuery();

  //? ================================ Effects ================================
  const refetchList = () => {
    const requestAdvanceFilterParams: TicketRolesListRequest = {
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      // modal search
      ...(params?.servicesName && { samimServices: params?.servicesName }),
    };

    getData(requestAdvanceFilterParams)
      .unwrap()
      .then((value: TicketRolesListResponse) => {
        setDataSource(value);
      });
  };

  useEffect(() => {
    refetchList();
  }, [params?.page, params?.pageSize, ...advanceFilterItems.map((key) => params?.[key])]);

  //* ================================ Util Functions ================================

  // handler
  const openAdvanceFilter = () => setIsAdvanceModalOpen(true);

  const closeAdvanceFilter = () => {
    setIsAdvanceModalOpen(false);
    form?.resetFields();
  };

  const addBtnHandler = () => {
    setModifyDrawer({ isOpen: true, roleParam: "" });
  };

  const editBtnHandler = (role: string) => {
    setModifyDrawer({ isOpen: true, roleParam: role });
  };

  const closeModifyDrawer = () => {
    setModifyDrawer({ isOpen: false, roleParam: "" });
  };

  const viewBtnHandler = (role: string) => {
    setViewDrawer(true);
    setSearchParams({ ...params, roleParam: role });
    getViewList(role)
      .unwrap()
      .then((res: viewRoleListResponse) => {
        setViewData(res);
      });
  };

  const closeViewDrawer = () => {
    const { roleParam, ...restParams } = params;
    setSearchParams(restParams);
    setViewDrawer(false);
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
      {modifyDrawer?.isOpen && (
        <CustomDrawer
          content={
            <ModifyTicketRoleDrawerContent
              closeDrawer={closeModifyDrawer}
              refetchList={refetchList}
              role={modifyDrawer?.roleParam}
            />
          }
          open={modifyDrawer?.isOpen}
          closeIcon={<AiOutlineClose />}
          onClose={closeModifyDrawer}
        />
      )}

      {/* VIEW */}
      {viewDrawer && (
        <CustomDrawer
          content={
            <ViewDrawerContent
              closeDrawer={closeViewDrawer}
              loading={isGetViewListLoading}
              data={viewData}
            />
          }
          open={viewDrawer}
          closeIcon={<AiOutlineClose />}
          onClose={closeViewDrawer}
        />
      )}

      <div className="ticketing-super-agent-container">
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
                onClick={addBtnHandler}
                icon={<AiOutlinePlus />}
                iconPlacement="start"
              >
                افزودن
              </CustomButton>

              <CustomButton disabled>
                <FiArchive /> آرشیو
              </CustomButton>

              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            </div>
          }
        />

        <CustomTable<TicketRolesListItem>
          dataSource={dataSource?.content}
          loading={isGetDataLoading}
          columns={TicketRoleTableModel({
            onEditClick: editBtnHandler,
            onViewClick: viewBtnHandler,
          })}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.TICKETING_BASIC_INFO_TICKET_ROLE_TABLE}
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

export default SuperAgent;
