import { Skeleton, Spin } from "antd";
import "./_mainSpinner.scss";

type MainSpinnerProps = {
  height?: string;
  isSkeleton?: boolean;
  skeletonCount?: number;
  paragraphRow?: number;
};

const MainSpinner = ({
  height = "90vh",
  isSkeleton = false,
  skeletonCount = 1,
  paragraphRow = 6,
}: MainSpinnerProps) => {
  if (isSkeleton) {
    return Array(skeletonCount)
      .fill("")
      .map((_, index) => (
        <Skeleton
          active
          paragraph={{ rows: paragraphRow }}
          key={index + 1}
          style={{ margin: "2rem 0" }}
        />
      ));
  }
  return (
    <div className="page-spinner-container" style={{ height: height }}>
      <Spin size="large" />
    </div>
  );
};

export default MainSpinner;
