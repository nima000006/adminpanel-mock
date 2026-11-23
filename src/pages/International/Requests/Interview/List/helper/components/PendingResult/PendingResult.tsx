import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { PendingResultProps } from "./@types/@pendingResult";
import InternationalInterviewPendingResultTableModel from "./helper/models/InternationalInterviewPendingResultTableModel/InternationalInterviewPendingResultTableModel";

const PendingResult = ({ data, loading }: PendingResultProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  return (
    <div className="flex flex-col gap-4">
      <CustomDivider text="لیست مصاحبه‌های در انتظار اعلام نتیجه" />
      <ToolBox
        rightSide={
          <CustomButton
            icon={<AiOutlineFilter />}
            // onClick={onFilterModalClickHandler}
          >
            فیلتر پیشرفته
          </CustomButton>
        }
        leftSide={<CustomButton>خروجی</CustomButton>}
      />

      <CustomTable
        dataSource={data?.content?.[0] || []}
        columns={InternationalInterviewPendingResultTableModel()}
        pagination={manualPaginationConfig({
          total: data?.totalElements,
          onChange: (page, pageSize) => {
            setSearchParams({
              ...url,
              page: page?.toString(),
              pageSize: pageSize?.toString(),
            });
          },
          pageNumber: url?.page ? Number(url?.page) : 1,
          defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        })}
        loading={loading}
        rowKey="id"
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(data?.content?.[0]?.length || 0)}
      />
    </div>
  );
};
export default PendingResult;
