import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomCheckboxGroup from "@components/CustomInputs/CustomCheckboxGroup/CustomCheckboxGroup";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { CheckBoxFormGenerator, dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_NEW_GENERAL_PUNISHMENT_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useLazyGetGeneralPunishmentDetailQuery } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";
import "./_generalPunishmentInfo.scss";

const GeneralPunishmentInfo = () => {
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");
  const title = "اطلاعات تنبیه کلی";

  //? ================================  Api Calls ================================
  const [getGeneralPunishmentDetail, { data: generalPunishmentDetailData, isLoading }] =
    useLazyGetGeneralPunishmentDetailQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getGeneralPunishmentDetail(id);
    }
  }, [id]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (generalPunishmentDetailData?.data[0]) {
      form.setFieldsValue({
        allowedCommittee: [
          CheckBoxFormGenerator(
            generalPunishmentDetailData?.data[0]?.selectableAppeal,
            "selectableAppeal"
          ),
          CheckBoxFormGenerator(
            generalPunishmentDetailData?.data[0]?.selectablePrimitive,
            "selectablePrimitive"
          ),
          CheckBoxFormGenerator(
            generalPunishmentDetailData?.data[0]?.selectableCentral,
            "selectableCentral"
          ),
        ],
      });
    }
  }, [generalPunishmentDetailData]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(`${COMMITTEE_NEW_GENERAL_PUNISHMENT_PAGE_ROUTE}?title=${title}&id=${id}`);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-general-punishment-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <CustomCard padding={PADDING_24} className="input-wrapper" loading={isLoading}>
        {generalPunishmentDetailData && (
          <>
            <div className="grid-cols-3">
              <SingleVerticalItem
                label="عنوان"
                value={dataPlaceHolder({
                  data: generalPunishmentDetailData?.data[0]?.title,
                })}
              />
              <Form form={form}>
                <CustomCheckboxGroup
                  checkboxClassName="check-box"
                  containerClassName="check-box-container"
                  name="allowedCommittee"
                  disabled={true}
                  label="کمیته های مجاز"
                  options={[
                    { label: "کمیته بدوی", value: "selectablePrimitive" },
                    { label: "کمیته تجدید نظر", value: "selectableAppeal" },
                    { label: "کمیته مرکزی", value: "selectableCentral" },
                  ]}
                  hasVerticalLabel={true}
                />
              </Form>
              <SingleVerticalItem
                label="تاریخ ایجاد"
                value={dataPlaceHolder({
                  data: generalPunishmentDetailData?.data[0]?.createDate,
                  isDate: true,
                })}
              />
            </div>
            <SingleVerticalItem
              label="توضیحات"
              value={dataPlaceHolder({
                data: generalPunishmentDetailData?.data[0]?.description,
              })}
            />
          </>
        )}
      </CustomCard>
    </div>
  );
};
export default GeneralPunishmentInfo;
