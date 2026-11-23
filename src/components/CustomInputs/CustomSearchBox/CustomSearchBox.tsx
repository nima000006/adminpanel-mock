import { useEffect, useState } from "react";

import { Form, Input } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

import useQueryParams from "@infra/hooks/useQueryParams";

import { CustomSearchBoxProps } from "./@types/@customSearchBoxProps";

const CustomSearchBox = <T extends object>({
  placeholder = "جستجو ...",
  mode = "client",
  onChange,
  urlKey = "search" as keyof T,
  debounceTime = 400,
  disabled = false,
  rules,
  onPressEnter,
  hasUrlSync = true,
  form,
  resetDependency,
  className = "",
  inputClassName,
}: CustomSearchBoxProps<T>) => {
  const { params: url, setSearchParams } = useQueryParams();

  const urlValue = url?.[String(urlKey)] ?? "";

  const [value, setValue] = useState(urlValue);

  // ================= URL → STATE =================

  useEffect(() => {
    if (mode !== "url") return;
    if (!hasUrlSync) return;

    setValue(urlValue);
  }, [urlValue]);

  // ================= RESET DEPENDENCY =================

  useEffect(() => {
    if (!resetDependency) return; // Only reset if explicitly passed

    setValue("");
    if (form) {
      form.setFieldValue(urlKey, "");
    }
  }, [resetDependency]);

  // ================= STATE → FORM =================

  useEffect(() => {
    if (!form) return;
    // if (!hasUrlSync) return;

    form.setFieldValue(urlKey, value);
  }, [value]);

  // ================= DEBOUNCE + URL =================
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange?.(value);

      if (mode === "url" && hasUrlSync) {
        const newParams = { ...url };

        if (value) {
          newParams[String(urlKey)] = value;
        } else {
          delete newParams[String(urlKey)];
        }

        setSearchParams(newParams);
      }
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [value]);

  return (
    <Form.Item name={urlKey} rules={rules} className={className}>
      <Input
        className={inputClassName}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        suffix={<AiOutlineSearch />}
        placeholder={placeholder}
        onPressEnter={onPressEnter}
        allowClear
      />
    </Form.Item>
  );
};

export default CustomSearchBox;
