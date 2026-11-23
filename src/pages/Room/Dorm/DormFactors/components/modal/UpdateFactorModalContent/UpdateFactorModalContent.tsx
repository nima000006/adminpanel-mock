import { UpdateFactorModalContentProps } from "./@types/@updateFactorModalContent";
import InfoContent from "./helper/components/InfoContent/InfoContent";
import InputFactorSection from "./helper/components/InputFactorSection/InputFactorSection";
import "./_updateFactorModalContent.scss";

const UpdateFactorModalContent = ({
  info,
  form,
  total,
  setTotal,
}: UpdateFactorModalContentProps) => {
  return (
    <div className="update-modal-content-container">
      <InfoContent info={info} />
      <InputFactorSection
        totalValue={info?.amount}
        form={form}
        total={total}
        setTotal={setTotal}
      />
    </div>
  );
};

export default UpdateFactorModalContent;
