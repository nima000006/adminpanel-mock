import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { InterviewArchiveListProps } from "./@types/@interviewArchiveList";
import InternationalInterviewArchiveTableModel from "./helper/models/InternationalInterviewArchiveTableModel/InternationalInterviewArchiveTableModel";

const InterviewArchiveList = ({ data, loading, status }: InterviewArchiveListProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  return (
    <div className="flex flex-col gap-4">
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
        columns={InternationalInterviewArchiveTableModel({ status })}
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

export default InterviewArchiveList;
