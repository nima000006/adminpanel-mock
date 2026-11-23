import { Navigate } from "react-router";

import "./_login.scss";
import { SIGN_IN_FIRST_PAGE_ROUTE } from "@infra/router/routes/public";
const Login = () => {
  return <Navigate to={SIGN_IN_FIRST_PAGE_ROUTE} />;
  // return (
  //   <div className="login-main-container">
  //     <div className="login-background-container">
  //       <img src={BackgroundImage} alt="background-image" />
  //     </div>
  //     <LoginMain />
  //   </div>
  // );
};

export default Login;
