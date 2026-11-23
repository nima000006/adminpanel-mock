import { ReactNode, useEffect } from "react";

import { Row } from "antd";
import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router";

import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetAllAdmissionDetailProgramInfoQuery,
  useLazyGetMyAdmissionDetailProgramInfoQuery,
} from "@infra/states/redux/Apis/dormitory/admission/admissionApi";
import { ReservableCapacityType } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionDetailProgramInfoContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailProgramInfoContent/@types/@admissionDetailProgramInfoContent";
import {
  MY_ADMISSION_STATUS,
  RESERVABLE_CAPACITY_LABEL,
  RESERVABLE_CAPACITY_TYPE,
  toCapacitiesMode,
} from "@pages/Dormitory/Admission/_shared/util";

const capacityIconMap: Record<
  ReservableCapacityType,
  (props: { fillColor?: string; size?: string }) => ReactNode
> = {
  [RESERVABLE_CAPACITY_TYPE.bed]: (props) => <BedIcon {...props} />,
  [RESERVABLE_CAPACITY_TYPE.unit]: (props) => <RoomIcon {...props} />,
  [RESERVABLE_CAPACITY_TYPE.building]: (props) => <BuildingIcon {...props} />,
};

const AdmissionDetailProgramInfoContent = ({
  variant,
  editTo,
  status,
}: AdmissionDetailProgramInfoContentProps) => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const isAllVariant = variant === "all";
  const isMyVariant = variant === "my";
  const showEdit = status === MY_ADMISSION_STATUS.waiting;

  //? ================================ Api Calls ================================
  const [
    getAllAdmissionDetailProgramInfo,
    {
      data: allAdmissionDetailProgramInfoData,
      isFetching: isGetAllAdmissionDetailProgramInfoLoading,
    },
  ] = useLazyGetAllAdmissionDetailProgramInfoQuery();

  const [
    getMyAdmissionDetailProgramInfo,
    {
      data: myAdmissionDetailProgramInfoData,
      isFetching: isGetMyAdmissionDetailProgramInfoLoading,
    },
  ] = useLazyGetMyAdmissionDetailProgramInfoQuery();

  const admissionDetailProgramInfoData = isMyVariant
    ? myAdmissionDetailProgramInfoData
    : allAdmissionDetailProgramInfoData;
  const isGetAdmissionDetailProgramInfoLoading = isMyVariant
    ? isGetMyAdmissionDetailProgramInfoLoading
    : isGetAllAdmissionDetailProgramInfoLoading;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.id) return;

    if (isMyVariant) {
      getMyAdmissionDetailProgramInfo(url.id);
      return;
    }

    if (isAllVariant) {
      getAllAdmissionDetailProgramInfo(url.id);
    }
  }, [isAllVariant, isMyVariant, url?.id]);

  //* ================================ Util Functions ================================
  const hasSaleUnitType = !!admissionDetailProgramInfoData?.saleUnitType;
  const reservableCapacity = toCapacitiesMode(
    admissionDetailProgramInfoData?.saleUnitType?.name
  );
  const CapacityIcon = capacityIconMap[reservableCapacity];
  const reservableCapacityLabel = hasSaleUnitType
    ? (admissionDetailProgramInfoData?.saleUnitType?.title ??
      RESERVABLE_CAPACITY_LABEL[reservableCapacity])
    : "-";
  const visibilityLabel = admissionDetailProgramInfoData
    ? admissionDetailProgramInfoData.visible
      ? "قابل نمایش"
      : "غیر قابل نمایش"
    : "-";

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetAdmissionDetailProgramInfoLoading}>
      <div className="flex flex-col gap-6">
        {isAllVariant && showEdit && editTo && (
          <CustomDivider
            text=""
            extraContent={
              <CustomButton
                type="dashed"
                icon={<PiPencilLine />}
                onClick={() => navigate(editTo)}
              >
                ویرایش
              </CustomButton>
            }
          />
        )}

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="عنوان برنامه پذیرش"
            value={admissionDetailProgramInfoData?.title}
          />
          <SingleVerticalWithCol
            label="کسب و کار"
            value={admissionDetailProgramInfoData?.businessTitle}
          />
          <SingleVerticalWithCol
            label="شعبه / واحد"
            value={admissionDetailProgramInfoData?.branchTitle}
          />
          <SingleVerticalWithCol
            label="اقامتگاه"
            value={admissionDetailProgramInfoData?.accommodationTitle}
          />
          <SingleVerticalWithCol
            label="نوع مدیریت"
            value={admissionDetailProgramInfoData?.managementType?.title}
          />
        </Row>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-neutral-12 text-sm">
              ظرفیت قابل رزرو در این برنامه پذیرش
            </span>
            <CustomTag
              className="w-fit gap-1"
              color="default"
              icon={
                hasSaleUnitType ? (
                  <CapacityIcon fillColor="var(--app-text)" size="14" />
                ) : undefined
              }
            >
              {reservableCapacityLabel}
            </CustomTag>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-12 text-sm">وضعیت نمایش به کاربران</span>
            <CustomTag
              color={admissionDetailProgramInfoData?.visible ? "green" : "default"}
            >
              {visibilityLabel}
            </CustomTag>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default AdmissionDetailProgramInfoContent;
