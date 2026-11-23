import { useEffect, useState } from "react";

import { Col, Row, UploadFile } from "antd";
import { toast } from "react-toastify";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetMyFoodDetailQuery } from "@infra/states/redux/Apis/food/foods/foodApis";
import { MyFoodDetailResponse } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";
import "./_FoodReportMyFoodsDetail.scss";

const MyFoodsDetail = () => {
  const {
    params: { title, id },
  } = useQueryParams();

  const [foodImg_1, setFoodImg_1] = useState<UploadFile[]>([]);
  const [foodImg_2, setFoodImg_2] = useState<UploadFile[]>([]);
  const [foodImg_3, setFoodImg_3] = useState<UploadFile[]>([]);
  const [foodImg_4, setFoodImg_4] = useState<UploadFile[]>([]);

  useTitle({
    breadcrumbItems: [
      {
        title: "غذاها",
      },
      ...(title
        ? [
            {
              title: title,
            },
          ]
        : []),
    ],
  });

  //? ================================  Api Calls ================================
  const [getFoodDetail, { data: foodDetailData, isFetching: isFoodDetailLoading }] =
    useLazyGetMyFoodDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getFoodData();
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getFoodData = () => {
    getFoodDetail({ productId: +id }).unwrap().then(getFoodDetailOnSuccess);
  };

  const getFoodDetailOnSuccess = async (value: MyFoodDetailResponse) => {
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
    <Div className="my-foods-detail-container" loading={isFoodDetailLoading}>
      <section className="vendor-information-container">
        <CustomDivider
          text="اطلاعات غذا"
          extraContent={
            <div className="divider-btn-container">
              <CustomTag color={foodDetailData?.data?.active ? "green" : "red"}>
                {foodDetailData?.data?.active ? "فعال" : "غیرفعال"}
              </CustomTag>
            </div>
          }
        />
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
          <CustomRate disabled allowHalf defaultValue={foodDetailData?.data?.rate} />
        </Col>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="عنوان"
            value={dataPlaceHolder({ data: foodDetailData?.data?.title })}
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
            label="سلف"
            value={foodDetailData?.data?.contractRestaurantTitle}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تامین کننده"
            value={foodDetailData?.data?.contractVendorTitle}
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="قیمت دانشجویی(ریال)"
            value={foodDetailData?.data?.studentalPrice?.toString()}
            isPrice
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="قیمت حداکثر(ریال)"
            value={foodDetailData?.data?.maxPrice?.toString()}
            isPrice
          />

          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="قیمت حداقل(ریال)"
            value={foodDetailData?.data?.minPrice?.toString()}
          />

          <SingleVerticalWithCol
            span={24}
            label="توضیحات"
            value={foodDetailData?.data?.description}
          />
        </Row>
      </section>
    </Div>
  );
};

export default MyFoodsDetail;
