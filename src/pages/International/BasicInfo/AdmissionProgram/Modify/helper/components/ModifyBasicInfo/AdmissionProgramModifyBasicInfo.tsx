import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE } from "@infra/router/routes/international";
import {
  useCreateInternationalAdmissionBasicInformationMutation,
  useLazyGetInternationalAdmissionDetailBasicInfoQuery,
  useLazyGetInternationalAllActiveSemestersQuery,
  useLazyGetInternationalAllCountriesQuery,
  useLazyGetInternationalAllGenderQuery,
  useLazyGetInternationalAllResidencesQuery,
  useLazyGetInternationalAllTrainingQuery,
  useLazyGetInternationalAllTrainingTypesQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetInternationalAdmissionDetailBasicInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailBasicInfo/@types/@admissionProgramDetailBasicInfo";

import {
  BasicInfoForm,
  GetInternationalAllCountriesResponse,
} from "./@types/@admissionProgramModifyBasicInfo";
import { AdmissionProgramModifyStepsProps } from "../../../@types/@admissionProgramModify";
import "./_admissionProgramModifyBasicInfo.scss";

const AdmissionProgramModifyBasicInfo = ({
  setCurrent,
}: AdmissionProgramModifyStepsProps) => {
  const [allCountries, setAllCountries] = useState<
    { id: number; title: string; disabled?: boolean }[]
  >([]);

  const {
    params: { id, copiedId, stepNo },
    setSearchParams,
  } = useQueryParams();

  const [form] = Form.useForm<BasicInfoForm>();

  //? ================================  Api Calls ================================
  const [getData] = useLazyGetInternationalAdmissionDetailBasicInfoQuery();

  const [
    getAllActiveSemesters,
    { data: allActiveSemestersData, isFetching: isAllActiveSemestersDataLoading },
  ] = useLazyGetInternationalAllActiveSemestersQuery();

  const [
    getAllResidences,
    {
      data: allResidencesData,
      isFetching: isAllResidencesDataLoading,
      isSuccess: isAllResidencesDataSuccess,
    },
  ] = useLazyGetInternationalAllResidencesQuery();

  const [
    getAllTraining,
    {
      data: allTrainingData,
      isFetching: isAllTrainingDataLoading,
      isSuccess: isAllTrainingDataSuccess,
    },
  ] = useLazyGetInternationalAllTrainingQuery();

  const [
    getAllGender,
    {
      data: allGenderData,
      isFetching: isAllGenderDataLoading,
      isSuccess: isAllGenderDataSuccess,
    },
  ] = useLazyGetInternationalAllGenderQuery();

  const [
    getAllCountries,
    {
      data: allCountriesData,
      isFetching: isAllCountriesDataLoading,
      isSuccess: isAllCountriesDataSuccess,
    },
  ] = useLazyGetInternationalAllCountriesQuery();

  const [
    getAllTrainingTypes,
    {
      data: allTrainingTypesData,
      isFetching: isAllTrainingTypesDataLoading,
      isSuccess: isAllTrainingTypesDataSuccess,
    },
  ] = useLazyGetInternationalAllTrainingTypesQuery();

  const [createAdmissionBasicInfo, { isLoading: isCreateAdmissionBasicInfoLoading }] =
    useCreateInternationalAdmissionBasicInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllActiveSemesters();
  }, []);

  // create
  useEffect(() => {
    if (id) {
      getData(id).unwrap().then(getDataSuccess);
    }
  }, [id]);

  // copy
  useEffect(() => {
    if (!stepNo && copiedId) {
      getData(copiedId).unwrap().then(getDataSuccess);
    }
  }, [copiedId]);

  //* ================================ Util Functions ================================
  // residence نوع اقامت
  const getAllResidencesHandler = () => {
    if (!isAllResidencesDataSuccess) {
      getAllResidences();
    }
  };

  // gender جنسیت
  const getAllGenderHandler = () => {
    if (!isAllGenderDataSuccess) {
      getAllGender();
    }
  };

  //trainingType نوع سیستم آموزشی
  const getAllTrainingHandler = () => {
    if (!isAllTrainingDataSuccess) {
      getAllTraining();
    }
  };

  //countries ملیت
  const getAllCountriesHandler = () => {
    if (!isAllCountriesDataSuccess) {
      getAllCountries()
        .unwrap()
        .then((value: GetInternationalAllCountriesResponse) => {
          const listData = value?.map((item) => ({
            id: item?.id,
            title: item?.title,
          }));

          setAllCountries([
            {
              id: -1,
              title: "همه",
            },
            ...listData,
          ]);
        });
    }
  };

  const allCountriesChangeHandler = (e: string[]) => {
    if (e.includes("-1")) {
      const listData =
        allCountriesData?.map((item) => ({
          id: item?.id,
          title: item?.title,
          disabled: true,
        })) || [];

      setAllCountries([
        {
          id: -1,
          title: "همه",
        },
        ...listData,
      ]);

      form.setFieldValue(
        "regions",
        selectDefaultValueGenerator([
          {
            id: -1,
            title: "همه",
          },
        ])
      );
    } else {
      const listData =
        allCountriesData?.map((item) => ({
          id: item?.id,
          title: item?.title,
        })) || [];

      setAllCountries([
        {
          id: -1,
          title: "همه",
        },
        ...listData,
      ]);
    }
  };

  //trainingType شیوه آموزش
  const getAllTrainingTypesHandler = () => {
    if (!isAllTrainingTypesDataSuccess) {
      getAllTrainingTypes();
    }
  };

  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailBasicInfoResponse
  ) => {
    form.setFieldsValue({
      ...((!copiedId || stepNo) && { admissionTitle: value?.ruleTitle }),
      semester: selectDefaultValueGenerator({
        title: value?.semesterTitle,
        id: value?.semesterId,
      }),
      residence: selectDefaultValueGenerator({
        title: value?.residenceTitle,
        id: value?.residenceId,
      }),
      trainingType: selectDefaultValueGenerator({
        title: value?.trainingType,
        id: value?.trainingTypeId,
      }),
      gender: selectDefaultValueGenerator({
        title: value?.genderTitle,
        id: value?.genderId,
      }),
      training: selectDefaultValueGenerator({
        title: value?.trainingTitle,
        id: value?.trainingId,
      }),
      regions:
        value?.regions?.length > 0
          ? selectDefaultValueGenerator(
              value?.regions?.map((item) => ({
                title: item?.title,
                id: item?.id,
              }))
            )
          : selectDefaultValueGenerator([
              {
                id: -1,
                title: "همه",
              },
            ]),
    });
  };

  const nextBtnClickHandler = () => {
    form.validateFields().then((value) => {
      const isAllRegionSelect = Boolean(value?.regions?.find((item) => item.code === -1));

      const reqBody = {
        faTitle: value?.admissionTitle,
        semesterId: value?.semester?.code,
        residence: value?.residence?.code,
        training: value?.training?.code,
        genderType: value?.gender?.code,
        trainingType: value?.trainingType?.code,
        allRegions: isAllRegionSelect,
        ...(!isAllRegionSelect && {
          countryRegionIds: value?.regions?.map((item) => item.code),
        }),
      };

      if (!id) {
        createAdmissionBasicInfo(reqBody)
          .unwrap()
          .then((value) => {
            setCurrent(1);
            if (!copiedId) {
              setSearchParams({ id: value?.toString() });
            } else {
              setSearchParams({
                id: value?.toString(),
                copiedId,
                stepNo: +stepNo > 2 ? stepNo : "2",
              });
            }
          });
      } else {
        createAdmissionBasicInfo({ ...reqBody, ruleId: +id })
          .unwrap()
          .then(() => {
            setCurrent(1);

            if (!copiedId) {
              setSearchParams({ id });
            } else {
              setSearchParams({ id, copiedId, stepNo: +stepNo > 2 ? stepNo : "2" });
            }
          });
      }
    });
  };

  return (
    <Form
      className="international-admission-program-modify-basic-info-container"
      form={form}
    >
      <CustomDivider text="اطلاعات اولیه برنامه پذیرش" />
      <div className="form-items-container">
        <Row gutter={[16, 16]}>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomInput
              name="admissionTitle"
              label="عنوان برنامه پذیرش"
              placeholder="عنوان برنامه پذیرش را وارد کنید."
              rules={[CUSTOM_REQUIRED_RULE("لطفاْ عنوان برنامه پذیرش را وارد نمایید.")]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="semester"
              options={allActiveSemestersData ? allActiveSemestersData : []}
              label="ترم تحصیلی"
              loading={isAllActiveSemestersDataLoading}
              form={form}
              placeholder="انتخاب کنید"
              rules={[CUSTOM_REQUIRED_RULE("لطفاً ترم تحصیلی را تعیین نمایید.")]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="residence"
              label="نوع اقامت"
              options={allResidencesData ? allResidencesData : []}
              onClick={getAllResidencesHandler}
              placeholder="انتخاب کنید"
              form={form}
              tooltip="مشخص کنید که متقاضیان باید مقیم ایران باشند یا خیر."
              loading={isAllResidencesDataLoading}
              rules={[CUSTOM_REQUIRED_RULE("لطفاً نوع اقامت را تعیین نمایید.")]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="training"
              options={allTrainingData ? allTrainingData : []}
              onClick={getAllTrainingHandler}
              label="نوع سیستم آموزشی"
              form={form}
              tooltip="انتخاب کنید که برنامه شما به صورت پاره وقت (چند ساعت در هفته) یا تمام وقت (تمام وقت تحصیلی) ارائه می‌شود."
              loading={isAllTrainingDataLoading}
              placeholder="انتخاب کنید"
              rules={[CUSTOM_REQUIRED_RULE("لطفاً نوع سیستم آموزشی را تعیین نمایید.")]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="gender"
              options={allGenderData ? allGenderData : []}
              label="جنسیت"
              tooltip="مشخص کنید که برنامه شما برای مردان، زنان یا هر دو قابل دسترسی است."
              onClick={getAllGenderHandler}
              loading={isAllGenderDataLoading}
              form={form}
              placeholder="انتخاب کنید"
              rules={[CUSTOM_REQUIRED_RULE("لطفاً جنسیت را تعیین نمایید.")]}
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="regions"
              options={allCountries}
              label="ملیت"
              tooltip="اگر برنامه شما محدود به ملیت خاصی است، آن را در این قسمت مشخص کنید."
              form={form}
              onClick={getAllCountriesHandler}
              onChange={(e) => allCountriesChangeHandler(e as string[])}
              loading={isAllCountriesDataLoading}
              placeholder="انتخاب کنید"
              mode="multiple"
              rules={[CUSTOM_REQUIRED_RULE("لطفاً ملیت را تعیین نمایید.")]}
              maxTagCount="responsive"
            />
          </Col>
          <Col lg={6} md={8} sm={12} xs={24}>
            <CustomSelect
              name="trainingType"
              options={allTrainingTypesData ? allTrainingTypesData : []}
              onClick={getAllTrainingTypesHandler}
              loading={isAllTrainingTypesDataLoading}
              label="شیوه آموزش"
              tooltip="تعیین کنید که دوره شما به صورت آنلاین، حضوری یا ترکیبی از هر دو برگزار می‌شود."
              form={form}
              placeholder="انتخاب کنید"
              rules={[CUSTOM_REQUIRED_RULE("لطفاً شیوه آموزش را تعیین نمایید.")]}
            />
          </Col>
        </Row>
        <div className="action-btns-container">
          <CustomButton icon={<AiOutlineArrowRight />}>
            <Link to={INTERNATIONAL_BASIC_INFO_ADMISSION_PROGRAM_ROUTE}>انصراف</Link>
          </CustomButton>
          <CustomButton
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
            type="primary"
            onClick={nextBtnClickHandler}
            loading={isCreateAdmissionBasicInfoLoading}
          >
            ثبت و ادامه
          </CustomButton>
        </div>
      </div>
    </Form>
  );
};

export default AdmissionProgramModifyBasicInfo;
