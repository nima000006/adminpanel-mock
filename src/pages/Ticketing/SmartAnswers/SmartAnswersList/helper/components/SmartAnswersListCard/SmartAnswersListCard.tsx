import { Col } from "antd";
import { PiArrowLeft } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { TICKETING_SMART_ANSWERS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";

import { answerType, statusMessages } from "../../utils/utils";

const SmartAnswersListCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  // ================================ Utils function ================================
  const viewAnswerBtnHandler = () => {
    navigate({
      pathname: TICKETING_SMART_ANSWERS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ status: item?.status, service: item?.service }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Col lg={8} md={12} sm={12} xs={24}>
      <div className="border-neutral-5 body-regular card-container flex h-full flex-col gap-4 rounded-lg border border-dashed p-6">
        <span>{item?.date}</span>
        <p className="line-clamp-2">{item?.describe}</p>

        <div className="max-[400px]: text-xs">
          کاربر{" "}
          <Link to={"  "} className="text-primary-6!">
            {item?.user}
          </Link>{" "}
          {`(${item?.nationalCode})`}
        </div>

        <div className="flex flex-wrap gap-2">
          <CustomTag
            color={statusMessages[item?.status as keyof typeof statusMessages]?.color}
          >
            {statusMessages[item?.status as keyof typeof statusMessages]?.text}
          </CustomTag>

          <SamimServiceTag service={item?.service} />

          {item?.answerType && (
            <CustomTag
              color={answerType[item?.answerType as keyof typeof answerType]?.color}
            >
              {answerType[item?.answerType as keyof typeof answerType]?.text}
            </CustomTag>
          )}
        </div>

        <CustomButton type="primary" onClick={viewAnswerBtnHandler}>
          مشاهده پاسخ <PiArrowLeft />
        </CustomButton>
      </div>
    </Col>
  );
};
export default SmartAnswersListCard;
