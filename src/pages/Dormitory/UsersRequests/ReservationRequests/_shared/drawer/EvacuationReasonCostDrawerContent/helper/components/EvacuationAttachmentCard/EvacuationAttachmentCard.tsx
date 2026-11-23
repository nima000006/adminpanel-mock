import { AiOutlinePlus } from "react-icons/ai";

import { CustomInput, CustomUploader } from "@components/CustomInputs";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { EvacuationAttachmentCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationReasonCostDrawerContent/helper/components/EvacuationAttachmentCard/@types/@evacuationAttachmentCardTypes";
import "./_evacuationAttachmentCard.scss";

const EvacuationAttachmentCard = ({
  titleName,
  uploaderName,
  fileList,
  setFileList,
}: EvacuationAttachmentCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="evacuation-attachment-card border-neutral-3 flex w-full flex-col gap-3 rounded-lg border p-3">
      <CustomInput
        type="text"
        label="عنوان فایل"
        name={titleName}
        placeholder="مبلغ"
        rules={[REQUIRED_RULE]}
      />

      <div className="attach-container">
        <CustomUploader
          fileList={fileList}
          setFileList={setFileList}
          isDisabled={fileList.length >= 1}
          isReadOnly={false}
          multiple={false}
          maxCount={1}
          classNameOuterDiv="upload-no-delete"
          uploaderText={
            <div className="image-attachment-container">
              <div className="upload-logo-main">
                <AiOutlinePlus />
              </div>
              <div className="upload-text-main">بارگذاری</div>
            </div>
          }
          hasUploaderIcon={false}
          isDataLoading={false}
          UploadSizeLimitConfig={{
            isActive: true,
            text: "حداکثر 5 مگابایت",
            size: 5,
            sizeUnit: "MB",
          }}
          validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
          name={uploaderName}
          hasVerticalLabel={true}
          label="فایل پیوست"
          rules={fileList.length === 0 ? [REQUIRED_RULE] : []}
        />
      </div>
    </div>
  );
};

export default EvacuationAttachmentCard;
