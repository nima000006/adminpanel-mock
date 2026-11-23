import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CATERING_ALL_FOOD_DETAILS_PAGE_ROUTE,
  CATERING_ALL_FOOD_LIST_PAGE_ROUTE,
} from "@infra/router/routes/catering";
import { useGetDetailAllSelfsProductsMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import {
  CATERING_STATUS_TYPES_ARCHIVE_LIST,
  CATERING_PRODUCT_CATEGORIES,
} from "@pages/Catering/_shared/utils";
import { CateringAllFoodArchieveListAdvanceFilterFormType } from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodArchieveList/@types/@cateringAllFoodArchieveList";
import useCateringAllFoodArchieveListAdvanceFilter from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodArchieveList/helper/hooks/useCateringAllFoodArchieveListAdvanceFilter/useCateringAllFoodArchieveListAdvanceFilter";
import CateringAllFoodArchieveListTableModel from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodArchieveList/helper/models/CateringAllFoodArchieveListTableModel/CateringAllFoodArchieveListTableModel";
import {
  GetDetailAllSelfsProductsContent,
  GetDetailAllSelfsProductsRequest,
  GetDetailAllSelfsProductsResponse,
} from "@pages/Catering/Selfs/AllSelfs/AllSelfDetail/helper/components/CateringAllSelfsFoodSchedule/@types/@cateringAllSelfsFoodSchedule";

const COLUMN_FILTER_ITEMS = ["title"];

const CateringAllFoodArchieveList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={CATERING_ALL_FOOD_LIST_PAGE_ROUTE}>غذاها</Link>,
      },
      {
        title: "آرشیو",
      },
    ],
  });
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState<GetDetailAllSelfsProductsResponse | null>(
    null
  );
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [form] = Form.useForm<CateringAllFoodArchieveListAdvanceFilterFormType>();
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);

  const { filterItemsList } = useCateringAllFoodArchieveListAdvanceFilter({
    advanceModalOpen,
  });

  //? ================================  Api Calls ================================
  const [getDetailAllSelfsProducts, { isLoading: isGetDetailAllSelfsProductsLoading }] =
    useGetDetailAllSelfsProductsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllFoodArchieveList();
  }, [
    url?.page,
    url?.pageSize,
    url?.sortings,
    ...COLUMN_FILTER_ITEMS.map((key) => url?.[key]),
  ]);

  //* ================================ Util Functions ================================
  const onViewHandler = (id: number) => {
    navigate({
      pathname: CATERING_ALL_FOOD_DETAILS_PAGE_ROUTE,
      search: makeSearchParams({ id: id.toString() }),
    });
  };

  const fetchAllFoodArchieveList = () => {
    const request: GetDetailAllSelfsProductsRequest = {
      params: {
        pageNumber: url?.page ? Number(url.page) - 1 : 0,
        pageSize: url?.pageSize ? Number(url.pageSize) : 8,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
      body: {
        statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
        productCategories: [CATERING_PRODUCT_CATEGORIES.MAIN_FOOD],
        ...(url?.title && { title: url.title }),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy) {
        request.params.sortBy = sorting.sortBy;
      }

      if (sorting?.sortOrder) {
        request.params.sortDirection = sorting.sortOrder?.toUpperCase();
      }
    }

    getDetailAllSelfsProducts(request)
      .unwrap()
      .then((res) => {
        setDataSource(res);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => {
            setAdvanceModalOpen(false);
            form.resetFields();
          }}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}
      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </div>
          }
        />
        <div>
          <CustomTable<GetDetailAllSelfsProductsContent>
            dataSource={dataSource?.content}
            loading={isGetDetailAllSelfsProductsLoading}
            rowKey="id"
            columns={CateringAllFoodArchieveListTableModel({
              onView: onViewHandler,
            })}
            pagination={manualPaginationConfig({
              total: dataSource?.totalElements || 0,
              onChange: (page: number, pageSize: number) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
            draggableColumns
            draggableId={ExcelCodes.CATERING_ALL_FOOD_ARCHIEVE_LIST_TABLE}
          />
        </div>
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل غذاها:"
        />
      </div>
    </>
  );
};

export default CateringAllFoodArchieveList;
