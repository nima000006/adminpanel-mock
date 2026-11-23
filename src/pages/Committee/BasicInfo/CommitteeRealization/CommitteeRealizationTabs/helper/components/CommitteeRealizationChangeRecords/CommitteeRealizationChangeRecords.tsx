import { useEffect } from "react";

import { Form, Steps } from "antd";

import { GetRealizationCommitteeTab } from "./@types/@committeeRealizationChangeRecords";

import "./_committeeRealizationChangeRecords.scss";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetRealizationCommitteeRecordsTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";

const stepItem = (data: GetRealizationCommitteeTab) => {
  return {
    title: (
      <Form>
        <div className="steps-title">
          <h3>نسخه 1</h3>
          <p>
            {dataPlaceHolder({
              data: data?.createDate,
              isDate: true,
            })}
          </p>
        </div>
        <div className="committee-members-box-wrapper">
          <CustomDivider text="افراد کمیته" />
          <div className="committee-members-box">
            <SingleVerticalItem
              label="رییس دانشکده"
              value={dataPlaceHolder({
                data: data?.AssociationBossCollege_title,
              })}
            />
            <SingleVerticalItem
              label="معاون دانشجویی دانشکده"
              value={dataPlaceHolder({
                data: data?.AssociationStudentVicePresidentCollege_title,
              })}
            />
            <SingleVerticalItem
              label="مدیر گروه"
              value={dataPlaceHolder({
                data: data?.AssociationHeadDepartment_title,
              })}
            />
          </div>
        </div>
        <div className="voting-type-box-wrapper">
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
        </div>
      </Form>
    ),
  };
};

const CommitteeRealizationChangeRecords = () => {
  //? ================================  Api Calls ================================
  const [getRealizationData, { data, isLoading }] =
    useLazyGetRealizationCommitteeRecordsTabQuery();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    getRealizationData({ firstResult: 0, maxResults: 50 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="committee-realization-change-records-container" loading={isLoading}>
      <Steps
        orientation="vertical"
        size="small"
        current={data?.data ? data?.data?.length - 1 : 0}
        items={data?.data?.map((item: any) => stepItem(item))}
      />
    </Div>
  );
};
export default CommitteeRealizationChangeRecords;
