import { useEffect, useMemo, useState } from "react";

import { Form } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

import { CustomButton, CustomInput } from "@components/CustomInputs";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomModal from "@components/Renderers/CustomModal/CustomModal";
import Div from "@components/Renderers/Div/Div";
import { useViewBasicInfoFoodQuery } from "@infra/states/redux/Apis/catering/basicInfo/basicInfoApi";

import {
  CateringMyFoodListDefaultImageOption,
  CateringMyFoodListDefaultImagesModalFormType,
  CateringMyFoodListDefaultImagesModalProps,
} from "./@types/@cateringMyFoodListDefaultImagesModal";

import "./_cateringMyFoodListDefaultImagesModal.scss";

const CateringMyFoodListDefaultImagesModal = ({
  open,
  productBaseId,
  onCancel,
  onConfirm,
}: CateringMyFoodListDefaultImagesModalProps) => {
  const [form] = Form.useForm<CateringMyFoodListDefaultImagesModalFormType>();
  const searchValue = Form.useWatch("defaultImagesSearch", form) ?? "";
  const [selectedImageKey, setSelectedImageKey] = useState<string | null>(null);

  const { data: viewBasicInfoFoodData, isFetching: isViewBasicInfoFoodLoading } =
    useViewBasicInfoFoodQuery(
      { id: Number(productBaseId) },
      {
        skip: !open || !productBaseId,
        refetchOnMountOrArgChange: true,
      }
    );

  const imageOptions = useMemo<CateringMyFoodListDefaultImageOption[]>(() => {
    if (!viewBasicInfoFoodData) return [];

    const options: CateringMyFoodListDefaultImageOption[] = [];
    const foodTitle = viewBasicInfoFoodData.title;

    if (viewBasicInfoFoodData.mainImage && viewBasicInfoFoodData.mainImageUrl) {
      options.push({
        key: "mainImage",
        title: foodTitle,
        imageName: viewBasicInfoFoodData.mainImage,
        imageUrl: viewBasicInfoFoodData.mainImageUrl,
      });
    }

    if (viewBasicInfoFoodData.secondImage && viewBasicInfoFoodData.secondImageUrl) {
      options.push({
        key: "secondImage",
        title: foodTitle,
        imageName: viewBasicInfoFoodData.secondImage,
        imageUrl: viewBasicInfoFoodData.secondImageUrl,
      });
    }

    if (viewBasicInfoFoodData.thirdImage && viewBasicInfoFoodData.thirdImageUrl) {
      options.push({
        key: "thirdImage",
        title: foodTitle,
        imageName: viewBasicInfoFoodData.thirdImage,
        imageUrl: viewBasicInfoFoodData.thirdImageUrl,
      });
    }

    if (viewBasicInfoFoodData.fourthImage && viewBasicInfoFoodData.fourthImageUrl) {
      options.push({
        key: "fourthImage",
        title: foodTitle,
        imageName: viewBasicInfoFoodData.fourthImage,
        imageUrl: viewBasicInfoFoodData.fourthImageUrl,
      });
    }

    return options;
  }, [viewBasicInfoFoodData]);

  const filteredImageOptions = useMemo(() => {
    const normalizedSearch = searchValue.trim();
    if (!normalizedSearch) return imageOptions;

    return imageOptions.filter((option) => option.title.includes(normalizedSearch));
  }, [imageOptions, searchValue]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setSelectedImageKey(null);
    }
  }, [open, form]);

  const selectedImage = imageOptions.find((option) => option.key === selectedImageKey);

  const confirmHandler = () => {
    if (!selectedImage) return;
    onConfirm(selectedImage);
  };

  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="انتخاب از عکس‌های پیش فرض پنل مدیریت تغذیه"
      size="large"
      confirmText="تایید"
      cancelText="انصراف"
      confirmDisabled={!selectedImage}
      onConfirm={confirmHandler}
      destroyOnClose
      className="catering-my-food-list-default-images-modal"
    >
      <Div loading={isViewBasicInfoFoodLoading}>
        <Form form={form} className="flex w-full flex-col gap-5">
          <CustomAlert
            type="info"
            showIcon
            className="border border-dashed! border-(--primary-4)! bg-(--primary-1)!"
            title="عکس پیش فرض"
            description="لطفا یکی از عکس‌های زیر را انتخاب کنید"
          />

          <CustomInput
            type="text"
            name="defaultImagesSearch"
            placeholder="جستجو"
            hasVerticalLabel={false}
            suffix={<AiOutlineSearch size={20} className="text-neutral-7" />}
            allowClear
          />

          <div className="catering-my-food-list-default-images-grid">
            {filteredImageOptions.map((option) => {
              const isSelected = selectedImageKey === option.key;

              return (
                <CustomButton
                  key={option.key}
                  htmlType="button"
                  className={`catering-my-food-list-default-images-card ${
                    isSelected
                      ? "catering-my-food-list-default-images-card--selected"
                      : ""
                  }`}
                  onClick={() => setSelectedImageKey(option.key)}
                >
                  <CustomUploader
                    fileList={[
                      {
                        uid: option.imageName,
                        name: option.imageUrl || option.imageName,
                        status: "done",
                        url: option.imageUrl || option.imageName,
                      },
                    ]}
                    setFileList={() => undefined}
                    isReadOnly
                    isDisabled
                    hasUploaderIcon={false}
                    maxCount={1}
                    classNameOuterDiv="catering-my-food-list-default-images-uploader"
                    UploadSizeLimitConfig={{ isActive: false }}
                  />
                  <p className="catering-my-food-list-default-images-card__title">
                    {option.title}
                  </p>
                </CustomButton>
              );
            })}
          </div>
        </Form>
      </Div>
    </CustomModal>
  );
};

export default CateringMyFoodListDefaultImagesModal;
