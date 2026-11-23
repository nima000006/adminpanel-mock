import {
  useLazyTicketingMyDetailsBannerInfoQuery,
  useLazyTicketingMyDetailsMessagesQuery,
  useLazyTicketingMyDetailsMessagesAIQuery,
  useLazyTicketingMyDetailsNotesQuery,
  useTicketingMyDetailsAddNoteMutation,
  useTicketingMyDetailsAddFilesMutation,
  useTicketingMyDetailsAddMessageMutation,
  useTicketingMyDetailsAddFilesMessageMutation,
  useTicketingMyDetailsSaveDefaultAnswersMutation,
  useLazyTicketingMyDetailsHistoryQuery,
  useLazyTicketingAllDetailsBannerInfoQuery,
  useLazyTicketingAllDetailsMessagesQuery,
  useLazyTicketingAllDetailsMessagesAIQuery,
  useLazyTicketingAllDetailsNotesQuery,
  useTicketingAllDetailsAddNoteMutation,
  useTicketingAllDetailsAddFilesMutation,
  useTicketingAllDetailsAddMessageMutation,
  useTicketingAllDetailsAddFilesMessageMutation,
  useLazyTicketingAllDetailsHistoryQuery,
  useTicketingAllDetailsReferralsMutation,
  useTicketingAllDetailsPriorityMutation,
  useTicketingAllDetailsCloseTicketMutation,
  useTicketingMyDetailsReferralsMutation,
  useTicketingMyDetailsPriorityMutation,
  useTicketingMyDetailsCloseTicketMutation,
  useTicketingMyAssignToMeMutation,
  useLazyTicketingMyDetailsInformationQuery,
  useLazyTicketingMyDetailsUserInformationQuery,
  useLazyTicketingMyDetailsExpertInformationQuery,
  useLazyTicketingAllDetailsInformationQuery,
  useLazyTicketingAllDetailsUserInformationQuery,
  useLazyTicketingAllDetailsExpertInformationQuery,
} from "@infra/states/redux/Apis/ticketing/ticketing/ticketingApis";

type Variant = "MY" | "ALL";

