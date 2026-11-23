import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useAddRequiredTermsToContractMutation,
  useLazyGetContractDefaultTermListQuery,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractTemplateDetailQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";

import {
  ContractsTemplateRulesDescMandatoryFormValues,
  TermsItemsTypes,
} from "./@types/@contractsTemplateRulesDescMandatoryProps";
import ContractSection from "./helper/ContractSection/ContractSection";

const ContractsTemplateRulesDescMandatory = () => {
  const [termsItems, setTermItems] = useState<TermsItemsTypes[]>([]);

  const [termIds, setTermsIds] = useState({
    COMMITMENT: 0,
    GUARANTEE: 0,
    LIQUIDATED_DAMAGES: 0,
    DISPUTE_RESOLUTION: 0,
    ACCOUNTING_SETTLEMENT_CONDITION: 0,
    TERMINATION_CONDITION: 0,
  });

  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);

  const [form] = Form.useForm<ContractsTemplateRulesDescMandatoryFormValues>();

  const { params, setSearchParams } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDefaultTermsList, { isFetching: isDefaultTermsListLoading }] =
    useLazyGetContractDefaultTermListQuery();

  const [addRequiredTermsToContract] = useAddRequiredTermsToContractMutation();

  const [getContractinfo, { isFetching: isGetContractinfoLoading }] =
    useLazyGetContractTemplateDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    const contractId = params?.contractId;

    const buildTermItems = (
      contractInfoData?: Awaited<ReturnType<typeof getContractinfo>>["data"] | null,
      defaultTermsData?: Awaited<ReturnType<typeof getDefaultTermsList>>["data"] | null
    ) => {
      const commitment = contractInfoData?.commitments || defaultTermsData?.commitment;
      const guarantee = contractInfoData?.guarantees || defaultTermsData?.guarantee;
      const liquidatedDamages =
        contractInfoData?.liquidatedDamages || defaultTermsData?.liquidatedDamages;
      const disputeResolution =
        contractInfoData?.disputedResolution || defaultTermsData?.disputeResolution;
      const accountingSettlementCondition =
        contractInfoData?.accountingSettlementConditions ||
        defaultTermsData?.accountingSettlementCondition;
      const terminationCondition =
        contractInfoData?.terminationConditions || defaultTermsData?.terminationCondition;

      const termItemData = [
        ...(commitment
          ? [
              {
                dividerText: "تعهدات",
                select: {
                  name: "commitment",
                  label: "قالب پیش فرض پیشنهادی",
                  placeholder: "انتخاب کنید",
                  className: "w-full max-w-[600px]",
                  options: [
                    {
                      id: commitment?.id,
                      title: commitment?.title,
                    },
                  ],
                },
                textArea: {
                  name: "obligations",
                  label: "بند1:تعهدات قالب قرارداد",
                  placeholder: "متن تعهدات قالب قرارداد را وارد کنید.",
                  rows: 8,
                  defaultValue: commitment?.clause,
                },
                termType: commitment?.type,
              },
            ]
          : []),
        ...(guarantee
          ? [
              {
                dividerText: "ضمانت نامه و تضمین",
                select: {
                  name: "guarantee",
                  label: "قالب پیش فرض پیشنهادی",
                  placeholder: "انتخاب کنید",
                  className: "w-full max-w-[600px]",
                  options: [
                    {
                      id: guarantee?.id,
                      title: guarantee?.title,
                    },
                  ],
                },
                textArea: {
                  name: "warrantyObligations",
                  label: "بند2:ضمانت نامه و تضمین",
                  placeholder: "متن ضمانت نامه و تضمین قرارداد را وارد کنید.",
                  rows: 8,
                  defaultValue: guarantee?.clause,
                },
                termType: guarantee?.type,
              },
            ]
          : []),
        ...(liquidatedDamages
          ? [
              {
                dividerText: "جرائم و خسارات",
                select: {
                  name: "liquidatedDamages",
                  label: "قالب پیش فرض پیشنهادی",
                  placeholder: "انتخاب کنید",
                  className: "w-full max-w-[600px]",
                  options: [
                    {
                      id: liquidatedDamages?.id,
                      title: liquidatedDamages?.title,
                    },
                  ],
                },
                textArea: {
                  name: "crimesAndDamages",
                  label: "بند3:جرائم و خسارات",
                  placeholder: "متن جرائم و خسارات قرارداد را وارد کنید.",
                  defaultValue: liquidatedDamages?.clause,
                  rows: 8,
                },
                termType: liquidatedDamages?.type,
              },
            ]
          : []),
        ...(disputeResolution
          ? [
              {
                dividerText: "حل اختلاف",
                select: {
                  name: "disputeResolution",
                  label: "قالب پیش فرض پیشنهادی",
                  placeholder: "انتخاب کنید",
                  className: "w-full max-w-[600px]",
                  options: [
                    {
                      id: disputeResolution?.id,
                      title: disputeResolution?.title,
                    },
                  ],
                },
                textArea: {
                  name: "crimesAndDamagesDifferences",
                  label: "بند4:حل اختلافات",
                  placeholder: "متن حل اختلافات قرارداد را وارد کنید.",
                  rows: 8,
                  defaultValue: disputeResolution?.clause,
                },
                termType: disputeResolution?.type,
              },
            ]
          : []),
        ...(accountingSettlementCondition
          ? [
              {
                dividerText: "شرایط پرداخت و تسویه حساب",
                select: {
                  name: "accountingSettlementCondition",
                  label: "قالب پیش فرض پیشنهادی",
                  placeholder: "انتخاب کنید",
                  className: "w-full max-w-[600px]",
                  options: [
                    {
                      id: accountingSettlementCondition?.id,
                      title: accountingSettlementCondition?.title,
                    },
                  ],
                },
                textArea: {
                  name: "paymentAndSettlementConditions",
                  label: "بند5:شرایط پرداخت و تسویه حساب",
                  placeholder: "متن شرایط پرداخت و تسویه حساب قرارداد را وارد کنید.",
                  rows: 8,
                  defaultValue: accountingSettlementCondition?.clause,
                },
                termType: accountingSettlementCondition?.type,
              },
            ]
          : []),
        ...(terminationCondition
          ? [
              {
                dividerText: "شرایط فسخ",
                select: {
                  name: "terminationCondition",
                  label: "قالب پیش فرض پیشنهادی",
                  placeholder: "انتخاب کنید",
                  className: "w-full max-w-[600px]",
                  options: [
                    {
                      id: terminationCondition?.id,
                      title: terminationCondition?.title,
                    },
                  ],
                },
                textArea: {
                  name: "cancellationConditions",
                  label: "بند6:شرایط فسخ",
                  placeholder: "متن شرایط فسخ قرارداد را وارد کنید.",
                  rows: 8,
                  defaultValue: terminationCondition?.clause,
                },
                termType: terminationCondition?.type,
              },
            ]
          : []),
      ];

      setTermItems(termItemData);

      setTermsIds({
        COMMITMENT: commitment?.id ?? 0,
        GUARANTEE: guarantee?.id ?? 0,
        LIQUIDATED_DAMAGES: liquidatedDamages?.id ?? 0,
        DISPUTE_RESOLUTION: disputeResolution?.id ?? 0,
        ACCOUNTING_SETTLEMENT_CONDITION: accountingSettlementCondition?.id ?? 0,
        TERMINATION_CONDITION: terminationCondition?.id ?? 0,
      });
    };

    const hasContractTermsData = (
      data: Awaited<ReturnType<typeof getContractinfo>>["data"]
    ) => {
      return !!(
        data?.commitments ||
        data?.guarantees ||
        data?.liquidatedDamages ||
        data?.disputedResolution ||
        data?.accountingSettlementConditions ||
        data?.terminationConditions
      );
    };

    const fallbackToDefaults = () => {
      getDefaultTermsList()
        .unwrap()
        .then((defaultTermsData) => {
          buildTermItems(null, defaultTermsData);
        });
    };

    if (contractId) {
      getContractinfo(+contractId)
        .unwrap()
        .then((contractInfoData) => {
          if (hasContractTermsData(contractInfoData)) {
            buildTermItems(contractInfoData, null);
          } else {
            fallbackToDefaults();
          }
        })
        .catch(() => {
          fallbackToDefaults();
        });
    } else {
      fallbackToDefaults();
    }
  }, []);

  //* ================================ Util Functions ================================
  const cancelBtnHandler = () => {
    setSearchParams({
      ...params,
      step: "1",
    });
  };

  const submitContractTerms = () => {
    return addRequiredTermsToContract({
      body: {
        commitments: termIds?.COMMITMENT,
        guarantees: termIds?.GUARANTEE,
        liquidatedDamages: termIds?.LIQUIDATED_DAMAGES,
        disputedResolution: termIds?.DISPUTE_RESOLUTION,
        accountingSettlementConditions: termIds?.ACCOUNTING_SETTLEMENT_CONDITION,
        terminationConditions: termIds?.TERMINATION_CONDITION,
      },
      id: +params?.contractId,
    });
  };

  const draftBtnHandler = () => {
    form.validateFields().then(() => {
      setIsDraftLoading(true);
      submitContractTerms()
        .unwrap()
        .finally(() => {
          setIsDraftLoading(false);
        });
    });
  };

  const nextBtnHandler = () => {
    form.validateFields().then(() => {
      setIsNextLoading(true);
      submitContractTerms()
        .unwrap()
        .then(() => {
          setSearchParams({
            ...params,
            step: "3",
          });
        })
        .finally(() => {
          setIsNextLoading(false);
        });
    });
  };

  return (
    <Form form={form}>
      <Div loading={isDefaultTermsListLoading || isGetContractinfoLoading}>
        {termsItems.map((item) => (
          <ContractSection
            key={item.dividerText}
            data={item}
            form={form}
            setTermsIds={setTermsIds}
          />
        ))}
        <div className="mt-20! flex justify-end gap-1">
          <CustomButton onClick={cancelBtnHandler}>بازگشت</CustomButton>
          <CustomButton onClick={draftBtnHandler} loading={isDraftLoading}>
            ذخیره پیش نویس
          </CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            onClick={nextBtnHandler}
            loading={isNextLoading}
          >
            تایید و ادامه
          </CustomButton>
        </div>
      </Div>
    </Form>
  );
};

export default ContractsTemplateRulesDescMandatory;
