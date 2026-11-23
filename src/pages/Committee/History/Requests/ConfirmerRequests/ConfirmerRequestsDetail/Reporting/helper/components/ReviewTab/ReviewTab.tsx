import { useEffect, useState } from "react";

import { Button } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { GetSubmitterDetailLetterInformationResponse } from "@components/Committee/Committee/Inquiry/IndividualInquiry/InquiryUserReport/EnvelopeReviewStep/@types/@envelopeReviewStep";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { intlDate, intlNumber } from "@infra/helpers/utils";
import { COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useGetAllUserWithFirstLastNameMutation } from "@infra/states/redux/Apis/authApi";
import {
  useFinalRequestConfirmationMutation,
  useLazyGetSubmitterDetailLetterInformationQuery,
  useLazyGetSubmitterDetailTableInformationQuery,
} from "@infra/states/redux/Apis/committee/history/history";
import { FINAL_REQUEST_CONFIRMATION_SUCCESS_MSG } from "@infra/VARS/globalToasts/globalToasts";
import {
  getAllUserWithFirstLastNameResponse,
  User,
} from "@pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import AccusationListModel from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/PacketResultTab/PacketResultTabHelpers/AccusationListModel";
import { dataLengthChecker } from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/PacketResultTab/PacketResultTabHelpers/dateLengthChecker";

import {
  FinalRequestConfirmationResponse,
  ReviewTabProps,
  UserInfoType,
} from "./@types/@reviewTab";
import UserLetterImg1 from "../../../../../../../../../../assets/images/committees/letterPage1.svg";
import UserLetterImg2 from "../../../../../../../../../../assets/images/committees/letterPage2.svg";
import "./_reviewTab.scss";

const ReviewTab = ({ setCurrent }: ReviewTabProps) => {
  const [searchParams] = useSearchParams();
  const { id, nationalNo } = Object.fromEntries([...searchParams]);

  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [studentInformation, setStudentInformation] = useState<User | null>(null);

  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getLetterInformation] = useLazyGetSubmitterDetailLetterInformationQuery();

  const [getTableInformation, { data: getTableInformationData }] =
    useLazyGetSubmitterDetailTableInformationQuery();

  const [getUsers] = useGetAllUserWithFirstLastNameMutation();

  const [finalRequestConfirmation, { isLoading: isFinalRequestConfirmationLoading }] =
    useFinalRequestConfirmationMutation();

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
    if (nationalNo) {
      getUsers({
        firstName: null,
        lastName: null,
        mobileNo: null,
        nationalNo: nationalNo ? nationalNo : null,
        pageNumber: 0,
        pageSize: 8,
        studentNo: null,
      })
        .unwrap()
        .then(getUserInfoOnSuccess);
    }
  }, [nationalNo]);

  //* ================================ Util Functions ================================
  const getUserInfoOnSuccess = async (value: getAllUserWithFirstLastNameResponse) => {
    if (value?.status === 200) {
      setStudentInformation(value?.data?.userAdvancedFilterDtos[0]);
    }
  };

  const finalRequestConfirmationOnSuccess = async (
    value: FinalRequestConfirmationResponse
  ) => {
    if (value?.status === 200) {
      navigate({ pathname: COMMITTEE_HISTORY_REQUESTS_CONFIRMER_LIST_PAGE_ROUTE });
      toast.success(FINAL_REQUEST_CONFIRMATION_SUCCESS_MSG, {
        toastId: FINAL_REQUEST_CONFIRMATION_SUCCESS_MSG,
      });
    }
  };

  const confirmHandler = () => {
    if (id) {
      finalRequestConfirmation({
        form: "ConfirmationAndFinalSubmission",
        id: "634d16e465464eecaa7f2f5cc45f1be0",
        _data_: {
          dateFinalAnswer: new Date().toISOString(),
          id: +id,
          status: 3,
        },
      })
        .unwrap()
        .then(finalRequestConfirmationOnSuccess);
    }
  };

  const backBtnHandler = () => {
    setCurrent((prev) => prev - 1);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-confirmer-request-detail-reporting-review-tab">
      <div className="committee-inquirer-packet-result-tab-envelope-review-step">
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
      <div className="btns-container">
        <Button type="default" onClick={backBtnHandler}>
          برگشت
        </Button>
        <Button
          type="primary"
          loading={isFinalRequestConfirmationLoading}
          onClick={confirmHandler}
        >
          تایید و ارسال نهایی
        </Button>
      </div>
    </div>
  );
};

export default ReviewTab;
