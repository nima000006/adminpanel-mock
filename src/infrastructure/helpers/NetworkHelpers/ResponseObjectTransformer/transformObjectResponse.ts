import { isObjectEmpty } from "../../utils";

export const transformObjectResponse = (data: any) => {
  if (!isObjectEmpty(data)) {
    return {
      data,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data,
      status: 403,
      msg: "fail",
    };
  }
};
