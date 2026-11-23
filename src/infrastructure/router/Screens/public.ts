import { lazy } from "react";

import {
  CHANGE_NUMBER_FIRST_PAGE_ROUTE,
  CHANGE_NUMBER_SECOND_PAGE_ROUTE,
  CHANGE_NUMBER_THIRD_PAGE_ROUTE,
  FORGOT_PASSWORD_FIRST_PAGE_ROUTE,
  FORGOT_PASSWORD_FOURTH_PAGE_ROUTE,
  FORGOT_PASSWORD_SECOND_PAGE_ROUTE,
  FORGOT_PASSWORD_THIRD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_FIFTH_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  REGISTER_FOURTH_PAGE_ROUTE,
  REGISTER_SECOND_PAGE_ROUTE,
  REGISTER_SIXTH_PAGE_ROUTE,
  REGISTER_THIRD_PAGE_ROUTE,
  SIGN_IN_FIFTH_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
  SIGN_IN_FOURTH_PAGE_ROUTE,
  SIGN_IN_SECOND_PAGE_ROUTE,
  SIGN_IN_THIRD_PAGE_ROUTE,
} from "../routes/public";

const Login = lazy(() => import("../../../pages/Auth/Login/Login"));

//! REGISTER PAGES
const RegisterFirstPage = lazy(
  () => import("../../../pages/Auth/Register/FirstPage/RegisterFirstPage")
);
const RegisterSecondPage = lazy(
  () => import("../../../pages/Auth/Register/SecondPage/RegisterSecondPage")
);
const RegisterThirdPage = lazy(
  () => import("../../../pages/Auth/Register/ThirdPage/RegisterThirdPage")
);
const RegisterFourthPage = lazy(
  () => import("../../../pages/Auth/Register/FourthPage/RegisterFourthPage")
);
const RegisterFifthPage = lazy(
  () => import("../../../pages/Auth/Register/FifthPage/RegisterFifthPage")
);
const RegisterSixthPage = lazy(
  () => import("../../../pages/Auth/Register/SixthPage/RegisterSixthPage")
);

//! SIGN IN PAGES

const SignInFirstPage = lazy(
  () => import("../../../pages/Auth/SignIn/FirstPage/SignInFirstPage")
);
const SignInSecondPage = lazy(
  () => import("../../../pages/Auth/SignIn/SecondPage/SignInSecondPage")
);
const SignInThirdPage = lazy(
  () => import("../../../pages/Auth/SignIn/ThirdPage/SignThirdPage")
);
const SignInFourthPage = lazy(
  () => import("../../../pages/Auth/SignIn/FourthPage/SignInFourthPage")
);
const SignInFifthPage = lazy(
  () => import("../../../pages/Auth/SignIn/FifthPage/SignInFifthPage")
);

//! FORGET PASSWORD PAGES

const ForgetPasswordFirstPage = lazy(
  () => import("../../../pages/Auth/ForgetPassword/FirstPage/ForgetPasswordFirstPage")
);
const ForgetPasswordSecondPage = lazy(
  () => import("../../../pages/Auth/ForgetPassword/SecondPage/ForgetPasswordSecondPage")
);
const ForgetPasswordThirdPage = lazy(
  () => import("../../../pages/Auth/ForgetPassword/ThirdPage/ForgetPasswordThirdPage")
);
const ForgetPasswordFourthPage = lazy(
  () => import("../../../pages/Auth/ForgetPassword/FourthPage/ForgetPasswordFourthPage")
);
//! CHANGE NUMBER PAGES

const ChangeNumberFirstPage = lazy(
  () => import("../../../pages/Auth/ChangePhoneNumber/FirstPage/ChangeNumberFirstPage")
);
const ChangeNumberSecondPage = lazy(
  () => import("../../../pages/Auth/ChangePhoneNumber/SecondPage/ChangeNumberSecondPage")
);
const ChangeNumberThirdPage = lazy(
  () => import("../../../pages/Auth/ChangePhoneNumber/ThirdPage/ChangeNumberThirdPage")
);
export const PublicScreens = [
  {
    component: Login,
    path: LOGIN_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RegisterFirstPage,
    path: REGISTER_FIRST_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RegisterSecondPage,
    path: REGISTER_SECOND_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RegisterThirdPage,
    path: REGISTER_THIRD_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RegisterFourthPage,
    path: REGISTER_FOURTH_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RegisterFifthPage,
    path: REGISTER_FIFTH_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: RegisterSixthPage,
    path: REGISTER_SIXTH_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: SignInFirstPage,
    path: SIGN_IN_FIRST_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: SignInSecondPage,
    path: SIGN_IN_SECOND_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: SignInThirdPage,
    path: SIGN_IN_THIRD_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: SignInFourthPage,
    path: SIGN_IN_FOURTH_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: SignInFifthPage,
    path: SIGN_IN_FIFTH_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ForgetPasswordFirstPage,
    path: FORGOT_PASSWORD_FIRST_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ForgetPasswordSecondPage,
    path: FORGOT_PASSWORD_SECOND_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ForgetPasswordThirdPage,
    path: FORGOT_PASSWORD_THIRD_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ForgetPasswordFourthPage,
    path: FORGOT_PASSWORD_FOURTH_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ChangeNumberFirstPage,
    path: CHANGE_NUMBER_FIRST_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ChangeNumberSecondPage,
    path: CHANGE_NUMBER_SECOND_PAGE_ROUTE,
    isBgContentCustom: true,
  },
  {
    component: ChangeNumberThirdPage,
    path: CHANGE_NUMBER_THIRD_PAGE_ROUTE,
    isBgContentCustom: true,
  },
];
