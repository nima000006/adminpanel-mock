import { useEffect, useState } from "react";

import { Col, Dropdown, Form, Row, Space } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { GoPlus, GoPlusCircle } from "react-icons/go";
import { LuTrash } from "react-icons/lu";
import { PiDotsThreeBold, PiTrashSimple } from "react-icons/pi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { selectDefaultValueGenerator } from "@infra/helpers/utils/formUtils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";
import {
  useCreateContractTemplateBasicInfoMutation,
  useLazyGetContractPersonalityTypeListQuery,
  useUpdateContractTemplateBasicInfoMutation,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractTemplateDetailQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import {
  useLazyGetCategoryByServiceListQuery,
  useLazyGetContractEcosystemQuery,
  useLazyGetContractServiceQuery,
  useLazyGetPartitionCoefficientTypeListQuery,
} from "@infra/states/redux/Apis/contracts/general/generalApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { GetContractTemplateDetailResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  ContractsTemplateInfoFormType,
  ContractTemplateServiceType,
  getCategoryByServiceListItem,
  getCategoryByServiceListResponse,
  SelectOptionType,
} from "./@types/@contractsTemplateInfoStep";

const partiesPersianOrder = [
  "اول",
  "دوم",
  "سوم",
  "چهارم",
  "پنجم",
  "ششم",
  "هفتم",
  "هشتم",
  "نهم",
  "دهم",
  "یازدهم",
  "دوازدهم",
  "سیزدهم",
  "چهاردهم",
  "پانزدهم",
];

const PARTIES_MIN_COUNT_WARN_MSG = "تعداد طرفین قرارداد باید حداقل 2 باشد";

