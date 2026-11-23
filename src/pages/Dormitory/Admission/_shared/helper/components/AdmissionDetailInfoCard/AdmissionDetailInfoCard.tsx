import patternImage from "@assets/images/dormitory/pattern.svg";
import { useTheme } from "@infra/context/ThemeContext";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { AdmissionDetailInfoCardProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailInfoCard/@types/@admissionDetailInfoCard";

const AdmissionDetailInfoCard = ({
  title,
  value,
  isPrice = false,
  isCentered = false,
}: AdmissionDetailInfoCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const patternBackgroundStyles = {
    backgroundImage: `url("${isDark ? "" : patternImage}")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const isPrimitiveValue =
    value == null || typeof value === "string" || typeof value === "number";

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`border-neutral-3 bg-neutral-1 body-regular flex flex-col gap-2 rounded-lg border p-6 ${
        isCentered ? "items-center" : ""
      }`}
      style={patternBackgroundStyles}
    >
      <div className={`text-neutral-9 ${isCentered ? "text-center" : ""}`}>{title}</div>
      <div className={isCentered ? "flex justify-center" : undefined}>
        {isPrimitiveValue ? (
          <div className="text-xl font-medium">
            {dataPlaceHolder({
              data: value,
              isPrice: true,
              ...(isPrice ? { currency: { isAvailable: true, type: "تومان" } } : {}),
            })}
          </div>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default AdmissionDetailInfoCard;
