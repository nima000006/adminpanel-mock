import { useEffect, useState } from "react";

import { Form } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateBedMutation,
  useEditBedMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/@types/@activeResidenceBedListType";
import ModifySecondFloorBedContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/components/ModifySecondFloorBedContent/ModifySecondFloorBedContent";
import ModifySingleFloorBedContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/components/ModifySingleFloorBedContent/ModifySingleFloorBedContent";
import ModifyThreeFloorBedContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/components/ModifyThreeFloorBedContent/ModifyThreeFloorBedContent";
import {
  CreateBedItemBody,
  ModifyBedDrawerContentFormType,
  ModifyBedDrawerContentProps,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/helper/drawer/ModifyBedDrawerContent/@types/@modifyBedDrawerContentTypes";
import {
  BED_POSITION,
  SELECT_BED_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ModifyBedDrawerContent = ({
  closeModifyDrawerHandler,
  getBedListHandler,
  getBedDetailHandler,
  id,
  unitUuid,
  buildingTitle,
  floorTitle,
  unitTitle,
  bedTypeList,
}: ModifyBedDrawerContentProps) => {
  const { params: url } = useQueryParams();
  const [form] = Form.useForm<ModifyBedDrawerContentFormType>();
  const [bedDetailData, setBedDetailData] = useState<
    getActiveResidenceBedDetailResponse | undefined
  >();

  const selectedBedType = bedTypeList?.find(
    (item: IdTitleName) => item?.name === url?.bedStatus
  );
  const bedTypeTitle = selectedBedType?.title ?? bedDetailData?.bedType?.title ?? "";
  const bedType = url?.bedStatus ?? bedDetailData?.bedType?.name ?? "";

  //? ================================  Api Calls ================================
  const [createBed, { isLoading: isCreateBedLoading }] = useCreateBedMutation();
  const [editBed, { isLoading: isEditBedLoading }] = useEditBedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id === "-1") return;

    getBedDetailHandler(id)?.then((res: getActiveResidenceBedDetailResponse) => {
      setBedDetailData(res);
      form.setFieldsValue({
        bedTitle: res?.title ?? "",
        bedNo: res?.assetNumber ?? "",
      });
    });
  }, [id]);

  //* ================================ Util Functions ================================
  const buildCreateBedItems = (
    values: ModifyBedDrawerContentFormType
  ): CreateBedItemBody[] => {
    if (
      bedType === SELECT_BED_TYPE.singleFloor ||
      bedType === SELECT_BED_TYPE.sleepEarth ||
      bedType === SELECT_BED_TYPE.double
    ) {
      return [
        {
          faTitle: values?.bedTitle ?? "",
          bedType,
          assetNumber: values?.bedNo ?? "",
        },
      ];
    }

    if (bedType === SELECT_BED_TYPE.secondFloor) {
      return [
        {
          faTitle: values?.bedTitle ?? "",
          bedType,
          bedPosition: BED_POSITION.lower,
          assetNumber: values?.bedNo ?? "",
        },
        {
          faTitle: values?.bedUpTitle ?? "",
          bedType,
          bedPosition: BED_POSITION.upper,
          assetNumber: values?.bedUpNo ?? "",
        },
      ];
    }

    if (bedType === SELECT_BED_TYPE.threeFloor) {
      return [
        {
          faTitle: values?.bedTitle ?? "",
          bedType,
          bedPosition: BED_POSITION.lower,
          assetNumber: values?.bedNo ?? "",
        },
        {
          faTitle: values?.bedMiddleTitle ?? "",
          bedType,
          bedPosition: BED_POSITION.middle,
          assetNumber: values?.bedMiddleNo ?? "",
        },
        {
          faTitle: values?.bedUpTitle ?? "",
          bedType,
          bedPosition: BED_POSITION.upper,
          assetNumber: values?.bedUpNo ?? "",
        },
      ];
    }

    return [];
  };

  const modifyHandler = () => {
    form.validateFields().then((values) => {
      if (id !== "-1") {
        editBed({
          uuid: id,
          body: {
            faTitle: values?.bedTitle ?? "",
            assetNumber: values?.bedNo ?? "",
          },
        })
          .unwrap()
          .then(onModifyBedSuccess);
        return;
      }

      const items = buildCreateBedItems(values);
      if (!items.length || !unitUuid) return;

      createBed({
        uuid: unitUuid,
        body: { items },
      })
        .unwrap()
        .then(onModifyBedSuccess);
    });
  };

  const onModifyBedSuccess = () => {
    closeModifyDrawerHandler();
    getBedListHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomDrawerHeader
        title={id === "-1" ? "ایجاد تخت" : "ویرایش تخت"}
        closeDrawerHandler={closeModifyDrawerHandler}
        leftSideContent={
          <>
            <CustomButton onClick={closeModifyDrawerHandler}>انصراف</CustomButton>

            <CustomButton
              type="primary"
              onClick={modifyHandler}
              loading={isCreateBedLoading || isEditBedLoading}
            >
              {id === "-1" ? "ثبت و ایجاد تخت" : "ثبت و اعمال تغییرات"}
            </CustomButton>
          </>
        }
      />

      <div>
        {id === "-1" ? "ایجاد تخت برای اقامتگاه" : "ویرایش تخت برای اقامتگاه"}{" "}
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{buildingTitle}</span> در طبقه{" "}
        <span className="text-neutral-13 font-bold">{floorTitle}</span> در واحد اقامتی{" "}
        <span className="text-neutral-13 font-bold">{unitTitle}</span>
      </div>

      {bedType === SELECT_BED_TYPE?.singleFloor ||
      bedType === SELECT_BED_TYPE?.sleepEarth ||
      bedType === SELECT_BED_TYPE?.double ? (
        <ModifySingleFloorBedContent
          id={id}
          bedTypeTitle={bedTypeTitle}
          bedDetailData={bedDetailData}
        />
      ) : bedType === SELECT_BED_TYPE?.secondFloor ? (
        <ModifySecondFloorBedContent
          id={id}
          bedTypeTitle={bedTypeTitle}
          bedDetailData={bedDetailData}
        />
      ) : bedType === SELECT_BED_TYPE?.threeFloor ? (
        <ModifyThreeFloorBedContent
          id={id}
          bedTypeTitle={bedTypeTitle}
          bedDetailData={bedDetailData}
        />
      ) : null}
    </Form>
  );
};

export default ModifyBedDrawerContent;
