import { Dispatch, SetStateAction, useEffect } from "react";

import { FormInstance } from "antd";
import { NamePath } from "antd/es/form/interface";

import { CustomCheckboxGroup, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import { useLazyGetNearbyPlaceTemplatesDormitoryQuery } from "@infra/states/redux/Apis/dormitory/basicInfo/basicInfoApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { NEARBY_PLACE_TYPE } from "@pages/Dormitory/Residence/_shared/util";
import { GetResidenceDataResponse } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";
import { ResidenceInfoStepContentFormType } from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/drawer/CreateResidenceDrawerContent/helper/components/ResidenceInfoStepContent/@types/@residenceInfoStepContent";

export const placesAroundResidenceStepFields = (
  checkedPlaces: string[] = []
): NamePath[] => {
  return checkedPlaces.map((uuid) => `address-${uuid}`);
};

const PlacesAroundResidenceStepContent = ({
  form,
  dataSource,
  checkedPlaces,
  setCheckedPlaces,
  setSelectedNearbyPlaceUuids,
}: {
  form: FormInstance<ResidenceInfoStepContentFormType>;
  dataSource?: GetResidenceDataResponse;
  checkedPlaces: string[];
  setCheckedPlaces: Dispatch<SetStateAction<string[]>>;
  setSelectedNearbyPlaceUuids: Dispatch<SetStateAction<Record<string, string>>>;
}) => {
  //? ================================  Api Calls ================================
  // template
  const [
    getNearbyPlaceTemplatesDormitory,
    { data: nearbyPlaceTemplates, isFetching: isGetNearbyPlaceTemplatesDormitoryLoading },
  ] = useLazyGetNearbyPlaceTemplatesDormitoryQuery();

  //? ================================ Effects ================================
  // nearby place templates
  useEffect(() => {
    getNearbyPlaceTemplatesDormitory();
  }, []);

  //* ================================ Util Functions ================================
  // edit mode — fill nearby places
  useEffect(() => {
    if (!dataSource?.nearbyPlaces?.length || !nearbyPlaceTemplates?.length) return;

    const nextChecked: string[] = [];
    const nearbyPlaceUuidMap: Record<string, string> = {};
    const addressValues: Record<string, string | string[]> = {};

    dataSource.nearbyPlaces.forEach((place) => {
      const matchedPlace = nearbyPlaceTemplates.find(
        (item) =>
          item.title === place.title ||
          item.placeType?.name === place.title ||
          item.placeType?.title === place.title ||
          (place.uuid && item.uuid === place.uuid)
      );

      if (!matchedPlace) return;

      nextChecked.push(matchedPlace.uuid);
      // only keep entity uuid when it differs from template uuid
      if (place.uuid && place.uuid !== matchedPlace.uuid) {
        nearbyPlaceUuidMap[matchedPlace.uuid] = place.uuid;
      }
      addressValues[matchedPlace.uuid] = [matchedPlace.uuid];
      addressValues[`address-${matchedPlace.uuid}`] = place.description ?? "";
    });

    if (!nextChecked.length) return;

    setCheckedPlaces((prev) => [...new Set([...prev, ...nextChecked])]);
    setSelectedNearbyPlaceUuids((prev) => ({ ...prev, ...nearbyPlaceUuidMap }));
    form.setFieldsValue(addressValues);
  }, [dataSource, nearbyPlaceTemplates]);

  // keep checkbox Form values in sync with checked places
  useEffect(() => {
    if (!nearbyPlaceTemplates?.length || checkedPlaces.length === 0) return;

    const checkboxValues = nearbyPlaceTemplates.reduce(
      (acc, item) => {
        if (checkedPlaces.includes(item.uuid)) {
          acc[item.uuid] = [item.uuid];
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    form.setFieldsValue(checkboxValues);
  }, [nearbyPlaceTemplates, checkedPlaces]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
  return (
    <Div
      className="flex flex-col gap-6"
      loading={isGetNearbyPlaceTemplatesDormitoryLoading}
    >
      <CustomAlert
        showIcon
        title=""
        description="اماکن اطراف اقامتگاه را مشخص نمایید"
        type="info"
      />

      {nearbyPlaceTemplates?.map((item) => {
        const nearbyPlaceType =
          NEARBY_PLACE_TYPE[item?.placeType?.name as keyof typeof NEARBY_PLACE_TYPE];
        const Icon = nearbyPlaceType?.icon;
        const isChecked = checkedPlaces.includes(item?.uuid);

        return (
          <div
            key={item.uuid}
            className={`bg-neutral-2 rounded-lg p-4 [&>div]:m-0! ${isChecked ? "border border-[#1890FF]" : ""}`}
          >
            <CustomCheckboxGroup
              name={item?.uuid}
              label=""
              onChange={(e) => {
                const values = e.target.value as string[];
                const checked = values.includes(item.uuid);

                setCheckedPlaces((prev) => {
                  if (checked) {
                    return prev.includes(item.uuid) ? prev : [...prev, item.uuid];
                  }

                  return prev.filter((value) => value !== item.uuid);
                });
              }}
              options={[
                {
                  label: (
                    <div className="align-center flex gap-2 pr-4">
                      {Icon ? <Icon color="#595959" size={24} /> : null}
                      <span className="h5-regular font-bold">{item?.title}</span>
                    </div>
                  ),
                  value: item?.uuid,
                },
              ]}
            />
            {isChecked && (
              <CustomTextArea
                label="آدرس"
                name={`address-${item?.uuid}`}
                placeholder={`لطفاً توضیحات لازم را وارد نمایید به عنوان مثال تعداد ${item.title} یا فاصله از ${item.title}`}
                showCount
                maxLength={128}
                rules={[REQUIRED_RULE]}
              />
            )}
          </div>
        );
      })}
    </Div>
  );
};
export default PlacesAroundResidenceStepContent;
