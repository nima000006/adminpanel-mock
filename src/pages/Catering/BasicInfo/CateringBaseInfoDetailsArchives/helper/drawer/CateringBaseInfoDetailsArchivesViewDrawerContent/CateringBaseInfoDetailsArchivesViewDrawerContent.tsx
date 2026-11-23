import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useViewBasicInfoFoodQuery } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";
import { isCateringBaseInfoImageEnabled } from "@pages/Catering/BasicInfo/_shared/cateringBaseInfoCategory";

import { CateringBaseInfoDetailsArchivesViewDrawerContentProps } from "./@types/@cateringBaseInfoDetailsArchivesViewDrawerContent";

import "../../../../_shared/_cateringBaseInfoUploader.scss";

const CateringBaseInfoDetailsArchivesViewDrawerContent = ({
  closeDrawerHandler,
  record,
  productCategoryTitle,
}: CateringBaseInfoDetailsArchivesViewDrawerContentProps) => {
  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const { params: url } = useQueryParams();

  //? ================================ API ================================
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
  }, [viewBasicInfoFoodData, url?.productCategoryId]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title={`مشاهده ${productCategoryTitle}`}
        closeDrawerHandler={closeDrawerHandler}
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

        <Row gutter={[16, 16]} className="w-full">
          <SingleVerticalWithCol
            span={24}
            label={`عنوان ${productCategoryTitle}`}
            value={viewBasicInfoFoodData?.title}
          />
          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={viewBasicInfoFoodData?.description}
          />
        </Row>
      </Div>
    </div>
  );
};

export default CateringBaseInfoDetailsArchivesViewDrawerContent;
