import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { issuedVotes } from "../recordsHistoryConsts";
import { PunishmentGeneratorValueType } from "./RecordsHistory.model";

//! send data to save on database
export const voteRecordsGenerator = (vote: any, form: string) => {
  return Array.from({ length: vote?.punishmentsNumber?.value }, (_, index) => {
    return {
      [`${
        form === issuedVotes.preliminary.main
          ? issuedVotes.preliminary.ruling
          : form === issuedVotes.appeal.main
            ? issuedVotes.appeal.ruling
            : form === issuedVotes.central.main
              ? issuedVotes.central.ruling
              : null
      }`]: vote?.[`disciplinaryPunishmentIssued_${index + 1}`]?.item,
      certainty: vote?.[`certainty_${index + 1}`]?.children,
      executionStatus: vote?.[`sentenceExecutionStatus_${index + 1}`]?.children,
      executionDate: vote?.[`sentenceExecutionDate_${index + 1}`],
      legalArticle: vote?.[`articleRelativeLaw_${index + 1}`]?.children,
      reasonAggravation: vote?.[`sentenceIntensificationReason_${index + 1}`]?.children,
      [`${
        form === issuedVotes.preliminary.main
          ? issuedVotes.preliminary.punish
          : form === issuedVotes.appeal.main
            ? issuedVotes.appeal.punish
            : form === issuedVotes.central.main
              ? issuedVotes.central.punish
              : null
      }`]: vote?.[`primitiveSentence_${index + 1}`]?.item,
      descAggravation: vote?.[`sentenceIntensificationDescription_${index + 1}`],
    };
  });
};

//! get data to show the user
export const punishmentGenerator = (
  value: PunishmentGeneratorValueType,
  index: number,
  form: string
) => {
  //! تنبیه
  return {
    [`certainty_${index + 1}`]: selectDefaultValueGenerator({
      title: value?.certainty,
    }),
    [`sentenceExecutionStatus_${index + 1}`]: selectDefaultValueGenerator({
      title: value?.executionStatus,
    }),
    [`articleRelativeLaw_${index + 1}`]: selectDefaultValueGenerator({
      title: value?.legalArticle,
    }),
    [`sentenceExecutionDate_${index + 1}`]: value?.executionDate,
    [`disciplinaryPunishmentIssued_${index + 1}`]: selectDefaultValueGenerator(
      form === issuedVotes.central.main
        ? value?.AssociationCentralRulings
        : form === issuedVotes.preliminary.main
          ? value?.AssociationRulings
          : form === issuedVotes.appeal.main
            ? value?.AssociationAappealRulings
            : { id: -1, title: "" }
    ),

    //! تشدید حکم
    [`sentenceIntensificationReason_${index + 1}`]: selectDefaultValueGenerator({
      title: value?.reasonAggravation,
    }),
    [`primitiveSentence_${index + 1}`]: selectDefaultValueGenerator(
      form === issuedVotes.central.main
        ? value?.AssociationCentralPunish
        : form === issuedVotes.preliminary.main
          ? value?.AssociationPunish
          : form === issuedVotes.appeal.main
            ? value?.AssociationAappealPunish
            : { id: -1, title: "" }
    ),
    [`sentenceIntensificationDescription_${index + 1}`]: value?.descAggravation,
  };
};
