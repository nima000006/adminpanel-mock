import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import { CustomInput, CustomSelect, CustomSwitch } from "@components/CustomInputs";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import {
  useLazyDormitoryUnitOfLevelListQuery,
  useLazyDormitoryUnitOfMeasureListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { useLazyGetAmenityCategoryQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  DormitoryBasicInfoFacilitiesListFormType,
  DormitoryFacilitiesListItemType,
} from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoFacilitiesList/@types/@dormitoryBaseInfoFacilitiesList";

const DormitoryBasicInfoFacilitiesListAddAndEditContent = ({
  form,
  mode,
  data,
}: {
  form: FormInstance<DormitoryBasicInfoFacilitiesListFormType>;
  mode?: "add" | "edit";
  data?: DormitoryFacilitiesListItemType | null;
}) => {
  //? ================================  Api Calls ================================
  // facility type
  const [
    getAmenityCategoryList,
    { data: facilitiesData, isFetching: isGetAmenityCategoryListLoading },
  ] = useLazyGetAmenityCategoryQuery();

  const [
    dormitoryUnitOfMeasureList,
    {
      data: dormitoryUnitOfMeasureListData,
      isFetching: isDormitoryUnitOfMeasureListLoading,
    },
  ] = useLazyDormitoryUnitOfMeasureListQuery();

  const [
    dormitoryUnitOfLevelList,
    { data: dormitoryUnitOfLevelListData, isFetching: isDormitoryUnitOfLevelListLoading },
  ] = useLazyDormitoryUnitOfLevelListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (mode === "add") {
      getAmenityCategoryList();
      dormitoryUnitOfMeasureList();
      dormitoryUnitOfLevelList();
    }
  }, [mode]);

  return (
    <Form className="flex flex-col gap-3" form={form}>
      {mode === "edit" ? (
        <>
          <SingleVerticalItem label="نوع امکانات" value={data?.amenityCategory?.title} />
          <SingleVerticalItem label="عنوان امکانات" value={data?.title} />
          <SingleVerticalItem
            label="واحد اندازه‌ گیری"
            value={data?.unitOfMeasure?.title}
          />
          <SingleVerticalItem
            label="امکانات مربوط به"
            value={
              data?.unitLevels?.map((item: IdTitleName) => item.title).join(", ") || ""
            }
          />
        </>
      ) : (
        <>
          <CustomSelect
            className="mb-0!"
            form={form}
            options={
              facilitiesData?.map((item: IdTitleName) => ({
                id: item?.name,
                title: item?.title,
              })) || []
            }
            loading={isGetAmenityCategoryListLoading}
            name="typeOfFacility"
            label="نوع امکانات"
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />

          <CustomInput
            className="mb-0!"
            name="title"
            label="عنوان امکانات"
            rules={[REQUIRED_RULE]}
            placeholder="عنوان امکانات را وارد نمایید..."
          />
          <CustomSelect
            className="mb-0!"
            form={form}
            options={
              dormitoryUnitOfMeasureListData?.map((item: IdTitleName) => ({
                id: item?.name,
                title: item?.title,
              })) || []
            }
            loading={isDormitoryUnitOfMeasureListLoading}
            name="measurement"
            label="واحد اندازه‌ گیری"
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
          <CustomSelect
            className="mb-0!"
            form={form}
            options={
              dormitoryUnitOfLevelListData?.map((item: IdTitleName) => ({
                id: item?.name,
                title: item?.title,
              })) || []
            }
            loading={isDormitoryUnitOfLevelListLoading}
            mode="multiple"
            name="facilitiesRelatedTo"
            label="امکانات مربوط به (حداقل 1 مورد)"
            rules={[REQUIRED_RULE]}
            placeholder="انتخاب کنید"
          />
        </>
      )}

      <CustomSwitch
        className="[&>div]:flex! [&>div]:flex-col! [&>div]:items-start! [&>div]:gap-1!"
        label="وضعیت نمایش"
        name="checked"
        valuePropName="checked"
        checkedChildren="قابل نمایش"
        unCheckedChildren="غیر قابل نمایش"
        initialValue={true}
      />
    </Form>
  );
};
export default DormitoryBasicInfoFacilitiesListAddAndEditContent;
