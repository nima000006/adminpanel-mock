import { Row } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  PADDING_12,
  PADDING_20,
  PADDING_24,
} from "@infra/VARS/globalStyles/globalStyles";

import { AppealIssuedVoteProps, AppealRecordsType } from "./@types/@issuedVote";

const AppealIssuedVote = ({ data }: AppealIssuedVoteProps) => {
  return (
    <CustomCard padding={PADDING_24}>
      <CustomCard padding={PADDING_24} className="issued-container">
        <CustomDivider text={data.title} />
        <Row gutter={[12, 12]}>
          <SingleVerticalWithCol
            span={8}
            label="تاریخ جلسه"
            value={data?.sessionDate}
            isDate
          />

          <SingleVerticalWithCol
            span={8}
            label="شماره جلسه"
            value={data?.sessionNumber}
          />

          <SingleVerticalWithCol
            span={8}
            label="تعداد تنبیهات / آراء"
            value={`${data?.punishmentCount}`}
          />
        </Row>
        {data?.records?.map((item: AppealRecordsType, index) => (
          <CustomCard padding={PADDING_20} key={item.id} className="issued-container">
            <CustomDivider text={` تنبیه / رأی ${index + 1}`} />
            <Row gutter={[12, 12]}>
              <SingleVerticalWithCol
                span={8}
                label="رأی انضباطی صادره"
                value={item?.AssociationAappealRulings?.title}
              />

              <SingleVerticalWithCol
                span={8}
                label="قطعیت"
                value={item?.AssociationAappealCertainty?.title}
              />

              <SingleVerticalWithCol
                span={8}
                label="وضعیت اجرا"
                value={item?.AssociationAappealExecutionStatus?.title}
              />

              <SingleVerticalWithCol
                span={8}
                label="تاریخ اجرا"
                value={item?.executionDate}
                isDate
              />
            </Row>
            {(item?.AssociationAappealReasonAggravation?.title ||
              item?.AssociationAappealPunish?.title ||
              item?.descAggravation) && (
              <CustomCard padding={PADDING_12}>
                <CustomDivider text="تشدید حکم" />
                <Row gutter={[12, 12]}>
                  <SingleVerticalWithCol
                    span={12}
                    label="دلیل تشدید حکم"
                    value={item?.AssociationAappealReasonAggravation?.title}
                  />

                  <SingleVerticalWithCol
                    span={12}
                    label="حکم تشدیدی"
                    value={item?.AssociationAappealPunish?.title}
                  />

                  <SingleVerticalWithCol
                    span={24}
                    label="توضیح"
                    value={item?.descAggravation}
                  />
                </Row>
              </CustomCard>
            )}
          </CustomCard>
        ))}
        <Row>
          <SingleVerticalWithCol span={24} label="توضیح" value={data?.description} />
        </Row>
      </CustomCard>
    </CustomCard>
  );
};

export default AppealIssuedVote;
