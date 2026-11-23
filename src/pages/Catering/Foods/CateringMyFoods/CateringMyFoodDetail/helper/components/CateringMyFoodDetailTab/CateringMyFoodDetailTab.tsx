import { useEffect, useState } from "react";

import { Row, UploadFile } from "antd";
import { AiOutlineEdit } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useViewMyFoodQuery } from "@infra/states/redux/Apis/catering/foods/foodsApis";
import { getCateringFoodStatusTypeTagConfig } from "@pages/Catering/Foods/_shared/utils";
import { CateringMyFoodListCreateDrawerState } from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/drawer/CateringMyFoodListCreateDrawer/@types/@cateringMyFoodListCreateDrawer";
import CateringMyFoodListCreateDrawer from "@pages/Catering/Foods/CateringMyFoods/CateringMyFoodList/helper/drawer/CateringMyFoodListCreateDrawer/CateringMyFoodListCreateDrawer";

const CateringMyFoodDetailTab = () => {
  const { params } = useQueryParams();
  const foodId = params?.id ? Number(params.id) : null;

  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);
  const [drawerState, setDrawerState] = useState<CateringMyFoodListCreateDrawerState>({
    open: false,
    mode: "edit",
    foodId: null,
  });

  //? ================================  Api Calls ================================
  const {
    data: foodDetail,
    isLoading,
    isFetching,
    refetch,
  } = useViewMyFoodQuery(
    {
      id: Number(foodId),
    },
    {
      skip: !foodId,
      refetchOnMountOrArgChange: true,
    }
  );

  const statusTagConfig = getCateringFoodStatusTypeTagConfig(foodDetail?.statusType);

  //? ================================ Effects ================================
  useEffect(() => {
    if (!foodDetail) {
      setMainImageList([]);
      setSecondImageList([]);
      setThirdImageList([]);
      setFourthImageList([]);
      return;
    }

    if (foodDetail.mainImage) {
      setMainImageList([
        {
          uid: foodDetail.mainImage,
          name: foodDetail.mainImage,
          status: "done",
          url: foodDetail.mainImage,
        },
      ]);
    } else {
      setMainImageList([]);
    }
    if (foodDetail.secondImage) {
      setSecondImageList([
        {
          uid: foodDetail.secondImage,
          name: foodDetail.secondImage,
          status: "done",
          url: foodDetail.secondImage,
        },
      ]);
    } else {
      setSecondImageList([]);
    }
    if (foodDetail.thirdImage) {
      setThirdImageList([
        {
          uid: foodDetail.thirdImage,
          name: foodDetail.thirdImage,
          status: "done",
          url: foodDetail.thirdImage,
        },
      ]);
    } else {
      setThirdImageList([]);
    }
    if (foodDetail.fourthImage) {
      setFourthImageList([
        {
          uid: foodDetail.fourthImage,
          name: foodDetail.fourthImage,
          status: "done",
          url: foodDetail.fourthImage,
        },
      ]);
    } else {
      setFourthImageList([]);
    }
  }, [foodDetail]);

  //* ================================ Util Functions ================================
  const openEditDrawerHandler = () => {
    if (!foodId) return;
    setDrawerState({ open: true, mode: "edit", foodId });
  };

  const closeDrawerHandler = () => {
    setDrawerState({ open: false, mode: "edit", foodId: null });
  };

  const onEditSuccessHandler = () => {
    refetch();
  };

  const imageSlots = [
    { key: "mainImage", fileList: mainImageList, setFileList: setMainImageList },
    { key: "secondImage", fileList: secondImageList, setFileList: setSecondImageList },
    { key: "thirdImage", fileList: thirdImageList, setFileList: setThirdImageList },
    { key: "fourthImage", fileList: fourthImageList, setFileList: setFourthImageList },
  ].filter((slot) => slot.fileList.length > 0);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {drawerState.open && (
        <CateringMyFoodListCreateDrawer
          open={drawerState.open}
          onClose={closeDrawerHandler}
          onSuccess={onEditSuccessHandler}
          mode={drawerState.mode}
          foodId={drawerState.foodId}
        />
      )}
      <Div loading={isLoading || isFetching}>
        <section className="flex flex-col gap-6">
          <CustomDivider
            text="اطلاعات غذا"
            extraContent={
              <div className="flex items-center gap-2">
                {statusTagConfig ? (
                  <CustomTag color={statusTagConfig.color}>
                    {statusTagConfig.label}
                  </CustomTag>
                ) : null}
                <CustomButton
                  type="primary"
                  ghost
                  icon={<AiOutlineEdit />}
                  onClick={openEditDrawerHandler}
                >
                  ویرایش
                </CustomButton>
              </div>
            }
          />
          {imageSlots.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {imageSlots.map((slot) => (
                <CustomUploader
                  key={slot.key}
                  fileList={slot.fileList}
                  setFileList={slot.setFileList}
                  isReadOnly={true}
                  name={slot.key}
                  hasNullText
                  hasUploaderIcon={false}
                  maxCount={1}
                />
              ))}
            </div>
          ) : null}
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="غذا" value={foodDetail?.baseProductTitle} />
            <SingleVerticalWithCol
              label="عنوان نمایشی به کاربر"
              value={foodDetail?.userTitle}
            />
            <SingleVerticalWithCol
              label="عنوان نمایشی در پنل مدیریت تغذیه"
              value={foodDetail?.title}
            />
            <SingleVerticalWithCol label="قرارداد" value={foodDetail?.contractTitle} />
            <SingleVerticalWithCol
              label="قیمت دانشجویی"
              value={foodDetail?.studentalPrice?.toString()}
              isPrice
              isRial
              currency={{ isAvailable: true, type: "تومان" }}
            />
            <SingleVerticalWithCol
              label="حداکثر قیمت"
              value={foodDetail?.maxPrice?.toString()}
              isPrice
              isRial
              currency={{ isAvailable: true, type: "تومان" }}
            />
            <SingleVerticalWithCol label="سلف" value={foodDetail?.restaurantTitle} />
            <SingleVerticalWithCol
              label="تأمین کننده"
              value={foodDetail?.vendorTitle || foodDetail?.vendorName}
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات نمایشی به کاربر"
              value={foodDetail?.description}
            />
          </Row>
        </section>
      </Div>
    </>
  );
};

export default CateringMyFoodDetailTab;
