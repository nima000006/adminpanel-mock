import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { GeneralInfoTariffDrawerPropsType } from "../../../@types/@fourthTabAdmissionProgram";
import { GeneralInfoTariffDrawerTableModel } from "../../models/GeneralInfoTariffDrawerTableModel/GeneralInfoTariffDrawerTableModel";

const mockDataDrawer = {
  active: 1,
  tariffTitle: "تعرفه شماره یک",
  tariffId: "1234567890",
  unit: "تهران شمال",
  residence: "خوابگاه شهید چمران",
  currency: "ریال",
  tax: "10 %",
  tollPay: "5 %",
  desc: "این تعرفه تحت شرایط خاص ویژه نابینایان و ناشنوایان ایرانی تنظیم شده است.",
  dataSource: [
    {
      roomType: "دو تخته درجه یک",
      price: "38000000",
    },
    {
      roomType: "دو تخته درجه دو",
      price: "36000000",
    },
    {
      roomType: "دو تخته درجه سه",
      price: "33000000",
    },
    {
      roomType: "دو تخته درجه یک",
      price: "3000000",
    },
  ],
  startTime: "14:00",
  startDate: "2024-07-11T08:00:41.977Z",
  endTime: "12:00",
  endDate: "2024-07-11T08:00:41.977Z",
  registerDate: "2024-07-11T08:00:41.977Z",
  creator: "مهندس سیانکی",
};
const GeneralInfoTariffDrawerContent = ({
  closeDrawerHandler,
}: GeneralInfoTariffDrawerPropsType) => {
  return (
    <div>
      <CustomDrawerHeader
        title="جزئیات تعرفه"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="divider-btn-container">
            <CustomTag color={mockDataDrawer?.active ? "green" : "red"}>
              {mockDataDrawer?.active ? "فعال" : "غیرفعال"}
            </CustomTag>
          </div>
        }
      />
      <div className="flex flex-col gap-10">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            span={24}
            label="عنوان تعرفه"
            value={mockDataDrawer?.tariffTitle}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="شناسه تعرفه"
            value={mockDataDrawer?.tariffId}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد دانشگاهی"
            value={mockDataDrawer?.unit}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اقامتگاه"
            value={mockDataDrawer?.residence}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="واحد پول"
            value={mockDataDrawer?.currency}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="مالیات"
            value={mockDataDrawer?.tax}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="عوارض"
            value={mockDataDrawer?.tollPay}
          />
          <SingleVerticalWithCol span={24} label="توضیحات" value={mockDataDrawer?.desc} />
        </Row>

        <div className="table-wrapper">
          <CustomTable
            dataSource={mockDataDrawer?.dataSource}
            rowKey="id"
            columns={GeneralInfoTariffDrawerTableModel}
            pagination={false}
            {...TABLE_PROPS(mockDataDrawer?.dataSource?.length)}
          />
        </div>

        <div>
          <CustomDivider text="زمانبندی" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ساعت شروع اعمال مؤثر"
              value={mockDataDrawer?.startTime}
            />
            <SingleVerticalWithCol
              xl={16}
              lg={16}
              md={16}
              sm={12}
              label="تاریخ شروع اعمال مؤثر"
              value={mockDataDrawer?.startDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ساعت پایان اعمال مؤثر"
              value={mockDataDrawer?.endTime}
            />
            <SingleVerticalWithCol
              xl={16}
              lg={16}
              md={16}
              sm={12}
              xs={24}
              label="تاریخ پایان اعمال مؤثر"
              value={mockDataDrawer?.endDate}
              isDate
            />
          </Row>
        </div>

        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={mockDataDrawer?.registerDate}
            isDate
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="ایجاد کننده"
            value={mockDataDrawer?.creator}
          />
        </Row>
      </div>
    </div>
  );
};
export default GeneralInfoTariffDrawerContent;
