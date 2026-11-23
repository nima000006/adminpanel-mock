import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyAllResidenceListSearchQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import AllResidenceConfirmedListTableModel from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceConfirmedList/helper/model/AllResidenceConfirmedListTableModel";
import {
  AllResidenceListSearchContent,
  AllResidenceListSearchRequest,
  AllResidenceWaitingListAdvanceFilterFormType,
} from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/components/AllResidenceWaitingList/@types/@allResidenceWaitingList";
import useAllResidenceAdvanceFilter from "@pages/Dormitory/Residence/AllResidence/AllResidenceList/helper/hooks/useAllResidenceAdvanceFilter";

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
  "businessId",
  "branchId",
  "residenceId",
  "residenceTypeName",
  "requestKindName",
];

const AllResidenceConfirmedList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [form] = Form.useForm<AllResidenceWaitingListAdvanceFilterFormType>();

  const { filterItemsList } = useAllResidenceAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [
    allResidenceListSearch,
    { data: allResidenceListSearchData, isFetching: isAllResidenceListSearchLoading },
  ] = useLazyAllResidenceListSearchQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

  useEffect(() => {
    allResidenceListSearchHandler();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    url?.requestNumber,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const allResidenceListSearchHandler = () => {
    const request: AllResidenceListSearchRequest = {
      statuses: ["INACTIVE"],
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,

      // modal search
      ...(url?.businessId && {
        businessIds: url.businessId.split(",").map(Number),
      }),
      ...(url?.branchId && {
        branchIds: url.branchId.split(",").map(Number),
      }),
      ...(url?.residenceId && {
        uuids: url.residenceId.split(","),
      }),
      ...(url?.residenceTypeName && {
        accommodationTypes: url.residenceTypeName.split(","),
      }),
      ...(url?.requestKindName && {
        requestKinds: url.requestKindName.split(","),
      }),

      // column search
      ...(url?.requestNumber && {
        uuids: [url.requestNumber],
      }),
    };

    // sortings
    if (url?.sortings) {
      const sorting = JSON.parse(url?.sortings)?.[0];

      if (sorting?.sortBy) {
        request.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.sortDirection = sorting.sortOrder.toUpperCase();
      }
    }

    allResidenceListSearch(request);
  };

  // table column
  const column = AllResidenceConfirmedListTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲ ▲▲▲ ▲ ▲ ▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={() => {
            setIsAdvanceModalOpen(false);
            form?.resetFields();
          }}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={{ ...url }}
        />
      )}

      <div className="flex flex-col gap-4">
        <ToolBox
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          }
        />

        <CustomTable<AllResidenceListSearchContent>
          dataSource={allResidenceListSearchData?.content ?? []}
          loading={isAllResidenceListSearchLoading}
          columns={column}
          rowKey="uuid"
          draggableColumns
          draggableId={ExcelCodes.DORMITORY_ALL_RESIDENCE_CONFIRMED_LIST_TABLE}
          pagination={manualPaginationConfig({
            total: allResidenceListSearchData?.totalElements || 0,
            onChange: (page, pageSize) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
          })}
          key={`table-${url?.pageSize || "8"}`}
        />
      </div>
    </>
  );
};
export default AllResidenceConfirmedList;
