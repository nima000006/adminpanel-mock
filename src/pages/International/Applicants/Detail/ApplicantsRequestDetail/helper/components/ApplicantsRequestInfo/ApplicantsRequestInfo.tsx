import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";

const ApplicantsRequestInfo = () => {
  const { params } = useQueryParams();
  return (
    <div>
      <CustomDivider text="مشخصات درخواست" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="شماره درخواست" value={params?.id} />
        <SingleVerticalWithCol label="مرحله درخواست" value={"-"} />
        <SingleVerticalWithCol label="وضعیت درخواست" value={"-"} />
        <SingleVerticalWithCol label="تاریخ ارسال درخواست" value={"1404/08/05"} isDate />
      </Row>
    </div>
  );
};
export default ApplicantsRequestInfo;
