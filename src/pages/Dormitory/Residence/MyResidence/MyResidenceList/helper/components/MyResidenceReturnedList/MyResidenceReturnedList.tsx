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
import { useLazyMyResidenceListSearchQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import MyResidenceReturnedListTableModel from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceReturnedList/helper/model/MyResidenceReturnedListTableModel";
import {
  MyResidenceListAdvanceFilterFormType,
  MyResidenceListSearchContent,
  MyResidenceListSearchRequest,
} from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/@types/@myResidenceWaitingList";
import useMyResidenceListAdvanceFilter from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/modals/advanceFilterModals/myResidenceListAdvanceFilter";

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
  "branchId",
  "residenceId",
  "residenceTypeName",
  "requestKindName",
];

const MyResidenceReturnedList = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [form] = Form.useForm<MyResidenceListAdvanceFilterFormType>();

  const { filterItemsList } = useMyResidenceListAdvanceFilter({
    isAdvanceModalOpen,
    form,
  });

  //? ================================  Api Calls ================================
  const [
    myResidenceListSearch,
    { data: myResidenceListSearchData, isFetching: isMyResidenceListSearchLoading },
  ] = useLazyMyResidenceListSearchQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

  useEffect(() => {
    myResidenceListSearchHandler();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    url?.requestNumber,
    ...advanceFilterItems.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const myResidenceListSearchHandler = () => {
    const request: MyResidenceListSearchRequest = {
      statuses: ["RETURNED"],
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,

      // modal search
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

    myResidenceListSearch(request);
  };

  // table column
  const column = MyResidenceReturnedListTableModel({ status: url?.status });

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

        <CustomTable<MyResidenceListSearchContent>
          dataSource={myResidenceListSearchData?.content ?? []}
          loading={isMyResidenceListSearchLoading}
          columns={column}
          rowKey="uuid"
          draggableColumns
          draggableId={ExcelCodes.DORMITORY_MY_RESIDENCE_RETURNED_LIST_TABLE}
          pagination={manualPaginationConfig({
            total: myResidenceListSearchData?.totalElements || 0,
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
export default MyResidenceReturnedList;
