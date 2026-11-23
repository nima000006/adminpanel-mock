import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import { dataPlaceHolder } from "@infra/helpers/utils";

const MyForeignNationalsRegistrationDetailRejected = () => {
  return (
    <div className="mt-10 mb-10">
      <CustomDivider text="علت رد درخواست" />
      <CustomAlert
        type="error"
        title="دلیل رد انتخاب شده در اینجا نمایش داده شود"
        description={dataPlaceHolder({
          data: "توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. توضیحات مربوط به دلیل رد مشخص که غیر قابل ویرایش می‌باشد. ",
        })}
      />
    </div>
  );
};
export default MyForeignNationalsRegistrationDetailRejected;
