import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import { MyViewBedDetailDrawerContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/@types/@myActiveResidenceBedListType";
import { SELECT_BED_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyViewBedDetailDrawerContent = ({
  data,
  loading,
  buildingTitle,
  floorTitle,
  unitTitle,
  closeViewDrawerHandler,
}: MyViewBedDetailDrawerContentProps) => {
  const { params: url } = useQueryParams();
  const bedType = BED_TYPE[data?.bedType?.name as keyof typeof BED_TYPE];
  const Icon = bedType?.icon;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده تخت"
        closeDrawerHandler={closeViewDrawerHandler}
      />

      <div>
        "مشاهده تخت برای اقامتگاه"
        <span className="text-neutral-13 font-bold">{url?.residenceTitle}</span> در
        ساختمان <span className="text-neutral-13 font-bold">{buildingTitle}</span> در طبقه{" "}
        <span className="text-neutral-13 font-bold">{floorTitle}</span> در واحد اقامتی{" "}
        <span className="text-neutral-13 font-bold">{unitTitle}</span>
      </div>

      <CustomDivider
        text="اطلاعات تخت"
        extraContent={
          <div className="flex gap-2">
            {bedType && (
              <CustomTag className="flex w-fit gap-1" color={bedType.color}>
                {Icon && <Icon size={16} />}
                {bedType.label}
              </CustomTag>
            )}

            <CustomTag
              className="w-fit"
              color={data?.occupancy?.title === "بدون ساکن" ? "default" : "green"}
            >
              {data?.occupancy?.title}
            </CustomTag>
          </div>
        }
      />

      <Div loading={loading}>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="کد تخت"
            value={data?.bedNumber}
          />
          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="عنوان تخت"
            value={data?.title}
          />
          {data?.bedType?.name === SELECT_BED_TYPE?.secondFloor ||
          data?.bedType?.name === SELECT_BED_TYPE?.threeFloor ? (
            <SingleVerticalWithCol
              md={12}
              xl={12}
              lg={12}
              label="موقعیت تخت"
              value={data?.bedPosition?.title}
            />
          ) : null}

          <SingleVerticalWithCol
            md={12}
            xl={12}
            lg={12}
            label="شماره اموال"
            value={data?.assetNumber}
          />
        </Row>
      </Div>
    </div>
  );
};
export default MyViewBedDetailDrawerContent;
