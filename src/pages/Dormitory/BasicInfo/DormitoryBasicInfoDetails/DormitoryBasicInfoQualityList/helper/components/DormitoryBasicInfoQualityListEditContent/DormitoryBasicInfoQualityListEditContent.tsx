import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import {
  CustomInput,
  CustomInputNumber,
  CustomSelect,
  CustomSwitch,
} from "@components/CustomInputs";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { useLazyDormitoryTypesListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DormitoryBasicInfoQualityListFormType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBasicInfoQualityList/@types/@dormitoryBasicInfoQualityList";

const DormitoryBasicInfoQualityListAddAndEditContent = ({
  form,
  mode,
}: {
  form: FormInstance<DormitoryBasicInfoQualityListFormType>;
  mode?: "add" | "edit";
}) => {
  //? ================================  Api Calls ================================
  const [
    dormitoryTypesList,
    { data: dormitoryTypesListData, isFetching: isDormitoryTypesListLoading },
  ] = useLazyDormitoryTypesListQuery();

  useEffect(() => {
    dormitoryTypesList();
  }, []);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="flex flex-col gap-3" form={form}>
      {mode === "edit" ? (
        <SingleVerticalItem label="عنوان درجه کیفی" value={form.getFieldValue("title")} />
      ) : (
        <CustomInput label="عنوان درجه کیفی" name="title" rules={[REQUIRED_RULE]} />
      )}
      <CustomInputNumber
        label="ترتیب نمایش در لیست"
        name="displayOrder"
        rules={[REQUIRED_RULE]}
      />
      {mode === "edit" ? (
        <SingleVerticalItem
          label="نوع اقامتگاه"
          value={form.getFieldValue("dormitoryType")?.title}
        />
      ) : (
        <CustomSelect
          name="dormitoryType"
          label="نوع اقامتگاه"
          options={dormitoryTypesListData?.map((item: IdTitleName) => ({
            id: item.name,
            title: item.title,
          }))}
          placeholder="انتخاب کنید"
          isLoading={isDormitoryTypesListLoading}
          form={form}
          rules={[REQUIRED_RULE]}
        />
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

export default DormitoryBasicInfoQualityListAddAndEditContent;
