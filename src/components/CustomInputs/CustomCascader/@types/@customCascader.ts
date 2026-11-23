import { Cascader, Form, GetProps } from "antd";

export type CustomCascaderProps = GetProps<typeof Cascader> & GetProps<typeof Form.Item>;
