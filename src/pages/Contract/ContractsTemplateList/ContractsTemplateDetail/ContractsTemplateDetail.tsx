import { useEffect, useState } from "react";

import { Link } from "react-router";

import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { useLazyGetContractTemplateDetailQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";

import { GetContractTemplateDetailResponse } from "./@types/@contractsTemplateDetail";
import ContractBasicInfoTab from "./components/ContractBasicInfoTab/ContractBasicInfoTab";
import ContractDescriptionTemplateTab from "./components/ContractDescriptionTemplateTab/ContractDescriptionTemplateTab";
import FinancialLawsTab from "./components/FinancialLawsTab/FinancialLawsTab";

const ContractsTemplateDetail = () => {
  const {
    params: { tab, id },
    setSearchParams,
  } = useQueryParams();

  const [dataSource, setDataSource] = useState<GetContractTemplateDetailResponse>();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: <Link to={CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE}>لیست قالب ها</Link>,
      },
      {
        title: id,
      },
    ],
  });

  const activeKey = tab || "1";

  //? ================================  Api Calls ================================
  const [
    getContractTemplateBasicInfoDetail,
    { isFetching: isGetContractTemplateBasicInfoDetailLoading },
  ] = useLazyGetContractTemplateDetailQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getDetail();
  }, []);

  //* ================================ Util Functions ================================

  const getDetail = () => {
    getContractTemplateBasicInfoDetail(+id)
      .unwrap()
      .then(getContractTemplateBasicInfoDetailIsSuccess);
  };
  // success
  const getContractTemplateBasicInfoDetailIsSuccess = (
    value: GetContractTemplateDetailResponse
  ) => {
    setDataSource(value);
  };

  const tabItems = [
    {
      label: "اطلاعات پایه قراداد",
      children: (
        <ContractBasicInfoTab
          dataSource={dataSource}
          onRefresh={getDetail}
          loading={isGetContractTemplateBasicInfoDetailLoading}
        />
      ),
      key: "1",
    },
    {
      label: "شرح قالب قرارداد",
      children: <ContractDescriptionTemplateTab dataSource={dataSource} />,
      key: "2",
    },
    {
      label: "قانون های مالی",
      children: <FinancialLawsTab data={dataSource} tempId={id} />,
      key: "3",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomTabs
        items={tabItems}
        onChange={(e) => setSearchParams({ id, tab: e })}
        activeKey={activeKey}
        type="card"
      />
    </div>
  );
};

export default ContractsTemplateDetail;
