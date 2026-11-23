import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { PlaceUserInfoProps } from "./@types/@placeUserInfo";

const PlaceUserInfo = ({ data }: PlaceUserInfoProps) => {
  return (
    <div>
      <CustomDivider text="مشخصات سکونت" />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="اقامتگاه"
          value={data?.AssociationBed_AssociationCategoryDormitory_title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="ساختمان"
          value={data?.AssociationBed_AssociationCategoryBuliding_title}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          sm={24}
          label="طبقه"
          value={data?.AssociationBed_AssociationCategoryFloor_title}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          sm={24}
          label="اتاق"
          value={data?.AssociationBed_AssociationCategorRoom_title}
        />
        <SingleVerticalWithCol
          lg={6}
          md={12}
          sm={24}
          label="تخت"
          value={data?.AssociationBed_title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نوع رزرو"
          value={
            data?.AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title
          }
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نوع زمانبندی"
          value={
            data?.AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title
          }
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شروع اسکان"
          value={data?.deliveryDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="پایان اسکان"
          value={data?.residenceEndDate}
          isDate
        />
      </Row>
    </div>
  );
};

export default PlaceUserInfo;
