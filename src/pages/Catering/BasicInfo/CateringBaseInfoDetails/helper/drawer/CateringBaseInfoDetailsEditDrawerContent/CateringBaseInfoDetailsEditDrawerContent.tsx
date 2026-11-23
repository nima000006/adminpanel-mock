import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useUpdateBasicInfoFoodMutation,
  useViewBasicInfoFoodQuery,
} from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { MAX_LENGTH_RULE } from "@infra/validation/validationSchema";
import { isCateringBaseInfoImageEnabled } from "@pages/Catering/BasicInfo/_shared/cateringBaseInfoCategory";

import {
  CateringBaseInfoDetailsEditDrawerContentProps,
  CateringBaseInfoDetailsEditDrawerFormData,
  updateBasicInfoFoodRequest,
} from "./@types/@cateringBaseInfoDetailsEditDrawerContent";

import "../../../../_shared/_cateringBaseInfoUploader.scss";

const EDIT_CATERING_SUCCESS_MSG = "غذا با موفقیت ویرایش شد.";

const CateringBaseInfoDetailsEditDrawerContent = ({
  closeDrawerHandler,
  getData,
  record,
  productCategoryTitle,
}: CateringBaseInfoDetailsEditDrawerContentProps) => {
  const [form] = Form.useForm<CateringBaseInfoDetailsEditDrawerFormData>();
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const { params: url } = useQueryParams();

  //? ================================ API ================================
  const [updateBasicInfoFood, { isLoading: isUpdateBasicInfoFoodLoading }] =
    useUpdateBasicInfoFoodMutation();

  const { data: viewBasicInfoFoodData, isFetching: isViewBasicInfoFoodLoading } =
    useViewBasicInfoFoodQuery(
      { id: Number(record?.id) },
      { skip: !record?.id, refetchOnMountOrArgChange: true }
    );

  const isImageEnabled = isCateringBaseInfoImageEnabled(
    viewBasicInfoFoodData?.productCategoryId ?? url?.productCategoryId
  );

  //? ================================ Effects ================================
  useEffect(() => {
    if (!viewBasicInfoFoodData) return;

    form.setFieldsValue({
      description: viewBasicInfoFoodData.description,
    });

    if (
      !isCateringBaseInfoImageEnabled(
        viewBasicInfoFoodData.productCategoryId ?? url?.productCategoryId
      )
    ) {
      setImageList([]);
      return;
    }

    setImageList(
      viewBasicInfoFoodData.mainImageUrl
        ? [
            {
              uid: viewBasicInfoFoodData.mainImageUrl,
              name: viewBasicInfoFoodData.mainImageUrl,
              status: "done",
              url: viewBasicInfoFoodData.mainImageUrl,
            },
          ]
        : []
    );
  }, [viewBasicInfoFoodData, form, url?.productCategoryId]);

  //* ================================ Util Functions ================================
  const onUpdateBasicInfoFoodSuccess = () => {
    toast.success(EDIT_CATERING_SUCCESS_MSG, {
      toastId: EDIT_CATERING_SUCCESS_MSG,
    });
    closeDrawerHandler();
    getData();
  };

  const onSubmitHandler = () => {
    form.validateFields().then((values: CateringBaseInfoDetailsEditDrawerFormData) => {
      if (!viewBasicInfoFoodData) return;

      // Edit UI only changes description; re-send title/image/category/active/tax from view so PUT does not clear persisted fields.
      const request: updateBasicInfoFoodRequest = {
        id: viewBasicInfoFoodData.id,
        title: viewBasicInfoFoodData.title,
        description: values.description,
        productCategoryId: viewBasicInfoFoodData.productCategoryId,
        active: viewBasicInfoFoodData.active,
        ...(isImageEnabled &&
          viewBasicInfoFoodData.mainImage && {
            mainImage: viewBasicInfoFoodData.mainImage,
          }),
        ...(viewBasicInfoFoodData.secondImage && {
          secondImage: viewBasicInfoFoodData.secondImage,
        }),
        ...(viewBasicInfoFoodData.taxStuffId && {
          taxStuffId: viewBasicInfoFoodData.taxStuffId,
        }),
      };

      updateBasicInfoFood(request).unwrap().then(onUpdateBasicInfoFoodSuccess);
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title={`ویرایش ${productCategoryTitle}`}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex items-center gap-3">
            <CustomButton onClick={closeDrawerHandler}>انصراف</CustomButton>
            <CustomButton
              type="primary"
              onClick={onSubmitHandler}
              loading={isUpdateBasicInfoFoodLoading}
              disabled={isViewBasicInfoFoodLoading || !viewBasicInfoFoodData}
            >
              تایید و ثبت
            </CustomButton>
          </div>
        }
      />

      <Div loading={isViewBasicInfoFoodLoading}>
        {isImageEnabled && (
          <Row className="catering-base-info-uploader-row">
            <Col>
              <CustomUploader
                fileList={imageList}
                setFileList={setImageList}
                isReadOnly={true}
                hasNullText
                label={`تصویر پیشفرض ${productCategoryTitle}`}
                hasVerticalLabel={true}
                classNameOuterDiv="catering-base-info-uploader"
                hasUploaderIcon={false}
                maxCount={1}
                name="mainImage"
                uploaderText={`تصویر پیشفرض ${productCategoryTitle}`}
              />
            </Col>
          </Row>
        )}

        <div className="flex w-full flex-col gap-4">
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              span={24}
              label={`عنوان ${productCategoryTitle}`}
              value={viewBasicInfoFoodData?.title}
            />
          </Row>
          <CustomTextArea
            label="توضیحات"
            name="description"
            placeholder={`توضیحات مورد نیاز در خصوص ${productCategoryTitle} را وارد نمایید.`}
            rows={3}
            rules={[MAX_LENGTH_RULE(1000)]}
          />
        </div>
      </Div>
    </Form>
  );
};

export default CateringBaseInfoDetailsEditDrawerContent;
