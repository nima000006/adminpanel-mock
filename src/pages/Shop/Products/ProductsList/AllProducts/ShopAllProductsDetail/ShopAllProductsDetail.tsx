import { useEffect, useState } from "react";

import { Descriptions, Form, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineBookOpen } from "react-icons/hi";
import { PiQuotes, PiStorefront } from "react-icons/pi";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import { CustomButton, CustomSwitch, CustomUploader } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE } from "@infra/router/routes/shop";
import {
  useGetShopAllProductsDetailQuery,
  useGetShopAllProductsDetailSupplierBooksQuery,
  useHideShopAllProductsDetailMutation,
  useHideShopAllProductsDetailSupplierBookMutation,
  useUpdateShopAllProductsDetailMutation,
} from "@infra/states/redux/Apis/shop/products/productsApi";

import {
  GetShopAllProductsDetailResponse,
  ShopAllProductsDetailFormType,
  ShopAllProductsDetailGroupedCategoryRowType,
  ShopAllProductsDetailRecordType,
} from "./@types/@shopAllProductsDetail";
import ShopAllProductsDetailCategoryPicker from "./helper/components/ShopAllProductsDetailCategoryPicker/ShopAllProductsDetailCategoryPicker";
import ShopAllProductsDetailAddSellerModal from "./helper/modals/ShopAllProductsDetailAddSellerModal/ShopAllProductsDetailAddSellerModal";
import ShopAllProductsDetailTableModel from "./helper/models/ShopAllProductsDetail/ShopAllProductsDetailTableModel";
import "./_shopAllProductsDetail.scss";

const getSelectUuid = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && "value" in value) {
    const selectValue = (value as { value?: unknown }).value;
    return typeof selectValue === "string" ? selectValue : undefined;
  }

  return undefined;
};

const groupCategoriesByParents = (
  categories?: GetShopAllProductsDetailResponse["categories"]
): ShopAllProductsDetailGroupedCategoryRowType[] => {
  if (!categories?.length) {
    return [];
  }

  const grouped = new Map<string, ShopAllProductsDetailGroupedCategoryRowType>();

  categories.forEach((category) => {
    const key = `${category.level1?.uuid ?? ""}__${category.level2?.uuid ?? ""}`;
    const existing = grouped.get(key);

    if (existing) {
      if (
        category.level3?.uuid &&
        !existing.level3.some((item) => item.uuid === category.level3?.uuid)
      ) {
        existing.level3.push(category.level3);
      }
      return;
    }

    grouped.set(key, {
      level1: category.level1,
      level2: category.level2,
      level3: category.level3?.uuid ? [category.level3] : [],
    });
  });

  return Array.from(grouped.values());
};

const mapCategoriesToFormValues = (
  categories?: GetShopAllProductsDetailResponse["categories"]
): ShopAllProductsDetailFormType["categories"] => {
  const groupedCategories = groupCategoriesByParents(categories);

  if (!groupedCategories.length) {
    return [{}];
  }

  return groupedCategories.map((category) => ({
    layer1: category.level1?.uuid,
    layer2: category.level2?.uuid,
    layer3: category.level3.map((item) => item.uuid),
  }));
};

const ShopAllProductsDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const productUuid = typeof params?.id === "string" ? params.id : "";
  const [form] = Form.useForm<ShopAllProductsDetailFormType>();
  const [coverFileList, setCoverFileList] = useState<UploadFile[]>([]);
  const [pendingVisible, setPendingVisible] = useState<boolean | null>(null);
  const [pendingSupplierBookUuid, setPendingSupplierBookUuid] = useState<string | null>(
    null
  );
  const [pendingSupplierBookVisible, setPendingSupplierBookVisible] = useState<
    boolean | null
  >(null);
  const [isAddSellerModalOpen, setIsAddSellerModalOpen] = useState(false);
  const sorting = params?.sortings ? JSON.parse(params.sortings)?.[0] : undefined;

  //? ================================  Api Calls ================================
  const {
    data: getShopAllProductsDetailData,
    isLoading: isGetShopAllProductsDetailLoading,
    refetch: refetchShopAllProductsDetail,
  } = useGetShopAllProductsDetailQuery(
    { uuid: productUuid },
    {
      skip: !productUuid,
      refetchOnMountOrArgChange: true,
    }
  );

  const groupedCategories = groupCategoriesByParents(
    getShopAllProductsDetailData?.categories
  );

  const {
    data: getShopAllProductsDetailSupplierBooksData,
    isFetching: isGetShopAllProductsDetailSupplierBooksLoading,
    refetch: refetchShopAllProductsDetailSupplierBooks,
  } = useGetShopAllProductsDetailSupplierBooksQuery(
    {
      uuid: productUuid,
      pageNumber: params?.page ? Number(params.page) - 1 : 0,
      pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      ...(sorting?.sortBy && { sortBy: sorting.sortBy }),
      ...(sorting?.sortOrder && {
        sortDirection: String(sorting.sortOrder).toUpperCase(),
      }),
    },
    {
      skip: !productUuid,
      refetchOnMountOrArgChange: true,
    }
  );

  const [hideShopAllProductsDetail, { isLoading: isHideShopAllProductsDetailLoading }] =
    useHideShopAllProductsDetailMutation();

  const [
    hideShopAllProductsDetailSupplierBook,
    { isLoading: isHideShopAllProductsDetailSupplierBookLoading },
  ] = useHideShopAllProductsDetailSupplierBookMutation();

  const [
    updateShopAllProductsDetail,
    { isLoading: isUpdateShopAllProductsDetailLoading },
  ] = useUpdateShopAllProductsDetailMutation();

  //* ================================ bread crumb  ================================
  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link to={SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE}>لیست کالا</Link>
        ),
      },
      {
        title: getShopAllProductsDetailData?.title || "جزئیات کالا",
      },
    ],
  });
  //? ================================ Effects ================================
  useEffect(() => {
    if (!getShopAllProductsDetailData) {
      setCoverFileList([]);
      form.setFieldsValue({
        visible: false,
        categories: [{}],
      });
      return;
    }

    const coverUrl = getShopAllProductsDetailData?.coverImageUrl;

    setCoverFileList(
      coverUrl
        ? [
            {
              uid: coverUrl,
              name: coverUrl,
              status: "done" as const,
              url: coverUrl,
            },
          ]
        : []
    );

    form.setFieldsValue({
      visible: getShopAllProductsDetailData.visible,
      categories: mapCategoriesToFormValues(getShopAllProductsDetailData.categories),
    });
  }, [form, getShopAllProductsDetailData]);

  //* ================================ Util Functions ================================
  const onAddSellerHandler = () => {
    setIsAddSellerModalOpen(true);
  };

  const onAddSellerModalCancelHandler = () => {
    setIsAddSellerModalOpen(false);
  };

  const onAddSellerModalSuccessHandler = () => {
    refetchShopAllProductsDetailSupplierBooks();
    refetchShopAllProductsDetail();
  };

  const onSaveCategoriesHandler = () => {
    if (!productUuid || !getShopAllProductsDetailData) {
      return;
    }

    form
      .validateFields()
      .then((values: ShopAllProductsDetailFormType) => {
        const categoryUuids =
          values.categories?.flatMap((category) =>
            (category.layer3 ?? [])
              .map((item) => getSelectUuid(item))
              .filter((uuid): uuid is string => Boolean(uuid))
          ) ?? [];

        return updateShopAllProductsDetail({
          uuid: productUuid,
          body: {
            faTitle: getShopAllProductsDetailData.title,
            faDescription: getShopAllProductsDetailData.description,
            isbn: getShopAllProductsDetailData.isbn,
            author: getShopAllProductsDetailData.author,
            publisherUuid: getShopAllProductsDetailData.publisher?.uuid,
            categoryUuids,
          },
        }).unwrap();
      })
      .then(() => {
        refetchShopAllProductsDetail();
      });
  };

  const onVisibleChangeHandler = (checked: boolean) => {
    if (!productUuid) {
      return;
    }

    setPendingVisible(checked);
    hideShopAllProductsDetail({ uuid: productUuid })
      .unwrap()
      .then(() => {
        refetchShopAllProductsDetail();
      })
      .finally(() => {
        setPendingVisible(null);
      });
  };

  const onSupplierBookVisibleChangeHandler = (uuid: string, checked: boolean) => {
    setPendingSupplierBookUuid(uuid);
    setPendingSupplierBookVisible(checked);
    hideShopAllProductsDetailSupplierBook({ uuid })
      .unwrap()
      .then(() => {
        refetchShopAllProductsDetailSupplierBooks();
        refetchShopAllProductsDetail();
      })
      .finally(() => {
        setPendingSupplierBookUuid(null);
        setPendingSupplierBookVisible(null);
      });
  };

  const sellerCount =
    getShopAllProductsDetailSupplierBooksData?.totalElements ??
    getShopAllProductsDetailData?.sellerCount ??
    0;

  const productInfoItems = [
    {
      key: "title",
      label: "عنوان کالا",
      children: dataPlaceHolder({ data: getShopAllProductsDetailData?.title }),
      span: 2,
    },
    {
      key: "isbn",
      label: "شابک",
      children: dataPlaceHolder({ data: getShopAllProductsDetailData?.isbn }),
    },
    {
      key: "publisher",
      label: "ناشر",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.publisher?.title,
      }),
    },
    {
      key: "author",
      label: "نویسنده",
      children: dataPlaceHolder({ data: getShopAllProductsDetailData?.author }),
    },
    {
      key: "subject",
      label: "موضوع",
      children: dataPlaceHolder({ data: getShopAllProductsDetailData?.subject }),
    },
    {
      key: "pageCount",
      label: "تعداد صفحه",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.pageCount?.toString(),
      }),
    },
    {
      key: "coverType",
      label: "نوع جلد",
      children: dataPlaceHolder({ data: getShopAllProductsDetailData?.coverType }),
    },
    {
      key: "bookSize",
      label: "قطع",
      children: dataPlaceHolder({ data: getShopAllProductsDetailData?.bookSize }),
    },
    {
      key: "volumeCount",
      label: "تعداد جلد",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.volumeCount?.toString(),
      }),
    },
    {
      key: "createdDate",
      label: "تاریخ ایجاد",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.createdDate,
        isDate: true,
        customDateFormat: "D MMMM YYYY",
      }),
    },
    {
      key: "sellerCount",
      label: "تعداد فروشنده",
      children: dataPlaceHolder({
        data: getShopAllProductsDetailData?.sellerCount?.toString(),
      }),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetShopAllProductsDetailLoading}>
      <Form form={form} initialValues={{ categories: [{}], visible: false }}>
        <CustomCard padding="2rem" className="shop-all-products-detail-card">
          {getShopAllProductsDetailData && !getShopAllProductsDetailData.visible ? (
            <CustomAlert
              type="warning"
              showIcon
              title="همه فروشنده‌های این کالا غیرقابل نمایش هستند، به همین دلیل کالا هم به کاربر نمایش داده نمی‌شود."
            />
          ) : null}

          <div>
            <CustomDivider
              text={
                <span className="shop-all-products-detail-divider-title">
                  <HiOutlineBookOpen size={20} />
                  اطلاعات کالا
                </span>
              }
              extraContent={
                <CustomSwitch
                  key={String(getShopAllProductsDetailData?.visible)}
                  valuePropName="visible"
                  label="نمایش کالا به کاربر"
                  checked={pendingVisible ?? !!getShopAllProductsDetailData?.visible}
                  loading={isHideShopAllProductsDetailLoading}
                  onChange={onVisibleChangeHandler}
                />
              }
            />

            <div className="shop-all-products-detail-info">
              <div className="shop-all-products-detail-cover">
                <CustomUploader
                  fileList={coverFileList}
                  setFileList={setCoverFileList}
                  isReadOnly
                  name="coverImage"
                  hasNullText
                  hasUploaderIcon={false}
                  hasVerticalLabel={false}
                  maxCount={1}
                  validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                />
              </div>

              <div className="shop-all-products-detail-fields">
                <Descriptions
                  column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
                  colon={false}
                  items={productInfoItems}
                />
              </div>
            </div>
          </div>

          <div>
            <CustomDivider
              text={
                <span className="shop-all-products-detail-divider-title">
                  <PiQuotes size={20} />
                  معرفی کالا
                </span>
              }
            />
            <p className="shop-all-products-detail-description-text">
              {dataPlaceHolder({ data: getShopAllProductsDetailData?.description })}
            </p>
          </div>

          <div>
            <CustomDivider text="دسته‌بندی" />
            <ShopAllProductsDetailCategoryPicker
              form={form}
              categories={groupedCategories}
              isSaveLoading={isUpdateShopAllProductsDetailLoading}
              onSave={onSaveCategoriesHandler}
            />
          </div>

          <div className="flex flex-col gap-4">
            <CustomDivider
              text={
                <span className="shop-all-products-detail-divider-title">
                  <PiStorefront size={20} />
                  {`فروشنده‌ها (${sellerCount})`}
                </span>
              }
              extraContent={
                <CustomButton
                  type="default"
                  icon={<AiOutlinePlus />}
                  onClick={onAddSellerHandler}
                >
                  افزودن فروشنده
                </CustomButton>
              }
            />
            <CustomTable<ShopAllProductsDetailRecordType>
              dataSource={getShopAllProductsDetailSupplierBooksData?.content ?? []}
              loading={isGetShopAllProductsDetailSupplierBooksLoading}
              rowKey="uuid"
              columns={ShopAllProductsDetailTableModel({
                onVisibleChange: onSupplierBookVisibleChangeHandler,
                pendingUuid: pendingSupplierBookUuid,
                pendingVisible: pendingSupplierBookVisible,
                isVisibleLoading: isHideShopAllProductsDetailSupplierBookLoading,
              })}
              pagination={manualPaginationConfig({
                total: getShopAllProductsDetailSupplierBooksData?.totalElements ?? 0,
                onChange: (page: number, pageSize: number) => {
                  setSearchParams({
                    ...params,
                    page: page?.toString(),
                    pageSize: pageSize?.toString(),
                  });
                },
                pageNumber: params?.page ? Number(params.page) : 1,
                defaultPageSize: params?.pageSize ? Number(params.pageSize) : 8,
              })}
            />
          </div>
        </CustomCard>
      </Form>

      <ShopAllProductsDetailAddSellerModal
        open={isAddSellerModalOpen}
        bookUuid={productUuid}
        onCancel={onAddSellerModalCancelHandler}
        onSuccess={onAddSellerModalSuccessHandler}
      />
    </Div>
  );
};

export default ShopAllProductsDetail;
