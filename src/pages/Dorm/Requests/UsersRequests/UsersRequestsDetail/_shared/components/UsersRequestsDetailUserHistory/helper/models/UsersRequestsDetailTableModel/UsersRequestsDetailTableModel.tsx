import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import {
  DORM_USERS_REQUESTS_DETAIL_CANCELLATION_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_CANCELLED_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_CONFIRMED_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_DELIVERED_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_PENDING_LIST_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_PENDING_PAYMENT_PAGE_ROUTE,
  DORM_USERS_REQUESTS_DETAIL_PENDING_REVIEW_PAGE_ROUTE,
} from "@infra/router/routes/dorm";

import {
  requestNumber,
  requestType,
  categoryDormitory,
  categoryDeliverPlan,
  categorySchedulingType,
  categoryReservationType,
  createDate,
  updateDate,
  paymentStatus,
  createDateWait,
  TableModelId,
} from "./utils/usersRequestsTableDetailModel";
import { DormUserRecordsList } from "../../../@types/@usersRequestsDetailUserHistory";
const UsersRequestsDetailTableModel = () => {
  return [
    requestNumber,
    requestType,
    categoryDormitory,
    categoryDeliverPlan,
    categorySchedulingType,
    categoryReservationType,
    createDate,
    updateDate,
    paymentStatus,
    createDateWait,
    {
      ...TableModelId,
      render: (value: string, records: DormUserRecordsList) => {
        return (
          <Link
            to={
              records?.statusId === 1 // backend said
                ? {
                    pathname: DORM_USERS_REQUESTS_DETAIL_PENDING_REVIEW_PAGE_ROUTE,
                    search: makeSearchParams({
                      id: value,
                      dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                      requestType: records?.AssociationCategoryRequestType_id,
                      reservationTypeId:
                        records?.AssociationCategoryDeliverPlan_reservationTypeId,
                      tariffId: records?.AssociationCategoryDeliverPlan_priceListId,
                      admissionId: records?.deliverPlanId,
                      residenceTitle:
                        records?.AssociationCategoryDeliverPlan_AssociationDormitory_title,
                      userNationalCode:
                        records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                      roomId: records?.AssociationBed_roomId,
                      tab: "1",
                      resetTab: "true",
                    }),
                  }
                : records?.statusId === 2
                  ? {
                      pathname: DORM_USERS_REQUESTS_DETAIL_PENDING_PAYMENT_PAGE_ROUTE,
                      search: makeSearchParams({
                        id: value,
                        dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                        reservationTypeId:
                          records?.AssociationCategoryDeliverPlan_reservationTypeId,
                        admissionId: records?.deliverPlanId,
                        userNationalCode:
                          records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                        roomId: records?.AssociationBed_roomId,
                        tab: "1",
                        resetTab: "true",
                      }),
                    }
                  : records?.statusId === 8
                    ? {
                        pathname: DORM_USERS_REQUESTS_DETAIL_CONFIRMED_PAGE_ROUTE,
                        search: makeSearchParams({
                          id: value,
                          dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                          reservationTypeId:
                            records?.AssociationCategoryDeliverPlan_reservationTypeId,
                          userNationalCode:
                            records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                          roomId: records?.AssociationBed_roomId,
                          admissionId: records?.deliverPlanId,
                          tab: "1",
                          resetTab: "true",
                        }),
                      }
                    : records?.statusId === 9
                      ? {
                          pathname: DORM_USERS_REQUESTS_DETAIL_DELIVERED_PAGE_ROUTE,
                          search: makeSearchParams({
                            id: value,
                            dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                            userNationalCode:
                              records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                            roomId: records?.AssociationBed_roomId,
                            admissionId: records?.deliverPlanId,
                            tab: "1",
                            resetTab: "true",
                          }),
                        }
                      : records?.cancellationRequestStatus === 1 ||
                          records?.cancellationRequestStatus === 2 ||
                          records?.cancellationRequestStatus === 3
                        ? {
                            pathname: DORM_USERS_REQUESTS_DETAIL_CANCELLATION_PAGE_ROUTE,
                            search: makeSearchParams({
                              id: value,
                              dormId: records?.AssociationCategoryDeliverPlan_dormitoryId,
                              userNationalCode:
                                records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                              cancellationStatus: records?.cancellationRequestStatus,
                              roomId: records?.AssociationBed_roomId,
                              tab: "1",
                              resetTab: "true",
                            }),
                          }
                        : records?.statusId === 3 ||
                            records?.statusId === 5 ||
                            records?.statusId === 7
                          ? {
                              pathname: DORM_USERS_REQUESTS_DETAIL_CANCELLED_PAGE_ROUTE,
                              search: makeSearchParams({
                                id: value,
                                dormId:
                                  records?.AssociationCategoryDeliverPlan_dormitoryId,
                                userNationalCode:
                                  records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                                tab: "1",
                                resetTab: "true",
                              }),
                            }
                          : records?.statusId === 6
                            ? {
                                pathname:
                                  DORM_USERS_REQUESTS_DETAIL_PENDING_LIST_PAGE_ROUTE,
                                search: makeSearchParams({
                                  id: value,
                                  dormId:
                                    records?.AssociationCategoryDeliverPlan_dormitoryId,
                                  tariffId:
                                    records?.AssociationCategoryDeliverPlan_priceListId,
                                  admissionId: records?.deliverPlanId,
                                  residenceTitle:
                                    records?.AssociationCategoryDeliverPlan_AssociationDormitory_title,
                                  userNationalCode:
                                    records?.AssociationCustomer_AssociationCustomerUser_nationalCode,
                                  tab: "1",
                                  resetTab: "true",
                                }),
                              }
                            : {}
            }
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default UsersRequestsDetailTableModel;
