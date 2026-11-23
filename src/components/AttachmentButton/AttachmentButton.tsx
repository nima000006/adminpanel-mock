import AttachmentIcon from "../../assets/icons/AttachmentIcon";
import "./_attachment-button.scss";

type AttachmentButtonProps = {
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>;
  fillColor?: string;
  isMultiple?: boolean;
  label?: string;
};

const AttachmentButton = ({
  handleFileChange,
  fillColor,
  isMultiple = false,
  label = "",
}: AttachmentButtonProps) => {
  return (
    <label htmlFor="fileInput" className="custom-upload-button">
      <span className="label-text">{label}</span>
      <span className="attachment-icon">
        <AttachmentIcon fillColor={fillColor} />
      </span>
      <input
        type="file"
        id="fileInput"
        className="file-input"
        onChange={handleFileChange}
        multiple={isMultiple}
        disabled
      />
    </label>
  );
};

export default AttachmentButton;
