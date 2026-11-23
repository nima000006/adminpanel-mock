import { Typography } from "antd";
import { EllipsisConfig } from "antd/es/typography/Base";

import Div from "../Div/Div";

type TitleProps = {
  children: React.ReactNode;
  editable?: boolean | undefined;
  level?: 1 | 2 | 3 | 4 | 5 | undefined;
  code?: boolean | undefined;
  disabled?: boolean | undefined;
  ellipsis?: boolean | EllipsisConfig | undefined;
  mark?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  italic?: boolean | undefined;
  underline?: boolean | undefined;
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
const Title = ({
  children,
  editable,
  level,
  code,
  disabled,
  ellipsis,
  mark,
  italic,
  onClick,
  type,
  underline,
  copyable,
  isLoading,
}: TitleProps) => {
  return (
    <Div loading={isLoading}>
      <Typography.Title
        editable={editable}
        level={level}
        code={code}
        disabled={disabled}
        ellipsis={ellipsis}
        mark={mark}
        onClick={onClick}
        italic={italic}
        type={type}
        underline={underline}
        copyable={copyable}
      >
        {children}
      </Typography.Title>
    </Div>
  );
};

export default Title;
