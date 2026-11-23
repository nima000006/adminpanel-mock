import { useMemo, useState } from "react";

import { Row, Form, Dropdown, MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { PiCards, PiTable } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomPagination from "@components/Renderers/CustomPagination/CustomPagination";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { useResponsive } from "@infra/hooks/useResponsive";
import OverViewBranchesCardMode from "@pages/Finance/Accountants/Overview/components/OverViewBranches/helper/components/OverViewBranchesCardMode/OverViewBranchesCardMode";
import OverViewBranchTableModel from "@pages/Finance/Accountants/Overview/components/OverViewBranches/helper/models/OverViewBranchTableModel/OverViewBranchTableModel";

import {
  dataSource,
  INITIAL_SORT_BUSINESS_FILTERS,
  INITIAL_SORT_FILTERS,
} from "../../_shared/mockData/mockData";
import { sortByOption } from "../../_shared/utils/sortByOption";

import "./_overViewBranches.scss";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const pageSize = 3; // show 3 cards per page

const OverViewBranches = ({
  goToServices,
  filters,
  setFilters,
}: {
  goToServices: () => void;
  filters: { sort?: string; business?: string };
  setFilters: (newFilters: { sort?: string; business?: string }) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<"card" | "table">("card");
  const [form] = Form.useForm<{ sort: string }>();
  const [formBusiness] = Form.useForm<{ business: string }>();
  const selectedSort = Form.useWatch("sort", form);
  const { isMobile } = useResponsive();
  //? ================================ components  ================================
  const options = [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiCards />
          نمایش کارتی
        </span>
      ),
      value: "card",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiTable />
          نمایش جدولی
        </span>
      ),
      value: "table",
    },
  ];
  const startIndex = (currentPage - 1) * pageSize;
  // ================================ Utils function ================================
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedData = useMemo(() => {
    return sortByOption(dataSource, selectedSort as "1" | "2" | "3" | "4"); // this numbers are related to sort options
  }, [selectedSort]);

  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="overview-branches-container">
      <div className="mt-6 flex flex-col items-center justify-center">
        <CustomSegmented
          vertical={isMobile}
          options={options}
          onChange={(val) => setViewType(val as "card" | "table")}
        />

        <ToolBox
          rightSide={
            <Form form={formBusiness} initialValues={{ business: filters?.business }}>
              <CustomSelect
                className="custom-select"
                options={INITIAL_SORT_BUSINESS_FILTERS}
                name="business"
                label="کسب و کار"
                value={filters?.business}
                onChange={(val) => {
                  formBusiness.setFieldValue("business", val);
                  setFilters({ ...filters, business: val as string });
                }}
              />
            </Form>
          }
          leftSide={
            viewType === "card" ? (
              <Form form={form} initialValues={{ sort: filters?.sort }}>
                <CustomSelect
                  className="custom-select"
                  options={INITIAL_SORT_FILTERS}
                  name="sort"
                  label="مرتب سازی"
                  value={filters?.sort}
                  onChange={(val) => {
                    form.setFieldValue("sort", val);
                    setFilters({ ...filters, sort: val as string });
                  }}
                />
              </Form>
            ) : null
          }
        />
        <ToolBox
          className="mb-4"
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          }
        />
      </div>
      {viewType === "card" ? (
        <>
          {/* render cards */}
          <Row gutter={[16, 16]}>
            {paginatedData.map((item) => (
              <OverViewBranchesCardMode goToServices={goToServices} item={item} />
            ))}
          </Row>
          <CustomPagination
            className="custom-pagination"
            current={currentPage}
            total={sortedData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showQuickJumper
          />
        </>
      ) : (
        <CustomTable<any>
          dataSource={dataSource}
          rowKey="id"
          columns={OverViewBranchTableModel({ goToServices })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      )}
    </div>
  );
};
export default OverViewBranches;
