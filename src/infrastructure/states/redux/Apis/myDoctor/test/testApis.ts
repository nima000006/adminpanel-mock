import { myDoctorSurveyDetailFourthTabUploadFileRequest } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailReviewStatus/components/GeneticsParticipantsDetailReviewStatusTest/helper/components/GeneticsParticipantsDetailReviewStatusTestResultDrawerContent/@types/@geneticsParticipantsDetailReviewStatusTestResultDrawerContent";
import { GetMyDoctorTestGeneralDetailResponse } from "@pages/MyDoctor/Tests/TestDetail/AllTestDetail/helper/components/TestDetailGeneralProfile/@types/@testDetailGeneralProfile";
import {
  GetMyDoctorTestDetailGroupsResponse,
  GetMyDoctorTestQuestionsDetailRequest,
  GetMyDoctorTestQuestionsDetailResponse,
} from "@pages/MyDoctor/Tests/TestDetail/AllTestDetail/helper/components/TestDetailQuestions/@types/@testDetailQuestions";
import {
  CreateMyDoctorTestFollowUpRequest,
  CreateMyDoctorTestFollowUpResponse,
  GetMyDoctorTestReviewDetailListResponse,
} from "@pages/MyDoctor/Tests/TestDetail/AllTestDetail/helper/components/TestDetailReviewStatus/@types/@allTestDetailReviewStatus";
import {
  GetMyDoctorTestReviewDetailActionTypeListResponse,
  GetMyDoctorTestReviewDetailFollowUpActionTypeListResponse,
} from "@pages/MyDoctor/Tests/TestDetail/AllTestDetail/helper/components/TestDetailReviewStatus/helper/modals/AllTestRegisterAction/@types/@allTestRegisterActionModalContent";
import { GetMyDoctorTestUserInfoDetailResponse } from "@pages/MyDoctor/Tests/TestDetail/AllTestDetail/helper/components/TestDetailUserInformation/@types/@testDetailUserInformation";
import { GetMyDoctorTestGeneralDetailManagerResponse } from "@pages/MyDoctor/Tests/TestDetail/MyTestDetail/helper/component/MyTestDetailGeneralProfile/@types/@myTestDetailGeneralProfile";
import {
  GetMyDoctorTestDetailGroupsManagerResponse,
  GetMyDoctorTestQuestionsDetailManagerRequest,
  GetMyDoctorTestQuestionsDetailManagerResponse,
} from "@pages/MyDoctor/Tests/TestDetail/MyTestDetail/helper/component/MyTestDetailQuestions/@types/@myTestDetailQuestions";
import {
  CreateMyDoctorTestFollowUpManagerRequest,
  CreateMyDoctorTestFollowUpManagerResponse,
  GetMyDoctorTestReviewDetailListManagerResponse,
  MyDoctorGetFollowUpDetailManagerResponse,
} from "@pages/MyDoctor/Tests/TestDetail/MyTestDetail/helper/component/MyTestDetailReviewStatus/@types/@myTestDetailReviewStatus";
import {
  GetMyDoctorTestReviewDetailActionTypeListManagerResponse,
  GetMyDoctorTestReviewDetailFollowUpActionTypeListManagerResponse,
} from "@pages/MyDoctor/Tests/TestDetail/MyTestDetail/helper/component/MyTestDetailReviewStatus/helper/modals/MyTestRegisterAction/@types/@myTestRegisterActionModalContent";
import { GetMyDoctorTestUserInfoDetailManagerResponse } from "@pages/MyDoctor/Tests/TestDetail/MyTestDetail/helper/component/MyTestDetailUserInformation/@types/@myTestDetailUserInformation";
import {
  GetMyDoctorActionTestListRequest,
  GetMyDoctorActionTestListResponse,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/helper/components/AllTestActionStatusListTab/@types/@allTestActionStatusListTab";
import {
  GetMyDoctorTestFilterListRequest,
  GetMyDoctorTestFilterListResponse,
  GetMyDoctorTestListRequest,
  GetMyDoctorTestListResponse,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/helper/components/AllTestFollowUpListTab/@types/@allTestFollowUpListTab";
import {
  GetMyDoctorTestActionListForManagerRequest,
  GetMyDoctorTestActionListResponseForManager,
} from "@pages/MyDoctor/Tests/TestsList/MyTestList/helper/components/MyTestActionStatusListTab/@types/@myTestActionStatusListTab";
import {
  GetMyDoctorTestFilterListForManagerRequest,
  GetMyDoctorTestFilterListForManagerResponse,
  GetMyDoctorTestListForManagerRequest,
  GetMyDoctorTestListResponseForManager,
} from "@pages/MyDoctor/Tests/TestsList/MyTestList/helper/components/MyTestFollowUpListTab/@types/@myTestFollowUpListTab";

import { myDoctorApi } from "../../myDoctorApi";

export const testApi = myDoctorApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyDoctorTestList: builder.mutation<
      GetMyDoctorTestListResponse,
      GetMyDoctorTestListRequest
    >({
      query: ({ pageNo, pageSize, body }) => ({
        url: `/admin/survey/survey-cycles?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestFilterList: builder.mutation<
      GetMyDoctorTestFilterListResponse,
      GetMyDoctorTestFilterListRequest
    >({
      query: ({ pageNo, pageSize, body }) => ({
        url: `/admin/survey/survey-cycles/advance-filter?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    getMyDoctorActionTestList: builder.mutation<
      GetMyDoctorActionTestListResponse,
      GetMyDoctorActionTestListRequest
    >({
      query: ({ pageNo, pageSize, body }) => ({
        url: `/admin/survey/survey-cycles/action/?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestListForManager: builder.mutation<
      GetMyDoctorTestListResponseForManager,
      GetMyDoctorTestListForManagerRequest
    >({
      query: ({ pageNo, pageSize, statusId }) => ({
        url: `/manager/survey/survey-cycles?pageNo=${pageNo}&pageSize=${pageSize}&statusId=${statusId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMyDoctorTestFilterListForManager: builder.mutation<
      GetMyDoctorTestFilterListForManagerResponse,
      GetMyDoctorTestFilterListForManagerRequest
    >({
      query: ({ pageNo, pageSize, body }) => ({
        url: `/manager/survey/survey-cycles/advance-filter?pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestActionListForManager: builder.mutation<
      GetMyDoctorTestActionListResponseForManager,
      GetMyDoctorTestActionListForManagerRequest
    >({
      query: ({ pageNo, pageSize, statusId }) => ({
        url: `/manager/survey/survey-cycles/action/?pageNo=${pageNo}&pageSize=${pageSize}&statusId=${statusId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestGeneralDetail: builder.query<
      GetMyDoctorTestGeneralDetailResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/survey/survey-cycles/response-details?surveyCyclesId=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestGeneralDetailManager: builder.query<
      GetMyDoctorTestGeneralDetailManagerResponse,
      string
    >({
      query: (id) => ({
        url: `/manager/survey/survey-cycles/response-details?surveyCyclesId=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestDetailGroups: builder.query<GetMyDoctorTestDetailGroupsResponse, void>(
      {
        query: () => ({
          url: "/admin/survey/survey/groups/all",
          method: "GET",
        }),
        providesTags: ["tag/myDoctor"],
      }
    ),
    getMyDoctorTestDetailGroupsManager: builder.query<
      GetMyDoctorTestDetailGroupsManagerResponse,
      void
    >({
      query: () => ({
        url: "/manager/survey/survey/groups/all",
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestQuestionsDetail: builder.query<
      GetMyDoctorTestQuestionsDetailResponse,
      GetMyDoctorTestQuestionsDetailRequest
    >({
      query: ({ groupId, userId }) => ({
        url: `/admin/survey/survey/cycles/response/questions?groupId=${groupId}&surveyCycle=${userId}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestQuestionsDetailManager: builder.query<
      GetMyDoctorTestQuestionsDetailManagerResponse,
      GetMyDoctorTestQuestionsDetailManagerRequest
    >({
      query: ({ groupId, userId }) => ({
        url: `/manager/survey/survey/cycles/response/questions?groupId=${groupId}&surveyCycle=${userId}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestUserInfoDetail: builder.query<
      GetMyDoctorTestUserInfoDetailResponse,
      string
    >({
      query: (userId) => ({
        url: `/admin/survey/survey/cycles/basic/detail?surveyCycle=${userId}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestUserInfoDetailManager: builder.query<
      GetMyDoctorTestUserInfoDetailManagerResponse,
      string
    >({
      query: (userId) => ({
        url: `/manager/survey/survey/cycles/basic/detail?surveyCycle=${userId}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestReviewDetailList: builder.query<
      GetMyDoctorTestReviewDetailListResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/survey/survey/cycles/follow-up/all?surveyCycle=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestReviewDetailListManager: builder.query<
      GetMyDoctorTestReviewDetailListManagerResponse,
      string
    >({
      query: (id) => ({
        url: `/manager/survey/survey/cycles/follow-up/all?surveyCycle=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestReviewDetailActionTypeList: builder.query<
      GetMyDoctorTestReviewDetailActionTypeListResponse,
      void
    >({
      query: () => ({
        url: "/admin/survey/survey/cycles/action-type/all/",
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestReviewDetailActionTypeListManager: builder.query<
      GetMyDoctorTestReviewDetailActionTypeListManagerResponse,
      void
    >({
      query: () => ({
        url: "/manager/survey/survey/cycles/action-type/all/",
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestReviewDetailFollowUpActionTypeList: builder.query<
      GetMyDoctorTestReviewDetailFollowUpActionTypeListResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/survey/survey/cycles/follow-up-action/all?followUpActionType=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    getMyDoctorTestReviewDetailFollowUpActionTypeListManager: builder.query<
      GetMyDoctorTestReviewDetailFollowUpActionTypeListManagerResponse,
      string
    >({
      query: (id) => ({
        url: `/manager/survey/survey/cycles/follow-up-actions/all?followUpActionType=${id}`,
        method: "GET",
      }),
      providesTags: ["tag/myDoctor"],
    }),
    CreateMyDoctorTestFollowUp: builder.mutation<
      CreateMyDoctorTestFollowUpResponse,
      CreateMyDoctorTestFollowUpRequest
    >({
      query: (body) => ({
        url: "/admin/survey/survey/cycles/follow-up/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    CreateMyDoctorTestFollowUpManager: builder.mutation<
      CreateMyDoctorTestFollowUpManagerResponse,
      CreateMyDoctorTestFollowUpManagerRequest
    >({
      query: (body) => ({
        url: "/manager/survey/survey/cycles/follow-up/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["tag/myDoctor"],
    }),
    // MANAGER GET FOLLOW UP DETAIL
    myDoctorGetFollowUpDetailManager: builder.query<
      MyDoctorGetFollowUpDetailManagerResponse,
      { followUpId: string }
    >({
      query: ({ followUpId }: { followUpId: string }) => ({
        url: `/manager/survey/survey/cycles/follow-up/detail?followUpId=${followUpId}`,
        method: "GET",
      }),
    }),
    // ALL GET FOLLOW UP DETAIL
    myDoctorGetFollowUpDetailAll: builder.query<
      MyDoctorGetFollowUpDetailManagerResponse,
      { followUpId: string }
    >({
      query: ({ followUpId }: { followUpId: string }) => ({
        url: `admin/survey/survey/cycles/follow-up/detail?followUpId=${followUpId}`,
        method: "GET",
      }),
    }),
    myDoctorSurveyDetailFourthTabUploadFile: builder.mutation<
      string,
      myDoctorSurveyDetailFourthTabUploadFileRequest
    >({
      query: ({ file }) => ({
        url: "admin/survey/upload",
        method: "POST",
        body: file,
        responseHandler: "text",
      }),
    }),
  }),
});
export const {
  useGetMyDoctorTestListMutation,
  useGetMyDoctorTestFilterListMutation,
  useGetMyDoctorActionTestListMutation,
  useGetMyDoctorTestListForManagerMutation,
  useGetMyDoctorTestFilterListForManagerMutation,
  useGetMyDoctorTestActionListForManagerMutation,
  useLazyGetMyDoctorTestGeneralDetailQuery,
  useLazyGetMyDoctorTestGeneralDetailManagerQuery,
  useLazyGetMyDoctorTestDetailGroupsQuery,
  useLazyGetMyDoctorTestDetailGroupsManagerQuery,
  useLazyGetMyDoctorTestQuestionsDetailQuery,
  useLazyGetMyDoctorTestQuestionsDetailManagerQuery,
  useLazyGetMyDoctorTestUserInfoDetailQuery,
  useLazyGetMyDoctorTestUserInfoDetailManagerQuery,
  useLazyGetMyDoctorTestReviewDetailListQuery,
  useLazyGetMyDoctorTestReviewDetailListManagerQuery,
  useLazyGetMyDoctorTestReviewDetailActionTypeListQuery,
  useLazyGetMyDoctorTestReviewDetailActionTypeListManagerQuery,
  useLazyGetMyDoctorTestReviewDetailFollowUpActionTypeListQuery,
  useLazyGetMyDoctorTestReviewDetailFollowUpActionTypeListManagerQuery,
  useCreateMyDoctorTestFollowUpMutation,
  useCreateMyDoctorTestFollowUpManagerMutation,
  useLazyMyDoctorGetFollowUpDetailManagerQuery,
  useLazyMyDoctorGetFollowUpDetailAllQuery,
  useMyDoctorSurveyDetailFourthTabUploadFileMutation,
} = testApi;
