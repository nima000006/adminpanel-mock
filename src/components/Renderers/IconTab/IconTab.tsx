import { IconTabProps } from "./@types/@iconTab";

const IconTab = ({
  title,
  Icon,
  active,
  disabled = false,
  clickHandler,
  className,
  img,
}: IconTabProps) => {
  const getIconFillColor = () => {
    if (disabled) return "#BFBFBF";
    if (active) return "#096DD9";
    return "#8C8C8C";
  };

  const getTabClassName = () => {
    if (disabled) {
      return "text-neutral-6 border-neutral-4 bg-neutral-2 cursor-not-allowed border font-bold";
    }

    if (active) {
      return "text-primary-6 border-primary-7 bg-primary-1 cursor-pointer border font-bold";
    }

    return "text-neutral-7 border-neutral-4 bg-neutral-1 cursor-pointer border font-bold";
  };

  const getTitleClassName = () => {
    if (disabled) return "text-neutral-6!";
    if (active) return "text-primary-6!";
    return "text-neutral-7!";
  };

  return (
    <div
      className={` ${className}`}
      onClick={disabled ? undefined : clickHandler}
      aria-disabled={disabled}
    >
      <div
        className={`flex h-full flex-col items-center justify-between gap-3 rounded-lg px-3 py-3 lg:px-2 ${getTabClassName()}`}
      >
        {img ? <img src={img} alt="background" /> : null}
        {Icon ? <Icon fillColor={getIconFillColor()} /> : null}
        <h5 className="h4-medium">
          <span className={`text-base lg:text-sm xl:text-xl ${getTitleClassName()}`}>
            {title}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default IconTab;
