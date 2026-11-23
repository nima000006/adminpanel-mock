import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { AdmissionDetailTariffTimingInfoProps } from "./@types/@admissionDetailTariffTimingInfo";

const AdmissionDetailTariffTimingInfo = ({
  data,
  loading,
}: AdmissionDetailTariffTimingInfoProps) => {
  return (
    <Div loading={loading}>
      <CustomDivider text="زمان‌بندی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تاریخ شروع اعمال مؤثر"
          value={data?.data[0]?.appliedStartDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="ساعت شروع اعمال مؤثر"
          value={data?.data[0]?.appliedStartTime}
          isTime
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تاریخ پایان اعمال مؤثر"
          value={data?.data[0]?.appliedEndDate}
          isDate
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="ساعت پایان اعمال مؤثر"
          value={data?.data[0]?.appliedEndTime}
          isTime
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="زمان ثبت"
          value={`${dataPlaceHolder({ data: data?.data[0]?.createTime, isTime: true })} , ${dataPlaceHolder({ data: data?.data[0]?.createDate, isDate: true })}`}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="ایجاد کننده"
          value={data?.data[0]?.createByUserId}
        />
      </Row>
    </Div>
  );
};

export default AdmissionDetailTariffTimingInfo;
