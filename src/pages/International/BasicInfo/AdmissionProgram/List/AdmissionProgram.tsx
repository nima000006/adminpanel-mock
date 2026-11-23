import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";

import InternationalAdmissionTab from "./helper/components/InternationalAdmission/InternationalAdmissionTab";
import InternationalHasAdmissionFieldsTab from "./helper/components/InternationalHasAdmissionFields/InternationalHasAdmissionFieldsTab";
import "./_internationalAdmissionProgram.scss";

const AdmissionProgram = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "اطلاعات پایه",
      },
      { title: "برنامه پذیرش" },
    ],
  });

  const admissionItems = [
    {
      label: "برنامه پذیرش",
      children: <InternationalAdmissionTab />,
      key: "1",
    },
    {
      label: "رشته‌های دارای برنامه پذیرش",
      children: <InternationalHasAdmissionFieldsTab />,
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Tabs
      items={admissionItems}
      className="international-admission-list-tab-container"
      type="card"
      // onChange={() => setSearchParams({})}
    />
  );
};

export default AdmissionProgram;
