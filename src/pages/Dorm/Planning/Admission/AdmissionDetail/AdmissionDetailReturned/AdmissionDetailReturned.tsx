import { useEffect, useState } from "react";

import { Form, Steps } from "antd";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { Link } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  selectDefaultValueGenerator,
  stepStatusCreator,
  timeDefaultValueGenerator,
} from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_ADMISSIONS_LIST_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { useGetAdmissionDetailBaseInfoMutation } from "@infra/states/redux/Apis/dorm/planning/admission/admissionApi";

import { AdmissionModifyFormData } from "../../AdmissionModify/@types/@admissionModify";
import AdmissionModifyBasicInfoStep from "../../AdmissionModify/helpers/AdmissionModifyBasicInfoStep/AdmissionModifyBasicInfoStep";
import AdmissionModifyTariffInfoStep from "../../AdmissionModify/helpers/AdmissionModifyTariffInfoStep/AdmissionModifyTariffInfoStep";
import {
  ADMISSION_CAN_DEBT,
  ADMISSION_RESERVATION_TYPES,
} from "../../utils/AdmissionUtils";
import { GetAdmissionDetailBaseInfoResponse } from "../AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";
import AdmissionDetailRequestInfo from "../helpers/RequestInfo/AdmissionDetailRequestInfo";
import "./_admissionDetailReturned.scss";

const AdmissionDetailReturned = () => {
  const [current, setCurrent] = useState(0);
  const [canDebt, setCanDebt] = useState<string | undefined>();
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isSemester, setIsSemester] = useState<boolean>(false);
  const [isApplicationReviewDeadlineShow, setIsApplicationReviewDeadlineShow] =
    useState<boolean>(false);

  const [form] = Form.useForm<AdmissionModifyFormData>();

  const {
    params: { title, id },
  } = useQueryParams();

  const isRejectTab = true;

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={DORM_ADMISSIONS_LIST_PAGE_ROUTE}>برنامه پذیرش‌ها</Link>,
      },
      ...(title
        ? [
            {
              title: title,
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
        applyingForAnother:
          value?.data?.AssociationIsRequestForAnother?.title === "1"
            ? "بله"
            : ("خیر" as any),
        canDebt:
          value?.data?.AssociationIsRequestForAnother?.title === "1"
            ? "بله"
            : ("خیر" as any),
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
        description: value?.data?.description,
        startDateApplied: value?.data?.appliedStartDate
          ? moment(value.data.appliedStartDate).format("YYYY-MM-DD")
          : "",
        startTimeApplied: timeDefaultValueGenerator(value?.data?.appliedStartTime) as any,
        endDateApplied: value?.data?.appliedEndDate
          ? moment(value?.data?.appliedEndDate).format("YYYY-MM-DD")
          : "",
        endTimeApplied: timeDefaultValueGenerator(value?.data?.appliedEndTime) as any,
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
        latePenaltyPercent: value?.data?.latePercentagepenalty,
        constPenaltyPercent: value?.data?.fixedLatePenalty,
        unitsPresent: selectDefaultValueGenerator(value?.data?.AssociationBranch),
        months: [
          dayjs(value?.data?.appliedStartDate),
          dayjs(value?.data?.appliedEndDate),
        ],
        applicationLevel: value?.data?.AssociationDeliverPlanRoom?.map(
          ({ buildingId, floorId, roomId }) => [buildingId, floorId, roomId]
        ), // [[105, 88, 216]],
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
          isReject={isRejectTab}
        />
      ),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="admission-detail-returned-page-container">
      <CustomCard>
        <AdmissionDetailRequestInfo admissionFlag={false} />
      </CustomCard>
      <CustomCard>
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
      </CustomCard>
    </div>
  );
};

export default AdmissionDetailReturned;
