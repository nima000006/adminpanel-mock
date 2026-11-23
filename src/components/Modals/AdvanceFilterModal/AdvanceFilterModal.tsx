import { useEffect } from "react";

import { Form, Modal, Row } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { selectDefaultValueGenerator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";

import {
  AdvanceFilterModalProps,
  AdvanceModalSelectType,
  FormDataValueType,
} from "./@types/@advanceFilterModal";
import FilterItems from "./helper/components/FilterItems/FilterItems";
import "./_advanceFilterModal.scss";

const AdvanceFilterModal = <T extends Record<string, any>>({
  title = "فیلتر پیشرفته",
  isModalOpen,
  closeModalHandler,
  width = 800,
  mode = "urlSet",
  filterItemsList = [],
  badgeCounter,
  form,
  defaultParams,
}: AdvanceFilterModalProps<T>) => {
  const { params, setSearchParams } = useQueryParams();

  //? ================================ Effects ================================

  useEffect(() => {
    if (!isModalOpen) return;

    // FOR SYNCING THE MODAL WITH DATA AFTER REFRESHING THE PAGE
    for (const elem of filterItemsList) {
      if (`${elem.name}Title` in params && `${elem.name}Id` in params) {
        // SELECT
        const idList = params?.[`${elem.name}Id`]?.split(","); //[1,2,3]
        const titleList = params?.[`${elem.name}Title`]?.split("@"); // ["saman","mamad","akbar"]
        const nameList = params?.[`${elem.name}Name`]?.split(","); // ["SAMAN","MAMAD","AKBAR"]

        // const currentItemConfig = filterItemsList.find((item) => item.name === elem);
        const currentItemConfig = elem;

        const tempList = idList?.map((item, index) => {
          const tempData: { [key: string]: string } = {};

          if (currentItemConfig?.isNeedsName) {
            tempData[currentItemConfig.itemOptionName || "name"] = nameList[index];
          }

          if (Object.keys(tempData).length > 0) {
            return { id: +item, title: titleList[index], ...tempData };
          } else {
            return { id: +item, title: titleList[index] };
          }
        });

        form.setFieldsValue({
          [elem.name]: selectDefaultValueGenerator(tempList),
        } as Partial<T>);
      } else if (`${elem.name}Title` in params) {
        // INPUT AND DATE
        form.setFieldsValue({
          [elem.name]: params?.[`${elem.name}Title`],
        } as Partial<T>);
      } else if (`${elem.name}DateStart` in params && `${elem.name}DateEnd` in params) {
        //RANGE
        form.setFieldsValue({
          [elem.name]: [
            params?.[`${elem.name}DateStart`],
            params?.[`${elem.name}DateEnd`],
          ],
        } as Partial<T>);
      } else if (`${elem.name}MinAmount` in params && `${elem.name}MaxAmount` in params) {
        //SLIDER

        form.setFieldsValue({
          [elem.name]: [
            Number(params[`${elem.name}MinAmount`]),
            Number(params[`${elem.name}MaxAmount`]),
          ],
        } as Partial<T>);
      }
    }
  }, []);

  //* ================================ Util Functions ================================
  const resetFilterItemsHandler = () => {
    if (mode === "urlSet") {
      form.resetFields();
      //! Convert to plain object (in case params is a URLSearchParams-like object)
      const clearedParams = { ...params };

      filterItemsList.forEach((item) => {
        const keyPrefix = String(item.name).toLowerCase();
        Object.keys(clearedParams).forEach((paramKey) => {
          if (paramKey.toLowerCase().startsWith(keyPrefix)) {
            delete clearedParams[paramKey];
            delete clearedParams?.badger;
          }
        });
      });

      // ✅ Remove from URL without re-injecting from defaultParams
      setSearchParams({
        ...Object.fromEntries(
          Object.entries(clearedParams).filter(([_, v]) => v !== undefined && v !== null)
        ),
      });

      badgeCounter?.(0);
    } else {
      form.resetFields();
      badgeCounter?.(0);
    }
    closeModalHandler();
  };

  const onFormSubmitHandler = async (formData: Record<string, FormDataValueType>) => {
    let count = 0;

    if (mode === "urlSet") {
      const newParams: Record<string, string> = {};
      // newParams = {
      // branchesTitle:"saman@mamad@akbar",
      // branchesId:"1,2,3",
      // foodNameTitle:"kebab",
      // foodNameId:"1",
      // priceTitle:"dollar"
      // }

      Object.entries(formData).forEach(([key, value]: [string, FormDataValueType]) => {
        const currentItemConfig = filterItemsList.find((item) => item.name === key);

        if (
          Array.isArray(value) &&
          value?.length === 2 &&
          typeof value[0] === "string" &&
          typeof value[1] === "string"
        ) {
          // RANGE PICKER
          newParams[`${key}DateStart`] = value[0]; // {rangeDateStart:"2025-07-11T03:30:00.000Z"}
          newParams[`${key}DateEnd`] = value[1]; // {rangeDateEnd:"2025-07-11T03:30:00.000Z"}
          // todo[Saman]:age ta 2ta item ba name yeksan dashte bashim, moshkel pish miad
          count = count + 1;
        } else if (
          Array.isArray(value) &&
          value.length === 2 &&
          typeof value[0] === "number" &&
          typeof value[1] === "number"
        ) {
          //  SLIDER NUMERIC RANGE
          newParams[`${key}MinAmount`] = value[0];
          newParams[`${key}MaxAmount`] = value[1];
          count = count + 1;
        } else if (Array.isArray(value) && value?.length > 0) {
          // MULTI SELECT
          const titleList = value?.map((item: AdvanceModalSelectType) => item?.label);
          const idList = value?.map((item: AdvanceModalSelectType) => item?.code);

          newParams[`${key}Title`] = titleList?.join("@"); // {branchesTitle:"saman@mamad@akbar"}
          newParams[`${key}Id`] = idList?.join(","); // {branchesId:"1,2,3"}

          if (currentItemConfig?.isNeedsName) {
            const nameList = value?.map(
              (item: AdvanceModalSelectType) => item?.item?.name
            );

            newParams[`${key}Name`] = nameList?.join(",");
          }

          count = count + 1;
        } else if (typeof value === "object" && !Array.isArray(value) && value !== null) {
          //SINGLE SELECT
          newParams[`${key}Title`] = value?.label; // {foodNameTitle:"kebab"}
          newParams[`${key}Id`] = value?.code?.toString(); // {foodNameId:"1"}
          if (currentItemConfig?.isNeedsName) {
            newParams[`${key}Name`] = value?.item?.name ?? "";
          }

          count = count + 1;
        } else if (typeof value === "string" && value !== "") {
          // INPUT and DATE
          newParams[`${key}Title`] = value; // {priceTitle:"dollar"}

          count = count + 1;
        } else if (
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0) || // select
          (typeof value === "string" && value.trim() === "") // input
        ) {
          if (defaultParams) {
            delete defaultParams[`${key}Title`];
            delete defaultParams[`${key}Id`];
            delete defaultParams[`${key}Name`];
            delete defaultParams[`${key}DateStart`];
            delete defaultParams[`${key}DateEnd`];
          }
        }

        // if selected page and page size, when filter modal closed, the page should reset and start from 0/1 but page size does not reset again
        const pageSizeCheck = "PageSize";
        const pageCheck = "Page";

        if (defaultParams) {
          Object.entries(defaultParams).forEach(([key, _]: [string, string]) => {
            if (
              key.includes(pageCheck?.toLocaleLowerCase()) &&
              !key.includes(pageSizeCheck?.toLocaleLowerCase())
            ) {
              delete defaultParams[key];
            }
          });
        }
      });
      // Build final params
      const finalParams = {
        ...defaultParams,
        ...newParams,
      };

      // ❌ If count == 0 => remove "badger"
      if (count) {
        finalParams.badger = count.toString();
      } else {
        delete finalParams.badger;
      }

      // Update URL
      setSearchParams(finalParams);
    } else {
      // FORM SET VERSION
    }
    badgeCounter?.(count);

    closeModalHandler();
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={() => closeModalHandler()}
      footer={null}
      width={width}
      className="advance-filter-modal-content-container"
    >
      <Form form={form} onFinish={onFormSubmitHandler}>
        <Row gutter={[16, 16]} className="modal-body-container">
          {filterItemsList?.map((item) => (
            <FilterItems data={item} form={form} />
          ))}
        </Row>
        <div className="action-btns-container">
          <CustomButton onClick={resetFilterItemsHandler}>پاک کردن فیلترها</CustomButton>
          <div className="left-btns">
            <CustomButton onClick={closeModalHandler}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit">
              اعمال
            </CustomButton>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AdvanceFilterModal;
