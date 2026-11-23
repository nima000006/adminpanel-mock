import { useEffect, useState } from "react";

import { Button } from "antd";
import { useSearchParams } from "react-router";

import Div from "@components/Renderers/Div/Div";
import { useGetIssuedVotesInfoMutation } from "@infra/states/redux/Apis/committee/committees/committees";

import {
  GetIssuedVotesInfoResponse,
  IssuedVoteType,
  ReadOnlyIssuedVoteStepProps,
} from "./@types/@readOnlyIssuedVoteStep";
import AppealIssuedVote from "./IssuedFeature/AppealIssuedVote";
import CentralIssuedVote from "./IssuedFeature/CentralIssuedVote";
import PreliminaryIssuedVote from "./IssuedFeature/PreliminaryIssuedVote";
import "./_readOnlyIssuedVoteStep.scss";

const ReadOnlyIssuedVoteStep = ({
  setCurrentStep,
  deleteRequestStatus,
}: ReadOnlyIssuedVoteStepProps) => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [issuedVote, setIssuedVote] = useState<IssuedVoteType | null>(null);

  //? ================================  Api Calls ================================
  const [getIssuedVotesInfo, { isLoading: isIssuedVotesInfoLoading }] =
    useGetIssuedVotesInfoMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getIssuedVotesInfo({
        _data_: {
          id: id,
        },
      })
        .unwrap()
        .then(getIssuedVotesInfoOnSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getIssuedVotesInfoOnSuccess = (value: GetIssuedVotesInfoResponse) => {
    if (value?.status === 200) {
      setIssuedVote(value?.data);
    }
  };
  const nextBtnHandler = () => {
    setCurrentStep(3);
  };
  const backBtnHandler = () => {
    setCurrentStep(1);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-records-detail-read-only-issued-vote-step-container"
      loading={isIssuedVotesInfoLoading}
    >
      {deleteRequestStatus && (
        <div className="delete-request-status-container">
          <p className="status-text">
            برای این سابقه، درخواست حذف ثبت شده و در انتظار تأیید مسئول مربوطه است.
          </p>
        </div>
      )}
      {issuedVote && (
        <>
          {Number(issuedVote?.numberPreliminaryPunishments) > 0 && (
            <PreliminaryIssuedVote
              data={{
                title: "رای کمیته بدوی",
                sessionDate: issuedVote?.AssociationMeeting?.meetingDate,
                sessionNumber: issuedVote?.AssociationMeeting?.meetingNumber,
                punishmentCount: issuedVote?.numberPreliminaryPunishments,
                records: issuedVote?.AssociationPreliminaryCommitteeRecords,
                description: issuedVote?.descEscalation,
              }}
            />
          )}
          {Number(issuedVote?.numberAppealPunishments) > 0 && (
            <AppealIssuedVote
              data={{
                title: "رای کمیته تجدید نظر",
                sessionDate: issuedVote?.AssociationMeetingAppealsCommittee?.meetingDate,
                sessionNumber:
                  issuedVote?.AssociationMeetingAppealsCommittee?.meetingNumber,
                punishmentCount: issuedVote?.numberAppealPunishments,
                records: issuedVote?.AssociationAppealCommitteeRecords,
                description: issuedVote?.appealVoteDesc,
              }}
            />
          )}
          {Number(issuedVote?.numberCentralPunishments) > 0 && (
            <CentralIssuedVote
              data={{
                title: "رای کمیته مرکزی",
                sessionDate: issuedVote?.AssociationCentrulMeeting?.meetingDate,
                sessionNumber: issuedVote?.AssociationCentrulMeeting?.meetingNumber,
                punishmentCount: issuedVote?.numberCentralPunishments,
                records: issuedVote?.AssociationCentralCommitteeRecords,
                description: issuedVote?.centralVoteDesc,
              }}
            />
          )}
        </>
      )}
      <div className="button-wrapper">
        <div className="buttons-container">
          <Button className="back-btn" onClick={backBtnHandler}>
            برگشت
          </Button>
          <Button type="primary" onClick={nextBtnHandler}>
            بعدی
          </Button>
        </div>
      </div>
    </Div>
  );
};

export default ReadOnlyIssuedVoteStep;
