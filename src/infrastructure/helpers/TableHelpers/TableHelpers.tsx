import { Ref, RefObject } from "react";

import { Button, Input, InputRef, Space } from "antd";
import { ColumnType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { AiOutlineSearch } from "react-icons/ai";

import { GREEN_HIGHLIGHT } from "@infra/VARS/globalColors/globalColors";
import { PADDING_8 } from "@infra/VARS/globalStyles/globalStyles";

import { convertSearchText } from "./utils/convertSearchText";
import { DataIndex } from "../../models/general.model";
import "./_tableHelper.scss";

type GetColumnSearchPropsType = {
  dataIndex: DataIndex | any;
  searchInput: Ref<InputRef>;
  searchedColumn: string;
  setSearchedColumn: (value: string) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  // isDynamic?: boolean;
};

export const GetColumnSearchProps = ({
  searchInput,
  searchedColumn,
  setSearchedColumn,
  searchText,
  setSearchText,
  dataIndex,
  // isDynamic,
}: GetColumnSearchPropsType): ColumnType<any> => {
  // URL
  // const [_, setSearchParams] = useSearchParams();

  // const convertSearchText = (value: string | number | boolean) => {

  //   let newValue = value;

  //   if (typeof newValue === "string") {
  //     // Convert Persian/Farsi numbers to Latin numbers
  //     newValue = newValue
  //       .replace(/۰/g, "0")
  //       .replace(/۱/g, "1")
  //       .replace(/۲/g, "2")
  //       .replace(/۳/g, "3")
  //       .replace(/۴/g, "4")
  //       .replace(/۵/g, "5")
  //       .replace(/۶/g, "6")
  //       .replace(/۷/g, "7")
  //       .replace(/۸/g, "8")
  //       .replace(/۹/g, "9")
  //       .replace(/إ|أ/g, "ا")
  //       .replace(/ک|ك/g, "ک")
  //       .replace(/ي|ی/g, "ی")
  //       .toLowerCase(); // Normalize and convert to lowercase
  //   }

  //   return newValue;
  // };
  //! handle search
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    // if (isDynamic) {
    //   setSearchParams((prev) => ({
    //     ...prev,
    //     [dataIndex]: convertSearchText(selectedKeys?.[0]),
    //   }));
    //   dataIndex && setSearchedColumn(dataIndex);
    //   return;
    // }
    confirm();
    setSearchText(selectedKeys?.[0]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    dataIndex && setSearchedColumn(dataIndex);
  };

  //! handle reset
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div
        style={{ padding: PADDING_8 }}
        onKeyDown={(e) => e.stopPropagation()}
        className="table-search-container"
      >
        <Input
          ref={searchInput}
          className="search-input"
          placeholder="جستجو"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            className="search-btn"
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<AiOutlineSearch />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 70 }}
            className="reset-btn"
          >
            بازنشانی
          </Button>
          <Button
            className="filter-btn"
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            فیلتر
          </Button>
          <Button
            className="close-btn"
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            بستن
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <AiOutlineSearch style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) => {
      // console.log({ value });
      // console.log({ record });
      // return record?.[dataIndex]
      //   ?.toString()
      //   ?.toLowerCase()
      //   ?.includes((convertSearchText(value) as string)?.toLowerCase());
      const normalizedValue = convertSearchText(value);
      const normalizedRecord = convertSearchText(record?.[dataIndex]) as string;

      return normalizedRecord
        ?.toString()
        ?.includes(normalizedValue?.toString() as string);
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => (searchInput as RefObject<InputRef>)?.current?.select(), 100);
      }
    },
    render: (text) => {
      // Normalize the text and searchText
      const normalizedText = convertSearchText(text);
      const normalizedSearchText = convertSearchText(searchText);

      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: GREEN_HIGHLIGHT,
            padding: 0,
            borderRadius: "6px",
          }}
          searchWords={[normalizedSearchText as string]}
          autoEscape
          textToHighlight={normalizedText ? normalizedText?.toString() : ""}
        />
      ) : (
        text
      );
    },
  };
};
