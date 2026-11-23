import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import { WorkSpaceAdmissionListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import { WorkSpaceDormListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import { WorkSpaceTariffListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";
import { StatusMode } from "@pages/Dorm/Residence/DormsMainDetail/utils/dormMainDetail";

const RequestDetails = ({
  data,
}: {
  data:
    | WorkSpaceDormListType[]
    | WorkSpaceTariffListType[]
    | WorkSpaceAdmissionListType[];
}) => {
  const {
    params: { statusId },
  } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider text="مشخصات درخواست" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          label="شماره درخواست"
          value={data[0]?.id?.toString()}
        />

        <SingleVerticalWithCol
          md={12}
          label="نوع درخواست"
          value={data[0]?.AssociationRequestType_title}
        />

        <SingleVerticalWithCol
          md={12}
          label="تاریخ ثبت درخواست"
          value={dateTimeCombiner(data[0]?.createDate, data[0]?.createTime)}
        />

        <SingleVerticalWithCol
          md={12}
          label="وضعیت"
          value={
            data[0]?.AssociationStatus_title || data[0]?.AssociationCategoryStatus_title
          }
        />

        <SingleVerticalWithCol
          span={24}
          label="علت درخواست"
          value={data[0]?.descriptionRequest || data[0]?.descRequest}
        />

        {+statusId === StatusMode?.returned ? (
          <SingleVerticalWithCol
            span={24}
            label="علت عودت درخواست"
            value={data[0]?.descriptionAdmin}
          />
        ) : null}

        {+statusId === StatusMode?.rejected ? (
          <SingleVerticalWithCol
            span={24}
            label="علت رد درخواست"
            value={data[0]?.descriptionAdmin}
          />
        ) : null}
      </Row>
    </div>
  );
};
export default RequestDetails;
