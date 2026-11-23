import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import {
  UserListByAdvanceFilterRequest,
  UserListByAdvanceFilterResponse,
} from "@pages/management/_shared/@types/@advanceFilterEmployeesTypes";
import {
  ManagementAllStaffInfoListResponse,
  ManagementAllStaffTypesInfoListsResponse,
} from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/@types/@managementUserAllCustomerDetails";
import { ManagementAllAddressInfoResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsInfo/helper/components/ManagementAllDetailsAddressInfo/@types/@managementAllDetailsAddressInfo";
import {
  ManagementAllEstemAmoozeshyarResponse,
  ManagementAllUpdateStudentInfoRequest,
} from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsInfo/helper/components/ManagementAllDetailsEducationInfo/@types/@managementAllEstemAmoozeshyar";
import { ManagementAllStaffInfoIdentityInfoListResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsInfo/helper/components/ManagementAllDetailsInfoIdentityInfo/@types/@managementAllDetailsInfoIdentityInfo";
import { ManagementAllRolesCustomerResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementAllDetailsRolesUserInfo/@types/@managementAllRolesCustomer";
import { ManagementAllListsOfStaffResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/@types/@managementAllListsOfStaff";
import { ManagementAllEditRoleOfStaffRequest } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementAllEditRoleOfStaff";
import { ManagementUsersAllStaffInfoResponse } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementUsersAllStaffInfo";
import {
  ManagementMyStaffInfoListResponse,
  ManagementMyStaffTypesInfoListsResponse,
} from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/@types/@managementUserMyCustomerDetails";
import { ManagementMyAddressInfoResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementMyDetailsInfo/helper/components/ManagementMyDetailsAddressInfo/@types/@managementMyDetailsAddressInfo";
import {
  ManagementMyEstemAmoozeshyarResponse,
  ManagementMyUpdateStudentInfoRequest,
} from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementMyDetailsInfo/helper/components/ManagementMyDetailsEducationInfo/@types/@managementMyEstemAmoozeshyar";
import { ManagementMyStaffInfoIdentityInfoListResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementMyDetailsInfo/helper/components/ManagementMyDetailsInfoIdentityInfo/@types/@managementMyDetailsInfoIdentityInfo";
import { ManagementMyRolesCustomerResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementMyDetailsRolesUserInfo/@types/@managementMyRolesCustomer";
import { ManagementMyListsOfStaffResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/@types/@managementMyListsOfStaff";
import { ManagementMyEditRoleOfStaffRequest } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementMyEditRoleOfStaff";
import { ManagementUsersMyStaffInfoResponse } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementUsersMyStaffInfo";
import {
  ManagementUsersAllAdminListAdvanceFilterRequest,
  ManagementUsersAllAdminListAdvanceFilterResponse,
  ManagementUsersAllAdminListResponse,
} from "@pages/management/AdminsList/AllAdminsList/@types/@managementsUserAllAdminListTypes";
import {
  ManagementUsersMyAdminListAdvanceFilterRequest,
  ManagementUsersMyAdminListAdvanceFilterResponse,
  ManagementUsersMyAdminListResponse,
} from "@pages/management/AdminsList/MyAdminsList/@types/@managementsUserMyAdminListTypes";
import { ManagementAllCustomerDataResponse } from "@pages/management/CustomersList/AllCustomersList/@types/@managementUsersAllCustomersListTypes";
import {
  ManagementMyCustomerListDataResponse,
  MyUserListByAdvanceFilterRequest,
  MyUserListByAdvanceFilterResponse,
} from "@pages/management/CustomersList/MyCustomerList/@types/@managementUsersMyCustomersListTypes";
import {
  ManagementUsersAllEmployeesListResponse,
  AllEmployeeListByAdvanceFilterRequest,
  AllEmployeeListByAdvanceFilterResponse,
} from "@pages/management/EmployeesList/AllEmployeesList/@types/@managementUsersAllEmployeesListTypes";
import {
  ManagementUsersMyEmployeesListResponse,
  MyEmployeeListByAdvanceFilterRequest,
  MyEmployeeListByAdvanceFilterResponse,
} from "@pages/management/EmployeesList/MyEmployeesList/@types/@managementUsersMyEmployeesListTypes";
import {
  ManagementStudentDataResponse,
  StudentListByAdvanceFilterRequest,
  StudentListByAdvanceFilterResponse,
} from "@pages/management/StudentList/AllStudentList/@types/@managementAllStudentsListTypes";
import {
  MyStudentListByAdvanceFilterRequest,
  MyStudentListByAdvanceFilterResponse,
} from "@pages/management/StudentList/MyStudentList/@types/@managementMyStudentsListTypes";

import { authenticationApi } from "../../authenticationApi";

export const usersListApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    ManagementUsersAllCustomersLists: builder.query<
      ManagementAllCustomerDataResponse,
      { pageNo: number; pageSize: number; username?: string }
    >({
      query: (params) => ({
        url: `/admin/users/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementUsersMyCustomersLists: builder.query<
      ManagementMyCustomerListDataResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/manager/users/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementAllStudentsLists: builder.query<
      ManagementStudentDataResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/admin/students/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementMyStudentsLists: builder.query<
      ManagementStudentDataResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/manager/students/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementUsersAllAdminsLists: builder.query<
      ManagementUsersAllAdminListResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/admin/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementUsersAllAdminsListsAdvanceFilter: builder.query<
      ManagementUsersAllAdminListAdvanceFilterResponse,
      ManagementUsersAllAdminListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/admin/advance-search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    ManagementUsersMyAdminsLists: builder.query<
      ManagementUsersMyAdminListResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/manager/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementUsersMyAdminsListsAdvanceFilter: builder.query<
      ManagementUsersMyAdminListAdvanceFilterResponse,
      ManagementUsersMyAdminListAdvanceFilterRequest
    >({
      query: (params) => {
        return {
          url: `/manager/advance-search${createQueryString(params)}`,
          method: "GET",
        };
      },
    }),
    ManagementUsersAllEmployeesLists: builder.query<
      ManagementUsersAllEmployeesListResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/admin/employees/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementUsersMyEmployeesLists: builder.query<
      ManagementUsersMyEmployeesListResponse,
      { pageNo: number; pageSize: number }
    >({
      query: (params) => ({
        url: `/manager/employees/all${createQueryString(params)}`,
        method: "GET",
      }),
    }),

    ManagementUsersAllStaffInfo: builder.query<
      ManagementUsersAllStaffInfoResponse,
      { staffId: number }
    >({
      query: ({ staffId }) => ({
        url: `/admin/admin-staff-info/${staffId}`,
        method: "GET",
      }),
    }),

    ManagementUsersMyStaffInfo: builder.query<
      ManagementUsersMyStaffInfoResponse,
      { staffId: number }
    >({
      query: ({ staffId }) => ({
        url: `/manager/admin-staff-info/${staffId}`,
        method: "GET",
      }),
    }),

    //! Users details
    ManagementAllStaffInfoLists: builder.query<
      ManagementAllStaffInfoListResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/admin/user-staffs-info/${userId}`,
        method: "GET",
      }),
    }),
    ManagementMyStaffInfoLists: builder.query<
      ManagementMyStaffInfoListResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/manager/user-staffs-info/${userId}`,
        method: "GET",
      }),
    }),
    ManagementAllStaffInfoIdentityInfoLists: builder.query<
      ManagementAllStaffInfoIdentityInfoListResponse,
      { staffId: number | undefined }
    >({
      query: ({ staffId }) => ({
        url: `/admin/user-info/${staffId}`,
        method: "GET",
      }),
      providesTags: [{ type: "tag/authentication", id: "all-staffId" }],
    }),
    ManagementMyStaffInfoIdentityInfoLists: builder.query<
      ManagementMyStaffInfoIdentityInfoListResponse,
      { staffId: number | undefined }
    >({
      query: ({ staffId }) => ({
        url: `/manager/user-info/${staffId}`,
        method: "GET",
      }),
      providesTags: [{ type: "tag/authentication", id: "staffId" }],
    }),
    ManagementAllAddressInfo: builder.query<
      ManagementAllAddressInfoResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/admin/address/${userId}`,
        method: "GET",
      }),
    }),
    ManagementMyAddressInfo: builder.query<
      ManagementMyAddressInfoResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/manager/address/${userId}`,
        method: "GET",
      }),
    }),
    ManagementAllStaffTypesInfoLists: builder.query<
      ManagementAllStaffTypesInfoListsResponse,
      { userId: number | undefined; staffTypeId: number | undefined }
    >({
      query: ({ userId, staffTypeId }) => ({
        url: `/admin/user/${userId}/staff-types/${staffTypeId}`,
        method: "GET",
      }),
    }),
    ManagementMyStaffTypesInfoLists: builder.query<
      ManagementMyStaffTypesInfoListsResponse,
      { userId: number | undefined; staffTypeId: number | undefined }
    >({
      query: ({ userId, staffTypeId }) => ({
        url: `/manager/user/${userId}/staff-types/${staffTypeId}`,
        method: "GET",
      }),
    }),
    ManagementAllListsOfStaff: builder.query<
      ManagementAllListsOfStaffResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/admin/user/${userId}/staffs`,
        method: "GET",
      }),
    }),
    ManagementMyListsOfStaff: builder.query<
      ManagementMyListsOfStaffResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/manager/user/${userId}/staffs`,
        method: "GET",
      }),
    }),
    ManagementAllEditRoleOfStaff: builder.mutation<
      void,
      ManagementAllEditRoleOfStaffRequest
    >({
      query: (body) => ({
        url: `/admin/staff/roles`,
        method: "PUT",
        body: body,
      }),
    }),
    ManagementMyEditRoleOfStaff: builder.mutation<
      void,
      ManagementMyEditRoleOfStaffRequest
    >({
      query: (body) => ({
        url: `/manager/staff/roles`,
        method: "PUT",
        body: body,
      }),
    }),
    ManagementAllRolesCustomer: builder.query<
      ManagementAllRolesCustomerResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/admin/user/${userId}/roles`,
        method: "GET",
      }),
    }),
    ManagementMyRolesCustomer: builder.query<
      ManagementMyRolesCustomerResponse,
      { userId: number }
    >({
      query: ({ userId }) => ({
        url: `/manager/user/${userId}/roles`,
        method: "GET",
      }),
    }),
    ManagementAllEstemAmoozeshyar: builder.query<
      ManagementAllEstemAmoozeshyarResponse,
      { studentNumber: string }
    >({
      query: (params) => ({
        url: `/admin/inquiries/student-number${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementMyEstemAmoozeshyar: builder.query<
      ManagementMyEstemAmoozeshyarResponse,
      { studentNumber: string }
    >({
      query: (params) => ({
        url: `/manager/inquiries/student-number${createQueryString(params)}`,
        method: "GET",
      }),
    }),
    ManagementAllUpdateEstelam: builder.mutation<void, { staffId: string }>({
      query: ({ staffId }) => ({
        url: `/admin/update/student-inquiry/${staffId}`,
        method: "PUT",
      }),
    }),
    ManagementAllUpdateStudentInfo: builder.mutation<
      void,
      ManagementAllUpdateStudentInfoRequest
    >({
      query: ({ studentId, reqBody }) => ({
        url: `/admin/students/${studentId}`,
        method: "PUT",
        body: reqBody,
      }),
      invalidatesTags: [{ type: "tag/authentication", id: "all-staffId" }],
    }),
    ManagementMyUpdateStudentInfo: builder.mutation<
      void,
      ManagementMyUpdateStudentInfoRequest
    >({
      query: ({ studentId, reqBody }) => ({
        url: `/manager/students/${studentId}`,
        method: "PUT",
        body: reqBody,
      }),
      invalidatesTags: [{ type: "tag/authentication", id: "staffId" }],
    }),
    ManagementMyUpdateEstelam: builder.mutation<void, { staffId: string }>({
      query: ({ staffId }) => ({
        url: `/manager/update/student-inquiry/${staffId}`,
        method: "PUT",
      }),
    }),

    //! User Advance Filter
    UserListByAdvanceFilter: builder.mutation<
      UserListByAdvanceFilterResponse,
      UserListByAdvanceFilterRequest
    >({
      query: (data) => ({
        url: "/admin/users/advance-filter",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    MyUserListByAdvanceFilter: builder.mutation<
      MyUserListByAdvanceFilterResponse,
      MyUserListByAdvanceFilterRequest
    >({
      query: (data) => ({
        url: "/manager/users/advance-filter",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    //! All Student Advance Filter
    StudentListByAdvanceFilter: builder.mutation<
      StudentListByAdvanceFilterResponse,
      StudentListByAdvanceFilterRequest
    >({
      query: (data) => ({
        url: "admin/student/advance-search",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${getToken()}`,
        },
      }),
    }),

    //! My Student Advance Filter
    MyStudentListByAdvanceFilter: builder.mutation<
      MyStudentListByAdvanceFilterResponse,
      MyStudentListByAdvanceFilterRequest
    >({
      query: (data) => ({
        url: "manager/student/advance-search",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    //! All employee Advance Filter
    AllEmployeeListByAdvanceFilter: builder.mutation<
      AllEmployeeListByAdvanceFilterResponse,
      AllEmployeeListByAdvanceFilterRequest
    >({
      query: (data) => ({
        url: "admin/employee/advance-search",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    //! My employee Advance Filter
    MyEmployeeListByAdvanceFilter: builder.mutation<
      MyEmployeeListByAdvanceFilterResponse,
      MyEmployeeListByAdvanceFilterRequest
    >({
      query: (data) => ({
        url: "manager/employee/advance-search",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});
export const {
  useLazyManagementUsersAllCustomersListsQuery,
  useLazyManagementUsersMyCustomersListsQuery,
  useLazyManagementAllStudentsListsQuery,
  useLazyManagementMyStudentsListsQuery,
  useLazyManagementUsersAllAdminsListsQuery,
  useLazyManagementUsersAllAdminsListsAdvanceFilterQuery,
  useLazyManagementUsersMyAdminsListsQuery,
  useLazyManagementUsersAllEmployeesListsQuery,
  useLazyManagementUsersMyEmployeesListsQuery,
  useStudentListByAdvanceFilterMutation,
  useAllEmployeeListByAdvanceFilterMutation,
  useMyEmployeeListByAdvanceFilterMutation,
  useLazyManagementAllStaffInfoListsQuery,
  useLazyManagementMyStaffInfoListsQuery,
  useLazyManagementAllStaffTypesInfoListsQuery,
  useLazyManagementMyStaffTypesInfoListsQuery,
  useLazyManagementAllStaffInfoIdentityInfoListsQuery,
  useLazyManagementMyStaffInfoIdentityInfoListsQuery,
  useLazyManagementAllAddressInfoQuery,
  useLazyManagementMyAddressInfoQuery,
  useUserListByAdvanceFilterMutation,
  useMyUserListByAdvanceFilterMutation,
  useLazyManagementAllListsOfStaffQuery,
  useLazyManagementUsersMyAdminsListsAdvanceFilterQuery,
  useLazyManagementMyListsOfStaffQuery,
  useLazyManagementAllRolesCustomerQuery,
  useLazyManagementMyRolesCustomerQuery,
  useManagementAllEditRoleOfStaffMutation,
  useManagementMyEditRoleOfStaffMutation,
  useLazyManagementAllEstemAmoozeshyarQuery,
  useLazyManagementMyEstemAmoozeshyarQuery,
  useLazyManagementUsersAllStaffInfoQuery,
  useLazyManagementUsersMyStaffInfoQuery,
  useManagementAllUpdateEstelamMutation,
  useManagementMyUpdateEstelamMutation,
  useManagementAllUpdateStudentInfoMutation,
  useManagementMyUpdateStudentInfoMutation,
  useMyStudentListByAdvanceFilterMutation,
} = usersListApis;
