import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { pageMode } from "@pages/International/Requests/Demands/Detail/utils/demandDetail";

import { preRegistrationPageMode } from "../../../../../utils/preRegistrationUtils";

const PreRegistrationRequestInfo = () => {
  const { params } = useQueryParams();
  return (
    <div>
      <CustomDivider text="مشخصات درخواست" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="شماره درخواست" value={params?.id} />
        <SingleVerticalWithCol
          label="مرحله درخواست"
          value={preRegistrationPageMode[params?.status]?.text}
        />
        <SingleVerticalWithCol
          label="وضعیت درخواست"
          value={pageMode[params?.status]?.text}
        />
        <SingleVerticalWithCol label="تاریخ ارسال درخواست" value={"1404/08/05"} isDate />
      </Row>
    </div>
  );
};
export default PreRegistrationRequestInfo;
