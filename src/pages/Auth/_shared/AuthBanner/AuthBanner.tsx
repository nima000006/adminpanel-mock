import UniLogo from "@assets/icons/UniLogo";

import "./_authBanner.scss";
import { AuthBannerProps } from "./auth-banner.types";
const AuthBanner = ({ bannerLeftSide }: AuthBannerProps) => {
  return (
    <div className="auth-banner-container">
      <div>
        <UniLogo />
      </div>
      <div>{bannerLeftSide}</div>
    </div>
  );
};

export default AuthBanner;
