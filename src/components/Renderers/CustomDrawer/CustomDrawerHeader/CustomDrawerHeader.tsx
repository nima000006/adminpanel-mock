import { AiOutlineClose } from "react-icons/ai";
import "./_customDrawerHeader.scss";

type CustomDrawerHeaderProps = {
  closeDrawerHandler: () => void;
  title?: string | React.ReactNode;
  hasLeftSide?: boolean;
  isStickyTop?: boolean;
  hasCloseIcon?: boolean;
  leftSideContent?: React.ReactNode;
};
const CustomDrawerHeader = ({
  closeDrawerHandler,
  title,
  hasLeftSide = true,
  leftSideContent,
  isStickyTop = true,
  hasCloseIcon = true,
}: CustomDrawerHeaderProps) => {
  return (
    <>
      <div
        className={`header-drawer-container ${isStickyTop ? "drawer-header-sticky-top" : ""}`}
      >
        <div className="right-side">
          {hasCloseIcon && (
            <div className="close-icon-container" onClick={() => closeDrawerHandler()}>
              <AiOutlineClose style={{ color: "#777" }} />
            </div>
          )}
          <div
            className="right-side-title-contain"
            style={{ marginRight: hasCloseIcon ? "" : "1rem" }}
          >
            {title}
          </div>
        </div>
        {hasLeftSide && <div className="left-side">{leftSideContent}</div>}
      </div>
      {/* // Todo[saman]: old version */}
      {/* <CustomDivider /> */}
    </>
  );
};

export default CustomDrawerHeader;
