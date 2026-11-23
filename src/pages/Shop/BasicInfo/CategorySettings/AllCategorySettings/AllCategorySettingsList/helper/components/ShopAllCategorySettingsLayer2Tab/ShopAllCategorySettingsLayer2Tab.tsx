import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
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
  SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB,
  ShopAllCategorySettingsLayer2RecordType,
  ShopAllCategorySettingsLayer2TabAdvanceFilterFormType,
} from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/@types/@shopAllCategorySettingsList";
import useShopAllCategorySettingsLayer2TabAdvanceFilter from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/advanceFilterModals/shopAllCategorySettingsLayer2TabAdvanceFilter";
import ShopAllCategorySettingsLayer2DefineModal from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/modals/ShopAllCategorySettingsLayer2DefineModal/ShopAllCategorySettingsLayer2DefineModal";
import ShopAllCategorySettingsLayer2TabTableModel from "@pages/Shop/BasicInfo/CategorySettings/AllCategorySettings/AllCategorySettingsList/helper/models/ShopAllCategorySettingsLayer2Tab/ShopAllCategorySettingsLayer2TabTableModel";

const ShopAllCategorySettingsLayer2Tab = () => {
  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [defineModalOpen, setDefineModalOpen] = useState(false);
  const { params: url, setSearchParams } = useQueryParams();
  const [badgeCount, setBadgeCount] = useState(() => url?.badger ?? 0);
  const [form] = Form.useForm<ShopAllCategorySettingsLayer2TabAdvanceFilterFormType>();

  const { filterItemsList } = useShopAllCategorySettingsLayer2TabAdvanceFilter();

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
      level: Number(SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB),
      ...(url?.layer1CategoryId && {
        parentUuids: [String(url.layer1CategoryId)],
      }),
      ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
      ...(sorting?.sortOrder && {
        sortDirection: String(sorting.sortOrder).toUpperCase(),
      }),
    },
    { refetchOnMountOrArgChange: true }
  );

  //? ================================ Effects ================================
  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

  //* ================================ Util Functions ================================

  const layerTitle =
    getCategoryLevelsData?.find(
      (item) => String(item.id) === SHOP_ALL_CATEGORY_SETTINGS_LAYER_2_TAB
    )?.title ?? "دسته‌بندی لایه ۲";

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

  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  const onEditHandler = (_record: ShopAllCategorySettingsLayer2RecordType) => {
    toast.warn(THIS_FEATURE_IS_NOT_AVAILABLE_NOW, {
      toastId: THIS_FEATURE_IS_NOT_AVAILABLE_NOW,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          defaultParams={{ ...url }}
        />
      )}

      {defineModalOpen && (
        <ShopAllCategorySettingsLayer2DefineModal
          open={defineModalOpen}
          onCancel={closeDefineModalHandler}
          onSuccess={onDefineSuccessHandler}
          layerTitle={layerTitle}
        />
      )}

      <div className="flex flex-col gap-6">
        <ToolBox
          className="btn-wrapper"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                type="default"
                icon={<AiOutlineFilter />}
                onClick={openAdvanceFilterHandler}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
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
          <CustomTable<ShopAllCategorySettingsLayer2RecordType>
            dataSource={getAllCategoriesSettingsListData?.content ?? []}
            loading={isGetAllCategoriesSettingsListLoading}
            rowKey="uuid"
            columns={ShopAllCategorySettingsLayer2TabTableModel({
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

export default ShopAllCategorySettingsLayer2Tab;
