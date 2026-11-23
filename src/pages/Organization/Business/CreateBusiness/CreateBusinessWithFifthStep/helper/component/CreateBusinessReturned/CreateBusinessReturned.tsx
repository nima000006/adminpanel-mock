import { AiOutlineEdit } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CREATE_BUSINESS_PAGE_ROUTE } from "@infra/router/routes/organization";
import "./_createBusinessReturned.scss";

const CreateBusinessReturned = () => {
  const navigate = useNavigate();
  const {
    params: { id },
  } = useQueryParams();

  //* ================================ Util Functions ================================
  // handler
  const editBusinessHandler = () => {
    navigate({
      pathname: CREATE_BUSINESS_PAGE_ROUTE,
      search: makeSearchParams({ step: "0", id }),
    });
  };

  const editBranchHandler = () => {
    navigate({
      pathname: CREATE_BUSINESS_PAGE_ROUTE,
      search: makeSearchParams({ step: "1", id }),
    });
  };

  const editDocumentHandler = () => {
    navigate({
      pathname: CREATE_BUSINESS_PAGE_ROUTE,
      search: makeSearchParams({ step: "2", id }),
    });
  };
  const editIdentitiesHandler = () => {
    navigate({
      pathname: CREATE_BUSINESS_PAGE_ROUTE,
      search: makeSearchParams({ step: "3", id }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="create-business-returned-container">
      <IoIosWarning size={80} color="gold" />
      <div className="text-wrapper">
        <h2>عودت درخواست!</h2>
        <p className="sub-text">
          لطفا متن توضیحات زیر را با دقت مطالعه فرمایید و مجدداً تغییرات خواسته شده را در
          فرم ایجاد کسب و کار خود لحاظ بفرمایید!
        </p>
      </div>
      <div className="alert-box">
        <p>
          فایلهای تاپ چارت بارگذاری شده توسط شما ناقص میباشد. لطفاً موارد زیر را به صورت
          فایل pdf برای ما ارسال بفرمایید:
          <br /> 1.ارتباط واحدهای تاپ چارت به چه صورت میباشد؟
          <br />
          2.لیست تمامی واحد ها و نوع آنها را به وضوح مشخص بفرمایید.
        </p>
      </div>
      <div className="btn-wrapper">
        <CustomButton
          icon={<AiOutlineEdit />}
          type="dashed"
          prefixCls=""
          className="edit-btn"
          onClick={editBusinessHandler}
        >
          ویرایش فرم کسب و کار
        </CustomButton>

        <CustomButton
          icon={<AiOutlineEdit />}
          type="dashed"
          prefixCls=""
          className="edit-btn"
          onClick={editBranchHandler}
        >
          ویرایش فرم شعبه
        </CustomButton>

        <CustomButton
          icon={<AiOutlineEdit />}
          type="dashed"
          prefixCls=""
          className="edit-btn"
          onClick={editDocumentHandler}
        >
          ویرایش اسناد بارگذاری شده
        </CustomButton>

        <CustomButton
          icon={<AiOutlineEdit />}
          type="dashed"
          prefixCls=""
          className="edit-btn"
          onClick={editIdentitiesHandler}
        >
          ویرایش هویت‌ها
        </CustomButton>
      </div>
    </div>
  );
};
export default CreateBusinessReturned;
