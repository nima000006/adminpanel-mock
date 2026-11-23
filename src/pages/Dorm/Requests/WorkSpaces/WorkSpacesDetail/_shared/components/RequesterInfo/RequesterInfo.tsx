import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { WorkSpaceAdmissionListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import { WorkSpaceDormListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import { WorkSpaceTariffListType } from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesList/helper/components/WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";

const RequesterInfo = ({
  data,
}: {
  data:
    | WorkSpaceDormListType[]
    | WorkSpaceTariffListType[]
    | WorkSpaceAdmissionListType[];
}) => {
  return (
    <div>
      <CustomDivider text="مشخصات درخواست دهنده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          label="نام"
          value={data[0]?.AssociationUserStaffNew_AssociationCustomerUser_firstName}
        />
        <SingleVerticalWithCol
          md={12}
          label="نام خانوادگی"
          value={data[0]?.AssociationUserStaffNew_AssociationCustomerUser_lastName}
        />
        {/* //Todo[Atefeh]: uncomment when api got ready */}
        {/* <SingleVerticalWithCol md={12} label="سمت" value={"بک اند ندارد"} />
        <SingleVerticalWithCol md={12} label="سازمان" value={"بک اند ندارد"} /> */}
        <SingleVerticalWithCol
          md={12}
          label="واحد دانشگاهی"
          value={data[0]?.AssociationBranchid_AssociationCategoryRegion_title}
        />
      </Row>
    </div>
  );
};
export default RequesterInfo;
