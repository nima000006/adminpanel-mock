import { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useGetAllCategoriesSettingsListCountQuery,
  useGetAllCategoriesSettingsListQuery,
  useGetCategoryLevelsQuery,
} from "@infra/states/redux/Apis/shop/basicInfo/basicInfoApi";
import { THIS_FEATURE_IS_NOT_AVAILABLE_NOW } from "@infra/VARS/globalToasts/globalToasts";
import {
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB,
  ShopAllCategorySettingsLayer1RecordType,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";
import ShopAllCategorySettingsLayer1DefineModal from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer1DefineModal/ShopAllCategorySettingsLayer1DefineModal";
import ShopAllCategorySettingsLayer1TabTableModel from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/models/ShopAllCategorySettingsLayer1Tab/ShopAllCategorySettingsLayer1TabTableModel";

const ShopAllCategorySettingsLayer1Tab = () => {
  const [defineModalOpen, setDefineModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();

  const sorting = url?.sortings ? JSON.parse(url.sortings)?.[0] : undefined;

  //? ================================  Api Calls ================================
  const { data: getCategoryLevelsData } = useGetCategoryLevelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { refetch: refetchGetAllCategoriesSettingsListCount } =
    useGetAllCategoriesSettingsListCountQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const {
    data: getAllCategoriesSettingsListData,
    isFetching: isGetAllCategoriesSettingsListLoading,
    refetch: refetchGetAllCategoriesSettingsList,
  } = useGetAllCategoriesSettingsListQuery(
    {
      pageNumber: url?.page ? Number(url.page) - 1 : 0,
      pageSize: url?.pageSize ? Number(url.pageSize) : 8,
      level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB),
      ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
      ...(sorting?.sortOrder && {
        sortDirection: String(sorting.sortOrder).toUpperCase(),
      }),
    },
    { refetchOnMountOrArgChange: true }
  );

  //* ================================ Util Functions ================================
  const layerTitle =
    getCategoryLevelsData?.find(
      (item) => String(item.id) === SHOP_ALL_CATEGORY_SETTINGS_LAYER_1_TAB
    )?.title ?? "دسته‌بندی لایه ۱";

  const openDefineModalHandler = () => {
    setDefineModalOpen(true);
  };

  const closeDefineModalHandler = () => {
    setDefineModalOpen(false);
  };

  const onDefineSuccessHandler = () => {
    refetchGetAllCategoriesSettingsList();
    refetchGetAllCategoriesSettingsListCount();
  };

  const onEditHandler = (_record: ShopAllCategorySettingsLayer1RecordType) => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {defineModalOpen && (
        <ShopAllCategorySettingsLayer1DefineModal
          open={defineModalOpen}
          onCancel={closeDefineModalHandler}
          onSuccess={onDefineSuccessHandler}
          layerTitle={layerTitle}
        />
      )}

      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          leftSide={
            <CustomButton
              type="primary"
              icon={<AiOutlinePlus />}
              onClick={openDefineModalHandler}
            >
              {`تعریف ${layerTitle}`}
            </CustomButton>
          }
        />
        <div>
          <CustomTable<ShopAllCategorySettingsLayer1RecordType>
            dataSource={getAllCategoriesSettingsListData?.content ?? []}
            loading={isGetAllCategoriesSettingsListLoading}
            rowKey="uuid"
            columns={ShopAllCategorySettingsLayer1TabTableModel({
              onEdit: onEditHandler,
            })}
            pagination={manualPaginationConfig({
              total: getAllCategoriesSettingsListData?.totalElements ?? 0,
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

export default ShopAllCategorySettingsLayer1Tab;
