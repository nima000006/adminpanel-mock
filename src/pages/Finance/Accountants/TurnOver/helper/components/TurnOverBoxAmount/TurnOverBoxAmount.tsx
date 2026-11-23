import { Col } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

const TurnOverBoxAmount = ({
  title,
  price,
  tagDetail,
  hasTag,
  color,
}: {
  title: string;
  price: number;
  tagDetail?: string;
  hasTag?: boolean;
  color?: string;
}) => {
  return (
    <Col xl={6} lg={8} md={12} sm={24} xs={24}>
      <CustomCard className="custom-card" padding={PADDING_24}>
        <div className="flex gap-2">
          <span>{title}</span>
          {hasTag ? (
            <CustomTag className="custom-tag" color={color}>
              {tagDetail}
            </CustomTag>
          ) : null}
        </div>
        <p className="text-2xl">
          {dataPlaceHolder({ data: price, isRial: true, isPrice: true })} تومان
        </p>
      </CustomCard>
    </Col>
  );
};
export default TurnOverBoxAmount;
