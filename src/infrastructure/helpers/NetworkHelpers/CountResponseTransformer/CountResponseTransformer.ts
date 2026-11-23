export const countTransformResponse = ({ count }: any) => {
  if (count || count === 0) {
    return {
      data: count,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: null,
      status: 403,
      msg: "fail",
    };
  }
};
