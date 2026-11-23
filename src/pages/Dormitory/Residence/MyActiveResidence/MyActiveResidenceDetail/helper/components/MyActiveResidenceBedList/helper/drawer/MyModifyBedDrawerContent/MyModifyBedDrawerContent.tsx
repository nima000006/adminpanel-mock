import { useEffect, useState } from "react";

import { Form } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useCreateMyBedMutation,
  useEditMyBedMutation,
} from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { getMyActiveResidenceBedDetailResponse } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";
import MyModifySecondFloorBedContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/components/MyModifySecondFloorBedContent/MyModifySecondFloorBedContent";
import MyModifySingleFloorBedContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/components/MyModifySingleFloorBedContent/MyModifySingleFloorBedContent";
import MyModifyThreeFloorBedContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/components/MyModifyThreeFloorBedContent/MyModifyThreeFloorBedContent";
import {
  CreateBedItemBody,
  MyModifyBedDrawerContentFormType,
  MyModifyBedDrawerContentProps,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/drawer/MyModifyBedDrawerContent/@types/@myModifyBedDrawerContentTypes";
import {
  BED_POSITION,
  SELECT_BED_TYPE,
} from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyModifyBedDrawerContent = ({
  closeModifyDrawerHandler,
  getBedListHandler,
  getBedDetailHandler,
  id,
  unitUuid,
  buildingTitle,
  floorTitle,
  unitTitle,
  bedTypeList,
}: MyModifyBedDrawerContentProps) => {
  const { params: url } = useQueryParams();
  const [form] = Form.useForm<MyModifyBedDrawerContentFormType>();
  const [bedDetailData, setBedDetailData] = useState<
    getMyActiveResidenceBedDetailResponse | undefined
  >();

  const selectedBedType = bedTypeList?.find(
    (item: IdTitleName) => item?.name === url?.bedStatus
  );
  const bedTypeTitle = selectedBedType?.title ?? bedDetailData?.bedType?.title ?? "";
  const bedType = url?.bedStatus ?? bedDetailData?.bedType?.name ?? "";

  //? ================================  Api Calls ================================
  const [createMyBed, { isLoading: isCreateMyBedLoading }] = useCreateMyBedMutation();
  const [editMyBed, { isLoading: isEditMyBedLoading }] = useEditMyBedMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id === "-1") return;

    getBedDetailHandler(id)?.then((res: getMyActiveResidenceBedDetailResponse) => {
      setBedDetailData(res);
      form.setFieldsValue({
        bedTitle: res?.title ?? "",
        bedNo: res?.assetNumber ?? "",
      });
    });
  }, [id]);

  //* ================================ Util Functions ================================
  const buildCreateBedItems = (
    values: MyModifyBedDrawerContentFormType
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
        editMyBed({
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

      createMyBed({
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
              loading={isCreateMyBedLoading || isEditMyBedLoading}
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
        <MyModifySingleFloorBedContent
          id={id}
          bedTypeTitle={bedTypeTitle}
          bedDetailData={bedDetailData}
        />
      ) : bedType === SELECT_BED_TYPE?.secondFloor ? (
        <MyModifySecondFloorBedContent
          id={id}
          bedTypeTitle={bedTypeTitle}
          bedDetailData={bedDetailData}
        />
      ) : bedType === SELECT_BED_TYPE?.threeFloor ? (
        <MyModifyThreeFloorBedContent
          id={id}
          bedTypeTitle={bedTypeTitle}
          bedDetailData={bedDetailData}
        />
      ) : null}
    </Form>
  );
};

export default MyModifyBedDrawerContent;
