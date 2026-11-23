import { Col, Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";

const ReservationConfirmModalContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <CustomAlert
        showIcon
        description="پس از ثبت، مهلت پرداخت فاکتور به تاریخ جدید تغییر می‌کند و کاربر تا آن زمان امکان پرداخت خواهد داشت."
        type="info"
      />

      <Row gutter={16}>
        <Col lg={12} md={12} sm={12} xs={24}>
          <SingleVerticalItem
            label="تاریخ سر رسید فعلی"
            value={dataPlaceHolder({
              data: "2026/09/21",
              isDate: true,
            })}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={24}>
          <SingleVerticalItem
            label="تاریخ سر رسید جدید"
            value={dataPlaceHolder({
              data: "2026/09/21",
              isDate: true,
            })}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReservationConfirmModalContent;
