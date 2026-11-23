import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { PreRegistrationConfirmArchiveListProps } from "./@types/@preRegistrationConfirmArchiveListType";
import PreRegistrationConfirmArchiveListTableModel from "../../models/PreRegistrationConfirmArchiveListTableModel/PreRegistrationConfirmArchiveListTableModel";
import "./_preRegistrationConfirmArchiveList.scss";
const PreRegistrationConfirmArchiveList = ({
  data,
}: PreRegistrationConfirmArchiveListProps) => {
  const { params: url } = useQueryParams();

  return (
    <div className="pre-registration-confirm-archive-list-container">
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
        dataSource={data || []}
        columns={PreRegistrationConfirmArchiveListTableModel()}
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
        {...TABLE_PROPS(data.length || 0)}
        rowKey="id"
      />
    </div>
  );
};

export default PreRegistrationConfirmArchiveList;
