import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { CATERING_GENDER_TYPES_LABELS } from "@pages/Catering/_shared/utils";
import { CateringSelfsDetailData } from "@pages/Catering/Selfs/_shared/helper/components/CateringSelfComponents/CateringSelfsDetail/@types/@cateringSelfsDetail";

const CateringSelfsDetailsInfo = ({
  selfDetailData,
}: {
  selfDetailData?: CateringSelfsDetailData;
}) => {
  const genderLabel =
    selfDetailData?.genderType != null
      ? CATERING_GENDER_TYPES_LABELS[selfDetailData.genderType]
      : undefined;

  const branchesValue = selfDetailData?.branchDtos
    ?.map((branch) => branch.branchName)
    ?.join(" - ");

  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="عنوان"
        value={selfDetailData?.title}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شعبه / واحد"
        value={selfDetailData?.ownerBranchCodeBranchName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="کد شعبه مالک"
        value={selfDetailData?.ownerBranchCodeBranchCode?.toString()}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="نوع سلف"
        value={selfDetailData ? (selfDetailData.private ? "خصوصی" : "عمومی") : undefined}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="جنسیت"
        value={dataPlaceHolder({ data: genderLabel })}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="ظرفیت (نفر)"
        value={selfDetailData?.capacity?.toString()}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="نام مسئول سلف"
        value={selfDetailData?.managerFirstName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="نام خانوادگی مسئول سلف"
        value={selfDetailData?.managerLastName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="کد ملی مسئول سلف"
        value={selfDetailData?.managerUserName}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="شماره تلفن مسئول سلف"
        value={selfDetailData?.phone}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="تاریخ ایجاد"
        value={selfDetailData?.createdDate}
        isDate
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="آخرین تغییرات توسط"
        value={selfDetailData?.modifiedBy}
      />
      <SingleVerticalWithCol
        md={12}
        sm={24}
        label="تاریخ آخرین تغییر"
        value={selfDetailData?.modifiedDate}
        isDate
      />
      <SingleVerticalWithCol
        span={24}
        label="شعب متصل"
        value={dataPlaceHolder({ data: branchesValue })}
      />
      <SingleVerticalWithCol
        span={24}
        label="توضیحات سلف"
        value={dataPlaceHolder({ data: selfDetailData?.description })}
      />
      <SingleVerticalWithCol
        span={24}
        label="قوانین و مقررات سلف"
        value={dataPlaceHolder({ data: selfDetailData?.rules })}
      />
    </Row>
  );
};

export default CateringSelfsDetailsInfo;
