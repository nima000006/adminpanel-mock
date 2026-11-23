import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { useGetCateringMySelfsListMutation } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { CATERING_STATUS_TYPES_MAIN_LIST } from "@pages/Catering/_shared/utils";
import { CateringSelfRecordType } from "@pages/Catering/Selfs/_shared/@types/@cateringSelfList";
import useCateringSelfListPage from "@pages/Catering/Selfs/_shared/helper/hooks/useCateringSelfListPage/useCateringSelfListPage";
import CateringSelfListTableModel from "@pages/Catering/Selfs/_shared/helper/models/CateringSelfListTableModel/CateringSelfListTableModel";
import { CATERING_SELF_PAGE_CONFIG } from "@pages/Catering/Selfs/_shared/utils";
import MySelfListDrawerContent from "@pages/Catering/Selfs/MySelfs/_shared/components/MySelfListDrawerContent/MySelfListDrawerContent";

const config = CATERING_SELF_PAGE_CONFIG.my;

const MySelfsList = () => {
  useTitle({ text: "سلف ها" });

  //? ================================  Api Calls ================================
  const [getCateringSelfsList, { isLoading: isSelfDataLoading }] =
    useGetCateringMySelfsListMutation();

  //* ================================ Util Functions ================================
  const {
    dataSource,
    url,
    defaultPageSize,
    advanceModalOpen,
    setAdvanceModalOpen,
    form,
    filterItemsList,
    badgeCount,
    setBadgeCount,
    advanceFilterHandler,
    drawerState,
    onNewSelfHandler,
    onCloseDrawer,
    onViewHandler,
    onEditHandler,
    fetchCateringSelfsList,
    setSearchParams,
    isDownloadLinkLoading,
    onGetExcelFileBtn,
  } = useCateringSelfListPage({
    getCateringSelfsList,
    isSelfDataLoading,
    statusType: CATERING_STATUS_TYPES_MAIN_LIST,
    variant: "list",
    accessMode: "my",
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={() => setAdvanceModalOpen(false)}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={url}
        />
      )}
      {drawerState.open && (
        <CustomDrawer
          open={drawerState.open}
          onClose={onCloseDrawer}
          closeIcon={<AiOutlineClose />}
          content={
            <MySelfListDrawerContent
              onCloseDrawer={onCloseDrawer}
              getRestaurantData={fetchCateringSelfsList}
              mode={drawerState.mode}
              selfId={drawerState.record?.id}
            />
          }
        />
      )}
      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton icon={<AiOutlineFilter />} onClick={advanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex gap-2">
              <Link to={config.archiveRoute}>
                <CustomButton type="default" icon={<FiArchive />}>
                  آرشیو
                </CustomButton>
              </Link>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={onNewSelfHandler}
              >
                ایجاد سلف جدید
              </CustomButton>
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
              onView: onViewHandler,
              onEdit: onEditHandler,
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
            draggableId={config.listExcelCode}
          />
        </div>
        <CustomTotalTableItems
          totalCount={dataSource?.totalElements || 0}
          label="تعداد کل سلف ها:"
        />
      </div>
    </>
  );
};

export default MySelfsList;
