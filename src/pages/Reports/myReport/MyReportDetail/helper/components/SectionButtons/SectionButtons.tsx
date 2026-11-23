// helper/components/SectionButtons.tsx

import { Col, Row } from "antd";

import { SectionButtonsProps } from "./@types/@SectionButtonsProps";

const SectionButtons = ({
  lastSection,
  activeSection,
  detailData,
  sectionsDisabled,
  onSectionClick,
}: SectionButtonsProps) => {
  return (
    <Row gutter={[16, 16]} className="mt-5">
      {Array.from({ length: lastSection }, (_, index) => {
        const sectionNumber = index + 1;
        const active = activeSection === sectionNumber;
        const item = detailData?.reportDetailDtos.find(
          (d: { section: number }) => d.section === sectionNumber
        );
        const title = item?.sectionTitle || `بخش ${sectionNumber}`;

        return (
          <Col xl={6} lg={6} md={8} sm={24} key={sectionNumber}>
            <div
              className={`h5-regular flex items-center gap-2 rounded-lg border p-3! ${
                active
                  ? "border-[#096DD9] bg-[#E6F7FF] text-[#096DD9]"
                  : "border-[#8C8C8C] bg-inherit text-[#8C8C8C]"
              } ${sectionsDisabled && !active ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              onClick={() => !sectionsDisabled && onSectionClick(sectionNumber)}
            >
              <span className="block truncate" title={title}>
                {title}
              </span>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default SectionButtons;
