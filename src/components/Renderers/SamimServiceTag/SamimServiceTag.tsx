import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import CustomTag from "../CustomTag/CustomTag";
import "./_samimServiceTag.scss";

/** Maps custom palette tokens to Ant Design Tag presets */
const antTagColorMap: Record<string, string> = {
  blue: "blue",
  red: "red",
  purple: "purple",
  cyan: "cyan",
  lime: "lime",
  green: "green",
  orange: "orange",
  teal: "cyan",
};

const SamimServiceTag = ({
  service,
  isText = false,
}: {
  service?: string | null;
  isText?: boolean;
}) => {
  if (!service) return <>-</>;

  const matched = serviceOptions.find(
    (opt) => opt?.value?.toLowerCase() === service.toLowerCase()
  );

  if (!matched) return <>-</>;

  const ServiceIcon = matched.icon;
  const tagColor = matched.color
    ? (antTagColorMap[matched.color] ?? matched.color)
    : "default";

  return isText ? (
    matched.title
  ) : (
    <CustomTag
      variant="outlined"
      className={`samim-service-tag-container${matched.color ? ` ${matched.color}` : ""}`}
      color={tagColor}
      icon={
        ServiceIcon ? (
          matched?.isSvg ? (
            <img src={ServiceIcon as string} alt={matched.title} className="h-5 w-5" />
          ) : (
            <div className={`icon-wrapper ${matched.color}`}>
              <ServiceIcon color="#FFFFFF" size={14} />
            </div>
          )
        ) : null
      }
    >
      {matched.title}
    </CustomTag>
  );
};

export default SamimServiceTag;
