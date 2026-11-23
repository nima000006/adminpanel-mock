import { useEffect, useState, useCallback } from "react";

import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { dashboardExcelDownload } from "@pages/Reports/myReport/StaticReports/shared/_utils/dashboardExcel";

import { CountOrderSegmentContentProps } from "./@types/@countOrderSegmentContent";
import { FOOD_CARD_IDS } from "../../../../../utils/FoodStaticReportsUtils";

import type { ColumnType } from "antd/es/table";
import type { SortOrder } from "antd/es/table/interface";

//? ================================ Sort Handler ================================
const getColumnSortProps = (dataIndex: string): Partial<ColumnType<any>> => ({
  sorter: (a: any, b: any) => {
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

const orderCountItems = [
  {
    title: "استان",
    id: "93",
  },
  {
    title: "واحد / شعبه",
    id: "94",
  },
  {
    title: "سلف",
    id: "95",
  },
  {
    title: "غذا",
    id: "96",
  },
  {
    title: "مقطع",
    id: "97",
  },
  {
    title: "رشته",
    id: "98",
  },
  {
    title: "جنسیت",
    id: "100",
  },
];

const CountOrderSegmentContent = ({
  createBodyParams,
  triggerItems,
  view,
  isFormValid,
  validateData,
}: CountOrderSegmentContentProps) => {
  const [orderCountData, setOrderCountData] = useState([]);

  const [orderCountyColumn, setOrderCountColumn] = useState<ColumnType<any>[]>([]);

  const [activeKey, setActiveKey] = useState<string>(orderCountItems[0].id);
  const [excelDownloadLoading, setExcelDownloadLoading] = useState(false);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Util Functions ================================
  const getTableDataHandler = useCallback(
    (id: number) => {
      getReportDetail({
        id: id,
        params: createBodyParams() || {},
      })
        .unwrap()
        .then((value: any) => {
          const dataArray = Array.isArray(value?.data) ? value?.data : [];
          const isValid = validateData(dataArray, "TABLE");

          if (!isValid) {
            setOrderCountColumn([]);
            setOrderCountData([]);
            return;
          }

          const keys = Object.keys(dataArray[0] || {});

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

          setOrderCountColumn(columnItems);
          setOrderCountData(dataArray as any);
        })
        .catch(() => {
          setOrderCountColumn([]);
          setOrderCountData([]);
        });
    },
    [createBodyParams, validateData, getReportDetail]
  );

  //? ================================ Effects ================================
  useEffect(() => {
    if (+card === FOOD_CARD_IDS.templateFoodOrders && view === "0") {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      getTableDataHandler(+activeKey);
    }
  }, [
    createBodyParams,
    triggerItems,
    activeKey,
    isFormValid,
    card,
    view,
    getTableDataHandler,
  ]);

  const downloadExcelFileHandler = async () => {
    const params = createBodyParams();
    await dashboardExcelDownload({
      setIsDownloadLinkLoading: setExcelDownloadLoading,
      queryArg: { id: +activeKey, ...params },
    });
  };

  const items = orderCountItems.map((item) => ({
    label: item.title,
    children: (
      <div className="flex flex-col gap-2">
        <ToolBox
          leftSide={
            <CustomButton
              onClick={downloadExcelFileHandler}
              loading={excelDownloadLoading}
            >
              خروجی <IoIosArrowDown />
            </CustomButton>
          }
        />
        <CustomTable
          columns={orderCountyColumn}
          dataSource={orderCountData}
          pagination={paginationConfig}
          loading={isReportLoading}
          {...TABLE_PROPS(orderCountData?.length)}
        />
      </div>
    ),
    key: item.id,
  }));

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomTabs items={items} onChange={(e) => setActiveKey(e)} />
    </div>
  );
};
export default CountOrderSegmentContent;
