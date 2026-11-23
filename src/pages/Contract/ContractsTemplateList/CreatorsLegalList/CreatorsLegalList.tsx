import { Col, Row } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CreatorsLegalListDataType } from "@pages/Contract/ContractsTemplateList/CreatorsLegalList/@types/@creatorsLegalList";

import TemplateCreatorsLegalListTableModel from "./helper/model/TemplateCreatorsLegalListTableModel";

const mockData: CreatorsLegalListDataType[] = [
  {
    id: 1,
    legalBranch: "مرکز مشاوره راهنما",
    count: "2",
    status: "فعال",
    startDate: "1403/02/02",
    endtDate: "1403/02/02",
  },
  {
    id: 2,
    legalBranch: "مرکز مشاوره راهنما",
    count: "2",
    status: "فعال",
    startDate: "1403/02/02",
    endtDate: "1403/02/02",
  },
  {
    id: 3,
    legalBranch: "مرکز مشاوره راهنما",
    count: "2",
    status: "فعال",
    startDate: "1403/02/02",
    endtDate: "1403/02/02",
  },
];

const CreatorsLegalList = () => {
  const {
    params: { id },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "مدیریت قرارداد ها",
      },
      {
        title: "لیست قالب ها",
      },
      {
        title: id,
      },
      {
        title: "قالب گروهی",
      },
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="قالب ذینفع 1"
          value="دانشگاه آزاد اسلامی"
        />
        <SingleVerticalWithCol xl={8} lg={8} label="سهم  قالب گروهی" value="تغذیه" />
        <Col lg={8} md={8} sm={12} xs={24}>
          <CustomSelect
            name="service"
            options={[
              {
                id: 1,
                title: "قالب حقوقی ذینفع 1",
              },
            ]}
            label="ایجاد کننده"
            // onChange={(id) => {
            //   setSelectedService(id as number);
            // }}
          />
        </Col>
      </Row>

      <div className="flex flex-col gap-4">
        <CustomDivider text="ذینفع های حقوقی ایجاد کننده گروه(20)" />
        <CustomTable<CreatorsLegalListDataType>
          dataSource={mockData}
          columns={TemplateCreatorsLegalListTableModel()}
          // loading={}
          {...TABLE_PROPS(mockData.length ?? 0)}
          rowKey="id"
        />
      </div>
    </div>
  );
};
export default CreatorsLegalList;
