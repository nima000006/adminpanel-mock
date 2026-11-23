import { useEffect, useState, useCallback } from "react";

import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";
import { dashboardExcelDownload } from "@pages/Reports/myReport/StaticReports/shared/_utils/dashboardExcel";

import { TypePresentationFoodSegmentContentProps } from "./@types/@typePresentationFoodSegmentContent";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

import type { ColumnType } from "antd/es/table";
import type { SortOrder } from "antd/es/table/interface";

//? ================================ Sort Handler ================================
type TableDataRecord = Record<string, string | number | null | undefined>;

const getColumnSortProps = (dataIndex: string): Partial<ColumnType<TableDataRecord>> => ({
  sorter: (a: TableDataRecord, b: TableDataRecord) => {
    const aValue = a[dataIndex];
    const bValue = b[dataIndex];

    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // Try to compare as numbers if both are numeric
    const aNum = Number(aValue);
    const bNum = Number(bValue);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }

    // Otherwise compare as strings
    return aValue.toString().localeCompare(bValue.toString(), "fa");
  },
  sortDirections: ["ascend", "descend"] as SortOrder[],
});

const TypePresentationFoodSegmentContent = ({
  createBodyParams,
  triggerItems,
  view,
  isFormValid,
  validateData,
}: TypePresentationFoodSegmentContentProps) => {
  const [orderData, setOrderData] = useState<TableDataRecord[]>([]);

  const [orderColumn, setOrderColumn] = useState<ColumnType<TableDataRecord>[]>([]);
  const [excelDownloadLoading, setExcelDownloadLoading] = useState(false);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Effects ================================
  const getTableDataHandler = useCallback(() => {
    // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
    if (!isFormValid) {
      return;
    }
    getReportDetail({
      id: 101,
      params: createBodyParams() || {},
    })
      .unwrap()
      .then((value: MyReportDetailsResponse) => {
        const dataArray: any = Array.isArray(value?.data) ? value.data : [];
        const isValid = validateData(dataArray, "TABLE");

        if (!isValid) {
          setOrderColumn([]);
          setOrderData([]);
          return;
        }

        const firstRow = dataArray[0] as TableDataRecord | undefined;
        const keys = firstRow ? Object.keys(firstRow) : [];

        const columnItems = keys?.map((key) => {
          const value = dataArray?.[0]?.[key];

          const valueType = typeof value;

          return {
            title: key,
            dataIndex: key,
            key: key,
            width: 150,

            searchable: true,
            ...getColumnSortProps(key),
            ...(valueType === "number"
              ? {
                  render: (value: number) => (
                    <>{dataPlaceHolder({ data: value?.toString(), isPrice: true })}</>
                  ),
                }
              : {}),
          };
        });

        setOrderColumn(columnItems);
        setOrderData(dataArray as TableDataRecord[]);
      })
      .catch(() => {
        setOrderColumn([]);
        setOrderData([]);
      });
  }, [isFormValid, createBodyParams, getReportDetail, validateData]);

  useEffect(() => {
    if (+card === FOOD_CARD_IDS.templateFoodOrders && view === "1") {
      getTableDataHandler();
    }
  }, [
    createBodyParams,
    triggerItems,
    view,
    isFormValid,
    card,
    validateData,
    getTableDataHandler,
  ]);

  const downloadExcelFileHandler = async () => {
    const params = createBodyParams();
    await dashboardExcelDownload({
      setIsDownloadLinkLoading: setExcelDownloadLoading,
      queryArg: { id: 101, ...params },
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-2">
      <ToolBox
        leftSide={
          <CustomButton onClick={downloadExcelFileHandler} loading={excelDownloadLoading}>
            خروجی <IoIosArrowDown />
          </CustomButton>
        }
      />
      <CustomTable
        columns={orderColumn}
        dataSource={orderData}
        pagination={paginationConfig}
        loading={isReportLoading}
        {...TABLE_PROPS(orderData?.length)}
      />
    </div>
  );
};
export default TypePresentationFoodSegmentContent;
