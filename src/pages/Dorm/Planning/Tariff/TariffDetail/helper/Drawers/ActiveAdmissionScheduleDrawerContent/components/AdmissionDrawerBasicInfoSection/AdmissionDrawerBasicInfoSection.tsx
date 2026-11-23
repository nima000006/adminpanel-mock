import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { multiSelectGenerator } from "@pages/_shared/utils";

import { AdmissionDrawerBasicInfoSectionProps } from "../../@types/@activeAdmissionScheduleDrawerContent";

const AdmissionDrawerBasicInfoSection = ({
  admissionDrawerDetail,
}: AdmissionDrawerBasicInfoSectionProps) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        span={12}
        label="عنوان"
        value={admissionDrawerDetail?.data?.title}
      />

      <SingleVerticalWithCol
        span={12}
        label="عنوان نمایشی"
        value={admissionDrawerDetail?.data?.showTitle}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="شناسه برنامه پذیرش"
        value={admissionDrawerDetail?.data?.id?.toString()}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="واحد دانشگاهی"
        value={admissionDrawerDetail?.data?.AssociationCategoryBranch?.title}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="اقامتگاه"
        value={admissionDrawerDetail?.data?.AssociationDormitory?.title}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نوع مدیریت"
        value={admissionDrawerDetail?.data?.AssociationCategoryManagementType?.title}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نوع زمان‌بندی"
        value={admissionDrawerDetail?.data?.AssociationCategorySchedulingType?.title}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نوع رزرو"
        value={admissionDrawerDetail?.data?.AssociationCategoryReservationType?.title}
      />

      <SingleVerticalWithCol
        span={24}
        label="ماه‌ها"
        value={`${dataPlaceHolder({ data: admissionDrawerDetail?.data?.appliedStartDate, isDate: true })} , ${dataPlaceHolder({ data: admissionDrawerDetail?.data?.appliedEndDate, isDate: true })}`}
      />

      <SingleVerticalWithCol
        span={24}
        label="ارائه به واحدهای"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationBranch,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نوع پرداخت"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationPaymentType,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="تعداد اقساط"
        value={admissionDrawerDetail?.data?.installmentNumber?.toString()}
      />
      {/* //Todo[Atefeh]: delete if not needed in the future */}
      {/* 
      <SingleVerticalWithCol
        lg={8}
        label="جریمه دیرکرد درصدی(%)"
        value={
          admissionDrawerDetail?.data?.latePercentagepenalty
            ? `% ${admissionDrawerDetail?.data?.latePercentagepenalty?.toString()}`
            : "-"
        }
      /> 

      <SingleVerticalWithCol
        lg={8}
        label="جریمه دیرکرد ثابت (ریال)"
        value={admissionDrawerDetail?.data?.fixedLatePenalty?.toString()}
        isPrice
      />*/}

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="شیوه پرداخت"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationPaymetMethod,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="امکان درخواست برای دیگری"
        value={admissionDrawerDetail?.data?.isRequestForAnother?.toString()}
      />

      <SingleVerticalWithCol
        span={24}
        label="گروه کاربری"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationUserGroup,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        span={24}
        label="مقطع تحصیلی"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationGrade,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        span={24}
        label="ملیت"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationNationality,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        span={24}
        label="شرایط خاص"
        value={dataPlaceHolder({
          data: admissionDrawerDetail?.data?.AssociationSpecialStatus,
          callBack: multiSelectGenerator,
        })}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="امکان بدهی"
        value={admissionDrawerDetail?.data?.canDebt === 1 ? "بله" : "خیر"}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="سقف بدهی (ریال)"
        value={admissionDrawerDetail?.data?.maxDebt?.toString()}
        isPrice
      />
      {/* //Todo[Atefeh]: delete if not needed in the future */}
      {/* <SingleVerticalWithCol
        lg={8}
        label="حداکثر تعداد اقساط جهت بدهی"
        value={admissionDrawerDetail?.data?.maxNumberInstallmentForDebt?.toString()}
      /> */}

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="درصد تخفیف"
        value={admissionDrawerDetail?.data?.percentDiscount?.toString()}
      />

      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="تخفیف ثابت (ریال)"
        value={admissionDrawerDetail?.data?.fixedDiscount?.toString()}
      />

      <SingleVerticalWithCol
        span={24}
        label="توضیحات"
        value={admissionDrawerDetail?.data?.description}
      />
    </Row>
  );
};
export default AdmissionDrawerBasicInfoSection;
