import { useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTextArea,
  CustomUploader,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  getUploadFilePayload,
  isImageFormatValid,
  isImageSizeValid,
  makeSearchParams,
} from "@infra/helpers/utils";
import {
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_DETAIL_PAGE_ROUTE,
  SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE,
} from "@infra/router/routes/shop";
import {
  useCreateShopAllProductMutation,
  useGetShopAllProductsPublishersQuery,
  useUploadShopAllProductFileMutation,
} from "@infra/states/redux/Apis/shop/products/productsApi";
import {
  ISBN_RULE,
  NUMBER_RULE,
  PERSIAN_LETTERS_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import {
  FILE_TYPE_NOT_SUPPORTED,
  SIZE_EXCEED_ERROR,
} from "@infra/VARS/globalToasts/globalToasts";

import {
  CreateShopAllProductResponse,
  OnUploadShopAllProductFileSuccess,
  ShopAllProductsAddFormType,
} from "./@types/@shopAllProductsAdd";
import ShopAllProductsAddCategoryPicker from "./helper/components/ShopAllProductsAddCategoryPicker/ShopAllProductsAddCategoryPicker";
import "./_shopAllProductsAdd.scss";

const ShopAllProductsAdd = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: (
          <Link to={SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE}>لیست کالا</Link>
        ),
      },
      { title: "افزودن کالا" },
    ],
  });

  const navigate = useNavigate();
  const [form] = Form.useForm<ShopAllProductsAddFormType>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadFileUuids, setUploadFileUuids] = useState<string[]>([]);
  const [isPublisherOptionsOpen, setIsPublisherOptionsOpen] = useState(false);

  //? ================================  Api Calls ================================
  // Placeholder: wire RTK Query mutation when the ISBN inquiry endpoint is available
  // const [inquireShopAllProductsIsbn, { isLoading: isInquireShopAllProductsIsbnLoading }] =
  //   useInquireShopAllProductsIsbnMutation();
  const isInquireShopAllProductsIsbnLoading = false;

  const [createShopAllProduct, { isLoading: isCreateShopAllProductLoading }] =
    useCreateShopAllProductMutation();

  const [uploadFile, { isLoading: isUploadFileLoading }] =
    useUploadShopAllProductFileMutation();

  const {
    data: getShopAllProductsPublishersData,
    isFetching: isGetShopAllProductsPublishersLoading,
  } = useGetShopAllProductsPublishersQuery(
    {
      pageNumber: 0,
      pageSize: 100,
    },
    {
      skip: !isPublisherOptionsOpen,
      refetchOnMountOrArgChange: true,
    }
  );

  const publisherOptions =
    getShopAllProductsPublishersData?.content?.map((item) => ({
      id: item.uuid,
      title: item.title,
    })) ?? [];

  //* ================================ Util Functions ================================
  const onCancelHandler = () => {
    navigate(SHOP_PRODUCTS_LIST_ALL_PRODUCTS_LIST_PAGE_ROUTE);
  };

  const onInquireIsbnHandler = () => {
    form.validateFields(["isbn"]).then(() => {
      // Placeholder request shape — replace with real API types/contract when ready
      // inquireShopAllProductsIsbn({ isbn: form.getFieldValue("isbn") })
      //   .unwrap()
      //   .then(onInquireIsbnSuccess);
    });
  };

  const onPublisherOptionsOpenChange = (visible: boolean) => {
    setIsPublisherOptionsOpen(visible);
  };

  const onUploadFileSuccessHandler = ({
    response,
  }: OnUploadShopAllProductFileSuccess) => {
    if (!response?.uuid) {
      return;
    }

    setUploadFileUuids((prev) => [...prev, response.uuid]);
    setFileList((prev) => {
      if (!prev.length) {
        return prev;
      }

      const next = [...prev];
      const lastIndex = next.length - 1;
      next[lastIndex] = {
        ...next[lastIndex],
        status: "done",
        response: { uuid: response.uuid },
      };
      return next;
    });
  };

  // CustomUploader crop confirm passes a raw File; UploadFile payloads use originFileObj.
  const resolveUploadFilePayload = (file: UploadFile | Blob) => {
    if (file instanceof Blob) {
      return file;
    }

    return getUploadFilePayload(file);
  };

  const onUploadFileChange = (image: UploadChangeParam<UploadFile>) => {
    const fileToUpload = resolveUploadFilePayload(image.file);
    if (!fileToUpload) {
      setFileList([]);
      setUploadFileUuids([]);
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const isFileFormatCorrect = isImageFormatValid({
      fileFormat: fileToUpload.type ?? "",
    });
    if (!isFileFormatCorrect) {
      setFileList([]);
      setUploadFileUuids([]);
      return toast.error(FILE_TYPE_NOT_SUPPORTED, {
        toastId: FILE_TYPE_NOT_SUPPORTED,
      });
    }

    const isUploadable = isImageSizeValid({
      fileSize: fileToUpload.size ?? 0,
    });
    if (!isUploadable) {
      setFileList([]);
      setUploadFileUuids([]);
      return toast.error(SIZE_EXCEED_ERROR, {
        toastId: SIZE_EXCEED_ERROR,
      });
    }

    uploadFile(formData)
      .unwrap()
      .then((response) => onUploadFileSuccessHandler({ response }))
      .catch(() => {
        setFileList([]);
        setUploadFileUuids([]);
      });
  };

  const onCreateShopAllProductSuccess = (data: CreateShopAllProductResponse) => {
    navigate({
      pathname: SHOP_PRODUCTS_LIST_ALL_PRODUCTS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: data.uuid }),
    });
  };

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

  const onCreateShopAllProductHandler = (values: ShopAllProductsAddFormType) => {
    const categoryUuids =
      values.categories?.flatMap((category) =>
        (category.layer3 ?? [])
          .map((item) => getSelectUuid(item))
          .filter((uuid): uuid is string => Boolean(uuid))
      ) ?? [];

    const uploadedImageUuids = fileList
      .map((file) => (file.response as { uuid?: string } | undefined)?.uuid)
      .filter((uuid): uuid is string => Boolean(uuid));
    const resolvedImageUuids =
      uploadedImageUuids.length > 0 ? uploadedImageUuids : uploadFileUuids;
    const [coverImageUuid = "", ...imageUuids] = resolvedImageUuids;

    const publisherUuid = getSelectUuid(values.publisherUuid) ?? "";

    createShopAllProduct({
      faTitle: values.title,
      isbn: values.isbn,
      author: values.author ?? "",
      publisherUuid,
      subject: values.subject ?? "",
      coverType: values.coverType ?? "",
      bookSize: values.format ?? "",
      volumeCount: Number(values.volumeCount) || 0,
      pageCount: Number(values.pageCount) || 0,
      faDescription: values.description ?? "",
      coverImageUuid,
      categoryUuids,
      imageUuids,
    })
      .unwrap()
      .then(onCreateShopAllProductSuccess);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      className="flex flex-col gap-6"
      onFinish={onCreateShopAllProductHandler}
      initialValues={{ categories: [{}] }}
    >
      <CustomAlert
        type="info"
        showIcon
        title="کالا در بانک کالا ثبت و به‌صورت غیرفعال نمایش ذخیره می‌شود. استعلام شابک اختیاری است و اطلاعات کالا را می‌توانید دستی وارد کنید. بعد از ثبت، از صفحه جزئیات کالا فروشنده و قیمت اضافه کنید."
      />

      <div>
        <CustomDivider text="شابک" />
        <div className="shop-all-products-add-isbn-row">
          <div className="w-full sm:max-w-90">
            <CustomInput
              name="isbn"
              label="شابک"
              placeholder="شابک ۱۰ یا ۱۳ رقمی"
              rules={[REQUIRED_RULE, NUMBER_RULE, ISBN_RULE]}
            />
          </div>
          <CustomButton
            type="default"
            htmlType="button"
            className="shop-all-products-add-isbn-inquiry-btn"
            loading={isInquireShopAllProductsIsbnLoading}
            onClick={onInquireIsbnHandler}
          >
            استعلام
          </CustomButton>
        </div>
      </div>

      <div>
        <CustomDivider text="اطلاعات کالا" />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CustomInput
              name="title"
              label="عنوان کالا"
              placeholder="عنوان کالا"
              rules={[REQUIRED_RULE, PERSIAN_LETTERS_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInput name="author" label="نویسنده" placeholder="نام نویسنده" />
          </Col>
          <Col xs={24} md={8}>
            <CustomSelect
              form={form}
              name="publisherUuid"
              label="ناشر"
              placeholder="انتخاب ناشر"
              options={publisherOptions}
              rules={[REQUIRED_RULE]}
              isLoading={isGetShopAllProductsPublishersLoading}
              onOpenChange={onPublisherOptionsOpenChange}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInput name="subject" label="موضوع" placeholder="مثلاً فلسفه و کلام" />
          </Col>
          <Col xs={24} md={8}>
            <CustomInput name="coverType" label="نوع جلد" placeholder="مثلاً شومیز" />
          </Col>
          <Col xs={24} md={8}>
            <CustomInput name="format" label="قطع" placeholder="مثلاً وزیری" />
          </Col>
          <Col xs={24} md={8}>
            <CustomInput
              name="volumeCount"
              label="تعداد جلد"
              placeholder="مثلاً ۱"
              rules={[NUMBER_RULE]}
            />
          </Col>
          <Col xs={24} md={8}>
            <CustomInput
              name="pageCount"
              label="تعداد صفحه"
              placeholder="مثلاً ۶۰۶"
              rules={[NUMBER_RULE]}
            />
          </Col>
          <Col span={24}>
            <CustomTextArea
              name="description"
              label="معرفی کالا"
              placeholder="معرفی کامل کالا"
            />
          </Col>
        </Row>
      </div>

      <div>
        <CustomDivider text="دسته‌بندی" />
        <ShopAllProductsAddCategoryPicker form={form} />
      </div>

      <div>
        <CustomDivider text="تصاویر کالا" />
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          isReadOnly={false}
          name="images"
          hasUploaderIcon={false}
          hasVerticalLabel
          multiple
          maxCount={4}
          isDisabled={fileList.length >= 4}
          isDataLoading={isUploadFileLoading}
          classNameOuterDiv="shop-all-products-add-images-uploader mb-20"
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 5 مگابایت",
            size: 5,
            sizeUnit: "MB",
          }}
          onChange={(e) => onUploadFileChange(e)}
          uploaderText={
            <div className="shop-all-products-add-upload-text">
              <AiOutlinePlus />
              <span>بارگذاری</span>
            </div>
          }
        />
      </div>

      <div className="flex justify-end gap-3">
        <CustomButton type="default" htmlType="button" onClick={onCancelHandler}>
          انصراف
        </CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          loading={isCreateShopAllProductLoading}
        >
          ثبت کالا
        </CustomButton>
      </div>
    </Form>
  );
};

export default ShopAllProductsAdd;
