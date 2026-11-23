import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { AdmissionDetailRegisterInfoProps } from "./@types/@admissionDetailRegisterInfo";

const AdmissionDetailRegisterInfo = ({
  registerDate,
  registerTime,
  creator,
}: AdmissionDetailRegisterInfoProps) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="زمان ثبت"
        value={`${dataPlaceHolder({ data: registerTime, isTime: true })} , ${dataPlaceHolder({ data: registerDate, isDate: true })}`}
      />

      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="ایجاد کننده"
        value={`${creator?.firstName}  ${creator?.lastName}`}
      />
    </Row>
  );
};

export default AdmissionDetailRegisterInfo;
