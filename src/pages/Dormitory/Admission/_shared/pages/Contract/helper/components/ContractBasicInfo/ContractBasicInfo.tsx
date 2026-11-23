import { Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { ContractBasicInfoProps } from "@pages/Dormitory/Admission/_shared/pages/Contract/helper/components/ContractBasicInfo/@types/@contractBasicInfo";

const ContractBasicInfo = ({ data }: ContractBasicInfoProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="flex flex-col gap-10">
      <CustomAlert
        type="warning"
        showIcon
        title={`تا پایان قرارداد “${data.remainingDays}” روز دیگر باقی مانده.`}
      />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="تاریخ ایجاد" value={data.createdAt} lg={6} isDate />
        <SingleVerticalWithCol
          label="تاریخ شروع قرارداد"
          value={data.startDate}
          lg={6}
          isDate
        />
        <SingleVerticalWithCol
          label="تاریخ پایان قرارداد"
          value={data.endDate}
          lg={6}
          isDate
        />
      </Row>

      <div className="bg-neutral-2 flex flex-col gap-2 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <span className="text-neutral-8 min-w-32.5 text-sm">وضعیت</span>
          <CustomTag color="green">{data.statusTitle}</CustomTag>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-8 min-w-32.5 text-sm">شناسه قرارداد</span>
          <span className="text-neutral-12 text-sm font-medium">{data.contractId}</span>
        </div>
      </div>
    </div>
  );
};

export default ContractBasicInfo;
