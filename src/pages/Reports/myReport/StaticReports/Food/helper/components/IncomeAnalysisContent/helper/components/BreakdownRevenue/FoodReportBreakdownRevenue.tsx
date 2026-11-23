import { useEffect, useState, useCallback } from "react";

import { Tabs } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { dashboardExcelDownload } from "@pages/Reports/myReport/StaticReports/shared/_utils/dashboardExcel";

import { FoodReportBreakdownRevenueProps } from "./@types/@foodReportBreakdownRevenue";
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

const foodRevenueItems = [
  {
    id: "89",
    title: "استان",
  },
  {
    id: "90",
    title: "واحد / شعبه",
  },
  {
    id: "91",
    title: "سلف",
  },
  {
    id: "92",
    title: "غذا",
  },
];

const FoodReportBreakdownRevenue = ({
  isFormValid,
  createBodyParams,
  triggerItems,
  validateData,
}: FoodReportBreakdownRevenueProps) => {
  const [revenueData, setRevenueData] = useState([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const [revenueColumn, setRevenueColumn] = useState<ColumnType<any>[]>([]);

  const [activeKey, setActiveKey] = useState<string>(foodRevenueItems[0].id);
  const [excelDownloadLoading, setExcelDownloadLoading] = useState(false);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Effects ================================
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
          setIsDataValid(isValid);

          if (isValid === null || isValid === false) {
            setRevenueColumn([]);
            setRevenueData([]);
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

          setRevenueColumn(columnItems);
          setRevenueData(dataArray);
        })
        .catch(() => {
          setIsDataValid(false);
          setRevenueColumn([]);
          setRevenueData([]);
        });
    },
    [createBodyParams, getReportDetail, validateData]
  );

  useEffect(() => {
    if (+card === FOOD_CARD_IDS.incomeAnalysis) {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }
      getTableDataHandler(+activeKey);
    }
  }, [createBodyParams, triggerItems, activeKey, isFormValid, card, getTableDataHandler]);

  const downloadExcelFileHandler = async () => {
    const params = createBodyParams();
    await dashboardExcelDownload({
      setIsDownloadLinkLoading: setExcelDownloadLoading,
      queryArg: { id: +activeKey, ...params },
    });
  };

  const items = foodRevenueItems.map((item) => ({
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
        {isDataValid === false ? (
          <CustomCard>
            <div className="report-info-not-found">دیتا پشتیبانی نمیشود</div>
          </CustomCard>
        ) : isDataValid === null || !revenueData.length ? (
          <CustomEmpty />
        ) : (
          <CustomTable
            columns={revenueColumn}
            dataSource={revenueData}
            pagination={paginationConfig}
            loading={isReportLoading}
            {...TABLE_PROPS(revenueData?.length)}
          />
        )}
      </div>
    ),
    key: item.id,
  }));

  return (
    <div>
      <CustomDivider text="درآمد به تفکیک" />
      <Tabs items={items} size="large" onChange={(e) => setActiveKey(e)} />
    </div>
  );
};

export default FoodReportBreakdownRevenue;
