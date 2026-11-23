import { Form, GetProps, Transfer } from "antd";
import { NamePath } from "antd/es/form/interface";

export type CustomTransferProps = GetProps<typeof Transfer> &
  GetProps<typeof Form.Item> & {
    /** Supports nested paths — e.g. `[field.name, "items"]` inside `Form.List` */
    name?: NamePath;
  };
