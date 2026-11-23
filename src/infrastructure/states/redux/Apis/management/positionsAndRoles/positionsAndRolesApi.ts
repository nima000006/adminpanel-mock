import { createQueryString } from "@infra/helpers/GeneralHelpers/buildQueryString/buildQueryString";
import { ManagementOverRideUsersRolesRequest } from "@pages/management/_shared/UserDetails/ManagementAllInfoDetails/helper/components/ManagementUserAllManagementDetailsInfo/helper/components/AllManagementDetailsEditRoleDrawerContent/@types/@managementAllEditRoleOfStaff";
import { MyManagementOverRideUsersRolesRequest } from "@pages/management/_shared/UserDetails/ManagementMyInfoDetails/helper/components/ManagementUserMyManagementDetailsInfo/helper/components/MyManagementDetailsEditRoleDrawerContent/@types/@managementMyEditRoleOfStaff";
import { ManagementListOfUserWithRolesRequest } from "@pages/management/AdminsList/AllAdminsList/@types/@managementsUserAllAdminListTypes";
import {
  AllManagementListOfUserWithRolesRequest,
  AllManagementListOfUserWithRolesResponse,
} from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleDetail/@types/@allPositionsAndRolesRoleDetail";
import { AdminDeleteRoleRequest } from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleDetail/helper/components/RemoveUsersFromAllRoleContentDrawer/@types/@removeUsersFromAllRoleContentDrawerPropsTypes";
import { AllManagementRolesGroupsResponse } from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleGroupList/@types/@allPositionsAndRolesRoleGroupList";
import {
  AllManagementOverRideOfUserGroupRequest,
  AllManagementOverRideOfUserGroupResponse,
} from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleGroupList/helper/components/drawers/AllRolesOfGroups/@types/@allRolesOfGroupsTypes";
import {
  AllManagementUpdateOfUserGroupRequest,
  AllManagementUpdateOfUserGroupResponse,
} from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleGroupList/helper/components/drawers/ModifyAllRoleGroupContent/types/@modifyAllRoleGroupContent";
import { AllManagementRolesResponse } from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleList/@types/AllPositionsAndRolesRoleListProps";
import {
  AllManagementCreateOfUserRequest,
  AllManagementCreateOfUserResponse,
  AllManagementUpdateOfUserRequest,
  AllManagementUpdateOfUserResponse,
} from "@pages/management/PositionsAndRoles/AllPositionsAndRolesList/helper/components/AllPositionsAndRolesRoleList/helper/components/ModifyAllRoleContent/@types/@modifyAllRoleContent";
import {
  MyManagementListOfUserWithRolesRequest,
  MyManagementListOfUserWithRolesResponse,
} from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleDetail/@types/@myPositionsAndRolesRoleDetail";
import { MyManagementRolesGroupsResponse } from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleGroupList/@types/@MypositionsAndRolesRoleGroupList";
import {
  MyManagementUpdateOfUserGroupRequest,
  MyManagementUpdateOfUserGroupResponse,
} from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleGroupList/helper/components/drawers/ModifyMyRoleGroupContent/types/@modifyMyRoleGroupContent";
import {
  MyManagementOverRideOfUserGroupRequest,
  MyManagementOverRideOfUserGroupResponse,
} from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleGroupList/helper/components/drawers/MyRolesOfGroups/@types/@myRolesOfGroupsTypes";
import { MyManagementRolesResponse } from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleList/@types/MyPositionsAndRolesRoleListProps";
import {
  MyManagementUpdateOfUserRequest,
  MyManagementUpdateOfUserResponse,
} from "@pages/management/PositionsAndRoles/MyPositionsAndRolesList/helper/components/MyPositionsAndRolesRoleList/helper/components/ModifyMyRoleContent/@types/@modifyMyRoleContent";

import { authenticationApi } from "../../authenticationApi";

