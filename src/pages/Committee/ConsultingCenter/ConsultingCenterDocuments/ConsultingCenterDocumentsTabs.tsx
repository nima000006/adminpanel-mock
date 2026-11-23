import { Tabs } from "antd";
import { useSearchParams } from "react-router";

import {
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_ALL,
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_APPOINTMENT,
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_FINISHED,
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_MEETING,
} from "./ConsultingCenterDocumentsTabsUtil";
import DocumentsTable from "./helper/components/DocumentsTable/DocumentsTable";
import CustomCard from "../../../../components/CustomCard/CustomCard";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_consultingCenterDocumentsTabs.scss";

const ConsultingCenterDocumentsTabs = () => {
  const [_, setSearchParams] = useSearchParams();

  useTitle({ text: "پرونده ها" });
  const tabsItems = [
    {
      label: "همه",
      children: (
        <div>
          <DocumentsTable type={COMMITTEE_CONSULTING_CENTER_DOCUMENTS_ALL} />
        </div>
      ),
      key: "1",
    },
    {
      label: "انتظار تعیین وقت",
      children: (
        <div>
          <DocumentsTable type={COMMITTEE_CONSULTING_CENTER_DOCUMENTS_APPOINTMENT} />
        </div>
      ),
      key: "2",
    },
    {
      label: "انتظار برگزاری جلسه",
      children: (
        <div>
          <DocumentsTable type={COMMITTEE_CONSULTING_CENTER_DOCUMENTS_MEETING} />
        </div>
      ),
      key: "3",
    },
    {
      label: "اتمام یافته",
      children: (
        <div>
          <DocumentsTable type={COMMITTEE_CONSULTING_CENTER_DOCUMENTS_FINISHED} />
        </div>
      ),
      key: "4",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard>
      <Tabs
        type="line"
        onChange={() => setSearchParams({})}
        items={tabsItems}
        className="committee-consulting-center-document-tabs-container"
      />
    </CustomCard>
  );
};
export default ConsultingCenterDocumentsTabs;
