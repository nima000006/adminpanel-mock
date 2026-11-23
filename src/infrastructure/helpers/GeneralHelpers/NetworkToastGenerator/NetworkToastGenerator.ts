import { toast } from "react-toastify";

import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";

function isFarsiMessage(msg: string): boolean {
  const farsiRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return farsiRegex.test(msg);
}

const NetworkToastGenerator = ({ msg = "Error Text" }: { msg?: string }) => {
  const isErrorFarsi = isFarsiMessage(msg);
  return toast.error(isErrorFarsi ? msg : GENERAL_ERROR_MESSAGE, {
    toastId: isErrorFarsi ? msg : GENERAL_ERROR_MESSAGE,
  });
};

export default NetworkToastGenerator;
