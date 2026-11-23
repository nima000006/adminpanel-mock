import { useEffect } from "react";

import { Row } from "antd";

import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { useLazyMyDoctorGetFollowUpDetailManagerQuery } from "@infra/states/redux/Apis/myDoctor/test/testApis";

import { MyTestRegisterActionDrawerContentProps } from "./@types/@myTestRegisterActionDrawerContent";

const MyTestRegisterActionDrawerContent = ({
  closeDrawerHandler,
  followUpId,
}: MyTestRegisterActionDrawerContentProps) => {
  const [getFollowUpDetail, { isLoading: isFollowUpDetailLoading, data }] =
    useLazyMyDoctorGetFollowUpDetailManagerQuery();

  // EFFECTS
  useEffect(() => {
    if (followUpId) {
      getFollowUpDetail({ followUpId });
    }
  }, [followUpId]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Div loading={isFollowUpDetailLoading}>
      <CustomDrawerHeader
        title="مشاهده جزئیات اقدام صورت گرفته"
        closeDrawerHandler={closeDrawerHandler}
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نوع اقدام"
          value={data?.followUpTypeTitle}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نتیجه اقدام"
          value={data?.followUpActionTitle}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نام اقدام کننده"
          value={data?.followerFirstName}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="نام خانوادگی اقدام کننده"
          value={data?.followerLastName}
        />
        <SingleVerticalWithCol span={24} label="توضیحات" value={data?.description} />
      </Row>
    </Div>
  );
};

export default MyTestRegisterActionDrawerContent;
