import { Descriptions, DescriptionsProps } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  ViewStaffsDrawerContentProps,
  ViewStaffsDrawerStaffInfoType,
  ViewStaffsResidenceAccessTableRowType,
} from "@pages/Dormitory/Staffs/_shared/components/ViewStaffsDrawerContent/@types/@viewStaffsDrawerContentTypes";
import ViewStaffsResidenceAccessTableModel from "@pages/Dormitory/Staffs/_shared/components/ViewStaffsDrawerContent/helper/model/ViewStaffsResidenceAccessTableModel/ViewStaffsResidenceAccessTableModel";

const mockStaffInfo: ViewStaffsDrawerStaffInfoType = {
  fullName: "علی رضایی",
  username: "0021116090",
  position: "کارشناس امور خوابگاه",
  business: "دانشگاه آزاد اسلامی",
  branch: "تهران جنوب",
  personnelCode: "231241256",
  mobile: "0912 245 5910",
};

const mockResidenceAccessList: ViewStaffsResidenceAccessTableRowType[] = [
  {
    id: 1,
    residenceName: "شهید بهشتی ۱",
    creatorName: "مجید سیانکی",
    createdAt: "2026/02/02 20:20",
  },
  {
    id: 2,
    residenceName: "شهید بهشتی ۲",
    creatorName: "نیلوفر صارمی",
    createdAt: "2026/02/02 20:20",
  },
  {
    id: 3,
    residenceName: "شهید بهشتی ۳",
    creatorName: "نیلوفر صارمی",
    createdAt: "2026/02/02 20:20",
  },
  {
    id: 4,
    residenceName: "حضرت زهرا",
    creatorName: "مجید سیانکی",
    createdAt: "2026/02/02 20:20",
  },
];

const ViewStaffsDrawerContent = ({
  closeViewStaffsDrawerHandler,
  isAllStaffs = false,
}: ViewStaffsDrawerContentProps) => {
  const staffInfoItems: DescriptionsProps["items"] = [
    {
      key: "fullName",
      label: "نام و نام خانوادگی",
      children: dataPlaceHolder({ data: mockStaffInfo.fullName }),
    },
    {
      key: "username",
      label: "کد ملی / فراگیر",
      children: dataPlaceHolder({ data: mockStaffInfo.username }),
    },
    {
      key: "position",
      label: "سمت",
      children: dataPlaceHolder({ data: mockStaffInfo.position }),
    },
    ...(isAllStaffs
      ? [
          {
            key: "business",
            label: "کسب و کار",
            children: dataPlaceHolder({ data: mockStaffInfo.business }),
          },
          {
            key: "branch",
            label: "شعبه / واحد",
            children: dataPlaceHolder({ data: mockStaffInfo.branch }),
          },
        ]
      : []),
    {
      key: "personnelCode",
      label: "کد پرسنلی",
      children: dataPlaceHolder({ data: mockStaffInfo.personnelCode }),
    },
    {
      key: "mobile",
      label: "شماره همراه",
      children: dataPlaceHolder({ data: mockStaffInfo.mobile }),
    },
  ];

  const columns = ViewStaffsResidenceAccessTableModel();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="مشاهده دسترسی‌های کارمند به اقامتگاه‌ها"
        closeDrawerHandler={closeViewStaffsDrawerHandler}
      />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <CustomDivider text="اطلاعات کارمند" />

          <Descriptions
            column={1}
            colon={false}
            layout="horizontal"
            items={staffInfoItems}
            styles={{
              label: {
                color: "var(--neutral-8)",
                minWidth: 166,
                textAlign: "start",
              },
              content: {
                color: "var(--neutral-11)",
                fontWeight: 500,
                textAlign: "start",
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <CustomDivider text="دسترسی به اقامتگاه" />

          <CustomTable
            dataSource={mockResidenceAccessList}
            rowKey="id"
            columns={columns}
            pagination={paginationConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewStaffsDrawerContent;
