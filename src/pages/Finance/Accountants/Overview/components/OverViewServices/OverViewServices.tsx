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
import OverViewServicesCardMode from "@pages/Finance/Accountants/Overview/components/OverViewServices/helper/components/OverViewServicesCardMode/OverViewServicesCardMode";
import OverViewServicesTableModel from "@pages/Finance/Accountants/Overview/components/OverViewServices/helper/models/OverViewServicesTableModel";

import {
  dataSource,
  INITIAL_SORT_BRANCHES_FILTERS,
  INITIAL_SORT_BUSINESS_FILTERS,
  INITIAL_SORT_FILTERS,
} from "../../_shared/mockData/mockData";
import { sortByOption } from "../../_shared/utils/sortByOption";

import "./_overViewServices.scss";

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
const OverViewServices = ({
  filters,
  setFilters,
}: {
  filters: { sort?: string; business?: string; branches?: string; services?: string };
  setFilters: (newFilters: {
    sort?: string;
    business?: string;
    branches?: string;
    services?: string;
  }) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<"card" | "table">("card");
  const [form] = Form.useForm();
  const [formBusinessOrBranches] = Form.useForm<{ business: string; branches: string }>();
  const selectedSort = Form.useWatch("sort", form);
  const { isMobile } = useResponsive();

  //? ================================ Components ================================
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
    <div className="overview-services-container">
      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <CustomSegmented
          vertical={isMobile}
          options={options}
          onChange={(val) => setViewType(val as "card" | "table")}
        />

        <ToolBox
          rightSide={
            <Form
              form={formBusinessOrBranches}
              initialValues={{
                business: filters?.business,
                branches: filters?.branches,
              }}
              className="custom-right-side"
            >
              <CustomSelect
                className="custom-select"
                options={INITIAL_SORT_BUSINESS_FILTERS}
                name="business"
                label="کسب و کار"
                value={filters?.business}
                onChange={(val) => {
                  formBusinessOrBranches.setFieldValue("business", val);
                  setFilters({ ...filters, business: val as string });
                }}
              />
              <CustomSelect
                className="custom-select"
                options={INITIAL_SORT_BRANCHES_FILTERS}
                name="branches"
                label="شعبه / واحد (ذینفع)"
                value={filters?.branches}
                onChange={(val) => {
                  formBusinessOrBranches.setFieldValue("branches", val);
                  setFilters({ ...filters, branches: val as string });
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
              <OverViewServicesCardMode item={item} />
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
          columns={OverViewServicesTableModel()}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      )}
    </div>
  );
};
export default OverViewServices;
