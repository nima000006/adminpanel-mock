import { AuthLayoutProps } from "./auth-layout.types";
import "./_authLayout.scss";
import BgImage from "../../../../assets/images/authBg.webp";

import { Col, Row } from "antd";

import AuthBanner from "../AuthBanner/AuthBanner";

const AuthLayout = ({ children, bannerLeftSide }: AuthLayoutProps) => {
  return (
    <Row className="auth-layout">
      {/* Right side - Dynamic content */}
      <Col className="auth-layout__right-side" md={12} lg={9} xl={9} sm={24} xs={24}>
        <AuthBanner bannerLeftSide={bannerLeftSide} />
        {children}
      </Col>

      {/* Left side - Static background */}
      <Col className="auth-layout__left-side" md={12} lg={15} xl={15} sm={0} xs={0}>
        <div
          className="auth-layout__left-side-bg"
          style={{ backgroundImage: `url(${BgImage})` }}
        />
      </Col>
    </Row>
  );
};

export default AuthLayout;
