import { useEffect, useState } from "react";

import { Button, Form } from "antd";

import { SubmitButtonProps } from "./@types/@submitButton";
import "./_submitButton.scss";

const SubmitButton = ({
  form,
  label = "ثبت",
  type = "primary",
  block = false,
  ghost = false,
  className,
  disabled,
  href,
  icon,
  loading,
  shape,
  size,
  styles,
  target,
  onClick,
  ...props
}: SubmitButtonProps) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button
      type={type}
      htmlType="submit"
      disabled={!submittable || disabled}
      block={block}
      className={`submit-button ${className ? className : ""}`}
      ghost={ghost}
      href={href}
      icon={icon}
      loading={loading}
      shape={shape}
      size={size}
      styles={styles}
      target={target}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};
export default SubmitButton;
