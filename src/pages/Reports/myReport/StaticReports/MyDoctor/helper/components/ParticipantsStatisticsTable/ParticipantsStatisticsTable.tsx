import { useEffect, useState, useCallback } from "react";

import { Tabs } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiInfoThin } from "react-icons/pi";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useMyReportDetailsMutation } from "@infra/states/redux/Apis/report/myReport";
import { MyReportDetailsResponse } from "@pages/Reports/myReport/StaticReports/MyDoctor/@types/@myDoctorStaticReport";
import { dashboardExcelDownload } from "@pages/Reports/myReport/StaticReports/shared/_utils/dashboardExcel";

import { ParticipantsStatisticsTableProps } from "./@types/@participantsStatisticsTable";

import type { ColumnType } from "antd/es/table";
import type { SortOrder } from "antd/es/table/interface";

// تعریف تب‌ها و سگمنت‌ها به صورت داینامیک
const tabsConfig = [
  {
    label: "واحد دانشگاهی",
    segmentKeys: ["22", "23", "24"],
  },
  {
    label: "رشته تحصیلی",
    segmentKeys: ["25", "26", "27"],
  },
  {
    label: "جنسیت",
    segmentKeys: ["28", "29", "30"],
  },
  {
    label: "وضعیت سکونت",
    segmentKeys: ["31", "32", "33"],
  },
  {
    label: "وضعیت تاهل",
    segmentKeys: ["34", "35", "36"],
  },
  {
    label: "وضعیت اقتصادی",
    segmentKeys: ["37", "38", "39"],
  },
  {
    label: "وضعیت اشتغال",
    segmentKeys: ["40", "41", "42"],
  },
];

const segmentOptions = [
  { value: "0", label: "نیازمند پیگیری فوری" },
  { value: "1", label: "نیازمند پیگیری" },
  { value: "2", label: "عدم نیاز به پیگیری" },
];

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

const ParticipantsStatisticsTable = ({
  createBodyParams,
  triggerItems,
  isFormValid,
  validateData,
}: ParticipantsStatisticsTableProps) => {
  const [activeTab, setActiveTab] = useState(0); // index تب
  const [view, setView] = useState("0"); // index سگمنت
  const [isDataValid, setIsDataValid] = useState<boolean | null>(null);

  const [participantsStatisticsTableColumn, setParticipantsStatisticsTableColumn] =
    useState<ColumnType<TableDataRecord>[]>([]);

  const [participantsStatisticsTableData, setParticipantsStatisticsTableData] = useState<
    TableDataRecord[]
  >([]);

  const [excelDownloadLoading, setExcelDownloadLoading] = useState(false);

  const {
    params: { card },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getReportDetail, { isLoading: isReportLoading }] = useMyReportDetailsMutation();

  //? ================================ Effects ================================
  // گرفتن segmentId بر اساس تب و سگمنت
  const segmentId = tabsConfig[activeTab]?.segmentKeys[+view];

  const getTableDataHandler = useCallback(() => {
    if (card !== "4" || !segmentId || !isFormValid) return;
    getReportDetail({
      id: +segmentId,
      params: createBodyParams() || {},
    })
      .unwrap()
      .then((value: MyReportDetailsResponse) => {
        // Validate data
        const isValid = validateData(value?.data, "TABLE");
        setIsDataValid(isValid);

        if (!isValid) {
          setParticipantsStatisticsTableColumn([]);
          setParticipantsStatisticsTableData([]);
          return;
        }

        const dataArray: any = Array.isArray(value?.data) ? value.data : [];
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

        setParticipantsStatisticsTableColumn(columnItems);
        setParticipantsStatisticsTableData(dataArray as TableDataRecord[]);
      })
      .catch(() => {
        setIsDataValid(false);
        setParticipantsStatisticsTableColumn([]);
        setParticipantsStatisticsTableData([]);
      });
  }, [card, segmentId, isFormValid, createBodyParams, getReportDetail, validateData]);

  useEffect(() => {
    getTableDataHandler();
  }, [activeTab, view, card, triggerItems, isFormValid, getTableDataHandler]);

  const downloadExcelFileHandler = async () => {
    if (!segmentId) return;
    const params = createBodyParams();
    await dashboardExcelDownload({
      setIsDownloadLinkLoading: setExcelDownloadLoading,
      queryArg: { id: +segmentId, ...params },
    });
  };

  const tabsItems = tabsConfig.map((tab, tabIdx) => ({
    label: tab.label,
    key: String(tabIdx),
    children: (
      <div className="flex flex-col gap-5">
        <CustomSegmented
          options={segmentOptions}
          onChange={(value) => setView(value as "0" | "1" | "2")}
          value={view}
          className="w-full"
        />
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
            columns={participantsStatisticsTableColumn}
            dataSource={participantsStatisticsTableData}
            pagination={paginationConfig}
            loading={isReportLoading}
            {...TABLE_PROPS(participantsStatisticsTableData?.length)}
          />
        )}
      </div>
    ),
  }));

  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="آمار شرکت کنندگان به تفکیک محور‌های آزمون"
        extraContent={<PiInfoThin size={16} color="#BFBFBF" />}
      />
      <Tabs
        type="card"
        onChange={(key) => {
          setActiveTab(Number(key));
          setView("0"); // هر بار تب عوض شد، سگمنت اول انتخاب شود
        }}
        items={tabsItems}
        activeKey={String(activeTab)}
      />
    </div>
  );
};

export default ParticipantsStatisticsTable;
