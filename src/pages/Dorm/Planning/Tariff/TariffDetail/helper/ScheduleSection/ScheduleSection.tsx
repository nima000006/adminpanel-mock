import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import { GetTariffBasicInfoCopyDetailResponse } from "../../TariffDetailActiveTab/helpers/TariffBasicInfoTab/@types/@tariffBasicInfoTab";

const ScheduleSection = ({
  infoData,
}: {
  infoData: GetTariffBasicInfoCopyDetailResponse | undefined;
}) => {
  return (
    <section className="schedule-section">
      <CustomDivider text="زمان بندی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تاریخ شروع اعمال موثر"
          value={infoData?.data[0]?.appliedStartDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="ساعت شروع اعمال موثر"
          value={infoData?.data[0]?.appliedStartTime}
          isTime
        />
        <SingleVerticalWithCol
          label="تاریخ پایان اعمال موثر"
          value={infoData?.data[0]?.appliedEndDate}
          isDate
        />
        <SingleVerticalWithCol
          label="ساعت پایان اعمال موثر"
          value={infoData?.data[0]?.appliedEndTime}
          isTime
        />
        <SingleVerticalWithCol
          label="زمان ثبت"
          value={dateTimeCombiner(
            infoData?.data[0]?.createDate,
            infoData?.data[0]?.createTime
          )}
        />
        <SingleVerticalWithCol
          label="ایجاد کننده"
          value={`${infoData?.data[0]?.AssociationUserStaffNew_AssociationCustomerUser_firstName} ${infoData?.data[0]?.AssociationUserStaffNew_AssociationCustomerUser_lastName}`}
        />
      </Row>
    </section>
  );
};
export default ScheduleSection;
