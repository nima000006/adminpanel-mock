// utils/getServerColumnSearchProps.ts
import { useState, useRef, useEffect } from "react";

import { Input, Button, Space, Select, InputRef } from "antd";
import Highlighter from "react-highlight-words";
import {
  AiOutlineSearch,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import { useTableQueryParams } from "@infra/hooks/useTableQueryParams/useTableQueryParams";

import {
  CommonProps,
  SortTypeProps,
  TextTypeProps,
} from "./@types/@tableServerSideSearchable";

import type { ColumnType } from "antd/es/table";

// ترکیب نهایی Props
export type GetServerColumnSearchPropsType = CommonProps &
  (TextTypeProps | SortTypeProps);

export const GetServerColumnSearchProps = ({
  dataIndex,
  label,
  type = "text",
  pageName = "page",
  pageSizeName = "pageSize",
  isReverseOrder,
  isSingle = true,
}: GetServerColumnSearchPropsType): ColumnType<any> => {
  const inputRef = useRef<InputRef>(null);
  const { getParam, setParams, getSorting, setSorting } = useTableQueryParams({
    pageName,
    pageSizeName,
  });

  const sortings = getSorting();
  const currentSort = sortings.find((s) => s.sortBy === dataIndex);
  const paramValue = getParam(dataIndex);

  // No local `selectValue` state at all — it's derived fresh from the URL
  // every render, so there's nothing that can go stale relative to another
  // column's setSorting call. Uses "asc" / "desc" (same as `options` below),
  // never the Persian label text, so AntD's value<->option matching works
  // both for the closed field AND the open dropdown highlight.
  const selectValue = currentSort?.sortOrder;

  // console.log(
  //   `[${dataIndex}] render — currentSort:`,
  //   currentSort,
  //   "selectValue:",
  //   selectValue
  // );

  const [inputValue, setInputValue] = useState(paramValue);

  //? ================================ Effects ================================
  useEffect(() => {
    setInputValue(paramValue || "");
  }, [paramValue]);

  // on Reset
  const onReset = (close: () => void) => {
    setSorting(dataIndex, undefined, undefined, isSingle);
    close();
  };
  const convertSearchText = (value: string) =>
    value
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9")
      .replace(/إ|أ/g, "ا")
      .replace(/ک|ك/g, "ک")
      .replace(/ي|ی/g, "ی")
      .toLowerCase();

  const isSort = type === "sort";
  return {
    filterDropdown: ({ close }) => {
      // console.log(
      //   `[${dataIndex}] filterDropdown OPENED — currentSort:`,
      //   currentSort,
      //   "selectValue:",
      //   selectValue
      // );
      return (
        <div
          style={{
            padding: 8,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {isSort ? (
            <>
              <Select
                value={selectValue ?? null}
                onChange={(value) => {
                  // console.log(`[${dataIndex}] Select onChange ->`, value);
                  setSorting(dataIndex, value, isReverseOrder, isSingle);
                  close();
                }}
                style={{ width: 120, marginBottom: 8 }}
                placeholder={`مرتب‌سازی ${label}`}
                options={[
                  { label: "صعودی", value: "asc" },
                  { label: "نزولی", value: "desc" },
                ]}
              />
              <Button
                onClick={() => onReset(close)}
                style={{ width: 120 }}
                disabled={!currentSort}
              >
                بازنشانی
              </Button>
            </>
          ) : (
            <>
              <Input
                ref={inputRef}
                placeholder={`جستجو ${label}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={() => {
                  setParams({ [dataIndex]: convertSearchText(inputValue) });
                  close();
                }}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    setParams({ [dataIndex]: convertSearchText(inputValue) });
                    close();
                  }}
                  icon={<AiOutlineSearch />}
                  size="small"
                  style={{ width: 90 }}
                >
                  جستجو
                </Button>
                <Button
                  onClick={() => {
                    setInputValue("");
                    setParams({ [dataIndex]: undefined });
                    close();
                  }}
                  size="small"
                  style={{ width: 70 }}
                >
                  بازنشانی
                </Button>
              </Space>
            </>
          )}
        </div>
      );
    },
    filterIcon: () => {
      if (isSort) {
        return currentSort?.sortOrder === "asc" ? (
          <AiOutlineSortAscending style={{ color: "#1677ff" }} />
        ) : currentSort?.sortOrder === "desc" ? (
          <AiOutlineSortDescending style={{ color: "#1677ff" }} />
        ) : (
          <AiOutlineSortAscending />
        );
      }
      return <AiOutlineSearch style={{ color: paramValue ? "#1677ff" : undefined }} />;
    },
    filteredValue: isSort
      ? currentSort && currentSort.sortOrder
        ? [currentSort.sortOrder]
        : null
      : paramValue !== undefined && paramValue !== ""
        ? [paramValue]
        : null,
    onFilterDropdownOpenChange: (visible) => {
      // console.log(`[${dataIndex}] onFilterDropdownOpenChange ->`, visible);
      if (visible && !isSort) {
        setTimeout(() => inputRef.current?.select(), 100);
      }
    },
    render: (text: string) => {
      return !isSort && paramValue ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
            borderRadius: "4px",
          }}
          searchWords={[paramValue]}
          autoEscape
          textToHighlight={text?.toString() ?? ""}
        />
      ) : (
        text
      );
    },
  };
};
