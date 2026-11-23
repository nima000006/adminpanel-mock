import { useEffect, useRef, useState } from "react";

import { Button } from "antd";
import { useSearchParams } from "react-router";
import { useReactToPrint } from "react-to-print";

import { GetSubmitterDetailLetterInformationResponse } from "@components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeReviewStep/@types/@envelopeReviewStep";
import EnvelopeReviewStepPrint from "@components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeReviewStep/EnvelopeReviewStepPrint";
import CustomCard from "@components/CustomCard/CustomCard";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { intlDate, intlNumber } from "@infra/helpers/utils";
import { useGetAllUserWithFirstLastNameMutation } from "@infra/states/redux/Apis/authApi";
import {
  useLazyGetSubmitterDetailLetterInformationQuery,
  useLazyGetSubmitterDetailRejectReasonQuery,
  useLazyGetSubmitterDetailTableInformationQuery,
} from "@infra/states/redux/Apis/committee/history/history";
import {
  User,
  getAllUserWithFirstLastNameResponse,
} from "@pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";

import { ResultStatus, UserInfoType } from "./@types/@packetResultTab";
import AccusationListModel from "./PacketResultTabHelpers/AccusationListModel";
import { dataLengthChecker } from "./PacketResultTabHelpers/dateLengthChecker";
import UserLetterImg1 from "../../../../../../../../../assets/images/committees/letterPage1.svg";
import UserLetterImg2 from "../../../../../../../../../assets/images/committees/letterPage2.svg";
import "./_packetResultTab.scss";

// ResultPending
const ResultPending = () => {
  return (
    <CustomCard>
      <p className="pending-content">
        کاربر گرامی درخواست شما در حال بررسی است. درصورت تایید درخواست در این قسمت نتیجه
        را مشاهده خواهید کرد.
      </p>
    </CustomCard>
  );
};

// ResultRejected
const ResultRejected = ({ id }: { id: string }) => {
  //? ================================  Api Calls ================================
  const [getRejectReason, { data: rejectReasonData, isLoading: isRejectReasonLoading }] =
    useLazyGetSubmitterDetailRejectReasonQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getRejectReason(id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard loading={isRejectReasonLoading}>
      <p className="rejected-content">
        کاربر گرامی درخواست شما به دلیل {rejectReasonData?.data?.[0]?.reasonRejection} رد
        شد.
      </p>
    </CustomCard>
  );
};

