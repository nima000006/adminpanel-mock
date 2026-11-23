import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetAllFoodDetailQuery } from "@infra/states/redux/Apis/food/foods/foodApis";

import {
  AllContractFoodDetailDrawerContentProps,
  GetAllFoodDetailResponse,
} from "./@types/@allContractFoodDetailDrawerContent";

const AllContractFoodDetailDrawerContent = ({
  id,
  closeDrawerHandler,
}: AllContractFoodDetailDrawerContentProps) => {
  const [foodImg_1, setFoodImg_1] = useState<UploadFile[]>([]);
  const [foodImg_2, setFoodImg_2] = useState<UploadFile[]>([]);
  const [foodImg_3, setFoodImg_3] = useState<UploadFile[]>([]);
  const [foodImg_4, setFoodImg_4] = useState<UploadFile[]>([]);
  const {
    params: { title },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getFoodDetail, { data: foodDetailData, isFetching: isFoodDetailLoading }] =
    useLazyGetAllFoodDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getFoodDetail({ productId: id }).unwrap().then(getFoodDetailOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getFoodDetailOnSuccess = async (value: GetAllFoodDetailResponse) => {
    if (value?.status === 200) {
      if (value?.data?.mainImage) {
        setFoodImg_1([
          {
            uid: value?.data?.mainImage,
            name: value?.data?.mainImage,
            status: "done",
            url: value?.data?.mainImage,
          },
        ]);
      } else {
        setFoodImg_1([]);
      }

      if (value?.data?.secondImage) {
        setFoodImg_2([
          {
            uid: value?.data?.secondImage,
            name: value?.data?.secondImage,
            status: "done",
            url: value?.data?.secondImage,
          },
        ]);
      } else {
        setFoodImg_2([]);
      }

      if (value?.data?.thirdImage) {
        setFoodImg_3([
          {
            uid: value?.data?.thirdImage,
            name: value?.data?.thirdImage,
            status: "done",
            url: value?.data?.thirdImage,
          },
        ]);
      } else {
        setFoodImg_3([]);
      }

      if (value?.data?.fourthImage) {
        setFoodImg_4([
          {
            uid: value?.data?.fourthImage,
            name: value?.data?.fourthImage,
            status: "done",
            url: value?.data?.fourthImage,
          },
        ]);
      } else {
        setFoodImg_4([]);
      }
    } else {
      return toast.error((value?.data || value?.msg) as any, {
        toastId: (value?.data || value?.msg) as any,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isFoodDetailLoading}>
      <CustomDrawerHeader
        title="جزئیات غذا"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
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
          xl={8}
          lg={8}
          md={12}
          sm={24}
          label="عنوان"
          value={foodDetailData?.data?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          sm={24}
          label="قرارداد"
          value={title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          sm={24}
          label="قیمت دانشجویی (ريال)"
          value={foodDetailData?.data?.studentalPrice?.toString()}
          isPrice
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          md={12}
          sm={24}
          label="قیمت حداقل (ريال)"
          value={foodDetailData?.data?.minPrice?.toString()}
          isPrice
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
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

export default AllContractFoodDetailDrawerContent;
