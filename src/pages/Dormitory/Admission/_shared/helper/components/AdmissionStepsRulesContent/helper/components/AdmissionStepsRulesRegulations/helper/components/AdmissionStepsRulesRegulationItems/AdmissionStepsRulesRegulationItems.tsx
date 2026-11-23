import { useEffect, useState } from "react";

import { Col, FormInstance, Row } from "antd";
import { IoCheckmarkSharp } from "react-icons/io5";
import { PiPencilLine } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";

import { CustomButton, CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyGetDormitoryRegulationTemplateListQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import {
  AdmissionStepsRuleCategoryKey,
  AdmissionStepsRulesFormType,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import { GetAllAdmissionRulesResponse } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";

const AdmissionStepsRulesRegulationItems = ({
  item,
  form,
  data,
}: {
  item: {
    key: AdmissionStepsRuleCategoryKey;
    title: string;
  };
  form: FormInstance<AdmissionStepsRulesFormType>;
  data: GetAllAdmissionRulesResponse | undefined;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [description, setDescription] = useState<string | undefined>(
    "متن قانون در صورت انتخاب در اینجا نمایش داده می‌شود..."
  );

  //? ================================  Api Calls ================================
  const [
    getDormitoryRegulationTemplateList,
    {
      data: getDormitoryRegulationTemplateListData,
      isFetching: isGetDormitoryRegulationTemplateListLoading,
      isSuccess: isGetDormitoryRegulationTemplateListSuccess,
    },
  ] = useLazyGetDormitoryRegulationTemplateListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (data) {
      const regulation = data.regulations?.find((rule) => rule.kind?.name === item.key);
      if (regulation) {
        setDescription(regulation.description);
      }
    }
  }, [data]);

  //* ================================ Util Functions ================================

  const getRuleHandler = () => {
    if (!isGetDormitoryRegulationTemplateListSuccess) {
      getDormitoryRegulationTemplateList({
        pageNumber: 0,
        pageSize: 100,
        kind: item.key,
      });
    }
  };

  const descriptionHandler = (value: SelectType<IdTitle>) => {
    setDescription(value?.title);
    form.setFieldValue(`${item.key}Description`, value?.title);
  };

  const cancelChangeDescriptionHandler = () => {
    setIsEditing(false);
    form.setFieldsValue({ [`${item.key}Description`]: description });
  };

  const changeDescriptionHandler = () => {
    setIsEditing(false);

    const value = form.getFieldValue(`${item.key}Description`);
    setDescription(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <CustomDivider text={item.title} titleClassName="text-base! font-normal!" />

      <Row gutter={[16, 16]}>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <CustomSelect
            name={item.key}
            label="انتخاب قانون"
            form={form}
            options={
              getDormitoryRegulationTemplateListData?.content?.map((item) => ({
                id: item?.uuid,
                title: item?.title,
              })) || []
            }
            placeholder="انتخاب کنید"
            loading={isGetDormitoryRegulationTemplateListLoading}
            onClick={getRuleHandler}
            onChange={(_, value) => descriptionHandler(value as SelectType<IdTitle>)}
          />
        </Col>
      </Row>

      <div className="flex w-full flex-col gap-1">
        {!isEditing ? (
          <>
            <div className="flex w-full items-center justify-between">
              <span className="text-neutral-12 text-sm">توضیحات قانون</span>
              <CustomButton type="dashed" onClick={() => setIsEditing(true)}>
                <PiPencilLine size={16} />
              </CustomButton>
            </div>
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                value={
                  description || "متن قانون در صورت انتخاب در اینجا نمایش داده می‌شود..."
                }
                span={24}
              />
            </Row>
          </>
        ) : (
          <>
            <div className="flex w-full items-center justify-between">
              <span className="text-neutral-12 text-sm">توضیحات قانون</span>

              <div className="flex gap-2">
                <div
                  className="border-dustred-6 flex h-6 w-6 items-center justify-center rounded-sm border border-dashed p-1"
                  onClick={cancelChangeDescriptionHandler}
                >
                  <RxCross1 size={16} className="text-dustred-6" />
                </div>
                <div
                  className="border-neutral-5 flex h-6 w-6 items-center justify-center rounded-sm border border-dashed p-1"
                  onClick={changeDescriptionHandler}
                >
                  <IoCheckmarkSharp size={16} />
                </div>
              </div>
            </div>
            <Row gutter={[16, 16]}>
              <CustomTextArea
                label="توضیحات"
                name={`${item.key}Description`}
                placeholder="متن قانون در صورت انتخاب در اینجا نمایش داده می‌شود..."
                maxLength={2048}
              />
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default AdmissionStepsRulesRegulationItems;
