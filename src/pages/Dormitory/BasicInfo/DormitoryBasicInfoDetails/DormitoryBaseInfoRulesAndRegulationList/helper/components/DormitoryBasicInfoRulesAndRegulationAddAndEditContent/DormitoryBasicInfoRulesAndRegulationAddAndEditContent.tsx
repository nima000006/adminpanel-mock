import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import {
  CustomInput,
  CustomSelect,
  CustomSwitch,
  CustomTextArea,
} from "@components/CustomInputs";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import {
  useLazyDormitoryRegulationTypesListQuery,
  useLazyDormitoryRulesAndRegulationDetailQuery,
  useLazyDormitoryTypesListQuery,
} from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { MIN_LENGTH_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DormitoryBaseInfoRulesAndRegulationFormType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoDetails/DormitoryBaseInfoRulesAndRegulationList/@types/@dormitoryBaseInfoRulesAndRegulationList";

const DormitoryBasicInfoRulesAndRegulationAddAndEditContent = ({
  form,
  mode,
  id,
}: {
  mode: "add" | "edit";
  form: FormInstance<DormitoryBaseInfoRulesAndRegulationFormType>;
  id?: string;
}) => {
  //? ================================  Api Calls ================================
  const [
    dormitoryTypesList,
    { data: dormitoryTypesListData, isFetching: isDormitoryTypesListLoading },
  ] = useLazyDormitoryTypesListQuery();

  const [
    dormitoryRegulationTypesList,
    {
      data: dormitoryRegulationTypesListData,
      isFetching: isDormitoryRegulationTypesListLoading,
    },
  ] = useLazyDormitoryRegulationTypesListQuery();

  const [
    dormitoryRulesAndRegulationDetail,
    {
      data: dormitoryRulesAndRegulationDetailData,
      isFetching: isDormitoryRulesAndRegulationDetailLoading,
    },
  ] = useLazyDormitoryRulesAndRegulationDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (mode === "add") {
      dormitoryTypesList();
      dormitoryRegulationTypesList();
    }
  }, []);

  useEffect(() => {
    if (mode === "edit" && id) {
      dormitoryRulesAndRegulationDetail(id)
        .unwrap()
        .then((value) => {
          form.setFieldsValue({
            description: value?.description,
            checked: value?.visible,
          });
        });
    }
  }, [id]);

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="flex flex-col gap-3" form={form}>
      {mode === "add" ? (
        <>
          <CustomInput
            label="عنوان قالب قانون و مقررات"
            name="title"
            rules={[REQUIRED_RULE]}
            placeholder="عنوان قالب قانون را وارد نمایید..."
          />
          <CustomSelect
            className="mb-0!"
            form={form}
            options={dormitoryRegulationTypesListData?.map((item: IdTitleName) => ({
              id: item.name,
              title: item.title,
            }))}
            name="typeOfRules"
            label="نوع قانون و مقررات"
            rules={[REQUIRED_RULE]}
            isLoading={isDormitoryRegulationTypesListLoading}
            placeholder="انتخاب کنید"
          />

          <CustomSelect
            className="mb-0!"
            form={form}
            options={dormitoryTypesListData?.map((item: IdTitleName) => ({
              id: item.name,
              title: item.title,
            }))}
            name="typeOfDormitory"
            label="نوع اقامتگاه"
            rules={[REQUIRED_RULE]}
            isLoading={isDormitoryTypesListLoading}
            placeholder="انتخاب کنید"
          />
        </>
      ) : (
        <Div loading={isDormitoryRulesAndRegulationDetailLoading}>
          <SingleVerticalItem
            label="عنوان قالب قانون و مقررات"
            value={dormitoryRulesAndRegulationDetailData?.title}
          />
          <SingleVerticalItem
            label="نوع قانون و مقررات"
            value={dormitoryRulesAndRegulationDetailData?.kind?.title}
          />
          <SingleVerticalItem
            label="نوع اقامتگاه"
            value={dormitoryRulesAndRegulationDetailData?.accommodationType?.title}
          />
        </Div>
      )}

      <CustomTextArea
        name="description"
        placeholder="متن قالب قانون و مقررات را وارد نمایید..."
        label="توضیحات"
        rules={[REQUIRED_RULE, MIN_LENGTH_RULE(16)]}
      />
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
export default DormitoryBasicInfoRulesAndRegulationAddAndEditContent;
