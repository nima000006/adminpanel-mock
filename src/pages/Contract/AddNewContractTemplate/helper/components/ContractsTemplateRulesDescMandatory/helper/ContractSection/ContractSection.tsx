import { useEffect, useState } from "react";

import { PiCheck, PiPencilLine } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useCreateContractTermMutation,
  useLazyGetContractTermListByContractTypeQuery,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  ContractSectionProps,
  ContractTermListByContractTypeType,
  GetContractTermListByContractTypeResponse,
  optionsItemTypes,
} from "./@types/@contractSectionTypes";
import { ContractsTemplateRulesDescMandatoryFormValues } from "../../@types/@contractsTemplateRulesDescMandatoryProps";

const ContractSection = ({ data, form, setTermsIds }: ContractSectionProps) => {
  const [templateOptions, setTemplateOptions] = useState<
    ContractTermListByContractTypeType[]
  >([]);

  const [isEditMode, setIsEditMode] = useState(false);

  const [termText, setTermText] = useState(data?.textArea?.defaultValue);

  const [termTitle, setTermTitle] = useState(data?.select?.options?.[0]?.title);

  //? ================================  Api Calls ================================
  const [
    getContractTermsOptions,
    { isFetching: isGetOptionsLoading, isSuccess: isGetOptionsSuccess },
  ] = useLazyGetContractTermListByContractTypeQuery();

  const [createContractTerm] = useCreateContractTermMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    form.setFieldsValue({
      [data.select.name]: selectDefaultValueGenerator(data?.select?.options?.[0]),
      [data.textArea.name]: data?.textArea?.defaultValue,
    });
  }, []);

  //* ================================ Util Functions ================================
  const getTermOptionList = () => {
    if (!isGetOptionsSuccess) {
      getContractTermsOptions({ contractType: data?.termType })
        .unwrap()
        .then(getContractTermsOptionsSuccess);
    }
  };

  const getContractTermsOptionsSuccess = async (
    value: GetContractTermListByContractTypeResponse
  ) => {
    setTemplateOptions(() => value?.map((item) => item));
  };

  const changeOptionHandler = (option: optionsItemTypes) => {
    form.setFieldsValue({
      [data.textArea.name]: option?.item?.clause,
    });

    setTermText(option?.item?.clause);

    setTermTitle(option?.title);

    setTermsIds((prev) => ({ ...prev, [data?.termType]: option?.code }));
  };

  const createContractTermHandler = () => {
    const formData =
      form.getFieldsValue() as ContractsTemplateRulesDescMandatoryFormValues;

    createContractTerm({
      type: data?.termType,
      clause: formData?.[
        data?.textArea?.name as keyof ContractsTemplateRulesDescMandatoryFormValues
      ] as string,
      faTitle: termTitle,
    })
      .unwrap()
      .then((value) => {
        setTermsIds((prev) => ({ ...prev, [data?.termType]: value }));

        setTermText(
          formData?.[
            data?.textArea?.name as keyof ContractsTemplateRulesDescMandatoryFormValues
          ] as string
        );

        setIsEditMode(false);
      });
  };

  return (
    <>
      {data?.dividerText && <CustomDivider text={data?.dividerText} />}

      {data?.select && (
        <CustomSelect
          {...data?.select}
          options={templateOptions?.length > 0 ? templateOptions : data?.select?.options}
          loading={isGetOptionsLoading}
          onClick={getTermOptionList}
          onChange={(_, option) => changeOptionHandler(option as optionsItemTypes)}
        />
      )}

      {isEditMode ? (
        data?.textArea && (
          <div className="flex flex-col">
            <div className="flex justify-end gap-1">
              <PiCheck className="cursor-pointer" onClick={createContractTermHandler} />
              <RxCross2 onClick={() => setIsEditMode(false)} className="cursor-pointer" />
            </div>
            <CustomTextArea
              {...data?.textArea}
              className="w-full"
              rules={[REQUIRED_RULE]}
            />
          </div>
        )
      ) : (
        <SingleVerticalWithCol
          span={24}
          value={termText}
          label={data?.textArea?.label}
          extraContent={
            <PiPencilLine
              onClick={() => setIsEditMode(true)}
              className="cursor-pointer"
            />
          }
        />
      )}
    </>
  );
};

export default ContractSection;
