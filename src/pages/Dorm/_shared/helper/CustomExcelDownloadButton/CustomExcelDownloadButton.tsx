import { useState } from "react";

import { Button, GetProps } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

import { excelDownloader } from "../../utils/excelDownloader";

type CustomExcelDownloadButtonProps = GetProps<typeof Button> & {
  excelTitle: string;
  formId: string;
  restOfUrl?: string;
  buttonLabel?: string;
  className?: string;
};

const CustomExcelDownloadButton = ({
  excelTitle,
  formId,
  restOfUrl,
  buttonLabel = "خروجی اکسل",
  className,
  ...props
}: CustomExcelDownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <CustomButton
      {...props}
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await excelDownloader({
          restOfUrl,
          formId,
          title: excelTitle,
        });
        setLoading(false);
      }}
    >
      {buttonLabel}
    </CustomButton>
  );
};

export default CustomExcelDownloadButton;