const ResultSuccess = ({ nationalCode, id }: { nationalCode: string; id: string }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [studentInformation, setStudentInformation] = useState<User | null>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  //? ================================  Api Calls ================================
  const [getLetterInformation] = useLazyGetSubmitterDetailLetterInformationQuery();

  const [getTableInformation, { data: getTableInformationData }] =
    useLazyGetSubmitterDetailTableInformationQuery();

  const [getUsers] = useGetAllUserWithFirstLastNameMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getLetterInformation(id)
        .unwrap()
        .then((value: GetSubmitterDetailLetterInformationResponse) =>
          setUserInfo(value?.data[0])
        );
      getTableInformation(id);
    }
  }, [id]);

  useEffect(() => {
    if (nationalCode) {
      getUsers({
        firstName: null,
        lastName: null,
        mobileNo: null,
        nationalNo: nationalCode ? nationalCode : null,
        pageNumber: 0,
        pageSize: 8,
        studentNo: null,
      })
        .unwrap()
        .then(getUserInfoOnSuccess);
    }
  }, [nationalCode]);

  //* ================================ Util Functions ================================
  const getUserInfoOnSuccess = (value: getAllUserWithFirstLastNameResponse) => {
    if (value?.status === 200) {
      setStudentInformation(value?.data?.userAdvancedFilterDtos[0]);
    }
  };

  const onStudentCardPrintHandler = useReactToPrint({
    contentRef: envelopeRef,
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <EnvelopeReviewStepPrint
        ref={envelopeRef}
        data={getTableInformationData?.data}
        userInfo={userInfo}
        studentInformation={studentInformation}
      />
      <div className="committee-submitter-packet-result-tab-envelope-review-step">
        <div className="information-container">
          <img src={UserLetterImg1} alt="background" className="background-img" />
          <header className="envelope-header">
            <h3 className="text-title title-position">
              {userInfo?.inquirerOrganization}
            </h3>
            <div className="text-wrapper">
              <span className="text-date-title">
                {" "}
                {userInfo?.inquirerDateRequest
                  ? intlDate(userInfo?.inquirerDateRequest)
                  : "-"}
              </span>
              <span className="text-date-title">
                {" "}
                {intlNumber(userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0)}
              </span>
              <span className="text-date-title"> {intlNumber(0)}</span>
              <span className="text-date-title"> {intlNumber(1)}</span>
            </div>
          </header>
          <div className="user-info-container">
            <div className="title-wrapper">
              {" "}
              <h3 className="text-title">
                جناب آقای / خانم {userInfo?.inquirerFirstName}{" "}
                {userInfo?.inquirerLastName}{" "}
              </h3>
              <h3 className="text-title">
                {userInfo?.inquirerPost} محترم {userInfo?.inquirerOrganization}
              </h3>
            </div>
            <div className="desc-wrapper">
              <span className="text-paragraph">باسلام</span>
              <p className="text-paragraph">
                احتراما بازگشت به مکاتبه شماره{" "}
                {intlNumber(userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0)}{" "}
                مورخ{" "}
                {userInfo?.inquirerDateRequest
                  ? intlDate(userInfo?.inquirerDateRequest)
                  : "-"}{" "}
                {userInfo?.inquirerPost} محترم {userInfo?.inquirerOrganization} در خصوص
                سوابق درخواستی مربوط به آقای / خانم {studentInformation?.firstName}{" "}
                {studentInformation?.lastName} دانشجوی مقطع ------ با کدملی{" "}
                {intlNumber(
                  studentInformation?.nationalCode ? +studentInformation?.nationalCode : 0
                )}{" "}
                ورودی ---- رشته -------------------------- به شماره شناسنامه ------------
                نام پدر ---- محل تولد ----- سال فراغت ---- تعداد واحدهای گذرانده ---- با
                معدل کل ----- به شرح ذیل حضورتان اعلام میگردد؛ تمامی اطلاعات محرمانه بوده
                و قابل استعلام است.
              </p>
            </div>
            <div className="table-wrapper">
              {dataLengthChecker(0, getTableInformationData?.data) ? (
                <>
                  <span className="text-title">سوابق موثر:</span>
                  {/* --------------------- display 3 items in first page ------------------- */}
                  <CustomTable
                    dataSource={getTableInformationData?.data
                      .slice(0, 3)
                      .map((item, index) => ({ ...item, row: index + 1 }))}
                    rowKey="id"
                    pagination={false}
                    columns={AccusationListModel}
                    {...TABLE_PROPS(getTableInformationData?.data?.length || 0)}
                    className="committee-accusation-envelop-list"
                  />
                </>
              ) : (
                <span className="no-accusation-message">
                  برابر بررسی به عمل آمده هیچگونه سابقه انضباطی در پرونده تحصیلی نامبرده
                  درج نگردیده است.
                </span>
              )}
            </div>
            {!dataLengthChecker(3, getTableInformationData?.data) ? (
              <div className="name-wrapper">
                <p className="text-name text-title-name">
                  {userInfo?.respondentFirstName} {userInfo?.respondentLastName}
                </p>
                <p className="text-name text-post-name">
                  {userInfo?.respondentPost} {userInfo?.respondentOrganization}
                </p>
              </div>
            ) : null}
          </div>
        </div>
        {dataLengthChecker(3, getTableInformationData?.data) ? (
          <div className="information-container">
            <img src={UserLetterImg2} alt="background" className="background-img" />
            <header className="envelope-header">
              <h3 className="text-title title-position">
                {userInfo?.inquirerOrganization}
              </h3>
              <div className="text-wrapper">
                <span className="text-date-title">
                  {" "}
                  {userInfo?.inquirerDateRequest
                    ? intlDate(userInfo?.inquirerDateRequest)
                    : "-"}
                </span>
                <span className="text-date-title">
                  {" "}
                  {intlNumber(userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0)}
                </span>
                <span className="text-date-title"> {intlNumber(0)}</span>
                <span className="text-date-title"> {intlNumber(2)}</span>
              </div>
            </header>
            <div className="user-info-container">
              <div className="table-wrapper">
                <span className="text-title">سوابق موثر:</span>
                {/* ---------------------- display 7 items in second page --------------------- */}
                <CustomTable
                  dataSource={getTableInformationData?.data
                    ?.slice(3, 10)
                    .map((item, index) => ({ ...item, row: index + 4 }))}
                  rowKey="id"
                  pagination={false}
                  columns={AccusationListModel}
                  {...TABLE_PROPS(getTableInformationData?.data?.length || 0)}
                  className="committee-accusation-envelop-list"
                />
              </div>
              {!dataLengthChecker(10, getTableInformationData?.data) ? (
                <div className="name-wrapper excessive-space">
                  <p className="text-name text-title-name">
                    {userInfo?.respondentFirstName} {userInfo?.respondentLastName}
                  </p>
                  <p className="text-name text-post-name">
                    {userInfo?.respondentPost} {userInfo?.respondentOrganization}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {dataLengthChecker(10, getTableInformationData?.data) ? (
          <div className="information-container">
            <img src={UserLetterImg2} alt="background" className="background-img" />
            <header className="envelope-header">
              <h3 className="text-title title-position">
                {userInfo?.inquirerOrganization}
              </h3>
              <div className="text-wrapper">
                <span className="text-date-title">
                  {" "}
                  {userInfo?.inquirerDateRequest
                    ? intlDate(userInfo?.inquirerDateRequest)
                    : "-"}
                </span>
                <span className="text-date-title">
                  {" "}
                  {intlNumber(userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0)}
                </span>
                <span className="text-date-title"> {intlNumber(0)}</span>
                <span className="text-date-title"> {intlNumber(3)}</span>
              </div>
            </header>
            <div className="user-info-container">
              <div className="table-wrapper">
                <span className="text-title">سوابق موثر:</span>
                {/* ---------------------- display 7 items in third page --------------------- */}
                <CustomTable
                  dataSource={getTableInformationData?.data
                    ?.slice(10, getTableInformationData?.data?.length)
                    .map((item, index) => ({ ...item, row: index + 11 }))}
                  rowKey="id"
                  pagination={false}
                  columns={AccusationListModel}
                  {...TABLE_PROPS(getTableInformationData?.data?.length || 0)}
                  className="committee-accusation-envelop-list"
                />
              </div>
              {!dataLengthChecker(17, getTableInformationData?.data) ? (
                <div className="name-wrapper excessive-space">
                  <p className="text-name text-title-name">
                    {userInfo?.respondentFirstName} {userInfo?.respondentLastName}
                  </p>
                  <p className="text-name text-post-name">
                    {userInfo?.respondentPost} {userInfo?.respondentOrganization}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="committee-print-btn-container">
        <Button type="default" onClick={() => onStudentCardPrintHandler()}>
          چاپ نامه
        </Button>
      </div>
    </>
  );
};

const PacketResultTab = () => {
  const [searchParams] = useSearchParams();
  const { id, status, nationalCode } = Object.fromEntries([...searchParams]);
  const [view] = useState<ResultStatus>(status as ResultStatus);

  //* ================================ Util Functions ================================
  const resultViewHandler = (view: ResultStatus) => {
    switch (view) {
      case "pending":
        return <ResultPending />;
      case "rejected":
        return <ResultRejected id={id} />;
      case "success":
        return <ResultSuccess nationalCode={nationalCode} id={id} />;
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return <div>{resultViewHandler(view)}</div>;
};

export default PacketResultTab;
