import { Form, Input, Spin } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";

import UniLogo from "../../../assets/icons/UniLogo";
import { farsiNumberToEnglish } from "../../../infrastructure/helpers/utils";
import { useLoginUserMutation } from "../../../infrastructure/states/redux/Apis/authApi";
import { setLoginResponse } from "../../../infrastructure/states/redux/Apis/models/authApi.model";
import { CUSTOM_REQUIRED_RULE } from "../../../infrastructure/validation/validationSchema";
import {
  GENERAL_ERROR_MESSAGE,
  YOU_DONT_HAVE_PERMISSION_TO_LOGIN,
} from "../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomInput from "../../CustomInputs/CustomInput/CustomInput";
import Div from "../../Renderers/Div/Div";
import "./_loginMain.scss";

type LoginFail = {
  status: number;
  data: {
    status: number;
    msg: string;
    data: null;
  };
};

const LoginMain = () => {
  const location = useLocation();

  const { login } = useAuth();
  const originalPathName = location?.state?.originalPathName;

  //! Login API for checking the user's "username" and "password"
  const [loginUser, { isLoading }] = useLoginUserMutation();

  //! Check token is valid by using a saved token in the local storage
  // const { isLoading: isAuthLoading, isTokenValid, token } = UseAuth();

  //! handleSubmit
  const handleSubmit = (values: { username: string; password: string }) => {
    if (values?.username && values?.password) {
      loginUser({
        username: farsiNumberToEnglish(values?.username),
        password: values?.password,
      })
        .unwrap()
        .then(onLoginUserSuccess)
        .catch(onLoginFail);
    }
  };

  // Handle login failure
  const onLoginFail = async (error: LoginFail) => {
    // wrong user or pass
    if (error?.status === 400) {
      return toast.error(error?.data?.msg ? error?.data?.msg : GENERAL_ERROR_MESSAGE, {
        toastId: error?.data?.msg ? error?.data?.msg : GENERAL_ERROR_MESSAGE,
      });
    }

    // status 401:forbidden:not enough permission
    if (error?.data?.status === 401) {
      return toast.error(YOU_DONT_HAVE_PERMISSION_TO_LOGIN, {
        toastId: YOU_DONT_HAVE_PERMISSION_TO_LOGIN,
      });
    } else {
      return toast.error(GENERAL_ERROR_MESSAGE, {
        toastId: GENERAL_ERROR_MESSAGE,
      });
    }
  };

  // Handle successful login
  const onLoginUserSuccess = async (info: setLoginResponse) => {
    if (info?.status === 200) {
      if (
        info?.data &&
        info?.data?.access_token &&
        typeof info.data?.access_token === "string"
      ) {
        login({
          token: info?.data?.access_token,
          refreshToken: info?.data?.refresh_token,
          originalPathName,
          needNavigate: true,
        });
        // dispatch(setLocalUser(info?.data?.access_token));
        // setLocalStorage("token", info.data?.access_token);
      }
      // toast.success(SUCCESS_ENTERING_MESSAGE, {
      //   toastId: SUCCESS_ENTERING_MESSAGE,
      // });
      // navigate(originalPathName ? originalPathName : LANDING_PAGE_ROUTE, {
      //   replace: true,
      //   state: null,
      // });
    }
  };

  // Check token validity on component mount
  // useEffect(() => {
  //   if (isTokenValid) {
  //     toast.info(YOU_HAVE_ALREADY_ENTERED_MESSAGE, {
  //       toastId: YOU_HAVE_ALREADY_ENTERED_MESSAGE,
  //     });
  //     if (token) {
  //       dispatch(setLocalUser(token));
  //     }
  //     navigate(originalPathName ? originalPathName : LANDING_PAGE_ROUTE);
  //   }
  // }, [isTokenValid, originalPathName, token]);

  return (
    <Form onFinish={handleSubmit}>
      <div className="login-form-container">
        <div className="login-form-input-section-container">
          <div className="uni-logo-container">
            <UniLogo />
          </div>
          <Div className="login-form-input-section">
            <CustomInput
              type="text"
              label="نام کاربری"
              rules={[CUSTOM_REQUIRED_RULE("لطفا نام کاربری را وارد نمائید")]}
              name="username"
              placeholder="نام کاربری خود را اینجا وارد نمایید"
              size="large"
              autoComplete="on"
            />
            <Form.Item
              rules={[CUSTOM_REQUIRED_RULE("لطفا رمز عبور را وارد نمائید")]}
              name="password"
              label="رمز عبور"
              className="vertical-label password-container"
            >
              <Input.Password
                placeholder="رمز عبور"
                size="large"
                autoComplete="on"
                // label="رمز عبور"
                iconRender={(visible) =>
                  visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                }
              />
            </Form.Item>
          </Div>
          <div className="btn-container">
            <Spin spinning={isLoading}>
              <button className={"login-submit-btn blue-background"} disabled={isLoading}>
                ورود
              </button>
            </Spin>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginMain;
