import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ESTELAM_TYPE } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { MyEstelamInfoProps } from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationDetail/helper/components/MyForeignNationalsRegistrationDetailWaitingReview/@types/@myForeignNationalsRegistrationDetailWaitingReviewTypes";

const MyEstelamInfo = ({ tab }: MyEstelamInfoProps) => {
  const tabContent = {
    [ESTELAM_TYPE.IDENTITY_INFO]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نام" value={dataPlaceHolder({ data: "" })} />
        <SingleVerticalWithCol
          label="نام خانوادگی"
          value={dataPlaceHolder({ data: "" })}
        />
        <SingleVerticalWithCol label="کد ملی" value={dataPlaceHolder({ data: "" })} />
        <SingleVerticalWithCol label="نام پدر" value={dataPlaceHolder({ data: "" })} />
        <SingleVerticalWithCol
          label="تاریخ تولد"
          value={dataPlaceHolder({
            data: "",
            isDate: true,
          })}
        />
        <SingleVerticalWithCol label="جنسیت" value={dataPlaceHolder({ data: "" })} />
      </Row>
    ),

    [ESTELAM_TYPE.EDUCATIONAL_INFO]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="شماره دانشجویی"
          value={dataPlaceHolder({ data: "" })}
        />
        <SingleVerticalWithCol
          label="واحد دانشگاهی"
          value={dataPlaceHolder({ data: "" })}
        />
        <SingleVerticalWithCol
          label="مقطع تحصیلی"
          value={dataPlaceHolder({ data: "" })}
        />
        <SingleVerticalWithCol
          label="رشته تحصیلی"
          value={dataPlaceHolder({ data: "" })}
        />
        <SingleVerticalWithCol
          label="سال ورود"
          value={dataPlaceHolder({
            data: "",
            isDate: true,
          })}
        />
        <SingleVerticalWithCol
          label="نیمسال ورود"
          value={dataPlaceHolder({ data: "" })}
        />
      </Row>
    ),

    [ESTELAM_TYPE.CONTACT_INFO]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="شماره همراه"
          value={dataPlaceHolder({ data: "" })}
        />
        <SingleVerticalWithCol label="ایمیل" value={dataPlaceHolder({ data: "" })} />
      </Row>
    ),

    [ESTELAM_TYPE.ACADEMIC_PERFORMANCE]: (
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="معدل کل" value={dataPlaceHolder({ data: "" })} />
        <SingleVerticalWithCol
          label="تعداد واحدهای پاس‌شده"
          value={dataPlaceHolder({ data: "" })}
        />
      </Row>
    ),
  };

  return <>{tabContent[tab]}</>;
};
export default MyEstelamInfo;
