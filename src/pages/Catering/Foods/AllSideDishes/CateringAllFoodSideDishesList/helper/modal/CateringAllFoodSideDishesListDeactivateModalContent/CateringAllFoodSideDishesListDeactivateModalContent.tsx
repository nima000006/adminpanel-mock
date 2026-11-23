import { useState } from "react";

import { Form } from "antd";

import { CustomSelect } from "@components/CustomInputs";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useGetDeactiveReasonsQuery } from "@infra/states/redux/Apis/catering/selfs/selfsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { selectNotFoundContent } from "@pages/_shared/utils";
import { CateringAllFoodSideDishesListDeactivateModalContentProps } from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/modal/CateringAllFoodSideDishesListDeactivateModalContent/@types/@cateringAllFoodSideDishesListDeactivateModalContent";

const CateringAllFoodSideDishesListDeactivateModalContent = ({
  record,
  form,
}: CateringAllFoodSideDishesListDeactivateModalContentProps) => {
  const [shouldFetchDeactiveReasons, setShouldFetchDeactiveReasons] = useState(false);

  //? ================================ Api Calls ================================
  const { data: deactiveReasonsData, isFetching: isGetDeactiveReasonsLoading } =
    useGetDeactiveReasonsQuery(undefined, {
      skip: !shouldFetchDeactiveReasons,
    });

  const deactivateReasonOptions =
    deactiveReasonsData?.map((item) => ({
      id: item.id,
      title: item.faTitle ?? item.title,
    })) ?? [];

  const recordLabel = [record?.baseProductTitle, record?.title]
    .filter(Boolean)
    .join(" | ");

  //* ================================ Util Functions ================================
  const getDeactiveReasonsHandler = () => {
    if (!shouldFetchDeactiveReasons) {
      setShouldFetchDeactiveReasons(true);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-sm text-(--app-text)">
        <p>می‌خواهید این مخلفات را غیرفعال کنید؟</p>
        <p>{dataPlaceHolder({ data: recordLabel })}</p>
        <p className="mt-3">
          اگر این مورد در برنامه غذایی‌های فعال استفاده شده باشد، همچنان باید آن را تأمین
          کنید؛ مگر اینکه آن برنامه را لغو کنید و مبلغ را برگردانید.
        </p>
      </div>

      <Form form={form} layout="vertical" className="flex flex-col gap-5">
        <CustomSelect
          name="deActiveReason"
          label="علت غیر فعالسازی"
          placeholder="انتخاب کنید"
          options={deactivateReasonOptions}
          form={form}
          isLoading={isGetDeactiveReasonsLoading}
          onClick={getDeactiveReasonsHandler}
          notFoundContent={selectNotFoundContent}
          rules={[REQUIRED_RULE]}
        />
      </Form>
    </div>
  );
};

export default CateringAllFoodSideDishesListDeactivateModalContent;
