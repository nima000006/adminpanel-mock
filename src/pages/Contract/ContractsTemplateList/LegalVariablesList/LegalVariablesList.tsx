import { useEffect, useState } from "react";

import { Dropdown, MenuProps } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { emptyString } from "@infra/config/global.vars";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import manualPaginationConfig from "@infra/helpers/TableHelpers/config/manualPagination";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
  CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE,
} from "@infra/router/routes/contracts";
import { useLazyGetUndeterminedRuleBeneficiaryListQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { BeneficiaryType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateFinanceCondition/helper/components/AddFinancialRuleDrawerContent/utils/enums";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  GetUndeterminedRuleBeneficiaryListResponse,
  UndeterminedRuleBeneficiaryContent,
} from "./@types/@legalVariablesList";
import RealVariableDrawerContent from "./helper/drawer/RealVariableDrawerContent/RealVariableDrawerContent";
import LegalVariablesListTableModel from "./helper/model/LegalVariablesListTableModel";
import RealVariablesListTableModel from "./helper/model/RealVariablesListTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
  ],
};

const LegalVariablesList = () => {
  const [data, setData] = useState<null | GetUndeterminedRuleBeneficiaryListResponse>(
    null
  );

  const [openVariableDrawer, setIsOpenVariableDrawer] = useState({
    isOpen: false,
    id: -1,
  });

  const { params, setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500!">مدیریت قرارداد ها</span>,
      },
      {
        title: (
          <Link className="text-neutral-500!" to={CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE}>
            لیست قالب ها
          </Link>
        ),
      },
      {
        title: (
          <Link
            to={{
              pathname: CONTRACTS_TEMPLATE_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: params?.templateId,
                tab: 3, // openning financialRules tab
              }),
            }}
            className="text-neutral-500!"
          >
            {params?.id}
          </Link>
        ),
      },
      {
        title: params?.businessName,
      },
    ],
  });

  const [
    getUndeterminedRuleBeneficiaryList,
    { isFetching: isUndeterminedRuleBeneficiaryListLoading },
  ] = useLazyGetUndeterminedRuleBeneficiaryListQuery();

  useEffect(() => {
    if (params?.id) {
      getUndeterminedRuleBeneficiaryList({
        templateId: params?.id,
        pageNumber: params?.page ? Number(params.page) : 0,
        pageSize: params?.pageSize ? Number(params.pageSize) : 8,
      })
        .unwrap()
        .then(getUndeterminedRuleBeneficiaryListSuccess);
    }
  }, []);

  const getUndeterminedRuleBeneficiaryListSuccess = (
    value: GetUndeterminedRuleBeneficiaryListResponse
  ) => {
    setData(value);
  };

  // handler
  const viewClickHandler = (id: number) => {
    setIsOpenVariableDrawer({ isOpen: true, id });
  };

  const closeDrawerHandler = () => {
    setIsOpenVariableDrawer({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* REAL VARIABLE DRAWER */}
      {openVariableDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={openVariableDrawer?.isOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <RealVariableDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={openVariableDrawer.id}
            />
          }
        />
      )}
      <div className="flex flex-col gap-10">
        <div className="bg-neutral-2 body-regular flex flex-col items-center justify-center gap-2 rounded-md p-2!">
          <div>
            {` قراداد اکوسیستم ${emptyString} / سرویس ${dataPlaceHolder({
              data: serviceOptions.find((s) => s?.value === data?.service?.name)?.title,
            })} / خدمت ${dataPlaceHolder({ data: data?.categoryTitle })} / ${dataPlaceHolder({ data: params?.businessName })}`}
          </div>

          <div>
            {data?.ruleType?.name &&
            data.ruleType.name === BeneficiaryType.LEGAL_UNDETERMINED ? (
              <div className="flex gap-2">
                <CustomTag color={"purple"}>
                  {dataPlaceHolder({ data: data?.branchType?.title })}
                </CustomTag>
                <CustomTag color={"green"}>تامین کننده</CustomTag>
                <CustomTag color={"blue"}>حقوقی</CustomTag>
                <CustomTag
                  color={"default"}
                >{`%${dataPlaceHolder({ data: data?.partitionCoefficient })}سهم`}</CustomTag>
              </div>
            ) : (
              <div className="flex gap-2">
                <CustomTag color={"green"}>تامین کننده</CustomTag>
                <CustomTag color={"gold"}>حقیقی</CustomTag>
                <CustomTag
                  color={"default"}
                >{`%${dataPlaceHolder({ data: data?.partitionCoefficient })}سهم`}</CustomTag>
              </div>
            )}
          </div>
        </div>

        <div>
          <CustomDivider
            text="لیست ذینفعان متغیر"
            extraContent={
              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled>
                  خروجی <IoIosArrowDown />
                </CustomButton>
              </Dropdown>
            }
          />
          <CustomTable<UndeterminedRuleBeneficiaryContent>
            dataSource={data?.beneficiaries?.content}
            columns={
              data?.ruleType?.name === BeneficiaryType.LEGAL_UNDETERMINED
                ? LegalVariablesListTableModel({ viewClickHandler })
                : RealVariablesListTableModel({ viewClickHandler })
            }
            loading={isUndeterminedRuleBeneficiaryListLoading}
            pagination={manualPaginationConfig({
              total: data?.beneficiaries?.totalElements ?? 0,
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
            key={`table-${params?.pageSize || "8"}`}
            {...TABLE_PROPS(data?.beneficiaries?.content?.length ?? 0)}
            rowKey="id"
          />
        </div>
      </div>
    </>
  );
};

export default LegalVariablesList;
