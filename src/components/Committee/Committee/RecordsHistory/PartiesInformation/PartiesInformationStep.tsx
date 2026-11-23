import { useEffect, useState } from "react";

import { Button, Col, Collapse, Form, Row } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { GetPartiesInfoResponse } from "@pages/Committee/History/RecordsHistory/ReadOnlyArchive/helper/components/PartiesInformationStep/@types/@readOnlyPartiesInformationStep";

import {
  FormData,
  PartiesInformationStepProps,
  SendCommitteePartiesInfoResponse,
} from "./@types/@partiesInformationStep";
import {
  dataPlaceHolder,
  selectDefaultValueGenerator,
} from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_ARCHIVE_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useCreateAndEditPartiesInfoMutation,
  useGetPartiesInfoMutation,
  useLazyGetTypePlaintiffQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { CUSTOM_STEP_SUCCESS_MSG } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  ACCUSED_ID,
  REPORTER_ID,
} from "../../../../../pages/Committee/HandleProcessing/Reports/ReportSubmit/reportSubmitUtils/reportSubmitUtils";
import { User } from "../../../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import StudentSearchModal from "../../../../Modals/Committee/ReportSubmit/StudentSearchModal/StudentSearchModal";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";

import "./_partiesInformationStep.scss";

const ACCUSED_REQUIRED_ERR_MSG = "وارد کردن اطلاعات هویتی متهم الزامیست.";
const COMPLAINANT_REQUIRED_ERR_MSG = "وارد کردن اطلاعات هویتی شاکی الزامیست.";

// Component to show plaintiff and accused information
const infoHandler = (data: Partial<User> | null) => {
  return [
    {
      label: (
        <div className="accused-info-items-container">
          <SingleVerticalItem
            label="نام"
            value={dataPlaceHolder({ data: data?.firstName })}
          />
          <SingleVerticalItem
            label="نام خانوادگی"
            value={dataPlaceHolder({ data: data?.lastName })}
          />
          <SingleVerticalItem
            label="شماره ملی"
            value={dataPlaceHolder({ data: data?.nationalCode })}
          />
          <SingleVerticalItem
            label="شماره دانشجویی"
            value={dataPlaceHolder({ data: data?.studentNumber })}
          />
        </div>
      ),
      children: (
        <div className="accused-info-items-container">
          {/* <SingleVerticalItem label="دپارتمان" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سمت" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سن" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem label="سال ورود" value={dataPlaceHolder({ data: "_" })} /> */}
          <SingleVerticalItem
            label="رشته"
            value={dataPlaceHolder({ data: data?.fieldName })}
          />
          <SingleVerticalItem
            label="مقطع"
            value={dataPlaceHolder({ data: data?.levelName })}
          />
          {/* <SingleVerticalItem label="معدل" value={dataPlaceHolder({ data: "_" })} />
          <SingleVerticalItem
            label="تعداد واحدهای گذرانده"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="تعداد گزارشات دوره"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="تعداد اتهامات دوره"
            value={dataPlaceHolder({ data: "_" })}
          />
          <SingleVerticalItem
            label="بومی/ غیربومی"
            value={dataPlaceHolder({ data: "_" })}
          /> */}
          <SingleVerticalItem
            label="شماره موبایل"
            value={dataPlaceHolder({ data: data?.mobile })}
          />
        </div>
      ),
    },
  ];
};

const plaintiffOptions = [
  {
    title: "شاکی حقیقی",
    id: 8,
  },
  {
    title: "شاکی حقوقی از داخل دانشگاه",
    id: 2,
  },
  {
    title: "شاکی حقوقی از بیرون دانشگاه",
    id: 9,
  },
];