const ContractsTemplateInfoStep = () => {
  const [partiesList, setPartiesList] = useState<
    { id: number; partiesType: string; partiesTypeCode: string }[]
  >([]);

  const [partiesLegalLis, setPartiesLegalLis] = useState<{ id: number; title: string }[]>(
    []
  );

  const [partiesPersonalLis, setPartiesPersonalLis] = useState<
    { id: number; title: string }[]
  >([]);

  const [categoryList, setCategoryList] = useState<{ id: number; title: string }[]>([]);

  const [contractDetail, setContractDetail] =
    useState<GetContractTemplateDetailResponse | null>(null);

  const navigate = useNavigate();

  const [infoForm] = Form.useForm<ContractsTemplateInfoFormType>();

  const templateService = Form.useWatch("templateService", infoForm);

  // Watch all parti fields to get selected values
  const formValues = Form.useWatch([], infoForm);

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getEcosystemList, { data: ecosystemList, isFetching: isEcosystemListLoading }] =
    useLazyGetContractEcosystemQuery();

  const [
    getTemplateServiceList,
    { data: templateServiceList, isFetching: isTemplateServiceListLoading },
  ] = useLazyGetContractServiceQuery();

  const [getCategoryList, { isFetching: isCategoryListLoading }] =
    useLazyGetCategoryByServiceListQuery();

  const [
    getPartitionCoefficientTypeList,
    {
      data: partitionCoefficientTypeList,
      isFetching: isPartitionCoefficientTypeListLoading,
    },
  ] = useLazyGetPartitionCoefficientTypeListQuery();

  const [
    getContractPersonalityTypeList,
    { isFetching: isContractPersonalityTypeListLoading },
  ] = useLazyGetContractPersonalityTypeListQuery();

  const [
    createContractTemplateBasicInfo,
    { isLoading: isCreateContractTemplateBasicInfoLoading },
  ] = useCreateContractTemplateBasicInfoMutation();

  const [
    updateContractTemplateBasicInfo,
    { isLoading: isUpdateContractTemplateBasicInfoLoading },
  ] = useUpdateContractTemplateBasicInfoMutation();

  const [getContractinfo, { isFetching: isGetContractinfoLoading }] =
    useLazyGetContractTemplateDetailQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    if (params?.contractId) {
      getContractinfo(+params.contractId).unwrap().then(getContractinfoIsSuccess);
    }
  }, [params?.contractId]);

  useEffect(() => {
    getEcosystemList();
    getTemplateServiceList();
    getPartitionCoefficientTypeList();
  }, []);

  useEffect(() => {
    if (partiesList?.length > 0) {
      const isLegalSelected = partiesList?.find((item) => item?.partiesTypeCode !== "1");
      const isPERSONALSelected = partiesList?.find(
        (item) => item?.partiesTypeCode === "1"
      );

      if (isLegalSelected && partiesLegalLis?.length === 0) {
        getContractPersonalityTypeList({
          personalityType: "LEGAL",
        })
          .unwrap()
          .then((value) => {
            setPartiesLegalLis(value);
          });
      }

      if (isPERSONALSelected && partiesPersonalLis?.length === 0) {
        getContractPersonalityTypeList({
          personalityType: "PERSONAL",
        })
          .unwrap()
          .then((value) => {
            setPartiesPersonalLis(value);
          });
      }
    }
  }, [partiesList]);

  // Populate select fields when contract detail AND dropdown options are loaded
  useEffect(() => {
    if (!contractDetail) return;
    if (!ecosystemList?.length || !templateServiceList?.length) return;
    if (!partitionCoefficientTypeList?.length) return;

    infoForm.setFieldsValue({
      ecosystem: selectDefaultValueGenerator(contractDetail.ecosystem),
      templateService: selectDefaultValueGenerator(contractDetail.samimService),
      financeConditionType: selectDefaultValueGenerator(
        contractDetail.partitionCoefficientTypes
      ),
    });
  }, [contractDetail, ecosystemList, templateServiceList, partitionCoefficientTypeList]);

  // Populate services field when category list is loaded
  useEffect(() => {
    if (!contractDetail || !categoryList?.length) return;

    infoForm.setFieldsValue({
      services: selectDefaultValueGenerator(
        contractDetail?.categories?.map((cat) => ({
          id: cat?.id,
          title: cat?.productType?.title,
        }))
      ),
    });
  }, [contractDetail, categoryList]);

  //* ================================ Util Functions ================================
  const getContractinfoIsSuccess = (value: GetContractTemplateDetailResponse) => {
    setContractDetail(value);

    // Set text fields immediately (no option matching needed)
    infoForm.setFieldsValue({
      startDate: value.startDate,
      templateTitle: value.title,
      subject: value.subject,
    });

    // Load categories for the service dropdown
    const filteredServiceValue = serviceOptions.find(
      (s) => s.value === value.samimService.name
    )?.value;

    if (filteredServiceValue) {
      getCategoryList([filteredServiceValue])
        .unwrap()
        .then((catValue: getCategoryByServiceListResponse) => {
          const tempList = catValue?.map((item: getCategoryByServiceListItem) => ({
            id: item?.categoryId,
            title: item?.title,
          }));
          setCategoryList(tempList);
        });
    }

    // Setup parties for edit mode
    if (value.parties?.length > 0) {
      const hasPersonal = value.parties.some(
        (p) => p.personalityGroupType.name === "PERSONAL"
      );
      const hasLegal = value.parties.some(
        (p) => p.personalityGroupType.name !== "PERSONAL"
      );

      const setupParties = async () => {
        let personalList: { id: number; title: string }[] = [];
        let legalList: { id: number; title: string }[] = [];

        if (hasPersonal) {
          personalList = await getContractPersonalityTypeList({
            personalityType: "PERSONAL",
          }).unwrap();
          setPartiesPersonalLis(personalList);
        }

        if (hasLegal) {
          legalList = await getContractPersonalityTypeList({
            personalityType: "LEGAL",
          }).unwrap();
          setPartiesLegalLis(legalList);
        }

        const newPartiesList = value.parties.map((party) => {
          const isPersonal = party.personalityGroupType.name === "PERSONAL";
          return {
            id: party.id,
            partiesType: isPersonal ? "حقیقی" : "حقوقی",
            partiesTypeCode: isPersonal ? "1" : "2",
          };
        });
        setPartiesList(newPartiesList);

        const partyFormValues: Record<string, any> = {};
        value.parties.forEach((party) => {
          const isPersonal = party.personalityGroupType.name === "PERSONAL";
          const list = isPersonal ? personalList : legalList;
          const foundOption = list.find((opt) => opt.id === party.id);
          if (foundOption) {
            partyFormValues[`parti${party.id}`] =
              selectDefaultValueGenerator(foundOption);
          }
        });
        infoForm.setFieldsValue(partyFormValues);
      };

      setupParties();
    }
  };
  // add parties handler
  const onAddPartiesHandler = (e: { key: string }) => {
    const partiesGenerator = e.key === "1" ? "حقیقی" : "حقوقی";

    setPartiesList((prev) => [
      ...prev,
      {
        id: Math.random(),
        partiesType: partiesGenerator,
        partiesTypeCode: e.key,
      },
    ]);
  };

  const addPartiesItems = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-1">
          <GoPlusCircle />
          <span>افزودن طرفین حقیقی </span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-1">
          <GoPlusCircle />
          <span>افزودن طرفین حقوقی </span>
        </div>
      ),
    },
  ];

  // delete parties handler
  const onDeletePartiesHandler = (e: { key: string }) => {
    const findDeletedItemIndex = partiesList.findIndex((item) => item.id === +e.key);

    if (findDeletedItemIndex !== -1) {
      const deletedItem = partiesList[findDeletedItemIndex];
      const fieldName = `parti${deletedItem.id}`;

      // Remove the form field value
      infoForm.setFieldsValue({ [fieldName]: undefined });

      setPartiesList((prev) => [
        ...prev.slice(0, findDeletedItemIndex),
        ...prev.slice(findDeletedItemIndex + 1),
      ]);
    }
  };

  const templateChangeHandler = (options: ContractTemplateServiceType) => {
    const filteredServiceValue = serviceOptions.find(
      (s) => s.value === options?.item?.name
    )?.value;

    if (filteredServiceValue) {
      getCategoryList([filteredServiceValue])
        .unwrap()
        .then((value) => {
          const tempList = value?.map((item) => ({
            id: item?.categoryId,
            title: item?.title,
          }));

          setCategoryList(tempList);
        });
    }
  };

  const createBasicInfoHandler = (value: ContractsTemplateInfoFormType) => {
    if (partiesList?.length < 2) {
      return toast.warn(PARTIES_MIN_COUNT_WARN_MSG, {
        toastId: PARTIES_MIN_COUNT_WARN_MSG,
      });
    }

    // Collect parties IDs from form values
    const parties = partiesList
      .map((partyItem) => {
        const fieldName = `parti${partyItem.id}` as keyof ContractsTemplateInfoFormType;
        const selectedParty = value[fieldName] as SelectOptionType | undefined;
        return selectedParty?.item?.id;
      })
      .filter((id): id is number => id !== undefined && id !== null);

    // Convert date from timezone format to UTC ISO format
    const startDate = value?.startDate
      ? (() => {
          const date = new Date(value.startDate);
          // Extract date components in local time
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = date.getDate();
          // Create UTC date with same date components at midnight UTC
          const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
          return utcDate.toISOString();
        })()
      : new Date().toISOString();

    const reqBody = {
      ecosystemId: value?.ecosystem?.code,
      service: value?.templateService?.item?.name as string,
      categories: value?.services?.map((item) => item?.code),
      parties: parties,
      start: startDate,
      title: value?.templateTitle,
      subject: value?.subject,
      partitionCoefficientType: value?.financeConditionType?.map(
        (item) => item?.item?.name
      ) as string[],
    };

    if (params?.contractId) {
      updateContractTemplateBasicInfo({
        contractId: +params.contractId,
        body: reqBody,
      })
        .unwrap()
        .then(() => {
          setSearchParams({
            step: "2",
            contractId: params.contractId,
          });
        });
    } else {
      createContractTemplateBasicInfo(reqBody)
        .unwrap()
        .then((value) => {
          if (value) {
            setSearchParams({
              step: "2",
              contractId: value?.toString(),
            });
          }
        });
    }
  };

  const cancelClickHandler = () => {
    navigate({
      pathname: CONTRACTS_TEMPLATES_LIST_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={infoForm} onFinish={createBasicInfoHandler}>
      <Div loading={isGetContractinfoLoading}>
        <div className="flex flex-col gap-5">
          {/*  contract basic info */}
          <div>
            <CustomDivider text="اطلاعات اولیه قالب قرارداد" />
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} xs={24} sm={24}>
                <CustomSelect
                  options={ecosystemList ? ecosystemList : []}
                  label="اکوسیستم"
                  name="ecosystem"
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                  form={infoForm}
                  isLoading={isEcosystemListLoading}
                />
              </Col>
              <Col lg={12} md={12} xs={24} sm={24}>
                <CustomSelect
                  options={templateServiceList ? templateServiceList : []}
                  label="سرویس قالب قرارداد"
                  name="templateService"
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                  form={infoForm}
                  onChange={(_, options) =>
                    templateChangeHandler(options as ContractTemplateServiceType)
                  }
                  isLoading={isTemplateServiceListLoading}
                />
              </Col>
              <Col span={24}>
                <CustomSelect
                  options={categoryList}
                  label="خدمات"
                  name="services"
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                  mode="multiple"
                  form={infoForm}
                  disabled={templateService ? false : true}
                  isLoading={isCategoryListLoading}
                />
              </Col>
              <Col lg={12} md={12} xs={24} sm={24}>
                <CustomDatePicker
                  label="تاریخ شروع"
                  name="startDate"
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                  form={infoForm}
                />
              </Col>
              <Col lg={12} md={12} xs={24} sm={24}>
                <CustomSelect
                  options={
                    partitionCoefficientTypeList ? partitionCoefficientTypeList : []
                  }
                  label="نوع شرایط  مالی"
                  name="financeConditionType"
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                  mode="multiple"
                  form={infoForm}
                  isLoading={isPartitionCoefficientTypeListLoading}
                />
              </Col>
              <Col span={24}>
                <CustomInput
                  label="عنوان قالب قرارداد"
                  name="templateTitle"
                  placeholder="انتخاب کنید"
                  rules={[REQUIRED_RULE]}
                />
              </Col>
              <Col span={24}>
                <CustomTextArea
                  name="subject"
                  label="موضوع"
                  placeholder="موضوع"
                  maxLength={1024}
                  showCount
                  rules={[REQUIRED_RULE]}
                />
              </Col>
            </Row>
          </div>

          {/* contract template parties  */}
          <div className="gap- flex flex-col gap-4">
            <CustomDivider
              text="طرفین قالب قرارداد"
              extraContent={
                <div className="flex items-center gap-4">
                  <Space.Compact>
                    <CustomButton
                      icon={<PiTrashSimple />}
                      danger
                      disabled={partiesList?.length === 0}
                    >
                      حذف طرفین
                    </CustomButton>
                    <Dropdown
                      menu={{
                        items: partiesList?.map((item) => {
                          const fieldName =
                            `parti${item.id}` as keyof ContractsTemplateInfoFormType;
                          const selectedValue = formValues?.[fieldName] as
                            | SelectOptionType
                            | undefined;
                          const optionsList =
                            item?.partiesTypeCode === "1"
                              ? partiesPersonalLis
                              : partiesLegalLis;
                          let selectedLabel = "انتخاب نشده";

                          if (selectedValue) {
                            // Handle different value formats from CustomSelect
                            const valueId =
                              selectedValue?.item?.id ||
                              selectedValue?.value ||
                              selectedValue?.code ||
                              selectedValue;

                            const selectedOption = optionsList?.find(
                              (opt: any) =>
                                opt?.id === valueId || String(opt?.id) === String(valueId)
                            );

                            selectedLabel =
                              selectedOption?.title ||
                              selectedValue?.label ||
                              selectedValue?.item?.title ||
                              "انتخاب نشده";
                          }

                          return {
                            key: item.id,
                            label: (
                              <div className="flex items-center gap-1">
                                <LuTrash />
                                <span>
                                  {item.partiesType} - {selectedLabel}
                                </span>
                              </div>
                            ),
                          };
                        }),
                        onClick: (e) => onDeletePartiesHandler(e as { key: string }),
                      }}
                      placement="bottomRight"
                      disabled={partiesList?.length === 0}
                    >
                      <CustomButton icon={<PiDotsThreeBold />} danger>
                        {""}
                      </CustomButton>
                    </Dropdown>
                  </Space.Compact>
                  <Space.Compact>
                    <CustomButton icon={<GoPlus />} type="primary">
                      افزودن طرفین
                    </CustomButton>
                    <Dropdown
                      menu={{
                        items: addPartiesItems,
                        onClick: (e) => onAddPartiesHandler(e as { key: string }),
                      }}
                      placement="bottomRight"
                    >
                      <CustomButton icon={<PiDotsThreeBold />} type="primary">
                        {""}
                      </CustomButton>
                    </Dropdown>
                  </Space.Compact>
                </div>
              }
            />
            {partiesList.length === 0 ? (
              <div className="flex flex-col items-center gap-2">
                <AiOutlineUser size={18} />
                <span className="body-regular">
                  هنوز هیچ طرفینی برای قراداد ثبت نکرده اید.
                </span>
              </div>
            ) : (
              <Row gutter={[16, 16]}>
                {partiesList?.map((item, index) => (
                  <Col lg={6} md={8} xs={12} sm={24}>
                    <CustomSelect
                      options={
                        item?.partiesTypeCode === "1"
                          ? partiesPersonalLis
                          : partiesLegalLis
                      }
                      label={`طرف ${partiesPersianOrder[index]} قالب قرارداد(طرفین ${item?.partiesType})`}
                      name={`parti${item?.id}`}
                      placeholder="انتخاب کنید"
                      rules={index < 2 ? [REQUIRED_RULE] : []}
                      form={infoForm}
                      isLoading={isContractPersonalityTypeListLoading}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
          {/* action buttons */}
          <div className="flex items-center justify-end gap-2">
            <CustomButton danger onClick={cancelClickHandler}>
              انصراف
            </CustomButton>
            {/* Todo[Atefeh]: CTO said remove this delete if not necessary in future*/}
            {/* <CustomButton>ذخیره پیش نویس</CustomButton> */}
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={
                isCreateContractTemplateBasicInfoLoading ||
                isUpdateContractTemplateBasicInfoLoading
              }
            >
              تایید و ادامه
            </CustomButton>
          </div>
        </div>
      </Div>
    </Form>
  );
};

export default ContractsTemplateInfoStep;
