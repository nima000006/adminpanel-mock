import { useMemo, useState, useCallback } from "react";

import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { TableReportData } from "@pages/Reports/myReport/@types/@myReportTypes";
import { dashboardExcelDownload } from "@pages/Reports/myReport/StaticReports/shared/_utils/dashboardExcel";

import { TableRendererProps } from "./@types/@TableRendererProps";

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

const TableRenderer = ({
  data,
  reportTitle,
  reportId,
  filterParams,
}: TableRendererProps) => {
  const [excelDownloadLoading, setExcelDownloadLoading] = useState(false);

  const downloadExcelFileHandler = useCallback(async () => {
    if (!reportId) return;
    await dashboardExcelDownload({
      setIsDownloadLinkLoading: setExcelDownloadLoading,
      queryArg: {
        id: Number(reportId),
        params: filterParams,
      },
    });
  }, [reportId, filterParams]);

  return useMemo(() => {
    if (!Array.isArray(data) || !data.length) return null;

    const dataArray = Array.isArray(data) ? data : [];

    const columns = Object.keys(data[0]).map((key) => {
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
    return (
      <>
        <CustomDivider
          text={reportTitle || "بدون عنوان"}
          extraContent={
            <CustomButton
              onClick={downloadExcelFileHandler}
              loading={excelDownloadLoading}
            >
              خروجی <IoIosArrowDown />
            </CustomButton>
          }
        />
        <CustomTable
          columns={columns}
          dataSource={data as TableReportData[]}
          pagination={paginationConfig}
          {...TABLE_PROPS(data.length)}
          rowKey="id"
        />
      </>
    );
  }, [data, reportTitle, excelDownloadLoading, downloadExcelFileHandler]);
};

export default TableRenderer;