const PartiesInformationStep = ({ setCurrentStep }: PartiesInformationStepProps) => {
  const [accusedInfo, setAccusedInfo] = useState<boolean | null>(null);
  const [complainantInfo, setComplainantInfo] = useState<boolean | null>(null);
  const [complainantInformation, setComplainantInformation] =
    useState<Partial<User> | null>(null);
  const [accusedInformation, setAccusedInformation] = useState<Partial<User> | null>(
    null
  );
  const [searchModal, setSearchModal] = useState({ isOpen: false, from: -1 });
  const [searchParams, setSearchParams] = useSearchParams();
  const [plaintiff, setPlaintiff] = useState<null | number>(null);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getPlainTiffTypeData,
    { data: typePlaintiffData, isFetching: isTypePlaintiffLoading },
  ] = useLazyGetTypePlaintiffQuery();

  const [getPartiesInfo, { data: partiesInfoData, isLoading: isPartiesInfoLoading }] =
    useGetPartiesInfoMutation();

  const [createInfo, { isLoading: isCreateInfoLoading }] =
    useCreateAndEditPartiesInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (plaintiff === 2) {
      getPlainTiffTypeData(1);
    }
  }, [plaintiff]);

  // fulfilling items when back from the second tab to the first tab
  useEffect(() => {
    if (id) {
      getPartiesInfo({
        _data_: {
          id,
        },
      })
        .unwrap()
        .then(getPartiesInfoOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getPartiesInfoOnSuccess = async (value: GetPartiesInfoResponse) => {
    if (value?.status === 200) {
      if (value?.data?.AssociationPlaintiffType?.id === 8) {
        form.setFieldsValue({
          plaintiffOptions: selectDefaultValueGenerator(
            value?.data?.AssociationPlaintiffType
          ),
        });
        setPlaintiff(8);
      } else if (value?.data?.AssociationPlaintiffType?.id === 9) {
        form.setFieldsValue({
          plaintiffOptions: selectDefaultValueGenerator(
            value?.data?.AssociationPlaintiffType
          ),
          complainantName: value?.data?.studentName,
          complainantFamily: value?.data?.studentFamily,
          complainantRule: value?.data?.reporterPost,
          complainantOrgan: value?.data?.reporterUni,
          envelopeNumber: value?.data?.letterNumber,
          envelopDate: value?.data?.letterDate,
        });
        setPlaintiff(9);
      } else {
        form.setFieldsValue({
          plaintiffOptions: selectDefaultValueGenerator({
            id: 2,
            title: "شاکی حقوقی از داخل دانشگاه",
          }),
          typePlaintiff: selectDefaultValueGenerator(
            value?.data?.AssociationPlaintiffType
          ),
        });
        setPlaintiff(2);
      }
      setAccusedInfo(true);
      setAccusedInformation({
        firstName: value?.data?.studentName,
        nationalCode: value?.data?.nationalCode,
        mobile: value?.data?.studentPhoneNumber,
        lastName: value?.data?.studentFamily,
        studentNumber: value?.data?.studentNumber,
      });

      setComplainantInfo(true);
      setComplainantInformation({
        firstName: value?.data?.reporterName,
        nationalCode: value?.data?.reporterNationalcode,
        mobile: value?.data?.reporterPhoneNumber,
        lastName: value?.data?.reporterFamily,
        studentNumber: value?.data?.reporterNumber,
      });
    }
  };

  const createInfoOnSuccess = async (value: SendCommitteePartiesInfoResponse) => {
    if (value?.status == 200 && value?.data?.id) {
      setSearchParams({ id: value?.data?.id?.toString(), step: "2" });
      toast.success(CUSTOM_STEP_SUCCESS_MSG("1"), {
        toastId: CUSTOM_STEP_SUCCESS_MSG("1"),
      });
      setCurrentStep(1);
    }
  };

  // Other Functions
  const openStudentSearchModalHandler = (from: number) => {
    setSearchModal({ isOpen: true, from: from });
  };

  const plaintiffOptionsHandler = (e: string) => {
    setPlaintiff(Number(e));
  };

  const partiesInfoHandler = (values: FormData) => {
    if (
      !accusedInformation?.firstName ||
      !accusedInformation?.lastName ||
      !accusedInformation?.nationalCode ||
      !accusedInformation?.studentNumber
    ) {
      return toast.error(ACCUSED_REQUIRED_ERR_MSG, {
        toastId: ACCUSED_REQUIRED_ERR_MSG,
      });
    }
    const mutualData = {
      studentName: accusedInformation?.firstName,
      nationalCode: accusedInformation?.nationalCode,
      studentPhoneNumber: accusedInformation?.mobile,
      studentFamily: accusedInformation?.lastName,
      studentNumber: accusedInformation?.studentNumber,
      recordKeepingStage: (1)?.toString(),
      violationStatus: 20,
      recordsStage: 1,
      dateLastStatusChange: new Date()?.toISOString(),
      id: id ? +id : null,
    };

    if (plaintiff === 9) {
      createInfo({
        form: "RegistrationRecordsInformationParties",
        id: "fe18cdef84964b38be424e0ef601ea16",
        _data_: {
          // 9 is for legal person from outside of university
          plaintiffType: 9,
          reporterName: values?.complainantName,
          reporterFamily: values?.complainantFamily,
          letterDate: values?.envelopDate,
          letterNumber: values?.envelopeNumber,
          reporterPost: values?.complainantRule,
          reporterUni: values?.complainantOrgan,
          ...mutualData,
        },
      })
        .unwrap()
        .then(createInfoOnSuccess);
    } else {
      if (
        !complainantInformation?.firstName ||
        !complainantInformation?.lastName ||
        !complainantInformation?.nationalCode ||
        !complainantInformation?.studentNumber
      ) {
        return toast.error(COMPLAINANT_REQUIRED_ERR_MSG, {
          toastId: COMPLAINANT_REQUIRED_ERR_MSG,
        });
      }
      createInfo({
        form: "RegistrationRecordsInformationParties",
        id: "fe18cdef84964b38be424e0ef601ea16",
        // 8 is for real person
        _data_: {
          plaintiffType: plaintiff === 8 ? 8 : values?.typePlaintiff?.code,
          reporterName: complainantInformation?.firstName,
          reporterNationalcode: complainantInformation?.nationalCode,
          reporterPhoneNumber: complainantInformation?.mobile,
          reporterFamily: complainantInformation?.lastName,
          reporterNumber: complainantInformation?.studentNumber,
          ...mutualData,
        },
      })
        .unwrap()
        .then(createInfoOnSuccess);
    }
  };

  const closeStudentSearchModalHandler = () => {
    setSearchModal({ isOpen: false, from: -1 });
  };

  const setAccusedDataHandler = (data: Partial<User>) => {
    setAccusedInfo(true);
    setAccusedInformation(data);
  };

  const setComplainantDataHandler = (data: Partial<User>) => {
    setComplainantInfo(true);
    setComplainantInformation(data);
  };

  const OnDraftClickHandler = () => {
    navigate({
      pathname: COMMITTEE_ARCHIVE_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <StudentSearchModal
        isModalOpen={searchModal?.isOpen}
        closeModalHandler={closeStudentSearchModalHandler}
        setAccusedDataHandler={setAccusedDataHandler}
        from={searchModal?.from}
        setReporterDataHandler={setComplainantDataHandler}
      />

      <Form
        onFinish={partiesInfoHandler}
        className="committee-records-submit-parties-information-step-container"
        form={form}
      >
        <Div
          loading={isPartiesInfoLoading}
          className="committee-records-submit-parties-information-step"
        >
          <CustomCard className="flex-col-g32">
            <CustomDivider text="نوع شاکی" />
            <Row gutter={[12, 12]}>
              <Col xs={8}>
                <CustomSelect
                  name="plaintiffOptions"
                  label=""
                  options={plaintiffOptions}
                  form={form}
                  // @ts-expect-error:next-line
                  onChange={plaintiffOptionsHandler}
                  placeholder="انتخاب کنید"
                  rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع شاکی الزامیست.")]}
                />
              </Col>
              {plaintiff === 2 && (
                <Col xs={8}>
                  <CustomSelect
                    name="typePlaintiff"
                    label=""
                    options={typePlaintiffData?.data}
                    form={form}
                    isLoading={isTypePlaintiffLoading}
                    placeholder="انتخاب کنید"
                    rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع شاکی الزامیست.")]}
                  />
                </Col>
              )}
            </Row>
          </CustomCard>
          <CustomCard className="flex-col-g32">
            {plaintiff === 9 ? (
              <>
                <CustomDivider text="اطلاعات هویتی شاکی" />
                <Row gutter={[12, 12]}>
                  <Col xs={6}>
                    <CustomInput
                      type="text"
                      label="نام"
                      name="complainantName"
                      placeholder="نام"
                    />
                  </Col>
                  <Col xs={6}>
                    <CustomInput
                      type="text"
                      label="نام خانوادگی"
                      name="complainantFamily"
                      placeholder="نام خانوادگی"
                      rules={[CUSTOM_REQUIRED_RULE("وارد کردن نام خانوادگی الزامیست.")]}
                    />
                  </Col>
                  <Col xs={6}>
                    <CustomInput
                      type="text"
                      label="سمت"
                      name="complainantRule"
                      placeholder="سمت"
                    />
                  </Col>
                  <Col xs={6}>
                    <CustomInput
                      type="text"
                      label="سازمان"
                      name="complainantOrgan"
                      placeholder="سازمان"
                      rules={[CUSTOM_REQUIRED_RULE("وارد کردن نام سازمان الزامیست.")]}
                    />
                  </Col>
                  <Col xs={6}>
                    <CustomInput
                      type="text"
                      label="شماره نامه"
                      name="envelopeNumber"
                      placeholder="شماره نامه"
                      rules={[CUSTOM_REQUIRED_RULE("وارد کردن شماره نامه الزامیست.")]}
                    />
                  </Col>
                  <Col xs={6}>
                    <CustomDatePicker
                      label="تاریخ نامه"
                      name="envelopDate"
                      placeholder="تاریخ نامه"
                      form={form}
                      defaultValue={partiesInfoData?.data?.letterDate}
                      key={partiesInfoData?.data?.letterDate}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <div className="divider-btn-container">
                  <div>
                    <CustomDivider text="اطلاعات هویتی شاکی" />
                  </div>
                  <div className="btn-container">
                    <Button
                      type="primary"
                      ghost
                      className="search-btn"
                      onClick={() => openStudentSearchModalHandler(REPORTER_ID)}
                    >
                      {complainantInfo ? "تغییر شاکی" : "انتخاب شاکی"}
                    </Button>
                  </div>
                </div>
                {complainantInfo && (
                  <Collapse
                    expandIcon={({ isActive }) => (
                      <IoIosArrowDown
                        rotate={isActive ? 0 : 180}
                        className="collapse-icon"
                      />
                    )}
                    ghost
                    items={infoHandler(complainantInformation)}
                  />
                )}
              </>
            )}
          </CustomCard>
          <CustomCard className="flex-col-g32">
            <div className="divider-btn-container">
              <div>
                <CustomDivider text="اطلاعات هویتی متهم" />
              </div>
              <div className="btn-container">
                <Button
                  type="primary"
                  ghost
                  className="search-btn"
                  onClick={() => openStudentSearchModalHandler(ACCUSED_ID)}
                >
                  {accusedInfo ? "تغییر متهم" : "انتخاب متهم"}
                </Button>
              </div>
            </div>
            {accusedInfo && (
              <Collapse
                expandIcon={({ isActive }) => (
                  <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
                )}
                ghost
                items={infoHandler(accusedInformation)}
              />
            )}
          </CustomCard>
          <div className="button-wrapper">
            <Button type="primary" className="btn" ghost onClick={OnDraftClickHandler}>
              مشاهده پیش نویس
            </Button>
            <Button
              type="primary"
              className="btn"
              htmlType="submit"
              loading={isCreateInfoLoading}
            >
              بعدی
            </Button>
          </div>
        </Div>
      </Form>
    </>
  );
};

export default PartiesInformationStep;
