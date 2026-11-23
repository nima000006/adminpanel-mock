import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ViewStaffsResidenceAccessTableRowType } from "@pages/Dormitory/Staffs/_shared/components/ViewStaffsDrawerContent/@types/@viewStaffsDrawerContentTypes";

const ViewStaffsResidenceAccessTableModel =
  (): CustomColumnType<ViewStaffsResidenceAccessTableRowType>[] => {
    return [
      {
        title: "اقامتگاه",
        dataIndex: "residenceName",
        key: "residenceName",
        width: 250,
      },
      {
        title: "ایجاد کننده",
        dataIndex: "creatorName",
        key: "creatorName",
        width: 150,
      },
      // {
      //   title: "تاریخ ایجاد",
      //   dataIndex: "createdAt",
      //   key: "createdAt",
      //   width: 150,
      //   ...GetServerColumnSearchProps({
      //     dataIndex: "createdAt",
      //     label: "تاریخ ایجاد",
      //     type: "sort",
      //   }),
      //   render: (value: string) =>
      //     dataPlaceHolder({
      //       data: value,
      //       isDate: true,
      //       customDateFormat: "HH:mm, YYYY/MM/DD ",
      //     }),
      // },
      {
        title: "تاریخ ایجاد",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 150,
        ...GetServerColumnSearchProps({
          dataIndex: "createdAt",
          label: "تاریخ ایجاد",
          type: "sort",
        }),
        render: (value: string) =>
          dataPlaceHolder({
            data: value,
            isDate: true,
            customDateFormat: "HH:mm, YYYY/MM/DD ",
          }),
      },
    ];
  };

export default ViewStaffsResidenceAccessTableModel;
