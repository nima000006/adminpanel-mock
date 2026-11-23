import { GetProps, Timeline } from "antd";
import "./_customTimeline.scss";

type CustomTimelineProps = GetProps<typeof Timeline>;

const CustomTimeline = ({ ...props }: CustomTimelineProps) => {
  return <Timeline className="custom-timeline-main-container" {...props} />;
};

CustomTimeline.displayName = "CustomTimeline";

export default CustomTimeline;
