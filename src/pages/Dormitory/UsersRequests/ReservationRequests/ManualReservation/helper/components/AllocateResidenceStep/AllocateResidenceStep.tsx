import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineArrowLeft, AiOutlineFilter } from "react-icons/ai";
import { PiSortDescending } from "react-icons/pi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSearchBox from "@components/CustomInputs/CustomSearchBox/CustomSearchBox";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  AllocateResidenceFormType,
  AllocationType,
} from "./@types/@allocateResidenceStep";
import { filterAllocationItems, sortAllocationItemsByPrice } from "./helper/utils";
import {
  getAllocationItemsByType,
  MANUAL_RESERVATION_ALLOCATION_TYPE,
} from "../../mock/manualReservationAllocations";
import { MANUAL_RESERVATION_MOCK_PROFORMA } from "../../mock/manualReservationProforma";
import AllocateLocationFilter from "./helper/components/AllocateLocationFilter/AllocateLocationFilter";
import AllocateResidenceCard from "./helper/components/AllocateResidenceCard/AllocateResidenceCard";
import "./_allocateResidenceStep.scss";

const SELECT_ALLOCATION_REQUIRED_MSG = "لطفا یک گزینه تخصیص را انتخاب کنید.";

const ALLOCATION_COPY: Record<
  AllocationType,
  { dividerTitle: string; searchPlaceholder: string }
> = {
  bed: {
    dividerTitle: "تخت‌ها",
    searchPlaceholder: "جستجو کد یا نام تخت",
  },
  unit: {
    dividerTitle: "واحدهای اقامتی",
    searchPlaceholder: "جستجو کد یا نام واحد",
  },
  building: {
    dividerTitle: "ساختمان‌ها",
    searchPlaceholder: "جستجو کد یا نام ساختمان",
  },
};

const AllocateResidenceStep = () => {
  const [form] = Form.useForm<AllocateResidenceFormType>();
  const navigate = useNavigate();
  const { params, setSearchParams } = useQueryParams();
  const [priceSortDirection, setPriceSortDirection] = useState<"asc" | "desc">("desc");
  const [searchValue, setSearchValue] = useState("");

  const allocationType =
    MANUAL_RESERVATION_ALLOCATION_TYPE[params?.allocationType as AllocationType] ??
    MANUAL_RESERVATION_ALLOCATION_TYPE.bed;

  const selectedAllocationId = Form.useWatch("selectedAllocationId", form);
  const copy = ALLOCATION_COPY[allocationType];

  const visibleItems = sortAllocationItemsByPrice(
    filterAllocationItems(getAllocationItemsByType(allocationType), searchValue),
    priceSortDirection
  );

  //* ================================ Effects  ================================

  useEffect(() => {
    const firstItemId = getAllocationItemsByType(allocationType)[0]?.id;
    form.setFieldsValue({
      selectedAllocationId: firstItemId,
      filterBuilding: undefined,
      filterFloor: undefined,
      filterUnit: undefined,
    });
  }, [allocationType, form]);

  //* ================================ Util Functions ================================

  const cancelClickHandler = () => {
    navigate(DORMITORY_USER_REQUESTS_RESERVATION_REQUESTS_PAGE_ROUTE);
  };

  const backClickHandler = () => {
    setSearchParams({ ...params, step: "2" });
  };

  const searchChangeHandler = (value?: string) => {
    setSearchValue(String(value ?? ""));
  };

  const sortClickHandler = () => {
    setPriceSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const allocationChangeHandler = (allocationId: string) => {
    form.setFieldValue("selectedAllocationId", allocationId);
  };

  const buildAllocationSummary = (item: (typeof visibleItems)[number]) => {
    const unitMeta = item.metaItems.find((meta) => meta.label === "واحد اقامتی");
    const floorMeta = item.metaItems.find((meta) => meta.label === "طبقه");
    const parts = [
      unitMeta ? `اتاق ${unitMeta.value}` : undefined,
      floorMeta?.value,
      item.title,
      item.tagLabel,
      item.subtitle,
    ].filter(Boolean);

    return parts.join("، ");
  };

  const submitClickHandler = async () => {
    if (visibleItems.length === 0) {
      toast.error("موردی برای تخصیص یافت نشد.", {
        toastId: "allocate-residence-empty",
      });
      return;
    }

    const { selectedAllocationId: allocationId } = await form.validateFields([
      "selectedAllocationId",
    ]);
    const selectedItem =
      visibleItems.find((item) => item.id === allocationId) ??
      getAllocationItemsByType(allocationType).find((item) => item.id === allocationId);

    setSearchParams({
      ...params,
      step: "4",
      ...(selectedItem
        ? { allocationSummary: buildAllocationSummary(selectedItem) }
        : {}),
      payableAmount: String(MANUAL_RESERVATION_MOCK_PROFORMA.payableAmount),
    });
  };

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submitClickHandler}
      className="flex flex-col gap-6"
    >
      {allocationType === "bed" || allocationType === "unit" ? (
        <AllocateLocationFilter allocationType={allocationType} />
      ) : null}

      <Div className="flex flex-col gap-6">
        <CustomDivider
          text={`${copy.dividerTitle}(${visibleItems.length})`}
          className="body-regular mb-0!"
          extraContent={
            <div className="flex items-center gap-2">
              <CustomButton icon={<AiOutlineFilter size={16} />}>
                فیلتر پیشرفته
              </CustomButton>
              <CustomButton
                icon={<PiSortDescending size={16} />}
                onClick={sortClickHandler}
              >
                مرتب سازی قیمت
              </CustomButton>
            </div>
          }
        />

        <CustomSearchBox<AllocateResidenceFormType>
          urlKey="search"
          mode="client"
          placeholder={copy.searchPlaceholder}
          form={form}
          hasUrlSync={false}
          className="mb-0"
          onChange={searchChangeHandler}
          onPressEnter={() => searchChangeHandler(form.getFieldValue("search"))}
        />

        <CustomInput
          name="selectedAllocationId"
          rules={[CUSTOM_REQUIRED_RULE(SELECT_ALLOCATION_REQUIRED_MSG)]}
          className="mb-0!"
          hidden
        />

        {visibleItems.length === 0 ? (
          <p className="text-neutral-11 body-regular m-0 text-right">
            موردی با این جستجو یافت نشد.
          </p>
        ) : (
          <CustomRadioGroup
            value={selectedAllocationId}
            onChange={(e) => allocationChangeHandler(e.target.value)}
            options={visibleItems.map((item) => ({
              value: item.id,
              label: (
                <AllocateResidenceCard item={item} allocationType={allocationType} />
              ),
            }))}
            containerClassName="allocate-residence-radio w-full [&_.ant-form-item]:mb-0 [&_.ant-form-item-control]:w-full! [&_.ant-radio-group]:w-full"
            radioClassName="w-full"
            className="mb-0!"
          />
        )}

        <div className="flex items-center justify-end gap-4">
          <CustomButton onClick={cancelClickHandler}>انصراف</CustomButton>
          <CustomButton onClick={backClickHandler}>بازگشت</CustomButton>
          <CustomButton
            type="primary"
            htmlType="submit"
            icon={<AiOutlineArrowLeft />}
            iconPlacement="end"
          >
            ثبت و ادامه
          </CustomButton>
        </div>
      </Div>
    </Form>
  );
};

export default AllocateResidenceStep;
