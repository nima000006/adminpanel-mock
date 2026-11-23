import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import InsuranceDetailThirdTabTableModel from "@infra/models/tableModels/InsuranceTableModels/InsuranceDetailThirdTab/InsuranceDetailThirdTabTableModel";

import { PaymentFactorType } from "./@types/@paymentFactor";
import "./_paymentFactor.scss";

const PaymentFactor = ({ insuranceData, paymentType, tableData }: PaymentFactorType) => {
  return (
    <div className="insurance-payment-factor">
      <CustomDivider text="فاکتور پرداخت" />
      <Row gutter={[16, 16]} className="insurance-box-wrapper">
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="بیمه‌گر"
          value={insuranceData?.insurer}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نوع بیمه"
          value={insuranceData?.typeInsurance}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="بیمه‌شده‌ها (نفر)"
          value={insuranceData?.insured?.toString()}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نوع پرداخت"
          value={paymentType === "INSTALLMENT" ? "اقساطی" : "نقدی"}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تاریخ صدور فاکتور"
          value={insuranceData?.dateCreateFactor}
          isDate
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره فاکتور"
          value={insuranceData?.factorNum}
        />
      </Row>
      <CustomTable
        dataSource={tableData}
        rowKey="id"
        columns={InsuranceDetailThirdTabTableModel}
        pagination={paginationConfig}
        {...TABLE_PROPS(tableData?.length || 0)}
      />
    </div>
  );
};
export default PaymentFactor;
