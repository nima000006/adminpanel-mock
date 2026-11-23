import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import Div from "@components/Renderers/Div/Div";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import { useLazyGetContractTermListByContractTypeQuery } from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractTermsTypeListQuery } from "@infra/states/redux/Apis/contracts/templateSettings/templateSettings";
import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ContractTermListByContractTypeType } from "@pages/Contract/AddNewContractTemplate/helper/components/ContractsTemplateRulesDescMandatory/helper/ContractSection/@types/@contractSectionTypes";

import { TemplateSettingsListFormType } from "./@types/@templateSettingsList";
import TemplateBox from "./helper/components/TemplateBox/TemplateBox";
import TemplateSettingAddDrawerContent from "./helper/drawer/TemplateSettingAddDrawerContent/TemplateSettingAddDrawerContent";

const TemplateSettingsList = () => {
  const [contractTermsTypeData, setContractTermsTypeData] = useState<IdTitleName[]>([]);

  const [allContractTermsData, setAllContractTermsData] = useState<
    ContractTermListByContractTypeType[]
  >([]);

  const [contractTermsData, setContractTermsData] = useState<
    ContractTermListByContractTypeType[]
  >([]);

  const [searchValue, setSearchValue] = useState("");

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const [form] = Form.useForm<TemplateSettingsListFormType>();

  const relatedTerm = Form.useWatch("rules", form);

  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: "تنظیمات قراداد",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getContractTermsType, { isFetching: isGetContractTermsTypeLoading }] =
    useLazyGetContractTermsTypeListQuery();

  const [getContractTermsOptions, { isFetching: isGetOptionsLoading }] =
    useLazyGetContractTermListByContractTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getContractTermsType()
      .unwrap()
      .then((value) => {
        setContractTermsTypeData(value);

        form.setFieldsValue({
          rules: selectDefaultValueGenerator(value?.[0]),
        });

        getContractTermsData(value?.[0]?.name);
      });
  }, []);

  useEffect(() => {
    const normalizedSearch = searchValue.toLowerCase().trim();

    if (!normalizedSearch) {
      setContractTermsData(allContractTermsData);
      return;
    }

    const filteredData = allContractTermsData.filter((item) =>
      item?.title?.toLowerCase()?.includes(normalizedSearch)
    );

    setContractTermsData(filteredData);
  }, [searchValue, allContractTermsData]);

  //* ================================ Util Functions ================================
  const getContractTermsData = (contractType: string) => {
    getContractTermsOptions({ contractType })
      .unwrap()
      .then((value) => {
        setAllContractTermsData(value);
        setContractTermsData(value);
      });
  };

  const changeTermHandler = (option: SelectType<IdTitleName>) => {
    getContractTermsData(option?.item?.name);
  };

  const addNewTemplateHandler = () => {
    setIsAddDrawerOpen(true);
  };

  const closeAddDrawerHandler = () => {
    setIsAddDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADD DRAWER */}
      {isAddDrawerOpen && (
        <CustomDrawer
          onClose={closeAddDrawerHandler}
          open={isAddDrawerOpen}
          content={
            <TemplateSettingAddDrawerContent
              closeDrawerHandler={closeAddDrawerHandler}
              contractTermsTypeData={contractTermsTypeData}
              mainForm={form}
              getContractTermsData={getContractTermsData}
            />
          }
        />
      )}
      <div className="flex flex-col gap-4">
        <CustomDivider text="تنظیمات اطلاعات پایه" />

        <div>
          <ToolBox
            rightSide={<p className="body-regular">نمایش قالب های پیش فرض بر اساس</p>}
            leftSide={
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={addNewTemplateHandler}
              >
                افزودن قالب جدید
              </CustomButton>
            }
          />
          <Form form={form}>
            <Row gutter={[16, 16]} className="flex items-center">
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomSelect
                  name="rules"
                  options={contractTermsTypeData ? contractTermsTypeData : []}
                  label="بند ها"
                  loading={isGetContractTermsTypeLoading}
                  onChange={(_, option) =>
                    changeTermHandler(option as SelectType<IdTitleName>)
                  }
                  form={form}
                />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                <CustomInput
                  name="search"
                  placeholder="جستجو بر اساس عنوان قالب"
                  prefix={<AiOutlineSearch size={20} />}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  allowClear
                />
              </Col>
            </Row>
          </Form>
        </div>
        <Div loading={isGetOptionsLoading}>
          {contractTermsData ? (
            contractTermsData?.map((item) => (
              <div className="flex flex-col gap-4">
                <TemplateBox
                  item={item}
                  relatedTerm={relatedTerm}
                  contractTermsTypeData={contractTermsTypeData}
                  mainForm={form}
                  getContractTermsData={getContractTermsData}
                />
              </div>
            ))
          ) : (
            <CustomEmpty />
          )}
        </Div>
      </div>
    </>
  );
};

export default TemplateSettingsList;
