import { Col, Row } from "antd";
import momentj from "jalali-moment";

import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { PresenceAbsenceDrawerViewModePropsType } from "./@types/PresenceAbsenceDrawerViewModePropsType";

const PresenceAbsenceDrawerViewMode = ({
  onClose,
  data,
  cellDate,
  drawerLoading,
}: PresenceAbsenceDrawerViewModePropsType) => {
  return (
    <>
      <CustomDrawerHeader title="مشاهده وضعیت حضور و غیاب" closeDrawerHandler={onClose} />
      <Div loading={drawerLoading} className="p-8!">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="وضعیت حضور"
            value={data?.AssociationPresenceAbsence?.title}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            md={12}
            label="تاریخ"
            value={dataPlaceHolder({
              data: cellDate
                ? momentj.from(cellDate, "fa", "YYYY-MM-DD").format("YYYY-MM-DD")
                : "N/A",
              isDate: true,
            })}
          />
          <Col span={24}>
            <CustomTextArea
              label="توضیحات"
              name="description"
              value={data?.description}
              placeholder="توضیحات"
              disabled
              maxLength={100}
              showCount
            />
          </Col>
        </Row>
      </Div>
    </>
  );
};

export default PresenceAbsenceDrawerViewMode;
