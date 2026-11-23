import { useEffect } from "react";

import { Button, Form } from "antd";
import { useNavigate } from "react-router";

import Div from "@components/Renderers/Div/Div";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { COMMITTEE_CREATION_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE } from "@infra/router/routes/committee";
import { useGetAccusationAndViolationDetailMutation } from "@infra/states/redux/Apis/committee/basicInfo/basicInfoApi";
import "./_accusationAndViolationsDetailsInfoContent.scss";

const AccusationAndViolationsDetailsInfoContent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");

  //? ================================  Api Calls ================================
  const [getData, { data: accusationData, isLoading: isAccusationDataLoading }] =
    useGetAccusationAndViolationDetailMutation();

  //! ============================ Error Handling ============================

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getData({ _data_: { id } });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const makeChangeHandler = () => {
    navigate(
      `${COMMITTEE_CREATION_ACCUSATION_AND_VIOLATIONS_DETAILS_PAGE_ROUTE}?id=${id}&type=edit`
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-accusation-violation-details-info-container">
      <Button
        type="primary"
        ghost
        className="make-change-btn"
        onClick={makeChangeHandler}
      >
        ایجاد تغییرات
      </Button>
      <Form form={form} className="accusation-violation-details-form">
        <Div loading={isAccusationDataLoading} className="data-container">
          <SingleVerticalItem
            label="عنوان"
            value={dataPlaceHolder({ data: accusationData?.data?.title })}
          />
          <SingleVerticalItem
            label="تخلف / اتهام مربوطه"
            value={dataPlaceHolder({
              data: accusationData?.data?.AssociationViiolation?.title,
            })}
          />
          <SingleVerticalItem
            label="تاریخ ایجاد"
            value={dataPlaceHolder({
              data: accusationData?.data?.createDate,
              isDate: true,
            })}
          />
          <SingleVerticalItem
            label="توضیحات"
            value={dataPlaceHolder({
              data: accusationData?.data?.desc,
            })}
          />
        </Div>
      </Form>
    </div>
  );
};
export default AccusationAndViolationsDetailsInfoContent;
