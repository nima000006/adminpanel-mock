import { Col } from "antd";

import SingleVerticalItem from "../SingleVerticalItem/SingleVerticalItem";
import { SingleVerticalWithColProps } from "./@type/@singleVerticalWithColProps";

const SingleVerticalWithCol = ({
  xl,
  lg,
  md,
  sm,
  xs,
  span,
  ...props
}: SingleVerticalWithColProps) => {
  return (
    <Col
      {...(span
        ? { span: span }
        : { xl: xl || 6, lg: lg || 6, md: md || 8, sm: sm || 12, xs: xs || 24 })}
    >
      <SingleVerticalItem {...props} />
    </Col>
  );
};
export default SingleVerticalWithCol;
