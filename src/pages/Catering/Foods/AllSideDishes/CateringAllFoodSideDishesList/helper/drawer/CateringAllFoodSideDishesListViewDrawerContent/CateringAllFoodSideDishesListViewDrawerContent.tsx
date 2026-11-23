import { useEffect, useState } from "react";

import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetAllFoodHistoryMutation,
  useViewAllFoodQuery,
} from "@infra/states/redux/Apis/catering/foods/foodsApis";
import {
  CateringAllFoodSideDishesListViewDrawerContentProps,
  CateringAllFoodSideDishesListViewHistoryRecordType,
} from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/drawer/CateringAllFoodSideDishesListViewDrawerContent/@types/@cateringAllFoodSideDishesListViewDrawerContent";
import CateringAllFoodSideDishesListViewHistoryTableModel from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/model/CateringAllFoodSideDishesListViewHistoryTableModel";
import {
  GetAllFoodHistoryRequest,
  GetAllFoodHistoryResponse,
} from "@pages/Catering/Foods/CateringAllFoods/CateringAllFoodDetail/helper/components/CateringAllFoodHistory/@types/@cateringAllFoodHistory";

const CateringAllFoodSideDishesListViewDrawerContent = ({
  closeDrawerHandler,
  id,
  onOpenHistoryDetail,
}: CateringAllFoodSideDishesListViewDrawerContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();
  const [historyData, setHistoryData] = useState<GetAllFoodHistoryResponse | null>(null);
  const historyPage = url?.historyPage ? Number(url.historyPage) : 1;
  const historyPageSize = url?.historyPageSize ? Number(url.historyPageSize) : 8;

  //? ================================ Api Calls ================================
  const { data: sideDishViewData, isFetching: isViewAllFoodLoading } =
    useViewAllFoodQuery(
      { id: Number(id) },
      { skip: !id || id < 0, refetchOnMountOrArgChange: true }
    );

  const [getAllFoodHistory, { isLoading: isGetAllFoodHistoryLoading }] =
    useGetAllFoodHistoryMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    fetchAllFoodHistory();
  }, [id, url?.historyPage, url?.historyPageSize, url?.sortings]);

  //* ================================ Util Functions ================================
  const onGetAllFoodHistorySuccess = (response: GetAllFoodHistoryResponse) => {
    setHistoryData(response);
  };

  const fetchAllFoodHistory = () => {
    if (!id || id < 0) {
      return;
    }

    const request: GetAllFoodHistoryRequest = {
      params: {
        pageNumber: historyPage - 1,
        pageSize: historyPageSize,
      },
      body: {
        id: Number(id),
      },
    };

    if (url?.sortings) {
      const sorting = JSON.parse(url.sortings)?.[0];

      if (sorting?.sortBy === "modifiedDateDate") {
        request.params.sortBy = "modifiedDate";
        if (sorting?.sortOrder) {
          request.params.sortDirection = sorting.sortOrder?.toUpperCase();
        }
      }
    }

    getAllFoodHistory(request).unwrap().then(onGetAllFoodHistorySuccess);
  };

  const openHistoryDrawerHandler = (
    record: CateringAllFoodSideDishesListViewHistoryRecordType
  ) => {
    onOpenHistoryDetail(record.revisionNumber);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isViewAllFoodLoading}>
      <CustomDrawerHeader title="مشاهده مخلفات" closeDrawerHandler={closeDrawerHandler} />

      <div className="flex flex-col gap-10 p-10">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="مخلفات"
            value={sideDishViewData?.baseProductTitle}
            span={12}
          />
          <SingleVerticalWithCol
            label="عنوان نمایشی مخلفات"
            value={sideDishViewData?.title}
            span={12}
          />
          <SingleVerticalWithCol
            label="قیمت"
            value={sideDishViewData?.studentalPrice?.toString()}
            isPrice
            currency={{ isAvailable: true, type: "تومان" }}
            span={12}
          />
          <SingleVerticalWithCol
            label="قرارداد"
            value={sideDishViewData?.contractTitle}
            span={12}
          />
          <SingleVerticalWithCol
            label="توضیحات"
            value={sideDishViewData?.description}
            span={24}
          />
        </Row>

        <div className="flex flex-col gap-4">
          <CustomDivider text="تاریخچه تغییرات" />
          <CustomTable<CateringAllFoodSideDishesListViewHistoryRecordType>
            dataSource={historyData?.content ?? []}
            loading={isGetAllFoodHistoryLoading}
            rowKey="revisionNumber"
            columns={CateringAllFoodSideDishesListViewHistoryTableModel({
              onViewHandler: openHistoryDrawerHandler,
            })}
            pagination={manualPaginationConfig({
              total: historyData?.totalElements ?? 0,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...url,
                  historyPage: page?.toString(),
                  historyPageSize: pageSize?.toString(),
                });
              },
              pageNumber: historyPage,
              defaultPageSize: historyPageSize,
            })}
          />
        </div>
      </div>
    </Div>
  );
};

export default CateringAllFoodSideDishesListViewDrawerContent;
