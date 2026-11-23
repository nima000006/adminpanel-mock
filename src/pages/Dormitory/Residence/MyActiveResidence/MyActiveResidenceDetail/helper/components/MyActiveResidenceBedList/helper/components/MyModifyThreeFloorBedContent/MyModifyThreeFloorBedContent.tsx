import { Col, Row } from "antd";

import { CustomInput } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { MyModifyThreeFloorBedContentProps } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/helper/components/MyModifyThreeFloorBedContent/@types/@myModifyThreeFloorBedContentTypes";

const MyModifyThreeFloorBedContent = ({
  id,
  bedTypeTitle,
  bedDetailData,
}: MyModifyThreeFloorBedContentProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      {/* اطلاعات پایه */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <CustomDivider text="اطلاعات پایه" />
          <Row gutter={[16, 16]}>
            {id !== "-1" ? (
              <>
                <SingleVerticalWithCol
                  md={12}
                  lg={12}
                  xl={12}
                  label="کد تخت"
                  value={bedDetailData?.bedNumber}
                />
                <SingleVerticalWithCol
                  md={12}
                  lg={12}
                  xl={12}
                  label="موقعیت تخت"
                  value={bedDetailData?.bedPosition?.title}
                />
              </>
            ) : null}

            <SingleVerticalWithCol
              md={12}
              lg={12}
              xl={12}
              label="نوع تخت"
              value={bedTypeTitle}
            />
          </Row>
        </div>

        {/* اطلاعات تخت */}
        <div>
          <CustomDivider text={id !== "-1" ? "اطلاعات تخت" : "اطلاعات تخت پایین"} />
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                name="bedTitle"
                label="عنوان تخت"
                placeholder="عنوان تخت در زمان تخصیص تخت به شما کمک میکند"
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                name="bedNo"
                label="شماره اموال"
                placeholder="در صورتی که شماره اموال موجود می‌باشد وارد نمایید."
              />
            </Col>
          </Row>
        </div>

        {id === "-1" ? (
          <>
            <div>
              <CustomDivider text="اطلاعات تخت وسط" />
              <Row gutter={[16, 16]}>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <CustomInput
                    name="bedMiddleTitle"
                    label="عنوان تخت"
                    placeholder="عنوان تخت در زمان تخصیص تخت به شما کمک میکند"
                  />
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <CustomInput
                    name="bedMiddleNo"
                    label="شماره اموال"
                    placeholder="در صورتی که شماره اموال موجود می‌باشد وارد نمایید."
                  />
                </Col>
              </Row>
            </div>

            <div>
              <CustomDivider text="اطلاعات تخت بالا" />
              <Row gutter={[16, 16]}>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <CustomInput
                    name="bedUpTitle"
                    label="عنوان تخت"
                    placeholder="عنوان تخت در زمان تخصیص تخت به شما کمک میکند"
                  />
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                  <CustomInput
                    name="bedUpNo"
                    label="شماره اموال"
                    placeholder="در صورتی که شماره اموال موجود می‌باشد وارد نمایید."
                  />
                </Col>
              </Row>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default MyModifyThreeFloorBedContent;
