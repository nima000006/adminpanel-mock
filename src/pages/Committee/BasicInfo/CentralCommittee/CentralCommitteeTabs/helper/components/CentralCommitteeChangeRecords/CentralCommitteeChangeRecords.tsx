import { useEffect } from "react";

import { Form, Steps } from "antd";

import { CentralCommitteeChangeRecordsTab } from "./@types/@centralCommitteeChangeRecords";

import "./_centralCommitteeChangeRecords.scss";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetCentralCommitteeChangeRecordsTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";

const CentralCommitteeChangeRecords = () => {
  //? ================================  Api Calls ================================
  // get data from api for SingleVerticalItem filed
  const [
    getCentralCommitteeChangeRecords,
    {
      data: getCentralCommitteeChangeRecordsData,
      isLoading: isGetCentralCommitteeChangeRecordsLoading,
    },
  ] = useLazyGetCentralCommitteeChangeRecordsTabQuery();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    getCentralCommitteeChangeRecords({ maxResults: 100, firstResult: 0 });
  }, []);

  // step item
  const stepItem = (data: CentralCommitteeChangeRecordsTab, index: number) => {
    return {
      title: (
        <div>
          <div className="steps-title">
            <h3>{`نسخه ${index + 1}`}</h3>
            <p>{dataPlaceHolder({ data: data?.createDate, isDate: true })}</p>
          </div>

          <div className="committee-members-box-wrapper">
            <CustomDivider text="افراد کمیته" />
            <div className="committee-members-box">
              <SingleVerticalItem
                label="معاون دانشجویی فرهنگی دانشگاه ( رییس کمیته)"
                value={dataPlaceHolder({
                  data: data?.AssociationCulturalBoss_title,
                })}
              />
              <SingleVerticalItem
                label="معاون آموزشی دانشگاه"
                value={dataPlaceHolder({
                  data: data?.AssociationEducationAssistant_title,
                })}
              />
              <SingleVerticalItem
                label="معاون پژوهشی دانشگاه"
                value={dataPlaceHolder({
                  data: data?.AssociationResearchAssistant_title,
                })}
              />
              <SingleVerticalItem
                label="مدیر کل دفتر امور حقوقی"
                value={dataPlaceHolder({
                  data: data?.AssociationDirectorGeneralLegal_title,
                })}
              />
              <SingleVerticalItem
                label="مدیر کل دفتر گزینش"
                value={dataPlaceHolder({
                  data: data?.AssociationGeneralManagerSelection_title,
                })}
              />
              <SingleVerticalItem
                label="روحانی عضو کمیته"
                value={dataPlaceHolder({
                  data: data?.AssociationCleric_title,
                })}
              />
              <SingleVerticalItem
                label="رییس سازمان سما"
                value={dataPlaceHolder({
                  data: data?.AssociationHeadSamaOrganization_title,
                })}
              />
              <SingleVerticalItem
                label="مدیر کل امور دانشجویی دانشگاه (دبیر کمیته)"
                value={dataPlaceHolder({
                  data: data?.AssociationDirectorGeneralStudent_title,
                })}
              />
            </div>
          </div>
          <Form className="voting-type-box-wrapper">
            <CustomDivider text="نوع رای گیری" />
            <CustomRadioGroup
              name="system"
              label=""
              key={data?.AssociationVotingType_title}
              defaultValue={data?.AssociationVotingType_title}
              disabled={true}
              options={[
                {
                  label: "سیستمی",
                  value: "سیستمی",
                },
                {
                  label: "دستی",
                  value: "دستی",
                },
              ]}
            />
          </Form>
        </div>
      ),
    };
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="central-committee-change-records-container"
      loading={isGetCentralCommitteeChangeRecordsLoading}
    >
      <Steps
        orientation="vertical"
        size="small"
        current={
          getCentralCommitteeChangeRecordsData?.data
            ? getCentralCommitteeChangeRecordsData?.data?.length - 1
            : 0
        }
        items={getCentralCommitteeChangeRecordsData?.data.map((item: any, index: any) =>
          stepItem(item, index)
        )}
      />
    </Div>
  );
};
export default CentralCommitteeChangeRecords;
