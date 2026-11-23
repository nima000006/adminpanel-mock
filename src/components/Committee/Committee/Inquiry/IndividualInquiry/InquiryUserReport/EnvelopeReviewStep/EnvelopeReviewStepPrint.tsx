import { forwardRef } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import {
  EnvelopeReviewStepPrintProps,
  TableData,
} from "./@types/@envelopeReviewStepPrint";
import LetterImgPage1 from "../../../../../../../assets/images/committees/letterPrintPage1.svg";
import LetterImgPage2 from "../../../../../../../assets/images/committees/letterPrintPage2.svg";
import { intlDate, intlNumber } from "../../../../../../../infrastructure/helpers/utils";

import "./styles/_envelopeReviewStepPrint.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataLengthChecker } from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/PacketResultTab/PacketResultTabHelpers/dateLengthChecker";
import AccusationListModel from "@pages/Committee/History/Requests/SubmitterRequests/SubmitterRequestsListDetail/helper/components/PacketResultTab/PacketResultTabHelpers/AccusationListModel";

const EnvelopeReviewStepPrint = forwardRef<HTMLDivElement, EnvelopeReviewStepPrintProps>(
  ({ data, userInfo, studentInformation }, ref) => {
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            padding: "0 !important",
            margin: "0 !important",
          }}
        >
          <div
            className="committee-individual-inquiry-envelope-review-step-print"
            ref={ref}
          >
            <div className="information-container">
              <img src={LetterImgPage1} alt="background" />
              <header className="envelope-header">
                <h3 className="text-title title-position">
                  {userInfo?.inquirerOrganization}
                </h3>
                <div>
                  {/* <div className="img-container">
                    <img
                      src={AvatarPlaceholder}
                      alt=""
                      className="user-img"
                      width="55"
                      height="73"
                    />
                  </div> */}
                  <div className="text-wrapper">
                    <span className="text-date-title">
                      {" "}
                      {userInfo?.inquirerDateRequest
                        ? intlDate(userInfo?.inquirerDateRequest)
                        : "-"}
                    </span>
                    <span className="text-date-title">
                      {" "}
                      {intlNumber(
                        userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0
                      )}
                    </span>
                    <span className="text-date-title"> {intlNumber(0)}</span>
                    <span className="text-date-title"> {intlNumber(1)}</span>
                  </div>
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
                    {userInfo?.inquirerPost} محترم {userInfo?.inquirerOrganization} در
                    خصوص سوابق درخواستی مربوط به آقای / خانم{" "}
                    {studentInformation?.firstName} {studentInformation?.lastName} دانشجوی
                    مقطع ------ با کدملی{" "}
                    {intlNumber(
                      studentInformation?.nationalCode
                        ? +studentInformation?.nationalCode
                        : 0
                    )}{" "}
                    ورودی ---- رشته -------------------------- به شماره شناسنامه
                    ------------ نام پدر ---- محل تولد ----- سال فراغت ---- تعداد واحدهای
                    گذرانده ---- با معدل کل ----- به شرح ذیل حضورتان اعلام میگردد؛ تمامی
                    اطلاعات محرمانه بوده و قابل استعلام است.
                  </p>
                </div>
                <div className="table-wrapper">
                  {dataLengthChecker(0, data) ? (
                    <>
                      <span className="text-title"> :سوابق موثر</span>
                      {/* display 3 items in first page */}
                      <CustomTable
                        dataSource={
                          data &&
                          data?.slice(0, 3).map((item: TableData, index: number) => ({
                            ...item,
                            row: index + 1,
                          }))
                        }
                        rowKey="id"
                        pagination={false}
                        key={Math.random()}
                        columns={AccusationListModel}
                        {...TABLE_PROPS(data?.length || 0)}
                        className="committee-accusation-envelop-list"
                      />
                    </>
                  ) : (
                    <span dir="rtl" className="no-accusation-message">
                      برابر بررسی به عمل آمده هیچگونه سابقه انضباطی در پرونده تحصیلی
                      نامبرده درج نگردیده است.
                    </span>
                  )}
                </div>
                {!dataLengthChecker(3, data) ? (
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
            {dataLengthChecker(3, data) ? (
              <div className="information-container">
                <img src={LetterImgPage2} alt="background" />
                <header className="envelope-header">
                  <h3 className="text-title title-position">
                    {userInfo?.inquirerOrganization}
                  </h3>
                  <div>
                    {/* <div className="img-container">
                    <img
                      src={AvatarPlaceholder}
                      alt=""
                      className="user-img"
                      width="55"
                      height="73"
                    />
                  </div> */}
                    <div className="text-wrapper">
                      <span className="text-date-title">
                        {" "}
                        {userInfo?.inquirerDateRequest
                          ? intlDate(userInfo?.inquirerDateRequest)
                          : "-"}
                      </span>
                      <span className="text-date-title">
                        {" "}
                        {intlNumber(
                          userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0
                        )}
                      </span>
                      <span className="text-date-title"> {intlNumber(0)}</span>
                      <span className="text-date-title"> {intlNumber(2)}</span>
                    </div>
                  </div>
                </header>
                <div className="user-info-container">
                  <div className="table-wrapper">
                    <span className="text-title"> :سوابق موثر</span>
                    {/* ----------------------- display 7 items in second page ----------------------- */}
                    <CustomTable
                      dataSource={data
                        ?.slice(3, 10)
                        .map((item: TableData, index: number) => ({
                          ...item,
                          row: index + 4,
                        }))}
                      rowKey="id"
                      pagination={false}
                      key={Math.random()}
                      columns={AccusationListModel}
                      {...TABLE_PROPS(data?.length || 0)}
                      className="committee-accusation-envelop-list"
                    />
                  </div>
                  {!dataLengthChecker(10, data) ? (
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
            {dataLengthChecker(10, data) ? (
              <div className="information-container">
                <img src={LetterImgPage2} alt="background" />
                <header className="envelope-header">
                  <h3 className="text-title title-position">
                    {userInfo?.inquirerOrganization}
                  </h3>
                  <div>
                    {/* //todo[Atefeh]: uncommented in the future based on design*/}
                    {/* <div className="img-container">
                    <img
                      src={AvatarPlaceholder}
                      alt=""
                      className="user-img"
                      width="55"
                      height="73"
                    />
                  </div> */}
                    <div className="text-wrapper">
                      <span className="text-date-title">
                        {" "}
                        {userInfo?.inquirerDateRequest
                          ? intlDate(userInfo?.inquirerDateRequest)
                          : "-"}
                      </span>
                      <span className="text-date-title">
                        {" "}
                        {intlNumber(
                          userInfo?.inquirerNumber ? +userInfo?.inquirerNumber : 0
                        )}
                      </span>
                      <span className="text-date-title"> {intlNumber(0)}</span>
                      <span className="text-date-title"> {intlNumber(3)}</span>
                    </div>
                  </div>
                </header>
                <div className="user-info-container">
                  <div className="table-wrapper">
                    <span className="text-title"> :سوابق موثر</span>
                    {/* ---------------------- display 7 items in third page ----------------------- */}
                    <CustomTable
                      dataSource={data
                        ?.slice(10, data?.length)
                        .map((item: TableData, index: number) => ({
                          ...item,
                          row: index + 4,
                        }))}
                      rowKey="id"
                      pagination={false}
                      key={Math.random()}
                      columns={AccusationListModel}
                      {...TABLE_PROPS(data?.length || 0)}
                      className="committee-accusation-envelop-list"
                    />
                  </div>
                  {!dataLengthChecker(17, data) ? (
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
        </div>
      </div>
    );
  }
);

EnvelopeReviewStepPrint.displayName = "EnvelopeReviewStepPrint";
export default EnvelopeReviewStepPrint;