export const managementRolesApis = authenticationApi.injectEndpoints({
  endpoints: (builder) => ({
    AllManagementRolesLists: builder.query<AllManagementRolesResponse, void>({
      query: () => ({
        url: `/admin/roles`,
        method: "GET",
      }),
    }),
    MyManagementRolesLists: builder.query<MyManagementRolesResponse, void>({
      query: () => ({
        url: `/manager/roles`,
        method: "GET",
      }),
    }),
    AllManagementActivateRoles: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `/admin/roles/activate`,
        method: "PATCH",
        body: ids,
      }),
    }),
    MyManagementActivateRoles: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `/manager/roles/activate`,
        method: "PATCH",
        body: ids,
      }),
    }),
    AllManagementDeactivateRoles: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `/admin/roles/deactivate`,
        method: "PATCH",
        body: ids,
      }),
    }),
    MyManagementDeactivateRoles: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: `/manager/roles/deactivate`,
        method: "PATCH",
        body: ids,
      }),
    }),
    AllManagementListOfUserWithRoles: builder.mutation<
      AllManagementListOfUserWithRolesResponse,
      AllManagementListOfUserWithRolesRequest
    >({
      query: (params) => ({
        url: `/admin/users-by-role${createQueryString(params)}`,
        method: "POST",
      }),
    }),
    MyManagementListOfUserWithRoles: builder.mutation<
      MyManagementListOfUserWithRolesResponse,
      MyManagementListOfUserWithRolesRequest
    >({
      query: (params) => ({
        url: `/manager/users-by-role${createQueryString(params)}`,
        method: "POST",
      }),
    }),
    AllManagementUpdateOfUser: builder.mutation<
      AllManagementUpdateOfUserResponse,
      AllManagementUpdateOfUserRequest
    >({
      query: (body) => ({
        url: `/admin/roles`,
        method: "PUT",
        body,
      }),
    }),
    AllManagementCreateOfUser: builder.mutation<
      AllManagementCreateOfUserResponse,
      AllManagementCreateOfUserRequest
    >({
      query: (body) => ({
        url: `/admin/roles`,
        method: "POST",
        body,
      }),
    }),
    MyManagementUpdateOfUser: builder.mutation<
      MyManagementUpdateOfUserResponse,
      MyManagementUpdateOfUserRequest
    >({
      query: (body) => ({
        url: `/manager/roles`,
        method: "PUT",
        body,
      }),
    }),

    // Role groups
    AllManagementRolesGroupsLists: builder.query<AllManagementRolesGroupsResponse, void>({
      query: () => ({
        url: `/admin/groups`,
        method: "GET",
      }),
    }),
    MyManagementRolesGroupsLists: builder.query<MyManagementRolesGroupsResponse, void>({
      query: () => ({
        url: `/manager/groups`,
        method: "GET",
      }),
    }),
    AllManagementActivateRolesGroups: builder.mutation<void, string>({
      query: (groupName) => ({
        url: `/admin/group/${groupName}/roles/activate`,
        method: "PATCH",
      }),
    }),
    MyManagementActivateRolesGroups: builder.mutation<void, string>({
      query: (groupName) => ({
        url: `/manager/group/${groupName}/roles/activate`,
        method: "PATCH",
      }),
    }),
    AllManagementDeactivateRolesGroups: builder.mutation<void, string>({
      query: (groupName) => ({
        url: `/admin/group/${groupName}/roles/deactivate`,
        method: "PATCH",
      }),
    }),
    MyManagementDeactivateRolesGroups: builder.mutation<void, string>({
      query: (groupName) => ({
        url: `/manager/group/${groupName}/roles/deactivate`,
        method: "PATCH",
      }),
    }),
    AllManagementUpdateOfUserGroup: builder.mutation<
      AllManagementUpdateOfUserGroupResponse,
      AllManagementUpdateOfUserGroupRequest
    >({
      query: (body) => ({
        url: `/admin/group`,
        method: "PUT",
        body,
      }),
    }),
    MyManagementUpdateOfUserGroup: builder.mutation<
      MyManagementUpdateOfUserGroupResponse,
      MyManagementUpdateOfUserGroupRequest
    >({
      query: (body) => ({
        url: `/manager/group`,
        method: "PUT",
        body,
      }),
    }),
    AllManagementOverRideOfUserGroup: builder.mutation<
      AllManagementOverRideOfUserGroupResponse,
      AllManagementOverRideOfUserGroupRequest
    >({
      query: ({ groupName, roles }) => ({
        url: `/admin/groups/${groupName}/override/roles`,
        method: "PUT",
        body: { roles },
      }),
    }),
    MyManagementOverRideOfUserGroup: builder.mutation<
      MyManagementOverRideOfUserGroupResponse,
      MyManagementOverRideOfUserGroupRequest
    >({
      query: ({ groupName, roles }) => ({
        url: `/manager/groups/${groupName}/override/roles`,
        method: "PUT",
        body: { roles },
      }),
    }),
    ManagementOverRideUsersRoles: builder.mutation<
      void,
      ManagementOverRideUsersRolesRequest
    >({
      query: (body) => ({
        url: `/admin/staff/roles/override`,
        method: "PUT",
        body,
      }),
    }),
    MyManagementOverRideUsersRoles: builder.mutation<
      void,
      MyManagementOverRideUsersRolesRequest
    >({
      query: (body) => ({
        url: `/manager/staff/roles/override`,
        method: "PUT",
        body,
      }),
    }),
    ManagementCreateAdmin: builder.mutation<void, ManagementListOfUserWithRolesRequest>({
      query: (body) => ({
        url: "/admin/create",
        method: "POST",
        body,
      }),
    }),
    adminDeleteRole: builder.mutation<number, AdminDeleteRoleRequest>({
      query: (body) => ({
        url: "/admin/users/role",
        method: "DELETE",
        body,
      }),
    }),
  }),
});
export const {
  useLazyAllManagementRolesListsQuery,
  useLazyMyManagementRolesListsQuery,
  useLazyAllManagementRolesGroupsListsQuery,
  useLazyMyManagementRolesGroupsListsQuery,
  useAllManagementActivateRolesMutation,
  useMyManagementActivateRolesMutation,
  useAllManagementDeactivateRolesMutation,
  useMyManagementDeactivateRolesMutation,
  useAllManagementActivateRolesGroupsMutation,
  useMyManagementActivateRolesGroupsMutation,
  useAllManagementDeactivateRolesGroupsMutation,
  useMyManagementDeactivateRolesGroupsMutation,
  useAllManagementListOfUserWithRolesMutation,
  useMyManagementListOfUserWithRolesMutation,
  useAllManagementUpdateOfUserMutation,
  useAllManagementCreateOfUserMutation,
  useMyManagementUpdateOfUserMutation,
  useAllManagementUpdateOfUserGroupMutation,
  useMyManagementUpdateOfUserGroupMutation,
  useAllManagementOverRideOfUserGroupMutation,
  useMyManagementOverRideOfUserGroupMutation,
  useManagementOverRideUsersRolesMutation,
  useMyManagementOverRideUsersRolesMutation,
  useManagementCreateAdminMutation,
  useAdminDeleteRoleMutation,
} = managementRolesApis;
