import { useEffect, useState } from "react";

import { Form, Steps } from "antd";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  selectDefaultValueGenerator,
  stepStatusCreator,
  timeDefaultValueGenerator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useGetAdmissionDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";

import { ADMISSION_CAN_DEBT, ADMISSION_RESERVATION_TYPES } from "../utils/AdmissionUtils";
import AdmissionModifyBasicInfoStep from "./helpers/AdmissionModifyBasicInfoStep/AdmissionModifyBasicInfoStep";
import AdmissionModifyTariffInfoStep from "./helpers/AdmissionModifyTariffInfoStep/AdmissionModifyTariffInfoStep";
import { GetAdmissionDetailBaseInfoResponse } from "../AdmissionDetail/AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import "./_admissionModify.scss";

const AdmissionModify = () => {
  const [current, setCurrent] = useState(0);
  const [canDebt, setCanDebt] = useState<string | undefined>();
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isSemester, setIsSemester] = useState<boolean>(false);
  const [isApplicationReviewDeadlineShow, setIsApplicationReviewDeadlineShow] =
    useState<boolean>(false);

  const [form] = Form.useForm();
  const {
    params: { id, title },
  } = useQueryParams<{ id: string; title: string }>();

  const isReject = false;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_ADMISSIONS_LIST_PAGE_ROUTE}>برنامه پذیرش</Link>,
      },
      ...(title && id
        ? [
            {
              title: title,
            },
            {
              title: "کپی کردن از برنامه پذیرش",
            },
          ]
        : !id
          ? [
              {
                title: "ایجاد برنامه پذیرش",
              },
            ]
          : []),
    ],
  });
  //? ================================  Api Calls ================================
  // get default data
  const [getAdmissionDetailBaseInfo, { isLoading: isAdmissionDetailBaseInfoLoading }] =
    useGetAdmissionDetailBaseInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) getData();
  }, [id]);

  //* ================================ Util Functions ================================

  const getData = () => {
    getAdmissionDetailBaseInfo({
      _data_: {
        id: id,
      },
    })
      .unwrap()
      .then(getBasicInfoDetailIsSuccess);
  };

  // success
  const getBasicInfoDetailIsSuccess = async (
    value: GetAdmissionDetailBaseInfoResponse
  ) => {
    const canDebtValue = value?.data?.AssociationCanDebt?.title
      ? ADMISSION_CAN_DEBT[value?.data?.AssociationCanDebt?.title]
      : undefined;

    setCanDebt(canDebtValue);

    //! Check if the month is set to monthly
    setIsMonthly(value?.data?.AssociationCategorySchedulingType?.id === 2);
    //! Check if the scheduling set by semester
    setIsSemester(value?.data?.AssociationCategorySchedulingType?.id === 1);

    //! Check if the reservation type is certain
    setIsApplicationReviewDeadlineShow(
      value?.data?.AssociationCategoryReservationType?.id ===
        ADMISSION_RESERVATION_TYPES.certain
        ? false
        : true
    );

    if (value?.status === 200) {
      form.setFieldsValue({
        title: value?.data?.title,
        displayTitle: value?.data?.showTitle,
        semester: selectDefaultValueGenerator(value?.data?.AssociationSemester),
        uni: selectDefaultValueGenerator(value?.data?.AssociationCategoryBranch),
        managementType: selectDefaultValueGenerator(
          value?.data?.AssociationCategoryManagementType
        ),
        timingType: selectDefaultValueGenerator(
          value?.data?.AssociationCategorySchedulingType
        ),
        reservationType: selectDefaultValueGenerator(
          value?.data?.AssociationCategoryReservationType
        ),
        paymentType: selectDefaultValueGenerator(value?.data?.AssociationPaymentType),
        paymentMethod: selectDefaultValueGenerator(value?.data?.AssociationPaymetMethod),
        userGroup: selectDefaultValueGenerator(value?.data?.AssociationUserGroup),
        educationDegree: selectDefaultValueGenerator(value?.data?.AssociationGrade),
        nationality: selectDefaultValueGenerator(value?.data?.AssociationNationality),
        specialConditions: selectDefaultValueGenerator(
          value?.data?.AssociationSpecialStatus
        ),
        applyingForAnother: selectDefaultValueGenerator(
          value?.data?.AssociationIsRequestForAnother
        ),
        canDebt: canDebtValue,
        maxDebt: value?.data?.maxDebt,
        installmentMaxNumber: value?.data?.maxNumberInstallmentForDebt?.toString(),
        applicationReviewDeadline: selectDefaultValueGenerator({
          id: value?.data?.reviewDeadline,
          title: `${value?.data?.reviewDeadline} روز`,
        }),
        paymentDeadline: selectDefaultValueGenerator({
          id: value?.data?.paymentDeadline,
          title: `${value?.data?.paymentDeadline} روز`,
        }),
        desc: value?.data?.description,
        startDateApplied: value?.data?.appliedStartDate
          ? moment(value.data.appliedStartDate).format("YYYY-MM-DD")
          : "",
        startTimeApplied: timeDefaultValueGenerator(value?.data?.appliedStartTime) as any,
        endDateApplied: value?.data?.appliedEndDate
          ? moment(value?.data?.appliedEndDate).format("YYYY-MM-DD")
          : "",
        endTimeApplied: timeDefaultValueGenerator(value?.data?.appliedEndTime) as any,
        months: [
          dayjs(value?.data?.appliedStartDate),
          dayjs(value?.data?.appliedEndDate),
        ],
        startDateReservation: value?.data?.reservationStartDate
          ? moment(value.data.reservationStartDate).format("YYYY-MM-DD")
          : "",
        startTimeReservation: timeDefaultValueGenerator(
          value?.data?.reservationStartTime
        ) as any,
        endDateReservation: value?.data?.reservationEndDate
          ? moment(value?.data?.reservationEndDate).format("YYYY-MM-DD")
          : "",
        endTimeReservation: timeDefaultValueGenerator(
          value?.data?.reservationEndTime
        ) as any,

        startDateDelivery: value?.data?.residenceStartDate
          ? moment(value.data.residenceStartDate).format("YYYY-MM-DD")
          : "",
        startTimeDelivery: timeDefaultValueGenerator(
          value?.data?.residenceStartTime
        ) as any,
        endDateDelivery: value?.data?.residenceEndDate
          ? moment(value?.data?.residenceEndDate).format("YYYY-MM-DD")
          : "",
        endTimeDelivery: timeDefaultValueGenerator(value?.data?.residenceEndTime) as any,

        startDateExtension: value?.data?.extensionStartDate
          ? moment(value.data.extensionStartDate).format("YYYY-MM-DD")
          : "",
        startTimeExtension: timeDefaultValueGenerator(
          value?.data?.extensionStartTime
        ) as any,
        endDateExtension: value?.data?.extensionEndDate
          ? moment(value?.data?.extensionEndDate).format("YYYY-MM-DD")
          : "",
        endTimeExtension: timeDefaultValueGenerator(value?.data?.extensionEndTime) as any,

        residence: selectDefaultValueGenerator(value?.data?.AssociationDormitory),
        discountPercent: value?.data?.percentDiscount,
        constDiscount: value?.data?.fixedDiscount,
        installmentsNumber: selectDefaultValueGenerator(
          value?.data?.AssociationInstallmentNumber
        ),
        // latePenaltyPercent: value?.data?.latePercentagepenalty,
        // constPenaltyPercent: value?.data?.fixedLatePenalty,
        applicationLevel: value?.data?.AssociationDeliverPlanRoom?.map(
          ({ buildingId, floorId, roomId }) => [buildingId, floorId, roomId]
        ), // [[105, 88, 216]],
        unitsPresent: selectDefaultValueGenerator(value?.data?.AssociationBranch),
        month: [dayjs(value?.data?.appliedStartDate), dayjs(value?.data?.appliedEndDate)],
      });
    }
  };

  const stepsItem = [
    {
      id: "1",
      children: (
        <AdmissionModifyBasicInfoStep
          setCurrent={setCurrent}
          form={form}
          loading={isAdmissionDetailBaseInfoLoading}
          id={id}
          canDebt={canDebt}
          setIsMonthly={setIsMonthly}
          isMonthly={isMonthly}
          setIsSemester={setIsSemester}
          isSemester={isSemester}
          isApplicationReviewDeadlineShow={isApplicationReviewDeadlineShow}
          setIsApplicationReviewDeadlineShow={setIsApplicationReviewDeadlineShow}
        />
      ),
    },
    {
      id: "2",
      children: (
        <AdmissionModifyTariffInfoStep
          setCurrent={setCurrent}
          form={form}
          loading={isAdmissionDetailBaseInfoLoading}
          isReject={isReject}
        />
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="admission-modify-page-container" form={form}>
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "اطلاعات اولیه",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "تعرفه و سطوح اعمال",
          },
        ]}
      />
      {stepsItem[current].children}
    </Form>
  );
};

export default AdmissionModify;
