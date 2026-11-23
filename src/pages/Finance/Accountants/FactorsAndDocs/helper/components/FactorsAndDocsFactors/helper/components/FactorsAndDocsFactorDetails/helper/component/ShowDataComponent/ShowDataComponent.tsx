import { Col } from "antd";

const ShowDataComponent = ({
  lg,
  md,
  sm,
  xs,
  span,
  title,
  data,
}: {
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  span?: number;
  title: string;
  data: any;
}) => {
  return (
    <Col
      {...(span
        ? { span: span }
        : { lg: lg || 6, md: md || 8, sm: sm || 12, xs: xs || 24 })}
    >
      <p className="accounting-factor-details-title">{title}</p>
      <p className="h5-medium">{data || "-"}</p>
    </Col>
  );
};
export default ShowDataComponent;
