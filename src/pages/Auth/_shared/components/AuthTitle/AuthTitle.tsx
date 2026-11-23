import { AuthTitleProps } from "./@types/@authTitle";
import "./_authTitle.scss";

const AuthTitle = ({ icon: Icon, label }: AuthTitleProps) => {
  return (
    <div className="auth-title">
      <div className="auth-title_icon">
        <Icon size={40} />
      </div>
      <div className="auth-title_label">{label}</div>
    </div>
  );
};
export default AuthTitle;
