import { toast } from "react-toastify";

export const checkTextFormatToBeFarsi = (
  text: string,
  changeHandler: React.Dispatch<React.SetStateAction<string>>
) => {
  const farsiCharactersPattern = /^[\u0600-\u06FF0-9\s]*$/;
  const isValidFarsiInput = farsiCharactersPattern.test(text);

  if (!isValidFarsiInput) {
    toast.error("لطفا فقط از حروف فارسی استفاده کنید", {
      toastId: "لطفا فقط از حروف فارسی استفاده کنید",
    });
  } else {
    changeHandler?.(text);
  }
};
