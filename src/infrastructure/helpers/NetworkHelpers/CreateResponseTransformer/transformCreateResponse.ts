export const transformCreateResponse = (data: any) => {
  if (data && data?.id) {
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
