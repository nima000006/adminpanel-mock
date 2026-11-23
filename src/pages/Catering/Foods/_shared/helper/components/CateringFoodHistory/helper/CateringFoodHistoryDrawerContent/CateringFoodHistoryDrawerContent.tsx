import { useEffect, useState } from "react";

import { Row, UploadFile } from "antd";

import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CateringFoodHistoryDrawerContentProps } from "@pages/Catering/Foods/_shared/helper/components/CateringFoodHistory/helper/CateringFoodHistoryDrawerContent/@types/@cateringFoodHistoryDrawerContent";

const CateringFoodHistoryDrawerContent = ({
  data,
  isLoading = false,
  onClose,
}: CateringFoodHistoryDrawerContentProps) => {
  const [mainImageList, setMainImageList] = useState<UploadFile[]>([]);
  const [secondImageList, setSecondImageList] = useState<UploadFile[]>([]);
  const [thirdImageList, setThirdImageList] = useState<UploadFile[]>([]);
  const [fourthImageList, setFourthImageList] = useState<UploadFile[]>([]);

  //? ================================ Effects ================================
  useEffect(() => {
    if (!data) {
      setMainImageList([]);
      setSecondImageList([]);
      setThirdImageList([]);
      setFourthImageList([]);
      return;
    }

    if (data.mainImage) {
      setMainImageList([
        {
          uid: data.mainImage,
          name: data.mainImage,
          status: "done",
          url: data.mainImage,
        },
      ]);
    } else {
      setMainImageList([]);
    }
    if (data.secondImage) {
      setSecondImageList([
        {
          uid: data.secondImage,
          name: data.secondImage,
          status: "done",
          url: data.secondImage,
        },
      ]);
    } else {
      setSecondImageList([]);
    }
    if (data.thirdImage) {
      setThirdImageList([
        {
          uid: data.thirdImage,
          name: data.thirdImage,
          status: "done",
          url: data.thirdImage,
        },
      ]);
    } else {
      setThirdImageList([]);
    }
    if (data.fourthImage) {
      setFourthImageList([
        {
          uid: data.fourthImage,
          name: data.fourthImage,
          status: "done",
          url: data.fourthImage,
        },
      ]);
    } else {
      setFourthImageList([]);
    }
  }, [data]);

  const imageSlots = [
    { key: "mainImage", fileList: mainImageList, setFileList: setMainImageList },
    { key: "secondImage", fileList: secondImageList, setFileList: setSecondImageList },
    { key: "thirdImage", fileList: thirdImageList, setFileList: setThirdImageList },
    { key: "fourthImage", fileList: fourthImageList, setFileList: setFourthImageList },
  ].filter((slot) => slot.fileList.length > 0);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="جزییات ویرایش ثبت شده"
        closeDrawerHandler={onClose}
        hasLeftSide={false}
      />
      <Div loading={isLoading}>
        <section className="flex flex-col gap-6">
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
            <SingleVerticalWithCol
              label="غذا"
              value={dataPlaceHolder({ data: data?.baseProductTitle })}
            />
            <SingleVerticalWithCol
              label="عنوان نمایشی به کاربر"
              value={dataPlaceHolder({ data: data?.userTitle })}
            />
            <SingleVerticalWithCol
              label="عنوان نمایشی در پنل مدیریت تغذیه"
              value={dataPlaceHolder({ data: data?.title })}
            />
            <SingleVerticalWithCol
              label="قرارداد"
              value={dataPlaceHolder({ data: data?.contractTitle })}
            />
            <SingleVerticalWithCol
              label="قیمت دانشجویی"
              value={data?.studentalPrice?.toString()}
              isPrice
              isRial
              currency={{ isAvailable: true, type: "تومان" }}
            />
            <SingleVerticalWithCol
              label="حداکثر قیمت"
              value={data?.maxPrice?.toString()}
              isPrice
              isRial
              currency={{ isAvailable: true, type: "تومان" }}
            />
            <SingleVerticalWithCol
              label="سلف"
              value={dataPlaceHolder({ data: data?.restaurantTitle })}
            />
            <SingleVerticalWithCol
              label="تأمین کننده"
              value={dataPlaceHolder({
                data: data?.vendorTitle || data?.vendorName,
              })}
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات نمایشی به کاربر"
              value={dataPlaceHolder({ data: data?.description })}
            />
          </Row>
        </section>
      </Div>
    </div>
  );
};

export default CateringFoodHistoryDrawerContent;
