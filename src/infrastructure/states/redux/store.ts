import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { accountingApi } from "./Apis/accountingApi";
import { appVersion } from "./Apis/appVersion";
import { authApi } from "./Apis/authApi";
import { authenticationApi } from "./Apis/authenticationApi";
import { basicInformationApi } from "./Apis/basicInformationApi";
import { businessApi } from "./Apis/businessApi";
import { cateringApi } from "./Apis/cateringApi";
import { committeeApi } from "./Apis/committeeApi";
import { dormApi } from "./Apis/dormApi";
import { dormGeneralApi } from "./Apis/dormApiGeneral";
import { dormitoryApi } from "./Apis/dormitoryApi";
import { financialApi } from "./Apis/financialApi";
import { foodApi } from "./Apis/foodApi";
import { homeApi } from "./Apis/homeApi";
import { insuranceApi } from "./Apis/insurance";
import { internationalApi } from "./Apis/internationalApi";
import { invoiceApi } from "./Apis/invoiceApi";
import { myDoctorApi } from "./Apis/myDoctorApi";
import { myDoctorV2Api } from "./Apis/myDoctorV2Api";
import { notificationApi } from "./Apis/notificationApi";
import { roomApi } from "./Apis/roomApi";
import { shopApi } from "./Apis/shop";
import { studentApi } from "./Apis/studentApi";
import { ticketApi } from "./Apis/ticketApi";
import { ticketingApi } from "./Apis/ticketingApi";
import { walletApi } from "./Apis/walletApi";
import AuthSlice from "./Slices/AuthSlice";
import GeneralSlice from "./Slices/GeneralSlice";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  [financialApi.reducerPath]: financialApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [committeeApi.reducerPath]: committeeApi.reducer,
  [insuranceApi.reducerPath]: insuranceApi.reducer,
  [foodApi.reducerPath]: foodApi.reducer,
  [dormApi.reducerPath]: dormApi.reducer,
  [dormGeneralApi.reducerPath]: dormGeneralApi.reducer,
  [appVersion.reducerPath]: appVersion.reducer,
  [internationalApi.reducerPath]: internationalApi.reducer,
  [myDoctorApi.reducerPath]: myDoctorApi.reducer,
  [myDoctorV2Api.reducerPath]: myDoctorV2Api.reducer,
  [basicInformationApi.reducerPath]: basicInformationApi.reducer,
  [businessApi.reducerPath]: businessApi.reducer,
  [accountingApi.reducerPath]: accountingApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [ticketingApi.reducerPath]: ticketingApi.reducer,
  [cateringApi.reducerPath]: cateringApi.reducer,
  [dormitoryApi.reducerPath]: dormitoryApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
};

const apiMiddlewares = [
  homeApi.middleware,
  authApi.middleware,
  authenticationApi.middleware,
  studentApi.middleware,
  roomApi.middleware,
  ticketApi.middleware,
  financialApi.middleware,
  notificationApi.middleware,
  committeeApi.middleware,
  insuranceApi.middleware,
  foodApi.middleware,
  dormApi.middleware,
  dormGeneralApi.middleware,
  appVersion.middleware,
  internationalApi.middleware,
  myDoctorApi.middleware,
  myDoctorV2Api.middleware,
  basicInformationApi.middleware,
  businessApi.middleware,
  accountingApi.middleware,
  walletApi.middleware,
  invoiceApi.middleware,
  ticketingApi.middleware,
  cateringApi.middleware,
  dormitoryApi.middleware,
  shopApi.middleware,
];

const rootReducer = combineReducers({
  ...apiReducers,
  auth: AuthSlice,
  general: GeneralSlice,
});

export const store = configureStore({
  devTools: import.meta.env.VITE_URL_NAME === "LOCAL",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignored action types for performance
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Ignored field paths in all actions
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        // Ignored paths in the state
        ignoredPaths: ["items.dates"],
      },
    }).concat([...apiMiddlewares]),
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

type AppStore = typeof store;
type AppDispatch = AppStore["dispatch"];
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectAuth = (state: RootState) => {
  return state.auth;
};

export const selectGeneral = (state: RootState) => {
  return state.general;
};
