export const transformResponse = (data: any) => {
  if (Array.isArray(data)) {
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
