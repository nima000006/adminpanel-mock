import "./_inputErrorMessage.scss";
type InputErrorMessageProps = {
  msg?: string;
  isTouched?: boolean;
};
const InputErrorMessage = ({ msg, isTouched }: InputErrorMessageProps) => {
  return (
    <>
      {msg && isTouched ? (
        <p dir="rtl" className="input-error-message">
          {msg}
        </p>
      ) : null}
    </>
  );
};
export default InputErrorMessage;
