import { useEffect, useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetFinanceBuyersListQuery } from "@infra/states/redux/Apis/finance/buyersApi";
import useBuyersListAdvanceFilter from "@pages/Finance/Buyers/BuyersList/helpers/hook/useBuyersListAdvanceFilter";

import { BuyersListDataTypes, GetFinanceBuyersListResponse } from "./@types/@buyersList";
import BuyersListTableModel from "./helpers/models/BuyersListTableModel/BuyersListTableModel";

const BuyersList = () => {
  const [dataSource, setDataSource] = useState<BuyersListDataTypes[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const { params, setSearchParams } = useQueryParams();
  const [form] = Form.useForm<{ date: string }>();

  const [badgeCount, setBadgeCount] = useState(() => {
    return params?.badger ?? 0;
  });

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      {
        title: "خریداران",
      },
    ],
  });
  const { filterItemsList } = useBuyersListAdvanceFilter();

  //? ================================  Api Calls ================================
  const [getBuyersListData, { isFetching: isBuyerListDataLoading }] =
    useLazyGetFinanceBuyersListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getBuyersListData({
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
    })
      .unwrap()
      .then(getBuyersListDataSuccess);
  }, [params?.page, params?.pageSize]);

  // ================================utils function ================================
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

  const getBuyersListDataSuccess = async (value: GetFinanceBuyersListResponse) => {
    setDataSource(value?.content);
    setTotalElements(value?.totalElements);
  };

  const closeAdvanceFilterHandler = () => {
    form?.resetFields();
    setIsAdvanceModalOpen(false);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
        className="custom-toolbox"
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
          <Dropdown menu={exportMenu} trigger={["click"]} disabled>
            <CustomButton>
              خروجی <IoIosArrowDown />
            </CustomButton>
          </Dropdown>
        }
      />

      <CustomTable<BuyersListDataTypes>
        className="mt-5"
        dataSource={dataSource}
        rowKey="id"
        draggableId={ExcelCodes.FINANCE_ACCOUNTANT_BUYER_LIST}
        draggableColumns
        columns={BuyersListTableModel()}
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
        loading={isBuyerListDataLoading}
        key={`table-${params?.pageSize || "8"}`}
      />
    </>
  );
};

export default BuyersList;
