import { useEffect, useState } from "react";

import { Col, Row, Dropdown, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls, PiArrowLeft } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { emptyString } from "@infra/config/global.vars";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetContractsDetailRulesBeneficiariesQuery } from "@infra/states/redux/Apis/contracts/contractsDetail/contractsDetail";
import { useLazyGetContractCategoriesIdTitleQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { getContractCategoriesIdTitleResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/components/FinancialLawsTab/@types/@financialLawsTabProps";

import {
  GetContractsDetailRulesBeneficiariesContentItem,
  GetContractsDetailRulesBeneficiariesResponse,
} from "./@types/@getContractsDetailRulesBeneficiaries";
import ContractsDetailFinancialRulesDrawerContent from "./helpers/components/ContractsDetailFinancialRulesDrawerContent/ContractsDetailFinancialRulesDrawerContent";
import ContractsDetailFinancialRulesModelTable from "./helpers/models/ContractsDetailFinancialRulesModelTable";
import "./_contractsDetailFinancialRules.scss";

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
  ],
};

const ContractsDetailFinancialRules = () => {
  const [contractsDetailOption, setContractsDetailOption] =
    useState<getContractCategoriesIdTitleResponse>();
  const [contractsDetailRulesBeneficiaries, setContractsDetailRulesBeneficiaries] =
    useState<GetContractsDetailRulesBeneficiariesResponse>();
  const [selectedDuty, setSelectedDuty] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { params, setSearchParams } = useQueryParams();

  //? ================================ Api call ================================
  const [
    GetContractsDetailRulesCategories,
    { isFetching: isGetContractsDetailRulesCategoriesLoading },
  ] = useLazyGetContractCategoriesIdTitleQuery();

  const [
    GetContractsDetailRulesBeneficiaries,
    { isFetching: isGetContractsDetailRulesBeneficiariesLoading },
  ] = useLazyGetContractsDetailRulesBeneficiariesQuery();
  //? ================================  Effects ================================

  useEffect(() => {
    GetContractsDetailRulesCategories(+params?.id)
      .unwrap()
      .then(GetContractsDetailRulesCategoriesSuccess);
  }, [params?.id]);

  // ================================ Util function ================================
  const dutySelectHandler = (value: unknown) => {
    const stringValue = value as string; // تبدیل نوع به string
    setSelectedDuty(stringValue);

    if (!stringValue || Number(stringValue) === 0) {
      setContractsDetailRulesBeneficiaries(undefined);
      return;
    }

    GetContractsDetailRulesBeneficiaries({
      contractId: +params?.id,
      categoryId: +stringValue,
      queries: {
        pageNumber: params?.page ? Number(params?.page) - 1 : 0,
        pageSize: params?.pageSize ? Number(params?.pageSize) : 8,
      },
    })
      .unwrap()
      .then(GetContractsDetailRulesBeneficiariesSuccess);
  };
  const GetContractsDetailRulesBeneficiariesSuccess = (
    res: GetContractsDetailRulesBeneficiariesResponse
  ) => {
    setContractsDetailRulesBeneficiaries(res);
  };
  const GetContractsDetailRulesCategoriesSuccess = (
    res: getContractCategoriesIdTitleResponse
  ) => {
    setContractsDetailOption(res);
  };
  const drawerClickHandler = (
    record: GetContractsDetailRulesBeneficiariesContentItem
  ) => {
    if (record?.id) {
      setIsDrawerOpen(true);
      setSearchParams({
        ...params,
        beneficiaryId: record.id.toString(),
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="contracts-detail-financial-rules-container">
      {isDrawerOpen && (
        <CustomDrawer
          onClose={() => {
            setIsDrawerOpen(false);
            const { beneficiaryId, ...restParams } = params;
            setSearchParams(restParams);
          }}
          open={isDrawerOpen}
          title="قانون مالیاتی"
          content={
            <ContractsDetailFinancialRulesDrawerContent
              closeDrawerHandler={() => {
                setIsDrawerOpen(false);
                const { beneficiaryId, ...restParams } = params;
                setSearchParams(restParams);
              }}
            />
          }
          closeIcon={<AiOutlineClose />}
        />
      )}
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="اکوسیستم" value={emptyString} />
        <SingleVerticalWithCol label="سرویس" value={emptyString} />
        <Col lg={6} md={8} sm={12} xs={24}>
          <CustomSelect
            className="contracts-detail-financial-rules-select-container"
            allowClear
            name="duty"
            loading={isGetContractsDetailRulesCategoriesLoading}
            options={contractsDetailOption}
            label="خدمت"
            onChange={dutySelectHandler}
          />
        </Col>
      </Row>
      <CustomDivider text="قانون های مالی و ذینفعان" />
      {selectedDuty ? (
        <>
          <ToolBox
            leftSide={
              <>
                <Dropdown menu={exportMenu} trigger={["click"]}>
                  {/* todo[nima] enable when api got ready */}
                  <CustomButton disabled>
                    خروجی <IoIosArrowDown />
                  </CustomButton>
                </Dropdown>
                {/* todo[nima] enable when api got ready */}
                <CustomButton disabled type="primary">
                  سوابق قانون مالیاتی <PiArrowLeft />
                </CustomButton>
              </>
            }
          />
          <CustomTable<GetContractsDetailRulesBeneficiariesContentItem>
            className="contracts-detail-financial-rules-table-container mt-4!"
            dataSource={contractsDetailRulesBeneficiaries?.content}
            loading={isGetContractsDetailRulesBeneficiariesLoading}
            columns={ContractsDetailFinancialRulesModelTable({
              drawerClickHandler,
            })}
            pagination={manualPaginationConfig({
              total: contractsDetailRulesBeneficiaries?.totalPages,
              onChange: (page, pageSize) => {
                setSearchParams({
                  ...params,
                  page: page?.toString(),
                  pageSize: pageSize?.toString(),
                });
              },
              pageNumber: params?.page ? Number(params?.page) : 1,
              defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
            })}
            rowKey="id"
          />
        </>
      ) : (
        <CustomEmpty />
      )}
    </div>
  );
};

export default ContractsDetailFinancialRules;
