// const advanceFilterItems = [
//   "dateDateStart",
//   "dateDateEnd",
//   //search
//   "firstName",
//   "lastName",
//   "username",
//   "mobileNumber",
//   "studentCode",
//   "code",
// ];

import { useState } from "react";

import { Form } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FOREIGN_NATIONAL_WAITING_REVIEW } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { UseMyForeignNationalsRegistrationAdvanceFilterFormType } from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/@typs/@myForeignNationalsRegistrationList";
import useMyForeignNationalsRegistrationAdvanceFilter from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/helper/model/advanceFilterModals/useMyForeignNationalsRegistrationAdvanceFilter";
import MyForeignNationalsRegistrationTableModel from "@pages/management/Requests/ForeignNationalsRegistration/MyForeignNationalsRegistration/MyForeignNationalsRegistrationList/helper/model/MyForeignNationalsRegistrationTableModel";

const mockData = [
  {
    id: 1,
    firstName: "شیرین",
    lastName: "نجفی",
    nationality: "ایرانی",
    username: "0011111111",
    mobileNumber: "091211111111",
    studentCode: "1111112222",
    code: "12345",
    createdDate: "",
    modifiedDate: "",
  },
];

const MyForeignNationalsRegistrationReviewListTab = () => {
  const { params: url } = useQueryParams();

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [form] = Form.useForm<UseMyForeignNationalsRegistrationAdvanceFilterFormType>();

  const { filterItemsList } = useMyForeignNationalsRegistrationAdvanceFilter();

  //* ================================ Util Functions ================================
  // advance filter handler
  const openAdvanceFilterHandler = () => {
    setAdvanceModalOpen(true);
  };

  const closeAdvanceFilterHandler = () => {
    setAdvanceModalOpen(false);
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {advanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={advanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          form={form}
          badgeCounter={(amount) => setBadgeCount(amount?.toString())}
          defaultParams={{ ...url }}
        />
      )}

      <div>
        <CustomDivider text="لیست درخواست‌های ثبت نام اتباع" />
        <div className="flex flex-col gap-4">
          <ToolBox
            rightSide={
              <CustomBadge count={badgeCount}>
                <CustomButton
                  type="default"
                  icon={<AiOutlineFilter />}
                  onClick={openAdvanceFilterHandler}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            }
            leftSide={
              <CustomButton type="primary" ghost disabled>
                خروجی
              </CustomButton>
            }
          />
          <CustomTable<any>
            dataSource={mockData}
            rowKey="id"
            loading={false}
            columns={MyForeignNationalsRegistrationTableModel({
              type: FOREIGN_NATIONAL_WAITING_REVIEW,
            })}
            pagination={paginationConfig}
            className="waiting-review-list-table-container"
            key={`table-${url?.pageSize || "8"} `}
          />
        </div>
      </div>
    </>
  );
};
export default MyForeignNationalsRegistrationReviewListTab;
