import { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useGetAllSendingSettingsListQuery } from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { ShopAllSendingSettingsListRecordType } from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/@types/@shopAllSendingSettingsList";
import ShopAllSendingSettingsDefineModal from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/helper/modals/ShopAllSendingSettingsDefineModal/ShopAllSendingSettingsDefineModal";
import ShopAllSendingSettingsListTableModel from "@pages/Shop/BasicInfo/SendingSettings/AllSendingSettings/AllSendingSettingsList/helper/models/ShopAllSendingSettingsListTableModel/ShopAllSendingSettingsListTableModel";

const ShopAllSendingSettingsList = () => {
  useTitle({
    breadcrumbItems: [{ title: "اطلاعات پایه" }, { title: "تنظیمات ارسال" }],
  });

  const [isDefineModalOpen, setIsDefineModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] =
    useState<ShopAllSendingSettingsListRecordType | null>(null);
  const { params: url, setSearchParams } = useQueryParams();

  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

  //? ================================  Api Calls ================================
  const {
    data: getAllSendingSettingsListData,
    isFetching: isGetAllSendingSettingsListLoading,
    refetch: refetchGetAllSendingSettingsList,
  } = useGetAllSendingSettingsListQuery(
    {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
      ...(sorting?.sortOrder && {
        sortDirection: String(sorting.sortOrder).toUpperCase(),
      }),
      ...(url?.supplierTitle && { supplierTitle: url.supplierTitle }),
      ...(url?.branchId && { branchId: Number(url.branchId) }),
    },
    { refetchOnMountOrArgChange: true }
  );

  //* ================================ Util Functions ================================
  const onCreateHandler = () => {
    setEditingRecord(null);
    setIsDefineModalOpen(true);
  };

  const closeDefineModalHandler = () => {
    setIsDefineModalOpen(false);
    setEditingRecord(null);
  };

  const onDefineSuccessHandler = () => {
    refetchGetAllSendingSettingsList();
  };

  const onEditHandler = (record: ShopAllSendingSettingsListRecordType) => {
    setEditingRecord(record);
    setIsDefineModalOpen(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDefineModalOpen && (
        <ShopAllSendingSettingsDefineModal
          open={isDefineModalOpen}
          onCancel={closeDefineModalHandler}
          onSuccess={onDefineSuccessHandler}
          record={editingRecord}
        />
      )}

      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          leftSide={
            <CustomButton
              type="primary"
              icon={<AiOutlinePlus />}
              onClick={onCreateHandler}
            >
              تعریف تنظیمات ارسال
            </CustomButton>
          }
        />
        <div>
          <CustomTable<ShopAllSendingSettingsListRecordType>
            dataSource={getAllSendingSettingsListData?.content ?? []}
            loading={isGetAllSendingSettingsListLoading}
            rowKey="uuid"
            columns={ShopAllSendingSettingsListTableModel({
              onEdit: onEditHandler,
            })}
            pagination={manualPaginationConfig({
              total: getAllSendingSettingsListData?.totalElements ?? 0,
              onChange: (page: number, pageSize: number) => {
                setSearchParams({
                  ...url,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: url?.page ? Number(url.page) : 1,
              defaultPageSize: url?.pageSize ? Number(url.pageSize) : 8,
            })}
          />
        </div>
      </div>
    </>
  );
};

export default ShopAllSendingSettingsList;
