import { Dropdown, MenuProps } from "antd";
import { FiArchive } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import MyAdmissionSegmentContentTableModel from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceMoreDetail/helper/components/MyAdmissionSegmentContent/helper/model/MyAdmissionSegmentContentTableModel";

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

const mockData = [
  {
    id: 1,
    admission: "برنامه پذیرش تابستان 1405",
    managementType: "خودگردان",
    reserveType: "UrgentReserve",
    paymentOption: "OncePayment",
  },
  {
    id: 2,
    admission: "برنامه پذیرش تابستان 1405",
    managementType: "خودگردان",
    reserveType: "ReservationRequest",
    paymentOption: "AllPayment",
  },
];

const MyAdmissionSegmentContent = () => {
  const { params: url } = useQueryParams();

  //* ================================ Util Functions ================================
  // table column
  const column = MyAdmissionSegmentContentTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-10 flex flex-col gap-4">
      <ToolBox
        leftSide={
          <div className="flex flex-wrap gap-2">
            <CustomButton type="primary" ghost disabled icon={<FiArchive />}>
              آرشیو
            </CustomButton>

            <Dropdown menu={exportMenu} trigger={["click"]}>
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          </div>
        }
      />

      {mockData?.length <= 0 ? (
        <CustomEmpty description="برنامه‌پذیرشی برای نمایش وجود ندارد!" />
      ) : (
        <CustomTable<any>
          dataSource={mockData}
          loading={false}
          columns={column}
          rowKey="ticketNumber"
          pagination={paginationConfig}
          key={`table-${url?.pageSize || "8"}`}
        />
      )}
    </div>
  );
};
export default MyAdmissionSegmentContent;
