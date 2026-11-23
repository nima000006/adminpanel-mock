import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { UsersRequestsDetailRequestsInfoProps } from "./@types/@usersRequestsDetailRequestsInfo";

const UsersRequestsDetailRequestsInfo = ({
  data,
  from,
}: UsersRequestsDetailRequestsInfoProps) => {
  return (
    <div>
      <CustomDivider text="مشخصات درخواست" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="شماره درخواست" value={data?.id?.toString()} />
        <SingleVerticalWithCol
          label="زمان ثبت درخواست"
          value={`${dataPlaceHolder({ data: data?.createDate, isDate: true })} , ${dataPlaceHolder({ data: data?.createTime, isTime: true })}`}
        />
        <SingleVerticalWithCol
          label="نوع درخواست"
          value={data?.AssociationCategoryRequestType_title}
        />
        {from !== "pendingList" && (
          <SingleVerticalWithCol
            label="نوع رزرو"
            value={
              data?.AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title
            }
          />
        )}
        <SingleVerticalWithCol
          label="نوع زمان‌بندی"
          value={
            data?.AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title
          }
        />
        <SingleVerticalWithCol
          label="شروع رزرو"
          value={data?.residenceStartDate}
          isDate
        />
        <SingleVerticalWithCol label="پایان رزرو" value={data?.residenceEndDate} isDate />
        {from === "cancellation" && (
          <SingleVerticalWithCol
            span={24}
            label="علت درخواست کنسلی"
            value={data?.descCancellationRequest}
            isDate
          />
        )}
      </Row>
    </div>
  );
};

export default UsersRequestsDetailRequestsInfo;
