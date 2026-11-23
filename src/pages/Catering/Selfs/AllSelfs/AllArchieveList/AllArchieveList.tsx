import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { useGetCateringSelfsListMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { CATERING_STATUS_TYPES_ARCHIVE_LIST } from "@pages/Catering/_shared/utils";
import { CateringSelfRecordType } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import useCateringSelfListPage from "@pages/Catering/Selfs/_shared/helper/hooks/useCateringSelfListPage/useCateringSelfListPage";
import CateringSelfListTableModel from "@pages/Catering/Selfs/_shared/helper/models/CateringSelfListTableModel/CateringSelfListTableModel";
import { CATERING_SELF_PAGE_CONFIG } from "@pages/Catering/Selfs/_shared/utils";

const config = CATERING_SELF_PAGE_CONFIG.all;

const AllArchieveList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={config.listRoute}>سلف ها</Link>,
      },
      {
        title: "آرشیو",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getCateringSelfsList, { isLoading: isSelfDataLoading }] =
    useGetCateringSelfsListMutation();

  const {
    dataSource,
    url,
    setSearchParams,
    defaultPageSize,
    onViewHandler,
    isDownloadLinkLoading,
    onGetExcelFileBtn,
  } = useCateringSelfListPage({
    getCateringSelfsList,
    isSelfDataLoading,
    statusType: CATERING_STATUS_TYPES_ARCHIVE_LIST,
    variant: "archive",
    accessMode: "all",
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <ToolBox
        className="btn-wrapper"
        leftSide={
          <div className="flex gap-2">
            <CustomButton loading={isDownloadLinkLoading} onClick={onGetExcelFileBtn}>
              خروجی
            </CustomButton>
          </div>
        }
      />
      <div>
        <CustomTable<CateringSelfRecordType>
          dataSource={dataSource?.content}
          loading={isSelfDataLoading}
          rowKey="id"
          columns={CateringSelfListTableModel({
            isArchive: true,
            onView: onViewHandler,
          })}
          pagination={manualPaginationConfig({
            total: dataSource?.totalElements || 0,
            onChange: (page: number, pageSize: number) => {
              setSearchParams({
                ...url,
                page: page?.toString(),
                pageSize: pageSize?.toString(),
              });
            },
            pageNumber: url?.page ? Number(url?.page) : 1,
            defaultPageSize: url?.pageSize ? Number(url?.pageSize) : defaultPageSize,
          })}
          draggableColumns
          draggableId={config.archiveExcelCode}
        />
      </div>
      <CustomTotalTableItems
        totalCount={dataSource?.totalElements || 0}
        label="تعداد کل سلف ها:"
      />
    </div>
  );
};

export default AllArchieveList;
