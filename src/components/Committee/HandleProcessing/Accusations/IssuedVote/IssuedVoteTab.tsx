import { memo, useEffect } from "react";

import { Button, Row, Steps, Switch, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InvestigationAccusationsVoteIssuedData } from "./@types/@issuedVoteTab";
import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import { useGetInvestigationAccusationsVoteIssuedMutation } from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import SingleVerticalItem from "../../../../Renderers/SingleVerticalItem/SingleVerticalItem";
import "./_issuedVoteTab.scss";

const stepItem = (data: InvestigationAccusationsVoteIssuedData) => {
  //* ================================ Util Functions ================================
  // merge punishments list to use in form fields
  const punishmentCountList = Array.from(
    { length: Number(data?.main?.punishmentNo || 0) },
    (_, index) => index
  );

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return data?.main?.punishmentNo
    ? {
        title: (
          <div className="step-item-container">
            <div className="header-container">
              <div>
                <h3 className="step-title">کمیته {data?.main?.title} </h3>
                <span className="step-subtitle">
                  {dataPlaceHolder({
                    data: data?.main?.meetingDate,
                    isDate: true,
                    customDateFormat: "HH:mm - YYYY/M/D",
                  })}
                </span>
              </div>
              {/* //Todo:[ati]:uncomment when it necessary in feature */}
              {/* <Button className="print-button">چاپ حکم</Button> */}
            </div>
            <div className="step-body">
              <div className="around-box referral-section">
                <p className="message-text">
                  {/* use empty string for spacing in text */}
                  جلسه شماره{" "}
                  <span>
                    {dataPlaceHolder({
                      data: data?.main?.meetingNumber,
                    })}
                  </span>{" "}
                  کمیته <span>{data?.main?.title}</span> در ساعت{" "}
                  <span>
                    {dataPlaceHolder({
                      data: data?.main?.meetingTime,
                    })}
                  </span>{" "}
                  تا{" "}
                  <span>
                    {dataPlaceHolder({
                      data: data?.main?.meetingEndTime,
                    })}
                  </span>{" "}
                  مورخ{" "}
                  <span>
                    {" "}
                    {dataPlaceHolder({
                      data: data?.main?.meetingDate,
                      isDate: true,
                    })}
                  </span>{" "}
                  با حضور تعداد <span>{"-"}</span> نفر از اعضا تشکیل و رسمیت یافت، و پس از
                  بحث و تبادل نظر با توجه به تحقیقات به‌عمل آمده و دفاعیات دانشجو رای زیر
                  به تصویب رسید.
                </p>
                <div className="vote-info-container">
                  {/* //Todo:[ati]:un comment when api got ready */}
                  {/* <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">ارجاع:</span> 
                <span className="vote-info-item black-text">
                  {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
                </span>
              </div> */}
                  <div className="vote-info-item-container">
                    <span className="vote-info-item gray-text">جلسه:</span>
                    <span className="vote-info-item black-text">
                      {dataPlaceHolder({
                        data: data?.main?.meetingDate,
                        isDate: true,
                        customDateFormat: "HH:mm - YYYY/M/D",
                      })}
                    </span>
                  </div>
                  <div className="vote-info-item-container">
                    <span className="vote-info-item gray-text">شماره جلسه:</span>
                    <span className="vote-info-item black-text">
                      {dataPlaceHolder({
                        data: data?.main?.meetingNumber,
                      })}
                    </span>
                  </div>
                </div>
                <div className="vote-info-container">
                  {/* //Todo:[ati]:un comment when api got ready */}
                  {/* <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">حاضرین در جلسه:</span>
                <span className="vote-info-item black-text">4</span>
                <CustomTooltip
                  title={
                    <div className="tooltip-body">
                      <p>سمت اول : نام کامل شخص</p>
                      <p>سمت دوم : نام کامل شخص</p>
                      <p>سمت سوم : نام کامل شخص</p>
                    </div>
                  }
                  color="#000000bf"
                >
                  <AiOutlineQuestionCircle className="question-mark" />
                </CustomTooltip>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item gray-text">غایبین:</span>
                <span className="vote-info-item black-text">1</span>
                <CustomTooltip
                  title={
                    <div className="tooltip-body">
                      <p>سمت اول : نام کامل شخص</p>
                    </div>
                  }
                  color="#000000bf"
                >
                  <AiOutlineQuestionCircle className="question-mark" />
                </CustomTooltip>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item green-text">آرا موافق:</span>
                <span className="vote-info-item green-text">2</span>
              </div>
              <div className="vote-info-item-container">
                <span className="vote-info-item red-text">آرا مخالف:</span>
                <span className="vote-info-item red-text">2</span>
              </div> */}
                  <div className="vote-info-item-container">
                    <span className="vote-info-item gray-text">تعداد تنبیهات:</span>
                    <span className="vote-info-item black-text">
                      {dataPlaceHolder({
                        data: data?.main?.punishmentNo,
                      })}
                    </span>
                  </div>
                </div>
                {punishmentCountList.map((count) => {
                  const hasAggravation =
                    !!data?.records?.[count]?.descAggravation ||
                    !!data?.records?.[count]?.reasonAggravation ||
                    !!data?.records?.[count]?.punish?.title;
                  return (
                    <div className="punishment-container" key={count}>
                      <span className="vote-info-item gray-text">تنبیه {count + 1}</span>
                      <Row gutter={[12, 12]}>
                        <SingleVerticalWithCol
                          xl={8}
                          lg={8}
                          label="تنبیه انضباطی صادره"
                          value={data?.records?.[count]?.rulings?.title}
                        />

                        <SingleVerticalWithCol
                          xl={8}
                          lg={8}
                          label="قطعیت"
                          value={data?.records?.[count]?.certainty}
                        />

                        <SingleVerticalWithCol
                          xl={8}
                          lg={8}
                          label="وضعیت اجرای حکم"
                          value={data?.records?.[count]?.executionStatus}
                        />

                        <SingleVerticalWithCol
                          xl={8}
                          lg={8}
                          label="تاریخ اجرای حکم"
                          value={data?.records?.[count]?.executionDate}
                          isDate
                        />

                        <SingleVerticalWithCol
                          xl={8}
                          lg={8}
                          label="ماده قانونی مرتبط"
                          value={data?.records?.[count]?.legalArticle}
                        />
                      </Row>
                      <div className="around-box">
                        <div className="divider-container">
                          <div>
                            <CustomDivider text="تشدید حکم" />
                          </div>
                          <Switch
                            className="intensification-sentence-switch"
                            defaultChecked={hasAggravation}
                            disabled={true}
                          />
                        </div>
                        {hasAggravation && (
                          <div className="grid-cols-2">
                            <Row gutter={[12, 12]}>
                              <SingleVerticalWithCol
                                xl={12}
                                lg={12}
                                md={12}
                                sm={24}
                                label="دلیل تشدید حکم"
                                value={data?.records?.[count]?.reasonAggravation}
                              />

                              <SingleVerticalWithCol
                                xl={12}
                                lg={12}
                                md={12}
                                sm={24}
                                label="حکم اولیه"
                                value={data?.records?.[count]?.punish?.title}
                              />
                            </Row>
                            <div className="intensification-sentence-desc">
                              <SingleVerticalItem
                                label="توضیح"
                                value={data?.records?.[count]?.descAggravation}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <SingleVerticalItem label="توضیح" value={data?.main?.desc} />
                <div className="attachment-container">
                  <h3 className="step-title">پیوست ها</h3>
                  <Upload
                    className="upload-container"
                    listType="picture"
                    multiple
                    disabled
                  >
                    <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
                      بارگذاری تصاویر
                    </Button>
                  </Upload>
                </div>
              </div>
            </div>
          </div>
        ),
      }
    : null;
};

const IssuedVoteTab = memo(({ id, isEdited }: { id: string; isEdited: boolean }) => {
  //? ================================  Api Calls ================================
  const [getData, { data: issuedVoteData, isLoading: isIssuedVoteLoading }] =
    useGetInvestigationAccusationsVoteIssuedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData({
        _data_: {
          id: id,
        },
      });
    }
  }, [id, isEdited]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="accusation-case-issued-vote-tab-container"
      loading={isIssuedVoteLoading}
    >
      {/* //Todo:[ati]:delete in feature if it does not necessary */}
      {/* <div className="filter-container">
        <span className="title-text">فیلترها:</span>
        <div className="capsule-container">
          <div className="capsule">حراست</div>
          <div className="capsule">معاونت آموزشی</div>
          <div className="capsule">معاونت پژوهشی</div>
        </div>
      </div> */}
      <Steps
        orientation="vertical"
        size="small"
        current={issuedVoteData?.data ? issuedVoteData?.data?.length - 1 : 0}
        items={issuedVoteData?.data?.map((item) => stepItem(item)) as any[]}
      />
    </Div>
  );
});
IssuedVoteTab.displayName = "IssuedVoteTab";
export default IssuedVoteTab;
