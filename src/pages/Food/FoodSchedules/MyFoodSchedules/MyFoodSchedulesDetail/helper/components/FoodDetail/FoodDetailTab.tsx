import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyFoodDetailQuery } from "@infra/states/redux/Apis/food/foods/foodApis";
import { MyFoodDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";
import "./_foodDetailTab.scss";

const imageSetter = (value: string): UploadFile[] => {
  if (value) {
    return [
      {
        uid: value,
        name: value,
        status: "done",
        url: value,
      },
    ];
  } else {
    return [];
  }
};

const MyFoodDetailTab = () => {
  const [foodImg_1, setFoodImg_1] = useState<UploadFile[]>([]);
  const [foodImg_2, setFoodImg_2] = useState<UploadFile[]>([]);
  const [foodImg_3, setFoodImg_3] = useState<UploadFile[]>([]);
  const [foodImg_4, setFoodImg_4] = useState<UploadFile[]>([]);

  const {
    params: { productId },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getFoodDetail, { data: foodDetailData, isFetching: isFoodDetailLoading }] =
    useLazyGetMyFoodDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (productId) {
      getFoodDetail({ productId: +productId }).unwrap().then(getFoodDetailOnSuccess);
    }
  }, [productId]);

  //* ================================ Util Functions ================================
  const getFoodDetailOnSuccess = async (value: MyFoodDetailResponse) => {
    if (value?.status === 200) {
      setFoodImg_1(imageSetter(value?.data?.mainImage));
      setFoodImg_2(imageSetter(value?.data?.secondImage));
      setFoodImg_3(imageSetter(value?.data?.thirdImage));
      setFoodImg_4(imageSetter(value?.data?.fourthImage));
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="my-food-schedule-food-detail-tab-container"
      loading={isFoodDetailLoading}
    >
      <CustomDivider
        text="اطلاعات غذا"
        extraContent={
          <CustomTag color={foodDetailData?.data?.active ? "green" : "red"}>
            {foodDetailData?.data?.active ? "فعال" : "غیرفعال"}
          </CustomTag>
        }
      />
      <Row gutter={[16, 16]}>
        <Col span={24} className="banner-rate-container">
          <div className="img-container">
            <CustomUploader
              fileList={foodImg_1}
              setFileList={setFoodImg_1}
              isReadOnly={true}
              name="food"
              uploaderText="غذا"
            />
            <CustomUploader
              fileList={foodImg_2}
              setFileList={setFoodImg_2}
              isReadOnly={true}
              name="food"
              uploaderText="غذا"
            />
            <CustomUploader
              fileList={foodImg_3}
              setFileList={setFoodImg_3}
              isReadOnly={true}
              name="food"
              uploaderText="غذا"
            />
            <CustomUploader
              fileList={foodImg_4}
              setFileList={setFoodImg_4}
              isReadOnly={true}
              name="food"
              uploaderText="غذا"
            />
          </div>
          <CustomRate allowHalf defaultValue={foodDetailData?.data?.rate} disabled />
        </Col>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="عنوان"
          value={foodDetailData?.data?.title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="قرارداد"
          value={foodDetailData?.data?.contractTitle}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="قیمت دانشجویی (ريال)"
          value={foodDetailData?.data?.studentalPrice?.toString()}
          isPrice
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="قیمت حداقل (ريال)"
          value={foodDetailData?.data?.minPrice?.toString()}
          isPrice
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="قیمت حداکثر (ريال)"
          value={foodDetailData?.data?.maxPrice?.toString()}
          isPrice
        />

        <SingleVerticalWithCol
          span={24}
          label="توضیحات"
          value={foodDetailData?.data?.description}
        />
      </Row>
    </Div>
  );
};

export default MyFoodDetailTab;
