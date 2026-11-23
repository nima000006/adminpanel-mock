import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { DemandArchiveListProps } from "./@types/@demandArchiveList";
import InternationalDemandArchiveListTableModel from "./helper/models/InternationalDemandArchiveList/InternationalDemandArchiveListTableModel";
import "./_demandArchiveList.scss";

const DemandArchiveList = ({ data, loading, status }: DemandArchiveListProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  return (
    <div className="demand-archive-list-container">
      <div className="action-btns-container">
        <CustomButton
          icon={<AiOutlineFilter />}
          type="primary"
          // onClick={onFilterModalClickHandler}
        >
          فیلتر پیشرفته
        </CustomButton>
        <CustomButton type="primary" ghost>
          خروجی
        </CustomButton>
      </div>
      <CustomTable
        dataSource={data?.content?.[0] || []}
        columns={InternationalDemandArchiveListTableModel({ status })}
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
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(data?.content?.[0]?.length || 0)}
        rowKey="id"
        className="demand-list-table-model-container"
      />
    </div>
  );
};

export default DemandArchiveList;
