import { useEffect, useState } from "react";

import { Button, Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { GetViolationInfoResponse } from "@pages/Committee/History/RecordsHistory/ReadOnlyArchive/helper/components/InfringementInformationStep/@types/@readOnlyInfringementInformationStep";

import {
  CreateAndEditViolationInfoResponse,
  InfringementInformationStepProps,
  SubmitHistoryFormData,
  SubmitHistoryViolationDetailType,
  SubmitHistoryViolationType,
  SubmitHistoryViolationTypeType,
} from "./@types/@infringementInformationStep";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateAndEditViolationInfoMutation,
  useGetRecordsTypeViolationQuery,
  useGetViolationInfoMutation,
  useLazyGetRecordsViolationDetailQuery,
  useLazyGetRecordsViolationListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { CUSTOM_STEP_SUCCESS_MSG } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";

import "./_infringementInformationStep.scss";

const CREATE_EDIT_VIOLATION_INFO_WARN_MSG = "مشکلی پیش آمده است، لطفا مجدد تلاش فرمایید.";

const InfringementInformationStep = ({
  setCurrentStep,
}: InfringementInformationStepProps) => {
  // store violation type to use for getting violation list
  const [tableTypesViolationsId, setTableTypesViolationsId] = useState<number | null>(
    null
  );
  // store violation to use for getting violation detail list
  const [violationsListId, setViolationsListId] = useState<number | null>(null);
  // when violation is fraud more details show to user
  const [isOpenFraudDetails, setIsOpenFraudDetails] = useState(true);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getViolationInfo,
    { data: violationInfoData, isLoading: isViolationInfoLoading },
  ] = useGetViolationInfoMutation();

  const { data: typeViolationData, isLoading: isTypeViolationLoading } =
    useGetRecordsTypeViolationQuery(null);

  const [
    getRecordsViolationListData,
    { data: recordsViolationListData, isLoading: isRecordsViolationListLoading },
  ] = useLazyGetRecordsViolationListQuery();

  const [
    getRecordsViolationDetailData,
    { data: recordsViolationDetailData, isLoading: isRecordsViolationDetailLoading },
  ] = useLazyGetRecordsViolationDetailQuery();

  const [createAndEditViolationInfo, { isLoading: isCreateAndEditViolationLoading }] =
    useCreateAndEditViolationInfoMutation();

  //? ================================ Effects ================================
  // Because we put datePicker in condition, in initial rendering it shows georgian date and
  // on the next rendering it shows correct persian date, for solving this issue first we set isOpenFraudDetails
  // state true for creating datePicker in the DOM, then hide it by setting isOpenFraudDetails falsy,
  // then set hiding or displaying based on data from server.
  useEffect(() => {
    setIsOpenFraudDetails(false);
  }, []);

  useEffect(() => {
    if (id) {
      getViolationInfo({
        _data_: {
          id,
        },
      })
        .unwrap()
        .then(getViolationInfoOnSuccess);
    }
  }, [id]);

  useEffect(() => {
    // reset violation and violationDetail value when violation type changed
    if (tableTypesViolationsId) {
      form.setFieldsValue({
        violation: null,
        violationDetail: undefined,
      });

      // hide more detail items when the user selects a fraud item in previous selection
      if (violationsListId !== 11) {
        setIsOpenFraudDetails(false);
      }

      // get violation list based on violation type
      getRecordsViolationListData(`${tableTypesViolationsId}`);
    }
  }, [tableTypesViolationsId]);

  useEffect(() => {
    // reset violation detail value when violation changed
    if (violationsListId) {
      form.setFieldsValue({
        violationDetail: undefined,
      });

      // get violation detail list based on violation
      getRecordsViolationDetailData(`${violationsListId}`);
    }

    // when violation is fraud more details show to the user
    if (violationsListId === 11) {
      setIsOpenFraudDetails(true);
    } else {
      setIsOpenFraudDetails(false);
    }
  }, [violationsListId]);

  //* ================================ Util Functions ================================
  const getViolationInfoOnSuccess = async (value: GetViolationInfoResponse) => {
    if (value?.status === 200) {
      // when violation is fraud more details show to the user
      if (value?.data?.AssociationInfractions?.id === 11) {
        setIsOpenFraudDetails(true);
      }

      form.setFieldsValue({
        violationType: selectDefaultValueGenerator(
          value?.data?.AssociationInfractionType
        ),
        violation: selectDefaultValueGenerator(value?.data?.AssociationInfractions),
        violationDetail: selectDefaultValueGenerator(
          value?.data?.AssociationPivotRecordsDetails
        ),
        ...(value?.data?.AssociationInfractions?.id === 11 && {
          term: value?.data?.term,
          occurYear: value?.data?.characteristicCode,
          lessonCode: value?.data?.lessonCode,
          caregiverName: value?.data?.caregiverName,
          caregiverCode: value?.data?.caregiverCode,
          placeViolation: value?.data?.placeViolation,
          informationSource: value?.data?.informationSource,
        }),
        violationDesc: value?.data?.descViolation,
      });
      // when the user wants to change the violation or violation detail list without changing the violation type or violation respectively
      if (value?.data?.AssociationInfractionType?.id.toString()) {
        getRecordsViolationListData(
          value?.data?.AssociationInfractionType?.id.toString()
        );
      }
      if (value?.data?.AssociationInfractions?.id.toString()) {
        getRecordsViolationDetailData(value?.data?.AssociationInfractions?.id.toString());
      }
    }
  };

  const createAndEditViolationInfoOnSuccess = (
    value: CreateAndEditViolationInfoResponse
  ) => {
    if (value?.status == 200 && value?.data?.id) {
      setSearchParams({
        id: value?.data?.id?.toString(),
        step: "3",
      });
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : 3));
      toast.success(CUSTOM_STEP_SUCCESS_MSG("2"), {
        toastId: CUSTOM_STEP_SUCCESS_MSG("2"),
      });
    }
  };

  const infringementInfoHandler = (values: SubmitHistoryFormData) => {
    if (id) {
      const data = {
        AssociationPivotRecordsDetails: values?.violationDetail?.map(
          (value: SubmitHistoryViolationDetailType) => ({
            id: value?.item?.id,
            title: value?.item?.title,
            violationId: value?.item?.AssociationViiolation_id,
          })
        ),
        informationSource: values?.informationSource,
        characteristicCode: values?.occurYear,
        caregiverName: values?.caregiverName,
        caregiverCode: values?.caregiverCode,
        lessonCode: values?.lessonCode,
        descViolation: values?.violationDesc,
        dateLastStatusChange: new Date()?.toISOString(),
        placeViolation: values?.placeViolation,
        term: values?.term,
        recordsStage: 2,
        id: +id,
        infractionType: values?.violationType?.item?.id,
        infraction: values?.violation?.item?.id,
      };

      createAndEditViolationInfo({
        form: "RegistrationRecordsViolationInformation",
        id: "d32efc33c18a48d1839ab41a53a4f519",
        _data_: data,
      })
        .unwrap()
        .then(createAndEditViolationInfoOnSuccess);
    } else {
      toast.warning(CREATE_EDIT_VIOLATION_INFO_WARN_MSG, {
        toastId: CREATE_EDIT_VIOLATION_INFO_WARN_MSG,
      });
    }
  };

  const backBtnHandler = () => {
    if (id) {
      setSearchParams({ id, step: "1" });
    } else {
      navigate({
        pathname: COMMITTEE_RECORDS_SUBMIT_PAGE_ROUTE,
      });
    }
    setCurrentStep(0);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="committee-records-submit-infringement-information-step-container"
      onFinish={infringementInfoHandler}
      form={form}
    >
      <Div className="border-round-box flex-col-g32" loading={isViolationInfoLoading}>
        <CustomDivider text="اطلاعات تخلف" />

        <Row gutter={[12, 12]}>
          <Col lg={8} sm={12} xs={24}>
            <CustomSelect
              name="violationType"
              label="نوع تخلف"
              form={form}
              placeholder="آموزشی"
              isLoading={isTypeViolationLoading}
              options={typeViolationData?.data}
              // @ts-expect-error:next-line
              onChange={(_: number, itemData: SubmitHistoryViolationTypeType) => {
                setTableTypesViolationsId(itemData?.item?.id);
              }}
              rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع تخلف الزامیست.")]}
            />
          </Col>
          <Col lg={8} sm={12} xs={24}>
            <CustomSelect
              name="violation"
              label="تخلف"
              form={form}
              placeholder="تخلف"
              isLoading={isRecordsViolationListLoading}
              options={recordsViolationListData?.data}
              // @ts-expect-error:next-line
              onChange={(_: number, itemData: SubmitHistoryViolationType) =>
                setViolationsListId(itemData?.item?.id)
              }
              rules={[CUSTOM_REQUIRED_RULE("انتخاب تخلف الزامیست.")]}
            />
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <CustomSelect
              name="violationDetail"
              label="جزئیات تخلف"
              mode="multiple"
              form={form}
              placeholder="جزئیات"
              isLoading={isRecordsViolationDetailLoading}
              options={recordsViolationDetailData?.data}
            />
          </Col>

          {isOpenFraudDetails && (
            <>
              <Col lg={8} sm={12} xs={24}>
                <CustomDatePicker
                  label="سال وقوع"
                  rules={[CUSTOM_REQUIRED_RULE("انتخاب سال وقوع الزامیست.")]}
                  placeholder="انتخاب کنید"
                  name="occurYear"
                  form={form}
                  picker="year"
                  isLoading={isViolationInfoLoading}
                  defaultValue={
                    violationInfoData?.data?.characteristicCode &&
                    moment(violationInfoData?.data?.characteristicCode).locale("fa")
                  }
                />
              </Col>
              <Col lg={8} sm={12} xs={24}>
                <CustomInput
                  type="text"
                  label="ترم وقوع"
                  name="term"
                  placeholder="ترم وقوع"
                  rules={[CUSTOM_REQUIRED_RULE("وارد کردن ترم وقوع الزامیست.")]}
                />
              </Col>
              <Col lg={8} sm={12} xs={24}>
                <CustomInput
                  type="text"
                  label="کد درس"
                  name="lessonCode"
                  placeholder="کد درس"
                />
              </Col>
              <Col lg={8} sm={12} xs={24}>
                <CustomInput
                  type="text"
                  label="نام مراقب"
                  name="caregiverName"
                  placeholder="نام مراقب"
                />
              </Col>
              <Col lg={8} sm={12} xs={24}>
                <CustomInput
                  type="text"
                  label="کد مراقب"
                  name="caregiverCode"
                  placeholder="کد مراقب"
                />
              </Col>
              <Col lg={8} sm={12} xs={24}>
                <CustomInput
                  type="text"
                  label="محل تخلف"
                  name="placeViolation"
                  placeholder="محل تخلف"
                />
              </Col>
              <Col lg={8} sm={12} xs={24}>
                <CustomInput
                  type="text"
                  label="مرجع کسب اطلاعات"
                  name="informationSource"
                  placeholder="مرجع"
                />
              </Col>
            </>
          )}
          <Col lg={24} sm={24} xs={24}>
            <CustomTextArea
              label="توضیحات تخلف"
              placeholder="توضیحات"
              name="violationDesc"
            />
          </Col>
        </Row>
      </Div>
      {/* todo[shirin]: commented on this part because it is not needed in the project at the moment. */}
      {/* <div className="border-round-box flex-col-g32">
        <CustomDivider  text="پیوست ها">
        <Upload className="upload-container" listType="picture" multiple disabled>
          <Button icon={<AiOutlineUpload />} className="upload-btn" disabled>
            بارگذاری تصاویر
          </Button>
        </Upload>
      </div> */}
      <div className="buttons-container">
        <Button className="back-btn" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isCreateAndEditViolationLoading}
        >
          بعدی
        </Button>
      </div>
    </Form>
  );
};

export default InfringementInformationStep;
