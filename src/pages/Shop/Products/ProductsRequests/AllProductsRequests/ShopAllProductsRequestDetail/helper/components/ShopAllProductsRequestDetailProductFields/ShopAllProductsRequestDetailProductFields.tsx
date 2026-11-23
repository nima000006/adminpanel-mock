import { Col, Form, Row } from "antd";

import { CustomInputNumber, CustomUploader } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { groupShopAllProductsRequestDetailCategories } from "./helper/utils/groupShopAllProductsRequestDetailCategories";
import { ShopAllProductsRequestDetailProductFieldsProps } from "../../../@types/@shopAllProductsRequestDetail";

const ShopAllProductsRequestDetailProductFields = ({
  detail,
  imageFileList,
  setImageFileList,
  form,
  isProductIdEditable = false,
}: ShopAllProductsRequestDetailProductFieldsProps) => {
  const categories = groupShopAllProductsRequestDetailCategories(detail.categories);
  const categoryRows = categories.length ? categories : [undefined];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <CustomDivider text="شابک" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol lg={8} xl={8} label="شابک" value={detail.isbn} />
        </Row>
      </div>

      <div>
        <CustomDivider text="اطلاعات کالا" />
        <Row gutter={[16, 16]}>
          {isProductIdEditable ? (
            <Col lg={8} xl={8} span={24}>
              <Form form={form} layout="vertical">
                <CustomInputNumber
                  name="productId"
                  label="شناسه مالیاتی"
                  placeholder="شناسه مالیاتی را وارد کنید"
                  rules={[REQUIRED_RULE]}
                  min={1}
                  required
                />
              </Form>
            </Col>
          ) : null}
          <SingleVerticalWithCol span={24} label="عنوان کالا" value={detail.title} />
          <SingleVerticalWithCol lg={8} xl={8} label="نویسنده" value={detail.author} />
          <SingleVerticalWithCol
            lg={8}
            xl={8}
            label="ناشر"
            value={detail.publisher?.title}
          />
          <SingleVerticalWithCol lg={8} xl={8} label="موضوع" value={detail.subject} />
          <SingleVerticalWithCol lg={8} xl={8} label="قطع" value={detail.bookSize} />
          <SingleVerticalWithCol
            lg={8}
            xl={8}
            label="تعداد جلد"
            value={detail.volumeCount?.toString()}
          />
          <SingleVerticalWithCol
            lg={8}
            xl={8}
            label="تعداد صفحه"
            value={detail.pageCount?.toString()}
          />
          <SingleVerticalWithCol lg={8} xl={8} label="نوع جلد" value={detail.coverType} />
          <SingleVerticalWithCol
            span={24}
            label="معرفی کالا"
            value={detail.description}
          />
        </Row>
      </div>

      <div className="flex flex-col gap-4">
        <CustomDivider text="دسته‌بندی" />
        {categoryRows.map((category) => {
          const level3Titles = category?.level3
            .map((item) => item.title)
            .filter(Boolean)
            .join("، ");

          return (
            <Row
              gutter={[16, 16]}
              key={
                category
                  ? `${category.level1?.uuid ?? "layer1"}-${category.level2?.uuid ?? "layer2"}`
                  : "empty-category"
              }
            >
              <SingleVerticalWithCol
                lg={8}
                xl={8}
                label="دسته‌بندی لایه ۱"
                value={category?.level1?.title}
              />
              <SingleVerticalWithCol
                lg={8}
                xl={8}
                label="دسته‌بندی لایه ۲"
                value={category?.level2?.title}
              />
              <SingleVerticalWithCol
                lg={8}
                xl={8}
                label="دسته‌بندی لایه ۳"
                value={level3Titles}
              />
            </Row>
          );
        })}
      </div>

      <div>
        <CustomDivider text="تصاویر کالا" />
        <CustomUploader
          fileList={imageFileList}
          setFileList={setImageFileList}
          isReadOnly
          name="images"
          hasNullText
          hasUploaderIcon={false}
          hasVerticalLabel={false}
          maxCount={imageFileList.length || 1}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          classNameOuterDiv="shop-all-products-request-detail-images"
        />
      </div>
    </div>
  );
};

export default ShopAllProductsRequestDetailProductFields;