export const useTicketingDetail = (variant: Variant) => {
  // CALL ALL HOOKS (unconditionally) to comply with React hooks rules
  const [getBannerInfoMy, getBannerInfoMyResult] =
    useLazyTicketingMyDetailsBannerInfoQuery();
  const [getMessageDataMy, getMessageDataMyResult] =
    useLazyTicketingMyDetailsMessagesQuery();
  const [getMessageAIDataMy, getMessageAIDataMyResult] =
    useLazyTicketingMyDetailsMessagesAIQuery();
  const [getNoteDataMy, getNoteDataMyResult] = useLazyTicketingMyDetailsNotesQuery();
  const [sendNoteMy, sendNoteMyResult] = useTicketingMyDetailsAddNoteMutation();
  const [sendFilesMy, sendFilesMyResult] = useTicketingMyDetailsAddFilesMutation();
  const [sendMessageMy, sendMessageMyResult] = useTicketingMyDetailsAddMessageMutation();
  const [sendFilesMessageMy, sendFilesMessageMyResult] =
    useTicketingMyDetailsAddFilesMessageMutation();
  const [getHistoryInfoMy, getHistoryInfoMyResult] =
    useLazyTicketingMyDetailsHistoryQuery();
  const [referralTicketMy, referralTicketMyResult] =
    useTicketingMyDetailsReferralsMutation();
  const [priorityTicketMy, priorityTicketMyResult] =
    useTicketingMyDetailsPriorityMutation();
  const [closeTicketMy, closeTicketMyResult] = useTicketingMyDetailsCloseTicketMutation();
  const [assignToMeMy, assignToMeMyResult] = useTicketingMyAssignToMeMutation();
  const [saveDefaultAnswersMy, saveDefaultAnswersMyResult] =
    useTicketingMyDetailsSaveDefaultAnswersMutation();
  const [detailMyInfo, detailMyInfoResult] = useLazyTicketingMyDetailsInformationQuery();
  const [detailMyUserInfo, detailMyUserInfoResult] =
    useLazyTicketingMyDetailsUserInformationQuery();
  const [detailMyExpertInfo, detailMyExpertInfoResult] =
    useLazyTicketingMyDetailsExpertInformationQuery();

  const [getBannerInfoAll, getBannerInfoAllResult] =
    useLazyTicketingAllDetailsBannerInfoQuery();
  const [getMessageDataAll, getMessageDataAllResult] =
    useLazyTicketingAllDetailsMessagesQuery();
  const [getMessageAIDataAll, getMessageAIDataAllResult] =
    useLazyTicketingAllDetailsMessagesAIQuery();
  const [getNoteDataAll, getNoteDataAllResult] = useLazyTicketingAllDetailsNotesQuery();
  const [sendNoteAll, sendNoteAllResult] = useTicketingAllDetailsAddNoteMutation();
  const [sendFilesAll, sendFilesAllResult] = useTicketingAllDetailsAddFilesMutation();
  const [sendMessageAll, sendMessageAllResult] =
    useTicketingAllDetailsAddMessageMutation();
  const [sendFilesMessageAll, sendFilesMessageAllResult] =
    useTicketingAllDetailsAddFilesMessageMutation();
  const [getHistoryInfoAll, getHistoryInfoAllResult] =
    useLazyTicketingAllDetailsHistoryQuery();
  const [referralTicketAll, referralTicketAllResult] =
    useTicketingAllDetailsReferralsMutation();
  const [priorityTicketAll, priorityTicketAllResult] =
    useTicketingAllDetailsPriorityMutation();
  const [closeTicketAll, closeTicketAllResult] =
    useTicketingAllDetailsCloseTicketMutation();
  const [detailAllInfo, detailAllInfoResult] =
    useLazyTicketingAllDetailsInformationQuery();
  const [detailAllUserInfo, detailAllUserInfoResult] =
    useLazyTicketingAllDetailsUserInformationQuery();
  const [detailAllExpertInfo, detailAllExpertInfoResult] =
    useLazyTicketingAllDetailsExpertInformationQuery();

  if (variant === "ALL") {
    return {
      getBannerInfo: getBannerInfoAll,
      isGetBannerInfoLoading: getBannerInfoAllResult.isFetching,
      getMessageData: getMessageDataAll,
      isGetMessageDataLoading: getMessageDataAllResult.isFetching,
      getMessageAIData: getMessageAIDataAll,
      isGetMessageAIDataLoading: getMessageAIDataAllResult.isFetching,
      getNoteData: getNoteDataAll,
      isGetNoteDataLoading: getNoteDataAllResult.isFetching,
      sendNote: sendNoteAll,
      isSendNoteLoading: sendNoteAllResult.isLoading,
      sendFiles: sendFilesAll,
      isSendFilesLoading: sendFilesAllResult.isLoading,
      sendMessage: sendMessageAll,
      isSendMessageLoading: sendMessageAllResult.isLoading,
      sendFilesMessage: sendFilesMessageAll,
      isSendFilesMessageLoading: sendFilesMessageAllResult.isLoading,
      saveDefaultAnswers: saveDefaultAnswersMy,
      isSaveDefaultAnswersLoading: saveDefaultAnswersMyResult.isLoading,
      getHistoryInfo: getHistoryInfoAll,
      isGettingHistoryInfo: getHistoryInfoAllResult.isFetching,
      // banner actions
      referralTicket: referralTicketAll,
      isReferralTicketLoading: referralTicketAllResult.isLoading,
      priorityTicket: priorityTicketAll,
      isPriorityTicketLoading: priorityTicketAllResult.isLoading,
      closeTicket: closeTicketAll,
      isCloseTicketLoading: closeTicketAllResult.isLoading,
      assignToMe: undefined,
      isAssignToMeLoading: false,
      detailInfo: detailAllInfo,
      detailInfoData: detailAllInfoResult.data,
      isDetailInfoLoading: detailAllInfoResult.isLoading,
      detailUserInfo: detailAllUserInfo,
      detailUserInfoData: detailAllUserInfoResult.data,
      isDetailUserInfoLoading: detailAllUserInfoResult.isLoading,
      detailExpertInfo: detailAllExpertInfo,
      detailExpertInfoData: detailAllExpertInfoResult.data,
      isDetailExpertInfoLoading: detailAllExpertInfoResult.isLoading,
    } as const;
  }

  return {
    getBannerInfo: getBannerInfoMy,
    isGetBannerInfoLoading: getBannerInfoMyResult.isFetching,
    getMessageData: getMessageDataMy,
    isGetMessageDataLoading: getMessageDataMyResult.isFetching,
    getMessageAIData: getMessageAIDataMy,
    isGetMessageAIDataLoading: getMessageAIDataMyResult.isFetching,
    getNoteData: getNoteDataMy,
    isGetNoteDataLoading: getNoteDataMyResult.isFetching,
    sendNote: sendNoteMy,
    isSendNoteLoading: sendNoteMyResult.isLoading,
    sendFiles: sendFilesMy,
    isSendFilesLoading: sendFilesMyResult.isLoading,
    sendMessage: sendMessageMy,
    isSendMessageLoading: sendMessageMyResult.isLoading,
    sendFilesMessage: sendFilesMessageMy,
    isSendFilesMessageLoading: sendFilesMessageMyResult.isLoading,
    saveDefaultAnswers: saveDefaultAnswersMy,
    isSaveDefaultAnswersLoading: saveDefaultAnswersMyResult.isLoading,
    getHistoryInfo: getHistoryInfoMy,
    isGettingHistoryInfo: getHistoryInfoMyResult.isFetching,
    // banner actions
    referralTicket: referralTicketMy,
    isReferralTicketLoading: referralTicketMyResult.isLoading,
    priorityTicket: priorityTicketMy,
    isPriorityTicketLoading: priorityTicketMyResult.isLoading,
    closeTicket: closeTicketMy,
    isCloseTicketLoading: closeTicketMyResult.isLoading,
    assignToMe: assignToMeMy,
    isAssignToMeLoading: assignToMeMyResult.isLoading,
    detailInfo: detailMyInfo,
    detailInfoData: detailMyInfoResult.data,
    isDetailInfoLoading: detailMyInfoResult.isLoading,
    detailUserInfo: detailMyUserInfo,
    detailUserInfoData: detailMyUserInfoResult.data,
    isDetailUserInfoLoading: detailMyUserInfoResult.isLoading,
    detailExpertInfo: detailMyExpertInfo,
    detailExpertInfoData: detailMyExpertInfoResult.data,
    isDetailExpertInfoLoading: detailMyExpertInfoResult.isLoading,
  } as const;
};

export default useTicketingDetail;
