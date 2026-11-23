import BusinessListTable from "./helper/components/BusinessList/BusinessListTable";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";

const BusinessList = () => {
  useTitle({ text: "لیست صاحبان کسب و کارها" });
  return (
    <div style={{ width: "100%" }}>
      <BusinessListTable />
    </div>
  );
};
export default BusinessList;
