//! GENERAL
//! LAYOUT
export type ChatResponseGeneratorProps = {
  responseData?: {
    id: number;
    msg: string;
    date: string;
    typemsg: number;
    filedatas: {
      filename: string;
      url: string;
      id: number;
    }[];
  }[];
  imgname?: string;
};
//! API
