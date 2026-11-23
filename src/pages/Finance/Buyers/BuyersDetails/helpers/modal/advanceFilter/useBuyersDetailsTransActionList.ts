import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";

import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import { useLazyGetAccountingAllSamimServiceQuery } from "@infra/states/redux/Apis/finance/accountingApi";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { GetAllSamimServiceResponse } from "@pages/Ticketing/_shared/@ticketingTypes";

import { BuyersDetailsTransActionListAdvanceFilterFormType } from "../../../@types/@buyersDetails";

const useBuyersDetailsTransActionListAdvanceFilter = ({
  advanceModalOpen,
  form,
}: {
  advanceModalOpen: boolean;
  form: FormInstance<BuyersDetailsTransActionListAdvanceFilterFormType>;
}) => {
  const [branchData, setBranchData] = useState<{ id: number; title: string }[]>([]);
  const [services, setServices] = useState<GetAllSamimServiceResponse>();

  const { params } = useQueryParams();

  const selectedBusiness = useWatch("business", form);

  //? ================================  Api Calls ================================
  // get business
  const [
    getBusinessData,
    { data: businessData, isFetching: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  // get branch
  const [getBranchesData, { isFetching: isBranchesDataLoading }] =
    useLazyGetBranchByBusinessQuery();

  // services
  const [
    getAllSamimService,
    { isFetching: isGetAllSamimServiceLoading, isSuccess: isGetAllSamimServiceSuccess },
  ] = useLazyGetAccountingAllSamimServiceQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (advanceModalOpen) {
      // business
      if (params?.businessId) {
        getBusinessData();
      }
    }
  }, [advanceModalOpen]);

  //* ================================ Util Functions ================================
  //  business
  const getBusinessHandler = () => {
    if (!isBusinessSuccess) {
      getBusinessData();
    }
  };

  // when business selected
  const onBusinessChangeHandler = (value: unknown) => {
    const businessIds = (value as string[]).map(Number);
    setBranchData([]);

    form.setFieldsValue({ branch: undefined });

    if (businessIds?.length >= 1) {
      getBranchesData({
        businessIds,
      })
        .unwrap()
        .then((value) => setBranchData(value));
    }
  };

  // services
  const getAllSamimServiceHandler = () => {
    if (!isGetAllSamimServiceSuccess) {
      getAllSamimService()
        .unwrap()
        .then((res) => setServices(res));
    }
  };

  // ================================ Filter Items ================================
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "گروه کاربری",
      name: "staffType",
      type: "select",
      isNeedsName: true,
      options: [
        { id: 1, title: "کارمند", name: "EMPLOYEE" },
        { id: 2, title: "دانشجو", name: "STUDENT" },
      ],
    },
    {
      label: "کسب و کار",
      name: "business",
      type: "select",
      mode: "multiple",
      options: businessData ? businessData : [],
      loading: businessLoading,
      onClick: getBusinessHandler,
      onChange: onBusinessChangeHandler,
    },
    {
      label: "شعبه",
      name: "branch",
      type: "select",
      mode: "multiple",
      options: branchData,
      loading: isBranchesDataLoading,
      notFoundContent: selectNotFoundContent,
      disabled: selectedBusiness?.length > 0 ? false : true,
    },
    {
      label: "سرویس",
      name: "services",
      type: "select",
      mode: "multiple",
      options: services,
      loading: isGetAllSamimServiceLoading,
      isNeedsName: true,
      onClick: getAllSamimServiceHandler,
    },
  ];

  return { filterItemsList };
};

export default useBuyersDetailsTransActionListAdvanceFilter;
