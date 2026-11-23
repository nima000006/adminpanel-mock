import { useEffect, useState } from "react";

import { Button, Collapse, Form, Modal, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router";

import {
  EditAccusationModalProps,
  GetAmendmentDataResponse,
  infoHandlerProps,
} from "./@type/@typeEditAccusationModal";
import {
  ACCUSED_ID,
  REPORTER_ID,
} from "./EditAccusationModalHelpers/EditAccusationModalHelpers";
import {
  dataPlaceHolder,
  selectDefaultValueGenerator,
} from "../../../../../infrastructure/helpers/utils";
import {
  useGetRecordsPriorityQuery,
  useGetRecordsTypeViolationQuery,
  useGetTypePlaintiffQuery,
  useLazyGetRecordsViolationDetailQuery,
  useLazyGetRecordsViolationListQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useGetAmendmentDataMutation,
  useSendAmendmentDataMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import {
  CUSTOM_REQUIRED_RULE,
  REQUIRED_RULE,
} from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_24 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { SendAmendmentDataResponse } from "../../../../../pages/Committee/HandleProcessing/Reports/SubmitInfringement/@types/@typesSubmitInfringement";
import { User } from "../../../../../pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomDatePicker from "../../../../CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import StudentSearchModal from "../../ReportSubmit/StudentSearchModal/StudentSearchModal";
import "./_editAccusationModal.scss";

const infoHandler = (data: infoHandlerProps) => {
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

const EditAccusationModal = ({
  isModalOpen,
  closeModalHandler,
}: EditAccusationModalProps) => {
  const [isOpenFraudDetails, setIsOpenFraudDetails] = useState(false);
  const [accusedInfo, setAccusedInfo] = useState<boolean | null>(null);
  const [complainantInfo, setComplainantInfo] = useState<boolean | null>(null);
  const [complainantInformation, setComplainantInformation] = useState<any>(null);
  const [accusedInformation, setAccusedInformation] = useState<any>(null);
  const [searchModal, setSearchModal] = useState({ isOpen: false, from: -1 });
  //!store violation type to use for getting violation list
  const [tableTypesViolationsId, setTableTypesViolationsId] = useState<string | null>(
    null
  );
  //!store violation to use for getting violation detail list
  const [violationsListId, setViolationsListId] = useState(null);

  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getAmendmentData, { data: amendmentData, isLoading: isAmendmentDataLoading }] =
    useGetAmendmentDataMutation();

  const { data: typePlaintiffData } = useGetTypePlaintiffQuery(null);

  const { data: typeViolationData, isLoading: isTypeViolationLoading } =
    useGetRecordsTypeViolationQuery(null);

  const { data: recordsPriorityData, isLoading: isRecordsPriorityLoading } =
    useGetRecordsPriorityQuery(null);

  const [
    getRecordsViolationListData,
    { data: recordsViolationListData, isLoading: isRecordsViolationListLoading },
  ] = useLazyGetRecordsViolationListQuery();

  const [
    getRecordsViolationDetailData,
    { data: recordsViolationDetailData, isLoading: isRecordsViolationDetailLoading },
  ] = useLazyGetRecordsViolationDetailQuery();

  const [sendAmendmentData, { isLoading: isSendAmendmentDataLoading }] =
    useSendAmendmentDataMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen && +isModalOpen?.id > 0) {
      getAmendmentData({
        _data_: {
          id: `${isModalOpen?.id}`,
        },
      })
        .unwrap()
        .then(getAmendmentDataOnSuccess);
    }
  }, [isModalOpen]);

  // get violation list based on violation type
  // reset violation and violationDetail value when violation type changed
  // hide more detail items when the user selects a fraud item in previous selection
  useEffect(() => {
    if (tableTypesViolationsId) {
      form.setFieldsValue({
        violation: null,
        violationDetail: undefined,
      });

      if (violationsListId === 11) {
        setIsOpenFraudDetails(false);
      }

      getRecordsViolationListData(tableTypesViolationsId);
    }
  }, [tableTypesViolationsId]);

  // get violation detail list based on violation
  // reset violation detail value when violation changed
  useEffect(() => {
    if (violationsListId) {
      form.setFieldsValue({
        violationDetail: undefined,
      });
      getRecordsViolationDetailData(violationsListId);
    }
  }, [violationsListId]);

  // when violation is fraud more details show to the user
  useEffect(() => {
    if (violationsListId === 11) {
      setIsOpenFraudDetails(true);
    } else {
      setIsOpenFraudDetails(false);
    }
  }, [violationsListId]);

  //* ================================ Util Functions ================================

  const sendAmendmentDataOnSuccess = async (value: SendAmendmentDataResponse) => {
    if (value.status === 200) {
      closeModalHandler();
    }
  };

  const editViolationHandler = () => {
    const formValue = form.getFieldsValue();
    sendAmendmentData({
      form: "AmendmentCharge",
      id: "fcf128ff56ef4e10a35f88c8a70a015f",
      _data_: {
        studentName: accusedInformation?.firstName,
        nationalCode: accusedInformation?.nationalCode,
        studentPhoneNumber: accusedInformation?.mobile,
        studentFamily: accusedInformation?.lastName,
        studentNumber: accusedInformation?.studentNumber,
        reporterName: complainantInformation?.firstName,
        reporterNationalcode: complainantInformation?.nationalCode,
        reporterPhoneNumber: complainantInformation?.mobile,
        reporterFamily: complainantInformation?.lastName,
        reporterNumber: complainantInformation?.studentNumber,
        term: formValue.term,
        lessonCode: formValue.lessonCode,
        dateOccurrence: formValue.dateOccurrence,
        informationSource: formValue.informationSource,
        AssociationInfractionType: formValue.violationType?.item,
        id: +isModalOpen?.id,
        caregiverName: formValue.caregiverName,
        caregiverCode: formValue.caregiverCode,
        placeViolation: formValue.placeViolation,
        AssociationInfractions: formValue.violation?.item,
        plaintiffType: formValue.typePlaintiff,
        AssociationPivotRecordsDetails: formValue.violationDetail?.map(
          (item: any) => item?.item
        ),
        Anonymous: formValue.anonymous,
        AssociationTblPriiority: formValue.procedurePriority?.item,
        descViolation: formValue.violationDesc,
        characteristicCode: formValue.characteristicCode,
      },
    })
      .unwrap()
      .then(sendAmendmentDataOnSuccess);
  };

  // on success requests' callback functions
  // set default value
  const getAmendmentDataOnSuccess = async (value: GetAmendmentDataResponse) => {
    if (value.status === 200) {
      form.setFieldsValue({
        typePlaintiff: value?.data?.AssociationPlaintiffType?.id,
        anonymous: value?.data?.Anonymous,
        violationType: selectDefaultValueGenerator(
          value?.data?.AssociationInfractionType
        ),
        procedurePriority: selectDefaultValueGenerator(
          value?.data?.AssociationTblPriiority
        ),
        violation: selectDefaultValueGenerator(value?.data?.AssociationInfractions),
        violationDetail: selectDefaultValueGenerator(
          value?.data?.AssociationPivotRecordsDetails
        ),
        violationDesc: value?.data?.descViolation,
        dateOccurrence: value?.data?.dateOccurrence,
      });
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
      // when the user wants to change the violation or violation detail list without changing the violation type or violation respectively
      if (value?.data?.AssociationInfractionType?.id.toString()) {
        getRecordsViolationListData(
          value?.data?.AssociationInfractionType?.id.toString()
        );
      }
      if (value?.data?.AssociationInfractions?.id.toString()) {
        getRecordsViolationDetailData(
          value?.data?.AssociationInfractions?.id?.toString()
        );
      }

      // when violation is fraud more details show to the user
      if (value?.data?.AssociationInfractions?.id === 11) {
        form.setFieldsValue({
          term: value?.data?.term,
          lessonCode: value?.data?.lessonCode,
          informationSource: value?.data?.informationSource,
          caregiverName: value?.data?.caregiverName,
          caregiverCode: value?.data?.caregiverCode,
          characteristicCode: value?.data?.characteristicCode,
          placeViolation: value?.data?.placeViolation,
        });
        setIsOpenFraudDetails(true);
      }
    }
  };

  const openStudentSearchModalHandler = (from: number) => {
    setSearchModal({ isOpen: true, from: from });
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {searchModal?.isOpen && (
        <StudentSearchModal
          isModalOpen={searchModal?.isOpen}
          closeModalHandler={closeStudentSearchModalHandler}
          setAccusedDataHandler={setAccusedDataHandler}
          from={searchModal?.from}
          setReporterDataHandler={setComplainantDataHandler}
        />
      )}
      {isModalOpen?.isOpen && (
        <Modal
          title={`اصلاحیه اتهام ${id ? id : ""}`}
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={800}
          centered={true}
          className="committee-accusation-case-edit-accusation-modal-container"
        >
          <Form
            form={form}
            // onFinish={onFormSubmit}
          >
            <Div className="modal-body-container" loading={isAmendmentDataLoading}>
              <CustomCard padding={PADDING_24} className="modal-body">
                <div className="border-round-box">
                  <CustomDivider text=" نوع شاکی" />
                  <CustomRadioGroup
                    name="typePlaintiff"
                    options={typePlaintiffData?.data?.map((item) => {
                      return {
                        label: item?.title,
                        value: item?.id,
                      };
                    })}
                    rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع شاکی الزامیست.")]}
                  />
                </div>
                <div className="border-round-box accused-info-container">
                  <div className="divider-btn-container">
                    <div>
                      <CustomDivider
                        text="اطلاعات هویتی گزارشگر"
                        extraContent={
                          <div className="switch-container">
                            <CustomSwitch
                              valuePropName="anonymous"
                              label="ثبت با هویت ناشناس"
                              className="switch"
                            />
                            <div className="btn-container">
                              <Button
                                type="primary"
                                ghost
                                className="search-btn"
                                onClick={() => openStudentSearchModalHandler(REPORTER_ID)}
                              >
                                {complainantInfo ? "تغییر گزارشگر" : "انتخاب گزارشگر"}
                              </Button>
                            </div>
                          </div>
                        }
                      />
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
                </div>

                <div className="border-round-box accused-info-container">
                  <div className="divider-btn-container">
                    <div>
                      <CustomDivider
                        text="اطلاعات هویتی متهم"
                        extraContent={
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
                        }
                      />
                    </div>
                  </div>
                  {accusedInfo && (
                    <Collapse
                      expandIcon={({ isActive }) => (
                        <IoIosArrowDown
                          rotate={isActive ? 0 : 180}
                          className="collapse-icon"
                        />
                      )}
                      ghost
                      items={infoHandler(accusedInformation)}
                    />
                  )}
                </div>
                <div className="border-round-box">
                  <CustomDivider text="اطلاعات اتهام" />
                  <div className="violation-information-container">
                    <div className="violation-type-wrapper">
                      <CustomSelect
                        name="violationType"
                        label="نوع تخلف"
                        form={form}
                        placeholder="آموزشی"
                        isLoading={isTypeViolationLoading}
                        options={typeViolationData?.data}
                        onChange={(_: any, itemData: any) =>
                          setTableTypesViolationsId(itemData?.item?.id)
                        }
                        rules={[REQUIRED_RULE]}
                      />
                      <CustomSelect
                        name="procedurePriority"
                        label="اولویت رسیدگی"
                        form={form}
                        placeholder="انتخاب کنید"
                        isLoading={isRecordsPriorityLoading}
                        options={recordsPriorityData?.data}
                        rules={[REQUIRED_RULE]}
                      />
                      <CustomSelect
                        name="violation"
                        label="تخلف"
                        form={form}
                        placeholder="تخلف"
                        isLoading={isRecordsViolationListLoading}
                        options={recordsViolationListData?.data}
                        onChange={(_: any, itemData: any) =>
                          setViolationsListId(itemData?.item?.id)
                        }
                        rules={[REQUIRED_RULE]}
                      />
                      <CustomSelect
                        name="violationDetail"
                        label="جزئیات تخلف"
                        mode="multiple"
                        form={form}
                        placeholder="جزئیات"
                        isLoading={isRecordsViolationDetailLoading}
                        options={recordsViolationDetailData?.data}
                      />
                    </div>
                    {isOpenFraudDetails ? (
                      <div className="violation-wrapper">
                        <CustomInput
                          type="text"
                          label="ترم نمونه"
                          name="term"
                          placeholder="ترم نمونه"
                          rules={[REQUIRED_RULE]}
                        />
                        <CustomInput
                          type="text"
                          label="کد درس"
                          name="lessonCode"
                          placeholder="کد درس"
                        />
                        <CustomInput
                          type="text"
                          label="مرجع کسب اطلاعات"
                          name="informationSource"
                          placeholder="مرجع"
                        />
                        <CustomDatePicker
                          label="تاریخ وقوع"
                          // className="date-picker"
                          // rules={[REQUIRED_RULE]}
                          placeholder="تاریخ وقوع"
                          name="dateOccurrence"
                          // isLoading={isLoading || isCreateTimingLoading}
                          form={form}
                          defaultValue={amendmentData?.data?.dateOccurrence}
                          key={amendmentData?.data?.dateOccurrence}
                        />
                        <CustomInput
                          type="text"
                          label="نام مراقب"
                          name="caregiverName"
                          placeholder="نام مراقب"
                          rules={[REQUIRED_RULE]}
                        />
                        <CustomInput
                          type="text"
                          label="کد مراقب"
                          name="caregiverCode"
                          placeholder="کد مراقب"
                        />
                        <CustomInput
                          type="text"
                          label="کد مشخصه"
                          name="characteristicCode"
                          placeholder="کد مشخصه"
                        />
                        <CustomInput
                          type="text"
                          label="محل تخلف"
                          name="placeViolation"
                          placeholder="محل تخلف"
                          rules={[REQUIRED_RULE]}
                        />
                      </div>
                    ) : null}
                    <div className="text-area-wrapper">
                      <CustomTextArea
                        label="توضیحات تخلف"
                        placeholder="توضیحات"
                        name="violationDesc"
                      />
                    </div>
                  </div>
                </div>
                <div className="border-round-box">
                  <CustomDivider text="پیوست ها" />
                  <Upload
                    className="upload-container"
                    listType="picture"
                    multiple
                    disabled
                  >
                    <Button icon={<AiOutlineUpload />} className="upload-btn" disabled>
                      بارگذاری تصاویر
                    </Button>
                  </Upload>
                </div>
                {/* //todo:[ati]:un comment when necessary */}
                {/* <div className="border-round-box">
              <CustomDivider   text="ارجاعات اولیه"/>
              <div className="initial-referral">
                <CustomCheckboxGroup
                  checkboxClassName="check-box"
                  containerClassName="check-box-container"
                  options={[
                    { label: "حراست", value: "حراست" },
                    { label: "معاونت پژوهشی", value: "معاونت پژوهشی" },
                    { label: "معاونت دانشجویی", value: "معاونت دانشجویی" },
                    { label: "معاونت آموزشی", value: "معاونت آموزشی" },
                    { label: "آماده جلسه", value: "آماده جلسه" },
                  ]}
                />
              </div>
            </div> */}
              </CustomCard>
            </Div>
            <div className="submit-buttons-container">
              <Button
                type="primary"
                className="custom-btn"
                htmlType="submit"
                onClick={editViolationHandler}
                loading={isSendAmendmentDataLoading}
              >
                ثبت اصلاحیه
              </Button>
              <Button className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default EditAccusationModal;
