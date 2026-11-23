import { Typography } from "antd";
import { EllipsisConfig } from "antd/es/typography/Base";

import Div from "../Div/Div";

type TextProps = {
  children: React.ReactNode;
  editable?: boolean | undefined;
  code?: boolean | undefined;
  disabled?: boolean | undefined;
  ellipsis?: boolean | EllipsisConfig | undefined;
  mark?: boolean | undefined;
  strong?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  italic?: boolean | undefined;
  underline?: boolean | undefined;
  keyboard?: boolean | undefined;
  deleteStyle?: boolean | undefined;
  isLoading?: boolean | undefined;
  type?: "secondary" | "success" | "warning" | "danger" | undefined;
  copyable:
    | boolean
    | {
        text: string;
        onCopy: (event?: any) => void;
        icon: React.ReactNode;
        tooltips: false | [React.ReactNode, React.ReactNode];
        format: "text/plain" | "text/html";
      }
    | undefined;
};
const Text = ({
  children,
  editable,
  code,
  disabled,
  ellipsis,
  mark,
  italic,
  onClick,
  type,
  underline,
  copyable,
  strong,
  keyboard,
  deleteStyle,
  isLoading,
}: TextProps) => {
  return (
    <Div loading={isLoading}>
      <Typography.Text
        editable={editable}
        code={code}
        disabled={disabled}
        ellipsis={ellipsis}
        mark={mark}
        onClick={onClick}
        italic={italic}
        type={type}
        underline={underline}
        copyable={copyable}
        strong={strong}
        keyboard={keyboard}
        delete={deleteStyle}
      >
        {children}
      </Typography.Text>
    </Div>
  );
};

export default Text;
