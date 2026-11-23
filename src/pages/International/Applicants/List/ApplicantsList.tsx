import { Col, Dropdown, Form, MenuProps, Row } from "antd";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import InternationalApplicantsListTableModel from "./helper/model/InternationalApplicantsListTableModel";
import "./_applicantsList.scss";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const MockData = [
  {
    id: 1,
    firstName: "Noah",
    lastName: "Garcia",
    genderType: 1,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    identificationNumber: "12325",
  },
  {
    id: 2,
    firstName: "Noah",
    lastName: "Garcia",
    genderType: 1,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    identificationNumber: "12325",
  },
  {
    id: 3,
    firstName: "Noah",
    lastName: "Garcia",
    genderType: 2,
    birthDate: "1373/10/07",
    nationality: "اسپانیا",
    citizenship: "اسپانیا",
    resident: "اسپانیا",
    identificationNumber: "12325",
  },
];
const ApplicantsList = () => {
  useTitle({ text: "متقاضیان" });

  const searchHandler = () => {};
  const openAdvanceFilterHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="applicants-list-container flex flex-col gap-10">
      <Form className="flex flex-col gap-4">
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={24}>
            <CustomInput
              type="text"
              label="نام متقاضی"
              name="applicantName"
              placeholder="نام متقاضی را وارد نمایید."
            />
          </Col>
          <Col lg={8} md={12} sm={24}>
            <CustomInput
              type="text"
              label="نام خانوادگی متقاضی"
              name="applicantLastName"
              placeholder="نام خانوادگی متقاضی را وارد نمایید."
            />
          </Col>
          <Col lg={8} md={12} sm={24}>
            <CustomInput
              type="text"
              label="شماره پاسپورت"
              name="applicantLastName"
              placeholder="شماره پاسپورت متقاضی را وارد نمایید."
            />
          </Col>
        </Row>
        <div>
          <CustomButton
            type="default"
            onClick={searchHandler}
            icon={<AiOutlineSearch size={16} />}
            iconPlacement="end"
            block
          >
            جستجو
          </CustomButton>
        </div>
      </Form>

      <div className="flex flex-col gap-4">
        <CustomDivider text="لیست متقاضیان" />
        <ToolBox
          rightSide={
            <CustomBadge>
              <CustomButton icon={<AiOutlineFilter />} onClick={openAdvanceFilterHandler}>
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton>
                خروجی <IoIosArrowDown />
              </CustomButton>
            </Dropdown>
          }
        />
        <CustomTable
          dataSource={MockData || []}
          columns={InternationalApplicantsListTableModel()}
          pagination={paginationConfig}
          key={"id"}
          {...TABLE_PROPS(MockData?.length || 0)}
          rowKey="id"
        />
      </div>
    </div>
  );
};
export default ApplicantsList;
