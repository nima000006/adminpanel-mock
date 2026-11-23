export const noContentResponseTransformer = (data: any) => {
  if (data?.response?.status === 200) {
    return {
      status: 204,
      msg: "success",
      data: null,
    };
  } else {
    return {
      status: data?.response.status,
      msg: "fail",
      data: null,
    };
  }
};
