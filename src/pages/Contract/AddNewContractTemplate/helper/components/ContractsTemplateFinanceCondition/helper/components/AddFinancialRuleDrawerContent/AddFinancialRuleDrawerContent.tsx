import { useEffect, useState, useRef, useMemo } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { debounce } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useAddNewContractBeneficiaryMutation,
  useEditNewContractBeneficiaryMutation,
  useLazyGetAllBeneficiarySupportQuery,
  useLazyGetAllPartitionCoefficientTypeByContractIdQuery,
  useLazyGetContractBranchIdQuery,
  useLazyGetContractBranchTypeQuery,
} from "@infra/states/redux/Apis/contracts/addNewContractTemplate/addNewContractTemplate";
import { useLazyGetContractPartiesQuery } from "@infra/states/redux/Apis/contracts/contractsTemplateList/contractsTemplateList";
import { useLazyManagementUsersAllCustomersListsQuery } from "@infra/states/redux/Apis/management/usersList/usersListApi";
import { GetContractPartiesResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateList/@types/ContractsTemplateListTypes";
import { ManagementAllCustomerDataResponse } from "@pages/management/CustomersList/AllCustomersList/@types/@managementUsersAllCustomersListTypes";

import { AddFinancialRuleDrawerContentProps } from "./@types/@addFinancialRuleDrawerContentProps";
import { EditingRecordExtended } from "./@types/@editingRecordExtended";
import BeneficiaryTypeDisplay from "./helper/components/BeneficiaryTypeDisplay/BeneficiaryTypeDisplay";
import CommonBeneficiaryFields from "./helper/components/CommonBeneficiaryFields/CommonBeneficiaryFields";
import IsSupplierCheckbox from "./helper/components/IsSupplierCheckbox/IsSupplierCheckbox";
import LegalBeneficiaryFields from "./helper/components/LegalBeneficiaryFields/LegalBeneficiaryFields";
import PersonalBeneficiaryFields from "./helper/components/PersonalBeneficiaryFields/PersonalBeneficiaryFields";
import { BeneficiaryType } from "./utils/enums";
import {
  FinancialRuleFormValues,
  getAllBeneficiarySupportResponse,
  getAllPartitionCoefficientTypeByContractIdResponse,
  getContractBranchIdResponse,
  getContractBranchTypeResponse,
} from "../../../@types/@contractTemplateFinanceCondition";
const AddFinancialRuleDrawerContent = ({
  closeDrawerHandler,
  selectedType,
  onSuccess,
  editingRecord,
}: AddFinancialRuleDrawerContentProps) => {
  const [partitionCoefficientType, setPartitionCoefficientType] =
    useState<getAllPartitionCoefficientTypeByContractIdResponse>();

  const [allBeneficiarySupport, setAllBeneficiarySupport] =
    useState<getAllBeneficiarySupportResponse>();

  const [contractBusiness, setContractBusiness] = useState<GetContractPartiesResponse>();

  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(null);

  const [contractBranchType, setContractBranchType] =
    useState<getContractBranchTypeResponse>([]);

  const [contractBranch, setContractBranch] = useState<getContractBranchIdResponse>([]);

  const [allUsersList, setAllUsersList] = useState<ManagementAllCustomerDataResponse>();

  const [isBranchTypeDisabled, setIsBranchTypeDisabled] = useState(true);
  const [isBranchIdDisabled, setIsBranchIdDisabled] = useState(true);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { params } = useQueryParams();

  const [form] = Form.useForm<FinancialRuleFormValues>();

  //? ================================  Api calls ================================
  const [
    getAllPartitionCoefficientTypeByContractId,
    { isFetching: isGetAllPartitionCoefficientTypeByContractIdLoading },
  ] = useLazyGetAllPartitionCoefficientTypeByContractIdQuery();

  const [getContractBeneficiary, { isFetching: isGetContractBeneficiaryLoading }] =
    useLazyGetAllBeneficiarySupportQuery();

  const [getContractBusiness, { isFetching: isGetContractBusinessLoading }] =
    useLazyGetContractPartiesQuery();

  const [getContractBranchType, { isFetching: isGetContractBranchLoading }] =
    useLazyGetContractBranchTypeQuery();

  const [getContractBranchId, { isFetching: isGetContractBranchIdLoading }] =
    useLazyGetContractBranchIdQuery();

  const [addNewContractBeneficiary, { isLoading: isAddNewContractBeneficiaryLoading }] =
    useAddNewContractBeneficiaryMutation();

  const [editNewContractBeneficiary, { isLoading: isEditNewContractBeneficiaryLoading }] =
    useEditNewContractBeneficiaryMutation();

  const [getAllUsersList, { isFetching: isGetAllUsersListLoading }] =
    useLazyManagementUsersAllCustomersListsQuery();

  //? ================================ Effects  ================================

  useEffect(() => {
    getAllPartitionCoefficientTypeByContractId({
      contractId: +params?.contractId,
    })
      .unwrap()
      .then((res: getAllPartitionCoefficientTypeByContractIdResponse) => {
        setPartitionCoefficientType(res);
      });
  }, []);

  useEffect(() => {
    getContractBeneficiary()
      .unwrap()
      .then((res: getAllBeneficiarySupportResponse) => {
        setAllBeneficiarySupport(res);
      });
  }, []);

  useEffect(() => {
    getContractBusiness({ page: 0, size: 1000 }) // We should set 0 and 1000 to get data
      .unwrap()
      .then((res: GetContractPartiesResponse) => {
        setContractBusiness(res);
      });
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!editingRecord) {
      form.resetFields();
      setSelectedBusinessId(null);
      setContractBranchType([]);
      setContractBranch([]);
      setIsBranchTypeDisabled(true);
      setIsBranchIdDisabled(true);
      return;
    }

    if (!contractBusiness?.content || !allBeneficiarySupport) {
      return;
    }

    // پیدا کردن businessId از لیست کسب‌وکارها بر اساس business title
    const businessItem = contractBusiness.content.find(
      (item) => item.title === editingRecord.business
    );
    const businessId = businessItem?.id;

    const extendedRecord = editingRecord as EditingRecordExtended;
    form.setFieldsValue({
      business: businessId ? String(businessId) : undefined,
      branchType: editingRecord.branchType?.name,
      partitionCoefficient: editingRecord.partitionCoefficient,
      isSupplier: editingRecord.supplier ? ([true] as boolean[]) : ([] as boolean[]),
      shareHolderService: editingRecord.supportId
        ? String(editingRecord.supportId)
        : undefined,
      calculationMethod: editingRecord.partitionCoefficientType ?? undefined,
    });

    if (
      selectedType === BeneficiaryType.PERSONAL_DETERMINED &&
      editingRecord.beneficiary
    ) {
      const knownNationalCode =
        editingRecord.nationalCode || extendedRecord?.username || extendedRecord?.user;

      if (knownNationalCode) {
        form.setFieldsValue({ user: knownNationalCode });
      } else {
        getAllUsersList({
          pageNo: 0,
          pageSize: 100,
          username: editingRecord.beneficiary,
        })
          .unwrap()
          .then((res: ManagementAllCustomerDataResponse) => {
            const matchedUser = res?.content?.find(
              (u) =>
                `${u?.firstName} ${u?.lastName}` === editingRecord?.beneficiary ||
                u?.username === editingRecord?.beneficiary
            );
            if (matchedUser) {
              setAllUsersList(res);
              form.setFieldsValue({ user: matchedUser.username });
            }
          });
      }
    }

    if (businessId && editingRecord.branchType) {
      setSelectedBusinessId(businessId);
      getContractBranchType({ businessId })
        .unwrap()
        .then((res: getContractBranchTypeResponse) =>
          getContractBranchTypeSuccess(res, businessId)
        )
        .catch(() => {
          setIsBranchTypeDisabled(true);
        });
    }
  }, [editingRecord, contractBusiness?.content, allBeneficiarySupport]);

  const getContractBranchTypeSuccess = (
    res: getContractBranchTypeResponse,
    businessId: number
  ) => {
    setContractBranchType(res);
    setIsBranchTypeDisabled(false);

    if (editingRecord?.branchType?.name) {
      getContractBranchId({
        businessId,
        type: editingRecord?.branchType?.name,
      })
        .unwrap()
        .then((res: getContractBranchIdResponse) => getContractBranchIdSuccess(res))
        .catch(() => {
          setIsBranchIdDisabled(true);
        });
    }
  };

  const getContractBranchIdSuccess = (res: getContractBranchIdResponse) => {
    setContractBranch(res);
    setIsBranchIdDisabled(false);
    if (!editingRecord) return;
    if (editingRecord.branchId) {
      form.setFieldsValue({
        branch: String(editingRecord.branchId),
      });
    }
  };

  //* ================================ Util Functions ================================
  const userOption = useMemo(() => {
    const options = (allUsersList?.content ?? []).map((user) => ({
      id: user.username,
      title: `${user.firstName} ${user.lastName} (${user.username})`,
      value: user.username,
    }));

    if (editingRecord) {
      const editOptionId = editingRecord.nationalCode || editingRecord.beneficiary;
      const editOptionTitle = editingRecord.nationalCode
        ? `${editingRecord.beneficiary} (${editingRecord.nationalCode})`
        : editingRecord.beneficiary;

      if (editOptionId && !options.some((opt) => opt.id === editOptionId)) {
        options.unshift({
          id: editOptionId,
          title: editOptionTitle,
          value: editOptionId,
        });
      }
    }

    return options;
  }, [allUsersList, editingRecord]);

  const getAllUsersListSuccess = (
    res: ManagementAllCustomerDataResponse,
    trimmedValue: string
  ) => {
    // فیلتر کردن نتایج بر اساس username، firstName و lastName
    const searchLower = trimmedValue.toLowerCase();
    const filteredContent = res.content?.filter((user) => {
      const usernameMatch = user.username?.toLowerCase().includes(searchLower);
      const firstNameMatch = user.firstName?.toLowerCase().includes(searchLower);
      const lastNameMatch = user.lastName?.toLowerCase().includes(searchLower);
      const fullNameMatch = `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchLower);

      return usernameMatch || firstNameMatch || lastNameMatch || fullNameMatch;
    });
    setAllUsersList({
      ...res,
      content: filteredContent || [],
    });
  };
  // Handler برای جستجوی کاربران با debounce
  const debouncedUserSearch = debounce((value: string) => {
    if (!value) {
      setAllUsersList(undefined);
      return;
    }

    getAllUsersList({
      pageNo: 0,
      pageSize: 100,
      username: value,
    })
      .unwrap()
      .then((res: ManagementAllCustomerDataResponse) =>
        getAllUsersListSuccess(res, value)
      );
  }, 500);

  const handleBusinessChange = (value: unknown) => {
    const businessId = Number(value);

    setSelectedBusinessId(businessId || null);

    // reset پایین‌دست
    form.setFieldsValue({
      branchType: undefined,
      branch: undefined,
    });

    setContractBranchType([]);
    setContractBranch([]);
    setIsBranchTypeDisabled(true);
    setIsBranchIdDisabled(true);

    if (!businessId) return;

    getContractBranchType({ businessId })
      .unwrap()
      .then((res: getContractBranchTypeResponse) => {
        setContractBranchType(res);
        setIsBranchTypeDisabled(false);
      })
      .catch(() => {
        setIsBranchTypeDisabled(true);
      });
  };

  const handleBranchTypeChange = (value: unknown) => {
    if (!selectedBusinessId) return;

    const branchTypeName = String(value);

    if (!branchTypeName) return;

    // reset شعبه
    form.setFieldsValue({ branch: undefined });
    setContractBranch([]);
    setIsBranchIdDisabled(true);

    getContractBranchId({
      businessId: selectedBusinessId,
      type: branchTypeName, // ارسال name به API
    })
      .unwrap()
      .then((res: getContractBranchIdResponse) => {
        setContractBranch(res);
        setIsBranchIdDisabled(false);
      })
      .catch(() => {
        setIsBranchIdDisabled(true);
      });
  };

  const onFinish = () => {
    const values = form.getFieldsValue();

    const {
      calculationMethod,
      partitionCoefficient,
      shareHolderService,
      business,
      branchType,
      branch,
      user,
      isSupplier,
    } = values;

    const body: {
      ruleType: string;
      partitionCoefficientType: string;
      partitionCoefficient: number;
      beneficiarySupportId: number;
      isSupplier?: boolean;
      username?: string;
      nationalCode?: string;
      businessId?: number;
      branchType?: string;
      branchId?: number;
    } = {
      ruleType: selectedType,
      partitionCoefficientType: calculationMethod as string,
      partitionCoefficient: Number(partitionCoefficient),
      beneficiarySupportId: Number(shareHolderService as string),
    };

    if (selectedType !== BeneficiaryType.GROUPING) {
      // isSupplier is an array from Checkbox.Group: [true] when checked, [] when unchecked
      body.isSupplier = Array.isArray(isSupplier) && isSupplier.includes(true);
    }

    // حقوقی
    if (
      selectedType === BeneficiaryType.LEGAL_DETERMINED ||
      selectedType === BeneficiaryType.LEGAL_UNDETERMINED
    ) {
      body.businessId = Number(business);
      body.branchType = branchType;
    }

    // فقط حقوقی قطعی
    if (selectedType === BeneficiaryType.LEGAL_DETERMINED) {
      body.branchId = Number(branch);
    }

    // حقیقی قطعی
    if (selectedType === BeneficiaryType.PERSONAL_DETERMINED) {
      body.username = String(user);
      body.nationalCode = String(user);
    }

    // اگر در حالت ویرایش هستیم، از mutation ویرایش استفاده کن
    if (editingRecord) {
      editNewContractBeneficiary({
        ruleBeneficiaryId: editingRecord.id,
        body,
      })
        .unwrap()
        .then(() => {
          onSuccess();
          closeDrawerHandler();
        });
    } else {
      // در حالت افزودن جدید
      addNewContractBeneficiary({
        categoryId: +params?.categoryId,
        contractId: +params?.contractId,
        body,
      })
        .unwrap()
        .then(() => {
          onSuccess();
          closeDrawerHandler();
        });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form<FinancialRuleFormValues> form={form} layout="vertical" onFinish={onFinish}>
      <CustomDrawerHeader
        title={editingRecord ? "ویرایش قانون مالی" : "افزودن قانون مالی"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="flex gap-1">
            <CustomButton danger onClick={closeDrawerHandler}>
              انصراف
            </CustomButton>
            <CustomButton
              type="primary"
              loading={
                isAddNewContractBeneficiaryLoading || isEditNewContractBeneficiaryLoading
              }
              htmlType="submit"
            >
              ثبت قانون مالی
            </CustomButton>
          </div>
        }
      />

      <BeneficiaryTypeDisplay selectedType={selectedType} />

      {(selectedType === BeneficiaryType.LEGAL_UNDETERMINED ||
        selectedType === BeneficiaryType.GROUPING) && (
        <SingleVerticalWithCol span={24} label="ذینفعان" value="کاربران حقوقی متغیر" />
      )}

      {selectedType === BeneficiaryType.PERSONAL_UNDETERMINED && (
        <SingleVerticalWithCol span={24} label="ذینفعان" value="کاربران حقیقی متغیر" />
      )}

      {selectedType !== BeneficiaryType.GROUPING && <IsSupplierCheckbox />}

      {(selectedType === BeneficiaryType.LEGAL_DETERMINED ||
        selectedType === BeneficiaryType.LEGAL_UNDETERMINED) && (
        <LegalBeneficiaryFields
          contractBusiness={contractBusiness}
          contractBranchType={contractBranchType}
          contractBranch={contractBranch}
          isGetContractBusinessLoading={isGetContractBusinessLoading}
          isGetContractBranchLoading={isGetContractBranchLoading}
          isGetContractBranchIdLoading={isGetContractBranchIdLoading}
          isBranchTypeDisabled={isBranchTypeDisabled}
          isBranchIdDisabled={isBranchIdDisabled}
          onBusinessChange={handleBusinessChange}
          onBranchTypeChange={handleBranchTypeChange}
          showBranch={selectedType === BeneficiaryType.LEGAL_DETERMINED}
        />
      )}

      {selectedType === BeneficiaryType.PERSONAL_DETERMINED && (
        <PersonalBeneficiaryFields
          userOptions={userOption}
          isGetAllUsersListLoading={isGetAllUsersListLoading}
          onUserSearch={debouncedUserSearch}
        />
      )}

      <CommonBeneficiaryFields
        allBeneficiarySupport={allBeneficiarySupport}
        partitionCoefficientType={partitionCoefficientType}
        isGetContractBeneficiaryLoading={isGetContractBeneficiaryLoading}
        isGetAllPartitionCoefficientTypeByContractIdLoading={
          isGetAllPartitionCoefficientTypeByContractIdLoading
        }
      />
    </Form>
  );
};

export default AddFinancialRuleDrawerContent;
