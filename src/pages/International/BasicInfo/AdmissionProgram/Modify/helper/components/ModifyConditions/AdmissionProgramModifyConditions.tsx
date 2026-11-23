import { useEffect } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateInternationalAdmissionConditionsInformationMutation,
  useLazyGetAllFieldsWithDegreesQuery,
  useLazyGetInternationalAdmissionDetailConditionIfoQuery,
  useLazyGetInternationalAllLanguagesQuery,
  useLazyGetInternationalDegreesQuery,
} from "@infra/states/redux/Apis/international/basicInfo/internationalBasicInfo";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetInternationalAdmissionDetailConditionInfoResponse } from "@pages/International/BasicInfo/AdmissionProgram/Detail/helper/components/DetailConditions/@types/@admissionProgramDetailConditions";

import { ConditionInfoForm } from "./@types/@admissionProgramModifyConditions";
import InternationalAdmissionModifyConditionItem from "./helper/components/ConditionItem/InternationalAdmissionModifyConditionItem";
import { AdmissionProgramModifyStepsProps } from "../../../@types/@admissionProgramModify";
import "./_admissionProgramModifyConditions.scss";

const AdmissionProgramModifyConditions = ({
  setCurrent,
}: AdmissionProgramModifyStepsProps) => {
  const {
    params: { id, stepNo, copiedId },
    setSearchParams,
  } = useQueryParams();

  const [form] = Form.useForm<ConditionInfoForm>();

  //? ================================  Api Calls ================================
  const [getData, { data, isFetching: isGetDataLoading }] =
    useLazyGetInternationalAdmissionDetailConditionIfoQuery();

  const [
    getAllDegreesData,
    { data: allDegreesData, isFetching: isAllDegreesDataLoading },
  ] = useLazyGetInternationalDegreesQuery();

  const [
    getAllFieldsWithDegreesData,
    { data: allFieldsWithDegreesData, isFetching: isAllFieldsWithDegreesDataLoading },
  ] = useLazyGetAllFieldsWithDegreesQuery();
  const [
    getAllLanguagesData,
    { data: allLanguagesData, isFetching: isAllLanguagesDataLoading },
  ] = useLazyGetInternationalAllLanguagesQuery();

  const [
    createAdmissionConditionInfo,
    { isLoading: isCreateAdmissionConditionInfoLoading },
  ] = useCreateInternationalAdmissionConditionsInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllDegreesData();
    getAllLanguagesData();
  }, []);

  useEffect(() => {
    if (+stepNo <= 3 && copiedId) {
      getData(copiedId).unwrap().then(getDataSuccess); // copy
    } else if (id) {
      getData(id).unwrap().then(getDataSuccess);
    } else {
      form.setFieldsValue({
        interview: true,
        sop: true,
        cv: true,
        faCertificate: true,
        haveMinGPU: true,
        haveMaxEntrance: true,
        haveMaxSameFieldReq: true,
        haveMaxSameBranchReq: true,
      });
    }
  }, [id, copiedId, stepNo]);

  //* ================================ Util Functions ================================
  const getDataSuccess = async (
    value: GetInternationalAdmissionDetailConditionInfoResponse
  ) => {
    form.setFieldsValue({
      interview: value?.interview,
      sop: value?.sop,
      cv: value?.cv,
      faCertificate: value?.faCertificate,
      haveMinGPU: value?.haveMinGPU,
      haveMaxEntrance: value?.haveMaxEntrance,
      haveMaxSameFieldReq: value?.haveMaxSameFieldReq,
      haveMaxSameBranchReq: value?.haveMaxSameBranchReq,
      haveMinGPUInput: value?.minGPU?.toString(),
      haveMaxEntranceInput: value?.maxEntrance?.toString(),
      haveMaxSameFieldReqInput: value?.maxSameFieldsReq?.toString(),
      haveMaxSameBranchReqInput: value?.maxSameBranchReq?.toString(),
      preDegrees: selectDefaultValueGenerator(
        value?.coursePrerequisites?.map((item) => ({
          title: item?.degreeTitle,
          id: item?.degreeId,
        }))
      ),
      preFields: selectDefaultValueGenerator(
        value?.coursePrerequisites?.map((item) => ({
          title: item?.fieldTitle,
          id: item?.fieldId,
        }))
      ),
      languageProficiency: selectDefaultValueGenerator({
        id: value?.languageProficiencyId,
        title: value?.languageProficiency,
      }),
    });
  };

  const degreeChangeHandler = (e: number[]) => {
    if (e.length > 0) {
      getAllFieldsWithDegreesData(e);
      form.setFieldsValue({
        preFields: undefined,
      });
    }
  };

  const prevBtnClickHandler = () => {
    setCurrent(1);
  };
  const nextBtnClickHandler = () => {
    form.submit();
    form.validateFields().then((value) => {
      const reqBody = {
        interview: Boolean(value?.interview),
        sop: Boolean(value?.sop),
        cv: Boolean(value?.cv),
        faCertificate: Boolean(value?.faCertificate),
        minGPA: value?.haveMinGPUInput ? +value?.haveMinGPUInput : null,
        maxEntrance: value?.haveMaxEntranceInput ? +value?.haveMaxEntranceInput : null,
        maxSameFieldsReq: value?.haveMaxSameFieldReqInput
          ? +value?.haveMaxSameFieldReqInput
          : null,
        maxSameBranchReq: value?.haveMaxSameBranchReqInput
          ? +value?.haveMaxSameBranchReqInput
          : null,
        minDegreesRequired: value?.preDegrees?.map((item) => item?.code),
        minFieldsRequired: value?.preFields?.map((item) => item?.code),
        languageProficiency: value?.languageProficiency?.code,
        id: +id,
      };

      createAdmissionConditionInfo(reqBody)
        .unwrap()
        .then((value: any) => {
          if (value?.error?.data?.message) {
            toast.error(value?.error?.data?.message, {
              toastId: value?.error?.data?.message,
            });
          } else {
            if (copiedId) {
              setSearchParams({ id, copiedId, stepNo: +stepNo > 4 ? stepNo : "4" });
            }
            setTimeout(() => setCurrent(3), 500); // Then change step after a short delay
          }
        });
    });
  };

  return (
    <Form
      form={form}
      className="international-admission-program-modify-conditions-info-container"
    >
      {/* Items */}
      <Div loading={isGetDataLoading} className="form-item-container">
        <div>
          <CustomDivider text="شرایط رشته‌های انتخابی برنامه پذیرش" />
          <Row gutter={[24, 24]}>
            <InternationalAdmissionModifyConditionItem
              text="آیا این برنامه پذیرش دارای مصاحبه می باشد؟"
              name="interview"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا این برنامه پذیرش نیاز به ارسال انگیزه نامه دارد؟"
              name="sop"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا این برنامه پذیرش نیاز به ارسال روزمه دارد؟"
              name="cv"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا این برنامه پذیرش نیاز به مدرک زبان فارسی دارد؟"
              name="faCertificate"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا این برنامه پذیرش شرط معدل دارد؟"
              name="haveMinGPU"
              showInputValue={id ? data?.haveMinGPU : true}
              inputLabel="حداقل معدل"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا این برنامه پذیرش محدودیت ظرفیت پذیرش دارد؟"
              name="haveMaxEntrance"
              showInputValue={id ? data?.haveMaxEntrance : true}
              inputLabel="حداکثر ظرفیت پذیرش"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا متقاضی در این برنامه پذیرش می‌تواند برای همان رشته در دیگر دانشگاه‌ها درخواست ثبت کند؟"
              name="haveMaxSameFieldReq"
              showInputValue={id ? data?.haveMaxSameFieldReq : true}
              inputLabel="حداکثر مقدار قابل درخواست برای همان رشته در سایر دانشگاه‌‌ها"
            />
            <InternationalAdmissionModifyConditionItem
              text="آیا متقاضی در این برنامه پذیرش می تواند برای دیگر رشته‌ها در همان دانشگاه یا دیگر دانشگاه‌ها درخواست ثبت کند؟"
              name="haveMaxSameBranchReq"
              showInputValue={id ? data?.haveMaxSameBranchReq : true}
              inputLabel="حداکثر مقدار برای درخواست دیگر رشته‌ها در همان دانشگاه یا دیگر دانشگاه‌ها"
            />
          </Row>
        </div>
        <div>
          <CustomDivider text="پیش نیاز‌ها" />
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="preDegrees"
                label="مقطع پیش نیاز"
                options={
                  allDegreesData
                    ? allDegreesData?.map((item) => ({ title: item.title, id: item.id }))
                    : []
                }
                placeholder="انتخاب کنید"
                onChange={(e) => degreeChangeHandler(e as number[])}
                rules={[REQUIRED_RULE]}
                mode="multiple"
                loading={isAllDegreesDataLoading}
                form={form}
              />
            </Col>
            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="preFields"
                label="رشته پیش نیاز"
                options={
                  allFieldsWithDegreesData
                    ? allFieldsWithDegreesData?.map((item) => ({
                        title: item.title,
                        id: item.id,
                      }))
                    : []
                }
                placeholder="انتخاب کنید"
                rules={[REQUIRED_RULE]}
                mode="multiple"
                loading={isAllFieldsWithDegreesDataLoading}
                form={form}
              />
            </Col>

            <Col lg={6} md={8} sm={12} xs={24}>
              <CustomSelect
                name="languageProficiency"
                label="زبان تدریس"
                options={allLanguagesData ? allLanguagesData : []}
                placeholder="انتخاب کنید"
                loading={isAllLanguagesDataLoading}
                rules={[REQUIRED_RULE]}
                form={form}
              />
            </Col>
          </Row>
        </div>
      </Div>
      {/* Buttons */}
      <div className="action-btns-container">
        <CustomButton icon={<AiOutlineArrowRight />} onClick={prevBtnClickHandler}>
          بازگشت
        </CustomButton>
        <CustomButton
          icon={<AiOutlineArrowLeft />}
          iconPlacement="end"
          type="primary"
          loading={isCreateAdmissionConditionInfoLoading}
          onClick={nextBtnClickHandler}
        >
          ثبت و ادامه
        </CustomButton>
      </div>
    </Form>
  );
};

export default AdmissionProgramModifyConditions;
