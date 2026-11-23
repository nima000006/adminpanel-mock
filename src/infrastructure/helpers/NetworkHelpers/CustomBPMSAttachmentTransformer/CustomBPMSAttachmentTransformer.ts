import { BPMSUploadResponseObject } from "../../../states/redux/Apis/models/committeeModels/CommitteGeneral";

export const transformAttachmentResponse = (attachments: BPMSUploadResponseObject[]) => {
  if (attachments && Array.isArray(attachments)) {
    return {
      msg: "success",
      status: 200,
      data: attachments.map((attachment) => ({
        originalName: attachment?.UploadFiles_originalName,
        uid: attachment?.UploadFiles_uid,
        extension: attachment?.UploadFiles_extension,
        size: attachment?.UploadFiles_size,
        name: attachment?.UploadFiles_name,
        relativeUrl: attachment?.UploadFiles_relativeUrl,
        fileType: attachment?.UploadFiles_fileType,
        serverUrl: "",
        deleteUrl: "",
        url: "",
      })),
    };
  } else {
    return {
      msg: "fail",
      status: 400,
      data: [],
    };
  }
};
