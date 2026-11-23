import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";

import { PreRegistrationPendingListProps } from "./@types/@preRegistrationPendingListType";
import InternationalPreRegistrationPendingListTableModel from "../../models/InternationalPreRegistrationPendingListTableModel/InternationalPreRegistrationPendingListTableModel";
import "./_preRegistrationPendingList.scss";
const PreRegistrationPendingList = ({ data }: PreRegistrationPendingListProps) => {
  const { params: url } = useQueryParams();

  return (
    <div className="pre-registration-pending-list-container">
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
        columns={InternationalPreRegistrationPendingListTableModel()}
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
        key={`table-${url?.pageSize || "8"} `}
        {...TABLE_PROPS(data?.length || 0)}
        rowKey="id"
        className="pre-registration-pending-table-container"
      />
    </div>
  );
};

export default PreRegistrationPendingList;
