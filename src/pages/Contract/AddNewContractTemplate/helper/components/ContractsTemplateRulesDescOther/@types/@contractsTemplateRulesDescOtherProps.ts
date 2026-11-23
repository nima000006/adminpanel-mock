//! APIs
export type AddOtherTermsToContractRequest = {
  body: {
    otherTerms: number[];
  };
  id: number;
};

export type ContractsTemplateRulesDescOtherFormValues = {
  title: string;
  text: string;
};
