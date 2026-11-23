import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { RequestDetailSectionPropsType } from "./@types/requestDetailSection";

const RequestDetailSection = ({
  infoData,
  loading,
  isAwaitingReview,
  isRejected,
}: RequestDetailSectionPropsType) => {
  return (
    <Div loading={loading}>
      <CustomDivider text="مشخصات درخواست" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          sm={24}
          label="شماره درخواست"
          value={infoData?.id?.toString()}
        />

        <SingleVerticalWithCol
          sm={24}
          label="نوع درخواست"
          value={infoData?.AssociationRequestType_title}
        />

        <SingleVerticalWithCol
          sm={24}
          label="تاریخ ثبت درخواست"
          value={`${dataPlaceHolder({
            data: infoData?.createDate,
            isDate: true,
          })} ,${dataPlaceHolder({
            data: infoData?.createTime,
            isTime: true,
          })}
            `}
        />

        <SingleVerticalWithCol
          sm={24}
          label="وضعیت"
          value={infoData?.AssociationStatus_title}
        />

        {isRejected ? (
          <>
            <SingleVerticalWithCol span={24} label="علت" value={infoData?.descRequest} />
            <SingleVerticalWithCol
              span={24}
              label="علت رد"
              value={infoData?.descReturnRequest}
            />
          </>
        ) : isAwaitingReview ? (
          <SingleVerticalWithCol span={24} label="علت" value={infoData?.descRequest} />
        ) : (
          <SingleVerticalWithCol
            span={24}
            label="علت"
            value={infoData?.descReturnRequest}
          />
        )}
      </Row>
    </Div>
  );
};
export default RequestDetailSection;
