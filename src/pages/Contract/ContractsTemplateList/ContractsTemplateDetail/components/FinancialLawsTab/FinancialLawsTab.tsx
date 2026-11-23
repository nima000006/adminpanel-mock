import { useEffect, useState } from "react";

import { Col, Dropdown, MenuProps, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowLeft, PiFilePdf, PiFileXls } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetContractBeneficiaryAndFinancialRulesQuery,
  useLazyGetContractCategoriesIdTitleQuery,
} from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  FinancialLawsTabProps,
  getContractBeneficiaryAndFinancialRulesItems,
  getContractBeneficiaryAndFinancialRulesResponse,
} from "./@types/@financialLawsTabProps";
import RealAndLegalStaticContractTemplateDrawerContent from "./helper/drawer/RealAndLegalStaticContractTemplateDrawerContent/RealAndLegalStaticContractTemplateDrawerContent";
import TemplateServiceFinancialLawTabTableModel from "./helper/model/TemplateServiceFinancialLawTabTableModel";

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

const FinancialLawsTab = ({ data, tempId }: FinancialLawsTabProps) => {
  const [selectedService, setSelectedService] = useState<DefaultOptionType | undefined>();
  const [isDrawerOpen, setIsDrawerOpen] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<
    getContractBeneficiaryAndFinancialRulesItems[]
  >([]);

  const {
    params: { id, categoryId, categoryTitle },
  } = useQueryParams();

  //? ================================ Api ================================
  // خدمت
  const [triggerCategories, { data: CategoriesData, isLoading: CategoriesLoading }] =
    useLazyGetContractCategoriesIdTitleQuery();

  // جدول
  const [getTableList, { isLoading: getTableListIsLoading }] =
    useLazyGetContractBeneficiaryAndFinancialRulesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      triggerCategories(+id);
    }
  }, [id]);

  useEffect(() => {
    if (categoryId) {
      getTableList({
        contractId: +id,
        categoryId: +categoryId,
      })
        .unwrap()
        .then(getTableListIsSuccess);
    }
  }, [categoryId]);

  useEffect(() => {
    if (!id || !selectedService?.value) return;

    getTableList({
      contractId: +id,
      categoryId: +selectedService.value,
    })
      .unwrap()
      .then(getTableListIsSuccess);
  }, [id, selectedService]);
  //* ================================ Util Functions ================================
  // success
  const getTableListIsSuccess = (
    value: getContractBeneficiaryAndFinancialRulesResponse
  ) => {
    setDataSource(value);
  };
  const drawerClickHandler = (id: number) => {
    setIsDrawerOpen({ id, isOpen: true });
  };
  const closeDrawerHandler = () => {
    setIsDrawerOpen({ id: -1, isOpen: false });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={() => setIsDrawerOpen({ id: -1, isOpen: false })}
          open={isDrawerOpen?.isOpen}
          content={
            <RealAndLegalStaticContractTemplateDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              data={dataSource.find((item) => item.id === isDrawerOpen.id)}
              title={selectedService?.title}
            />
          }
          size="large"
        />
      )}

      <div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اکوسیستم"
            value={data?.ecosystem?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="سرویس"
            value={
              serviceOptions.find(
                (service) => service?.value === data?.samimService?.name
              )?.title
            }
          />
          <Col lg={8} md={8} sm={12} xs={24}>
            <CustomSelect
              name="service"
              options={CategoriesData ?? []}
              label="خدمت"
              loading={CategoriesLoading}
              onChange={(_, option) => {
                setSelectedService(option);
              }}
              defaultValue={categoryTitle ? categoryTitle : undefined}
            />
          </Col>
        </Row>

        {selectedService || categoryId ? (
          <>
            <CustomDivider
              text="قانون های مالی و ذینفعان"
              extraContent={
                <div className="flex gap-2">
                  <Dropdown menu={exportMenu} trigger={["click"]}>
                    <CustomButton disabled={true}>
                      خروجی <IoIosArrowDown />
                    </CustomButton>
                  </Dropdown>
                  {/* todo[shirin]:  در حال حاضر مسیری که باید که روت شود مشخص نیست به این دلیل دیسیبل شد. */}
                  <CustomButton type="primary" disabled={true}>
                    سوابق قانون مالیاتی <PiArrowLeft />
                  </CustomButton>
                </div>
              }
            />

            <CustomTable<getContractBeneficiaryAndFinancialRulesItems>
              dataSource={dataSource ?? []}
              columns={TemplateServiceFinancialLawTabTableModel({
                drawerClickHandler,
                tempId,
              })}
              loading={getTableListIsLoading}
              {...TABLE_PROPS(dataSource.length ?? 0)}
              rowKey="id"
            />
          </>
        ) : (
          <>
            <CustomDivider text="قانون های مالی و ذینفعان" />
            <CustomEmpty />
          </>
        )}
      </div>
    </>
  );
};
export default FinancialLawsTab;
