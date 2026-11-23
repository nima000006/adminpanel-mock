import { useEffect } from "react";

import { Form, Steps } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { BasicInfoPrimaryCommitteeStepItemType } from "@infra/models/modules/committee/basicInfo/primaryCommittee/primaryCommittee";
import { useLazyGetPrimaryCommitteeChangeRecordsTabQuery } from "@infra/states/redux/Apis/committee/committees/committees";
import "./_primaryChangeRecords.scss";

const PrimaryChangeRecords = () => {
  //? ================================  Api Calls ================================
  // get data from api for SingleVerticalItem filed
  const [
    getPrimaryCommitteeChangeRecords,
    {
      data: getPrimaryCommitteeChangeRecordsData,
      isLoading: isGetPrimaryCommitteeChangeRecordsLoading,
    },
  ] = useLazyGetPrimaryCommitteeChangeRecordsTabQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getPrimaryCommitteeChangeRecords({ maxResults: 100, firstResult: 0 });
  }, []);

  //step item
  const stepItem = (data: BasicInfoPrimaryCommitteeStepItemType, index: number) => {
    return {
      title: (
        <Form>
          <div className="steps-title">
            <h3>{`نسخه ${index + 1}`}</h3>
            <p>{dataPlaceHolder({ data: data?.createDate, isDate: true })}</p>
          </div>

          <div className="committee-members-box-wrapper">
            <CustomDivider text="افراد کمیته" />
            <div className="committee-members-box">
              <SingleVerticalItem
                label="معاونت دانشجویی (رییس کمیته)"
                value={dataPlaceHolder({
                  data: data?.AssociationBosPersonnel_title,
                })}
              />
              <SingleVerticalItem
                label="مدیر کل امور فرهنگی واحد"
                value={dataPlaceHolder({
                  data: data?.AssociationCulturalPersonnel_title,
                })}
              />
              <SingleVerticalItem
                label="عضو هیأت علمی گروه حقوق یا الهیات"
                value={dataPlaceHolder({
                  data: data?.AssociationLegalPersonnel_title,
                })}
              />
              <SingleVerticalItem
                label="عضو هیأت علمی واحد روانشناسی و مشاوره"
                value={dataPlaceHolder({
                  data: data?.AssociationAcademicPersonnel_title,
                })}
              />
              <SingleVerticalItem
                label="عضو دانشجویی"
                value={dataPlaceHolder({
                  data: data?.AssociationStudentInfo_title,
                })}
              />
              <SingleVerticalItem
                label="دبیر کمیته بدوی"
                value={dataPlaceHolder({
                  data: data?.AssociationSectetaryPersonnel_title,
                })}
              />
            </div>
          </div>
          <CustomCard className="voting-type-box-wrapper">
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
          </CustomCard>
        </Form>
      ),
    };
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div
      className="primary-committee-change-records-container"
      loading={isGetPrimaryCommitteeChangeRecordsLoading}
    >
      <Steps
        orientation="vertical"
        size="small"
        current={
          getPrimaryCommitteeChangeRecordsData?.data
            ? getPrimaryCommitteeChangeRecordsData?.data?.length - 1
            : 0
        }
        items={getPrimaryCommitteeChangeRecordsData?.data?.map((item: any, index: any) =>
          stepItem(item, index)
        )}
      />
    </Div>
  );
};
export default PrimaryChangeRecords;
