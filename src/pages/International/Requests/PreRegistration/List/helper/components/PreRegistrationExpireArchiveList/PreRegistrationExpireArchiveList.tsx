import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { PreRegistrationExpireArchiveListProps } from "./@types/@preRegistrationExpireArchiveListType";
import PreRegistrationExpireArchiveListTableModel from "../../models/PreRegistrationExpireArchiveListTableModel/PreRegistrationExpireArchiveListTableModel";
import "./_preRegistrationExpireArchiveList.scss";
const PreRegistrationExpireArchiveList = ({
  data,
}: PreRegistrationExpireArchiveListProps) => {
  const { params: url } = useQueryParams();

  return (
    <div className="pre-registration-expire-archive-list-container">
      <div className="action-btns-container">
        <CustomButton
          icon={<AiOutlineFilter />}
          // onClick={}
        >
          فیلتر پیشرفته
        </CustomButton>
        <CustomButton type="primary" ghost>
          خروجی
        </CustomButton>
      </div>
      <CustomTable
        dataSource={data || []}
        columns={PreRegistrationExpireArchiveListTableModel()}
        pagination={paginationConfig}
        // todo[shirin]: uncomment when api ready
        // pagination={manualPaginationConfig({
        //   total: data?.totalElements,
        //   onChange: (page, pageSize) => {
        //     setSearchParams({
        //       ...url,
        //       page: page?.toString(),
        //       pageSize: pageSize?.toString(),
        //     });
        //   },
        //   pageNumber: url?.page ? Number(url?.page) : 1,
        //   defaultPageSize: url?.pageSize ? Number(url?.pageSize) : 8,
        // })}
        // loading={loading}
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(data?.content?.[0]?.length || 0)}
        rowKey="id"
      />
    </div>
  );
};

export default PreRegistrationExpireArchiveList;
