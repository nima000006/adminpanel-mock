import BusinessMainForm from "./helper/components/BusinessMainForm/BusinessMainForm";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const BusinessMain = () => {
  useTitle({ text: "نام کسب و کار" });
  return (
    <div style={{ width: "100%" }}>
      <BusinessMainForm />
    </div>
  );
};

export default BusinessMain;
