import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";

import { AttachmentsInfoProps } from "./@types/attachmentsInfo";

import "./_attachmentsInfo.scss";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";

const AttachmentsInfo = ({ fileList, setFileList }: AttachmentsInfoProps) => {
  return (
    <div className="insured-attachment-info-container">
      <CustomDivider text="مدارک بارگذاری شده" />
      <CustomUploader
        fileList={fileList}
        setFileList={setFileList}
        isReadOnly={true}
        name="insured"
        uploaderText="مدرک"
      />
    </div>
  );
};

export default AttachmentsInfo;
