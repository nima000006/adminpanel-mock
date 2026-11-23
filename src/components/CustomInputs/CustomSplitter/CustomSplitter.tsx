import React, { FC } from "react";

import { Splitter, SplitterProps } from "antd";
import "./_customSplitter.scss";

export interface CustomSplitterProps extends SplitterProps {
  className?: string;
  style?: React.CSSProperties;
  value?: number[];
  onChange?: (sizes: number[]) => void;
  children?: React.ReactNode;
}

const CustomSplitter: FC<CustomSplitterProps> & {
  Panel: typeof Splitter.Panel;
} = ({ className, style, children, value, onChange, onResize, ...rest }) => {
  const handleResize = (sizes: number[]) => {
    onChange?.(sizes);
    onResize?.(sizes);
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && value && value[index] !== undefined) {
      return React.cloneElement(child as React.ReactElement<any>, {
        size: value[index],
      });
    }
    return child;
  });

  return (
    <Splitter
      className={`custom-splitter ${className || ""}`}
      style={style}
      onResize={handleResize}
      {...rest}
    >
      {value ? childrenWithProps : children}
    </Splitter>
  );
};

CustomSplitter.Panel = Splitter.Panel;

export default CustomSplitter;
