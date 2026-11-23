import { useEffect, useState } from "react";

import { Form, Row } from "antd";

import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetInternationalAdmissionDetailConditionIfoQuery } from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";

import {
  CoursePrerequisitesConditionsType,
  GetInternationalAdmissionDetailConditionInfoResponse,
} from "./@types/@admissionProgramDetailConditions";
import "./_admissionProgramDetailConditions.scss";

const multiSelectGenerator = (
  data: CoursePrerequisitesConditionsType[] | undefined,
  title: keyof CoursePrerequisitesConditionsType
) => {
  if (data?.length === 0) return "-";
  return data?.map(
    (item, index) =>
      item[title] && (
        <span key={index}>
          {item[title]} {index !== data?.length - 1 && "- "}
        </span>
      )
  );
};

const AdmissionProgramDetailConditions = () => {
  const [checkboxOptions, setCheckboxOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const {
    params: { id },
  } = useQueryParams();

  const [form] = Form.useForm<{ admissionCondition: string[] }>();

  //? ================================  Api Calls ================================
  const [getData, { data, isFetching: isGetDataLoading }] =
    useLazyGetInternationalAdmissionDetailConditionIfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData(id).unwrap().then(getDataSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailConditionInfoResponse
  ) => {
    const options = [
      {
        label: "مصاحبه",
        value: "interview",
      },
      {
        label: "انگیزه نامه",
        value: "sop",
      },
      {
        label: "روزمه",
        value: "cv",
      },
      {
        label: "مدرک زبان فارسی",
        value: "faCertificate",
      },
      {
        label: `شرط معدل ${value?.haveMinGPU ? `: ${value?.minGPU} ` : ""} `,
        value: "haveMinGPU",
      },
      {
        label: ` محدودیت ظرفیت پذیرش ${value?.haveMaxEntrance ? `: ${value?.maxEntrance}` : ""} `,
        value: "haveMaxEntrance",
      },
      {
        label: ` قابلیت ثبت درخواست برای همان رشته در دیگر دانشگاه‌ها ${value?.haveMaxSameFieldReq ? `: ${value?.maxSameFieldsReq}` : ""}`,
        value: "haveMaxSameFieldReq",
      },
      {
        label: ` قابلیت ثبت درخواست برای دیگر رشته‌ها در همان دانشگاه یا دیگر دانشگاه‌ها ${value?.haveMaxSameBranchReq ? `: ${value?.maxSameBranchReq}` : ""} `,
        value: "haveMaxSameBranchReq",
      },
    ];

    const checkedValue = [];
    if (value?.interview) checkedValue.push("interview");
    if (value?.sop) checkedValue.push("sop");
    if (value?.cv) checkedValue.push("cv");
    if (value?.faCertificate) checkedValue.push("faCertificate");
    if (value?.haveMinGPU) checkedValue.push("haveMinGPU");
    if (value?.haveMaxEntrance) checkedValue.push("haveMaxEntrance");
    if (value?.haveMaxSameFieldReq) checkedValue.push("haveMaxSameFieldReq");
    if (value?.haveMaxSameBranchReq) checkedValue.push("haveMaxSameBranchReq");

    form.setFieldsValue({
      admissionCondition: checkedValue,
    });

    setCheckboxOptions(options);
  };

  return (
    <Div
      loading={isGetDataLoading}
      className="admission-program-detail-conditions-container"
    >
      <Form form={form}>
        <CustomDivider text="شرایط برنامه پذیرش" />
        <CustomCheckboxGroup
          name="admissionCondition"
          options={checkboxOptions}
          disabled
        />
      </Form>
      <div>
        <CustomDivider text="پیش نیاز‌ها" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label="مقطع پیش نیاز"
            value={dataPlaceHolder({
              data: data?.coursePrerequisites,
              callBack: () =>
                multiSelectGenerator(data?.coursePrerequisites, "degreeTitle"),
            })}
          />
          <SingleVerticalWithCol
            span={24}
            label="رشته پیش نیاز"
            value={dataPlaceHolder({
              data: data?.coursePrerequisites,
              callBack: () =>
                multiSelectGenerator(data?.coursePrerequisites, "fieldTitle"),
            })}
          />
          <SingleVerticalWithCol
            span={24}
            label="زبان تدریس"
            value={data?.languageProficiency}
          />
        </Row>
      </div>
    </Div>
  );
};

export default AdmissionProgramDetailConditions;
