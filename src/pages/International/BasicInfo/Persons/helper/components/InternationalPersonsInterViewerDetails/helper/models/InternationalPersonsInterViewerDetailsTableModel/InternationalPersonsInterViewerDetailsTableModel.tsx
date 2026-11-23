import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

const InternationalPersonsInterViewerDetailsTableModel = ({
  drawerViewHandler,
  openDeleteModal,
}: {
  drawerViewHandler: (value: string) => void;
  openDeleteModal: (id: number) => void;
}) => {
  return [
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      width: 190,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 190,
    },
    {
      title: "کد ملی",
      dataIndex: "internationalCode",
      key: "internationalCode",
      width: 190,
    },
    {
      title: "شماره موبایل",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 190,
    },
    {
      title: "واحد دانشگاهی",
      dataIndex: "universityField",
      key: "universityField",
      width: 190,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 70,
      render: (id: number) => {
        return (
          <div className="flex">
            <CustomButton type="link" onClick={() => drawerViewHandler(id.toString())}>
              مشاهده
            </CustomButton>
            <CustomButton type="link" danger onClick={() => openDeleteModal(id)}>
              حذف
            </CustomButton>
          </div>
        );
      },
    },
  ];
};
export default InternationalPersonsInterViewerDetailsTableModel;
