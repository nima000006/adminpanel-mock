import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { admissionDetailTableDataCreator } from "@pages/Dorm/Planning/Admission/AdmissionDetail/utils/admissionDetailUtils";

import { AdmissionProgramBasicInfoProps } from "./@types/@admissionProgramBasicInfo";
import AdmissionProgramBasicInfoTableModel from "./helper/models/AdmissionProgramBasicInfoTableModel/AdmissionProgramBasicInfoTableModel";

import "./_admissionProgramBasicInfo.scss";

const AdmissionProgramBasicInfo = ({ data, loading }: AdmissionProgramBasicInfoProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading} className="work-spaces-admission-program-basic-info">
      <section>
        <CustomDivider text="اطلاعات اولیه" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol lg={6} md={6} label="عنوان" value={data?.title} />
          <SingleVerticalWithCol
            lg={6}
            md={6}
            label="عنوان نمایشی در اپلیکیشن"
            value={data?.showTitle}
          />
          <SingleVerticalWithCol
            md={12}
            label="شناسه برنامه پذیرش"
            value={data?.id?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="واحد دانشگاهی"
            value={data?.AssociationCategoryBranch?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="نوع مدیریت"
            value={data?.AssociationCategoryManagementType?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="نوع زمان‌بندی"
            value={data?.AssociationCategorySchedulingType?.title}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="ماه‌ها"
            value={`${dataPlaceHolder({ data: data?.appliedStartDate, isDate: true })} , ${dataPlaceHolder({ data: data?.appliedEndDate, isDate: true })}`}
          />
          <SingleVerticalWithCol
            md={12}
            label="نوع رزرو"
            value={data?.AssociationCategoryReservationType?.title}
          />
          <SingleVerticalWithCol
            md={12}
            label="نوع پرداخت"
            value={data?.AssociationPaymentType?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="شیوه پرداخت"
            value={data?.AssociationPaymetMethod?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="گروه کاربری"
            value={data?.AssociationUserGroup?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="مقطع تحصیلی"
            value={data?.AssociationGrade?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="ملیت"
            value={data?.AssociationNationality?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            xl={12}
            lg={12}
            md={12}
            label="شرایط خاص"
            value={data?.AssociationSpecialStatus?.map((item) => item?.title)?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="امکان درخواست برای دیگری"
            value={
              String(data?.AssociationIsRequestForAnother?.title) === "1" ? "بله" : "خیر"
            }
          />
          <SingleVerticalWithCol
            md={12}
            label="امکان بدهی"
            value={String(data?.AssociationCanDebt?.title) === "1" ? "بله" : "خیر"}
          />
          <SingleVerticalWithCol
            md={12}
            label="سقف بدهی (ریال)"
            value={data?.maxDebt?.toString()}
            isPrice
          />
          <SingleVerticalWithCol
            md={12}
            label="حداکثر تعداد اقساط جهت بدهی"
            value={data?.maxNumberInstallmentForDebt?.toString()}
          />
          <SingleVerticalWithCol
            md={12}
            label="مهلت بررسی درخواست"
            value={` ${data?.reviewDeadline} روز `}
            valueClassName="deadline"
          />
          <SingleVerticalWithCol
            md={12}
            label="مهلت پرداخت"
            value={` ${data?.paymentDeadline} روز`}
            valueClassName="deadline"
          />
          <SingleVerticalWithCol span={24} label="توضیحات" value={data?.description} />
        </Row>
      </section>

      <CustomTable
        dataSource={admissionDetailTableDataCreator(data)}
        rowKey="id"
        columns={AdmissionProgramBasicInfoTableModel()}
        pagination={false}
        className="table"
        {...TABLE_PROPS(admissionDetailTableDataCreator(data)?.length)}
      />
    </Div>
  );
};
export default AdmissionProgramBasicInfo;
