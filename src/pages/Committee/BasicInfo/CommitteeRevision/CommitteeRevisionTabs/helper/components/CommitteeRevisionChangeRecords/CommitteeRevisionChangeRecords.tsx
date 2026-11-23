import { useEffect } from "react";

import { Form, Steps } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetCommitteeRevisionChangeRecordsTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";

import { GetCommitteeRevisionChangeRecordsTab } from "./@types/@committeeRevisionChangeRecords";
import "./_committeeRevisionChangeRecords.scss";

// step item
const stepItem = (data: GetCommitteeRevisionChangeRecordsTab, index: number) => {
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
              label="رییس دبیرخانه هیات امنا (رییس کمیته)"
              value={dataPlaceHolder({
                data: data?.AssociationBossCommitte_title,
              })}
            />
            <SingleVerticalItem
              label="رییس شورای دانشجویی و فرهنگی و ورزشی استان"
              value={dataPlaceHolder({
                data: data?.AssociationPresidentStudentCouncil_title,
              })}
            />
            <SingleVerticalItem
              label="مسئول دفتر نهاد نمایندگی رهبری دانشگاه در استان"
              value={dataPlaceHolder({
                data: data?.AssociationLeadershipBody_title,
              })}
            />
            <SingleVerticalItem
              label="عضو هیات علمی گروه حقوق"
              value={dataPlaceHolder({
                data: data?.AssociationFacultyMember_title,
              })}
            />
            <SingleVerticalItem
              label="عضو دانشجویی"
              value={dataPlaceHolder({
                data: data?.AssociationStudentRepresentative_title,
              })}
            />
            <SingleVerticalItem
              label="کارشناس امور دانشجویی، فرهنگی، ورزشی و زنان فرهیخته استان (دبیر کمیته تجدید نظر)"
              value={dataPlaceHolder({
                data: data?.AssociationSectetaryPersonnell_title,
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

const CommitteeRevisionChangeRecords = () => {
  //? ================================  Api Calls ================================
  // get data from api for SingleVerticalItem filed
  const [
    getCommitteeRevisionChangeRecords,
    {
      data: getCommitteeRevisionChangeRecordsData,
      isLoading: isGetCommitteeRevisionChangeRecordsLoading,
    },
  ] = useLazyGetCommitteeRevisionChangeRecordsTabQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getCommitteeRevisionChangeRecords({ maxResults: 100, firstResult: 0 });
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="committee-revision-change-records-container"
      loading={isGetCommitteeRevisionChangeRecordsLoading}
    >
      <Steps
        orientation="vertical"
        size="small"
        current={
          getCommitteeRevisionChangeRecordsData?.data
            ? getCommitteeRevisionChangeRecordsData?.data?.length - 1
            : 0
        }
        items={getCommitteeRevisionChangeRecordsData?.data?.map((item: any, index: any) =>
          stepItem(item, index)
        )}
      />
    </Div>
  );
};
export default CommitteeRevisionChangeRecords;
