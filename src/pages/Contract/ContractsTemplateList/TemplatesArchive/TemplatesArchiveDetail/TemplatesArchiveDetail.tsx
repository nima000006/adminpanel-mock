import { useEffect, useState } from "react";

import { Link } from "react-router";

import CustomTabs from "@components/Renderers/CustomTabs/CustomTabs";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_TEMPLATES_ARCHIVE_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { useLazyGetContractTemplateDetailQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";

import { GetContractTemplateDetailResponse } from "../../ContractsTemplateDetail/@types/@contractsTemplateDetail";
import ContractBasicInfoTab from "../../ContractsTemplateDetail/components/ContractBasicInfoTab/ContractBasicInfoTab";
import ContractDescriptionTemplateTab from "../../ContractsTemplateDetail/components/ContractDescriptionTemplateTab/ContractDescriptionTemplateTab";
import FinancialLawsTab from "../../ContractsTemplateDetail/components/FinancialLawsTab/FinancialLawsTab";

const TemplatesArchiveDetail = () => {
  const [dataSource, setDataSource] = useState<GetContractTemplateDetailResponse>();

  const {
    params: { tab, id },
    setSearchParams,
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "مدیریت قرارداد ها",
      },
      {
        title: (
          <Link to={CONTRACTS_TEMPLATES_ARCHIVE_LIST_PAGE_ROUTE}>لیست آرشیو قالب ها</Link>
        ),
      },
      {
        title: id,
      },
    ],
  });

  const activeKey = tab || "1";

  // todo[shirin]: uncomment this when api ready
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
          isArchive={true}
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
      children: <FinancialLawsTab data={dataSource} />,
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

export default TemplatesArchiveDetail;
