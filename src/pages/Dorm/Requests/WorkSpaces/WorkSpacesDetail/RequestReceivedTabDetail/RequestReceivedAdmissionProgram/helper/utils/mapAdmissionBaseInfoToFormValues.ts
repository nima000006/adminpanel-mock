import moment from "jalali-moment";

import {
  selectDefaultValueGenerator,
  timeDefaultValueGenerator,
} from "@infra/helpers/utils";
import { GetAdmissionDetailBaseInfoResponse } from "@pages/Dorm/Planning/Admission/AdmissionDetail/AdmissionDetailActive/helpers/AdmissionDetailActiveBaseInfoTab/@types/@admissionDetailActiveBaseInfoTab";

export const mapAdmissionBaseInfoToFormValues = (
  data: GetAdmissionDetailBaseInfoResponse["data"]
) => {
  return {
    title: data?.title,
    displayTitle: data?.showTitle,
    semester: selectDefaultValueGenerator(data?.AssociationSemester),
    uni: selectDefaultValueGenerator(data?.AssociationCategoryBranch),
    managementType: selectDefaultValueGenerator(data?.AssociationCategoryManagementType),
    timingType: selectDefaultValueGenerator(data?.AssociationCategorySchedulingType),
    reservationType: selectDefaultValueGenerator(
      data?.AssociationCategoryReservationType
    ),
    paymentType: selectDefaultValueGenerator(data?.AssociationPaymentType),
    paymentMethod: selectDefaultValueGenerator(data?.AssociationPaymetMethod),
    userGroup: selectDefaultValueGenerator(data?.AssociationUserGroup),
    educationDegree: selectDefaultValueGenerator(data?.AssociationGrade),
    nationality: selectDefaultValueGenerator(data?.AssociationNationality),
    specialConditions: selectDefaultValueGenerator(data?.AssociationSpecialStatus),
    applyingForAnother: selectDefaultValueGenerator({
      id: data?.AssociationIsRequestForAnother?.id,
      title:
        data?.AssociationIsRequestForAnother?.title?.toString() === "1" ? "بله" : "خیر",
    }),
    canDebt: selectDefaultValueGenerator({
      id: data?.AssociationCanDebt?.id,
      title: data?.AssociationCanDebt?.title?.toString() === "1" ? "بله" : "خیر",
    }),
    maxDebt: data?.maxDebt,
    installmentMaxNumber: data?.maxNumberInstallmentForDebt?.toString(),
    applicationReviewDeadline: selectDefaultValueGenerator({
      id: data?.reviewDeadline,
      title: `${data?.reviewDeadline} روز`,
    }),
    paymentDeadline: selectDefaultValueGenerator({
      id: data?.paymentDeadline,
      title: `${data?.paymentDeadline} روز`,
    }),
    desc: data?.description,
    startDateApplied: data?.appliedStartDate
      ? moment(data.appliedStartDate).format("YYYY-MM-DD")
      : "",
    startTimeApplied: timeDefaultValueGenerator(data?.appliedStartTime),
    endDateApplied: data?.appliedEndDate
      ? moment(data?.appliedEndDate).format("YYYY-MM-DD")
      : "",
    endTimeApplied: timeDefaultValueGenerator(data?.appliedEndTime),
    startDateReservation: data?.reservationStartDate
      ? moment(data.reservationStartDate).format("YYYY-MM-DD")
      : "",
    startTimeReservation: timeDefaultValueGenerator(data?.reservationStartTime),
    endDateReservation: data?.reservationEndDate
      ? moment(data?.reservationEndDate).format("YYYY-MM-DD")
      : "",
    endTimeReservation: timeDefaultValueGenerator(data?.reservationEndTime),

    startDateDelivery: data?.residenceStartDate
      ? moment(data.residenceStartDate).format("YYYY-MM-DD")
      : "",
    startTimeDelivery: timeDefaultValueGenerator(data?.residenceStartTime),
    endDateDelivery: data?.residenceEndDate
      ? moment(data?.residenceEndDate).format("YYYY-MM-DD")
      : "",
    endTimeDelivery: timeDefaultValueGenerator(data?.residenceEndTime),

    startDateExtension: data?.extensionStartDate
      ? moment(data.extensionStartDate).format("YYYY-MM-DD")
      : "",
    startTimeExtension: timeDefaultValueGenerator(data?.extensionStartTime),
    endDateExtension: data?.extensionEndDate
      ? moment(data?.extensionEndDate).format("YYYY-MM-DD")
      : "",
    endTimeExtension: timeDefaultValueGenerator(data?.extensionEndTime),

    residence: selectDefaultValueGenerator(data?.AssociationDormitory),
    discountPercent: data?.percentDiscount,
    constDiscount: data?.fixedDiscount,
    installmentsNumber: selectDefaultValueGenerator(data?.AssociationInstallmentNumber),
    latePenaltyPercent: data?.latePercentagepenalty,
    constPenaltyPercent: data?.fixedLatePenalty,
    unitsPresent: selectDefaultValueGenerator(data?.AssociationBranch),
    month:
      data?.appliedStartDate && data?.appliedEndDate
        ? [moment(data?.appliedStartDate), moment(data?.appliedEndDate)]
        : undefined,
    applicationLevel: data?.AssociationDeliverPlanRoom?.map(
      ({ buildingId, floorId, roomId }) => [buildingId, floorId, roomId]
    ),
  };
};
