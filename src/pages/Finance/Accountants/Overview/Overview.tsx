import { useEffect, useState } from "react";

import { Tabs, TabsProps, Form } from "antd";
import dayjs from "dayjs";

import CustomRangePicker from "@components/CustomInputs/CustomRangePicker/CustomRangePicker";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { rangePresets } from "@pages/Finance/_shared/utils";

import OverViewBranches from "./components/OverViewBranches/OverViewBranches";
import OverViewBusiness from "./components/OverViewBusiness/OverViewBusiness";
import OverViewInfo from "./components/OverViewInfo/OverViewInfo";
import OverViewServices from "./components/OverViewServices/OverViewServices";

import "./_overview.scss";

const Overview = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="overview-breadcrumb-title">مالی</span>,
      },
      {
        title: <span className="overview-breadcrumb-title">حسابداران</span>,
      },
      {
        title: "نمایه کلی",
      },
    ],
  });
  const { params, setSearchParams } = useQueryParams<{
    tab?: string;
    sort?: string;
    business?: string;
    branches?: string;
    services?: string;
    rangeDate?: string;
  }>();

  const [activeTab, setActiveTab] = useState(params.tab || "0");
  const [filters, setFilters] = useState<{
    sort?: string;
    business?: string;
    branches?: string;
    services?: string;
    rangeDate?: string;
  }>({
    sort: params.sort,
    business: params.business,
    branches: params.branches,
    services: params.services,
    rangeDate: params?.rangeDate,
  });

  // ================================ Utils function ================================
  const syncUrl = (newTab = activeTab, newFilters = filters) => {
    const newParams: Record<string, string> = {};
    if (newTab) newParams.tab = newTab;
    if (newFilters.sort) newParams.sort = newFilters.sort;
    if (newFilters.business) newParams.business = newFilters.business;
    if (newFilters.branches) newParams.branches = newFilters.branches;
    if (newFilters.services) newParams.services = newFilters.services;
    if (newFilters.rangeDate) newParams.rangeDate = newFilters.rangeDate;

    setSearchParams(newParams);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    syncUrl(key, filters);
  };

  const handleFiltersChange = (newFilters: { sort?: string; business?: string }) => {
    setFilters(newFilters);
    syncUrl(activeTab, newFilters);
  };

  const handleGoToBeneficiaries = () => {
    syncUrl("2", filters);
    setActiveTab("2");
  };

  const handleGoToServices = () => {
    syncUrl("3", filters);
    setActiveTab("3");
  };

  const [form] = Form.useForm<{
    rangeDate: dayjs.Dayjs[];
  }>();

  const changeDateHandler = () => {};

  //? ================================ Components ================================
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "نمایه کلی",
      children: <OverViewInfo />,
    },
    {
      key: "1",
      label: "کسب و کار ها",
      children: (
        <OverViewBusiness
          setFilters={handleFiltersChange}
          goToBeneficiaries={handleGoToBeneficiaries}
          filters={filters}
        />
      ),
    },
    {
      key: "2",
      label: "شعب / واحدها (ذینفعان)",
      children: (
        <OverViewBranches
          filters={filters}
          setFilters={handleFiltersChange}
          goToServices={handleGoToServices}
        />
      ),
    },
    {
      key: "3",
      label: "سرویس‌ها",
      children: <OverViewServices filters={filters} setFilters={handleFiltersChange} />,
    },
  ];
  //? ================================  Effects ================================

  useEffect(() => {
    if (params.tab && params.tab !== activeTab) setActiveTab(params.tab);
    if (params.sort && params.sort !== filters.sort)
      setFilters({ ...filters, sort: params.sort });
    if (params.rangeDate && params.rangeDate !== filters.rangeDate)
      setFilters({ ...filters, rangeDate: params.rangeDate });

    if (params.rangeDate) {
      const dates = params.rangeDate.split(",").map((d) => dayjs(d));
      form.setFieldsValue({ rangeDate: dates });
    }
  }, [params.tab, params.sort, params.rangeDate]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="overview-information-container">
      <ToolBox
        centerSide={
          <Form form={form}>
            <CustomRangePicker
              onChange={changeDateHandler}
              name="rangeDate"
              label="سال مالی (بازه تاریخ)"
              disabledDate={(current) => current && current > dayjs().endOf("day")}
              presets={rangePresets}
              form={form}
            />
          </Form>
        }
      />

      <div className="tabs-container">
        <Tabs
          centered
          activeKey={activeTab}
          onChange={handleTabChange}
          items={items}
          destroyOnHidden={true}
        />
      </div>
    </div>
  );
};

export default Overview;
