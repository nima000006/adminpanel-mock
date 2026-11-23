import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import IconTab from "@components/Renderers/IconTab/IconTab";
import useQueryParams from "@infra/hooks/useQueryParams";
import { MyCreateBedModalContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/modal/MyCreateBedModalContent/@types/@myCreateBedModalContentTypes";
import { SELECT_BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

import doubleBed from "../../../../../../../../../../../assets/images/dormitory/doubleBed.svg";
import secondFloorBed from "../../../../../../../../../../../assets/images/dormitory/secondFloorBed.svg";
import singleFloorBed from "../../../../../../../../../../../assets/images/dormitory/singleFloorBed.svg";
import sleepEarth from "../../../../../../../../../../../assets/images/dormitory/sleepEarth.svg";
import threeFloorBed from "../../../../../../../../../../../assets/images/dormitory/threeFloorBed.svg";

const BED_TYPE_IMAGE: Record<string, string> = {
  [SELECT_BED_TYPE.singleFloor]: singleFloorBed,
  [SELECT_BED_TYPE.secondFloor]: secondFloorBed,
  [SELECT_BED_TYPE.threeFloor]: threeFloorBed,
  [SELECT_BED_TYPE.sleepEarth]: sleepEarth,
  [SELECT_BED_TYPE.double]: doubleBed,
};

const MyCreateBedModalContent = ({
  setIsModifyDrawerOpen,
  bedTypeList,
  isGetBedTypeLoading,
}: MyCreateBedModalContentProps) => {
  const { params: url, setSearchParams } = useQueryParams();

  //* ================================ Util Functions ================================
  const changeCardHandler = (bedStatus: string) => {
    setSearchParams({ ...url, bedStatus });
    setIsModifyDrawerOpen({ isOpen: true, id: "-1" });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetBedTypeLoading} className="grid gap-5">
      <CustomAlert showIcon title="قصد ایجاد چه نوع تختی دارید؟" type="info" />

      <div className="grid grid-cols-5 gap-4">
        {bedTypeList?.map((bedType) => (
          <IconTab
            key={bedType?.name ?? bedType?.id}
            img={BED_TYPE_IMAGE[bedType?.name] ?? singleFloorBed}
            title={bedType?.title}
            clickHandler={() => changeCardHandler(bedType?.name)}
          />
        ))}
      </div>
    </Div>
  );
};
export default MyCreateBedModalContent;
