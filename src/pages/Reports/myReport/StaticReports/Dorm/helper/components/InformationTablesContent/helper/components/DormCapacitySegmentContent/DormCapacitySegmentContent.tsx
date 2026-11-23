import { useEffect, useState, useCallback } from "react";

import { Tabs } from "antd";
import { IoIosArrowDown } from "react-icons/io";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { DORM_STATIC_REPORT_CARD_IDS } from "@pages/Reports/myReport/StaticReports/Dorm/_utils/dormStaticReportUtil";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";
import { dashboardExcelDownload } from "@pages/Reports/myReport/StaticReports/shared/_utils/dashboardExcel";

import {
  DormCapacitySegmentContentProps,
  TableDataRecord,
} from "./@types/@dormCapacitySegmentContent";

import type { ColumnType } from "antd/es/table";
import type { SortOrder } from "antd/es/table/interface";

const dormCapacityItems = [
  {
    id: "56",
    title: "استان",
  },
  {
    id: "57",
    title: "واحد / شعبه",
  },
  {
    id: "58",
    title: "خوابگاه",
  },
];

//? ================================ Sort Handler ================================
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

const DormCapacitySegmentContent = ({
  createBodyParams,
  triggerItems,
  view,
  isFormValid,
  validateData,
}: DormCapacitySegmentContentProps) => {
  const [dormCapacityData, setDormCapacityData] = useState<TableDataRecord[]>([]);
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const [dormCapacityColumn, setDormCapacityColumn] = useState<
    ColumnType<TableDataRecord>[]
  >([]);

  const [activeKey, setActiveKey] = useState<string>(dormCapacityItems[0].id);
  const [excelDownloadLoading, setExcelDownloadLoading] = useState(false);
  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Effects ================================
  const getTableDataHandler = useCallback(
    (id: number) => {
      // اگر فیلدهای required پر نشده‌اند، درخواست ارسال نکن
      if (!isFormValid) {
        return;
      }

      const params = createBodyParams();
      // اگر createBodyParams null برگرداند، درخواست ارسال نکن
      if (params === null) {
        return;
      }

      getReportDetail({
        id: id,
        params: params,
      })
        .unwrap()
        .then((value: MyReportDetailsResponse) => {
          // Validate data
          const dataArray: any = Array.isArray(value?.data) ? value.data : [];
          const isValid = validateData(dataArray, "TABLE");
          setIsDataValid(isValid);

          if (!isValid) {
            setDormCapacityColumn([]);
            setDormCapacityData([]);
            return;
          }

          const firstItem = dataArray[0] as TableDataRecord | undefined;
          const keys = Object.keys(firstItem || {});

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

          setDormCapacityColumn(columnItems);
          setDormCapacityData(dataArray as TableDataRecord[]);
        })
        .catch(() => {
          setIsDataValid(false);
          setDormCapacityColumn([]);
          setDormCapacityData([]);
        });
    },
    [isFormValid, createBodyParams, getReportDetail, validateData]
  );

  useEffect(() => {
    if (+card === DORM_STATIC_REPORT_CARD_IDS.informationTables && view === "0") {
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

  const items = dormCapacityItems.map((item) => ({
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
        ) : (
          <CustomTable
            columns={dormCapacityColumn}
            dataSource={dormCapacityData}
            pagination={paginationConfig}
            loading={isReportLoading}
            {...TABLE_PROPS(dormCapacityData?.length)}
          />
        )}
      </div>
    ),
    key: item.id,
  }));

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <Tabs items={items} size="large" onChange={(e) => setActiveKey(e)} />
    </div>
  );
};
export default DormCapacitySegmentContent;
