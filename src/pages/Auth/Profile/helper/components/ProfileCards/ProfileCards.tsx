import { ProfileCardsProps } from "./@types/@profileCards";
import "./_profileCards.scss";

const ProfileCards = ({ title, icon: Icon, onClick, active }: ProfileCardsProps) => {
  return (
    <div
      onClick={onClick}
      className={`profile-info-bux-container ${active ? "active" : ""}`}
    >
      <div className="profile-info-bux-wrapper">
        <span className="icon-wrapper">{Icon && <Icon size={32} />}</span>

        <h2 className="title">{title}</h2>
      </div>
    </div>
  );
};
export default ProfileCards;
