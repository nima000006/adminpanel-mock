import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import { useUserContext } from "@pages/Auth/Profile/State/useUserContext";

const UserAccountInfoDrawerContent = ({
  setIsOpenUserInfoDrawer,
}: {
  setIsOpenUserInfoDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userInfo } = useUserContext();

  const closeDrawerHandler = () => {
    setIsOpenUserInfoDrawer(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="profile-user-account-info-container">
      <CustomDrawerHeader
        title="اطلاعات حساب کاربری"
        closeDrawerHandler={closeDrawerHandler}
      />
      <section>
        <CustomDivider text="اطلاعات هویتی" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="نام"
            value={userInfo?.firstName}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="نام خانوادگی"
            value={userInfo?.lastName}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="نام پدر"
            value={userInfo?.fatherName}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="جنسیت"
            value={userInfo?.genderId === 1 ? "مرد" : "زن"}
          />
        </Row>
      </section>

      <section>
        <CustomDivider text="اطلاعات حرفه ای" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="سمت"
            value={userInfo?.staff?.admin?.employeeDtos?.[0]?.positionTitle}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="واحد"
            value={userInfo?.staff?.admin?.branchName}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="دانشکده / دپارتمان"
            value={emptyString}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            sm={24}
            label="نوع استخدامی"
            value={emptyString}
          />
          <SingleVerticalWithCol label="وضعیت شغلی" value={emptyString} />
        </Row>
      </section>
    </div>
  );
};
export default UserAccountInfoDrawerContent;
