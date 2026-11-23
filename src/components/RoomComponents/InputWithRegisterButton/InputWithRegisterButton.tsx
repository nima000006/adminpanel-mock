import { Button } from "antd";
import "./_inputWithRegisterButton.scss";

type InputWithRegisterButtonProps = {
  label: string;
  placeHolder: string;
  name: string;
  onClickHandler: () => void;
};

const InputWithRegisterButton = ({
  label,
  placeHolder,
  name,
  onClickHandler,
}: InputWithRegisterButtonProps) => {
  return (
    <div className="input-with-register-btn-container">
      <div className="input-container">
        <label htmlFor={name} className="label">
          {label} :
        </label>
        <input type="text" className="input" placeholder={placeHolder} name={name} />
      </div>
      <Button type="primary" className="register-btn" onClick={onClickHandler}>
        ثبت
      </Button>
    </div>
  );
};

export default InputWithRegisterButton;
