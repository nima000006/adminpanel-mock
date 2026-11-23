import { Link } from "react-router";

import { LeftSideBannerItemProps } from "./types/@leftSideBannerItem";
import "./_leftSideBannerItem.scss";

const LeftSideBannerItem = ({ icon: Icon, linkLabel, to }: LeftSideBannerItemProps) => {
  return (
    <div className="left-side-banner-item-container">
      <div className="left-side-banner-item_icon">
        <Icon size={16} />
      </div>
      <Link to={to} className="link">
        {linkLabel}
      </Link>
    </div>
  );
};
export default LeftSideBannerItem;
