import { PiStarFill } from "react-icons/pi";
import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORMITORY_MY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { MyResidenceListSearchContent } from "@pages/Dormitory/Residence/MyResidence/MyResidenceList/helper/components/MyResidenceWaitingList/@types/@myResidenceWaitingList";

const MyResidenceActiveListTableModel =
  (): CustomColumnType<MyResidenceListSearchContent>[] => [
    {
      title: "اقامتگاه",
      dataIndex: "faTitle",
      key: "faTitle",
      width: 200,
    },
    {
      title: "وضعیت نمایش به کاربران",
      dataIndex: "visible",
      key: "visible",
      width: 170,
      render: (value: boolean) => {
        return (
          <CustomTag className="w-fit" color={value ? "green" : "orange"}>
            {value ? "قابل نمایش" : "غیر قابل نمایش"}
          </CustomTag>
        );
      },
    },
    {
      title: "نوع اقامتگاه",
      dataIndex: "accommodationType",
      key: "accommodationType",
      width: 150,
      render: (_: unknown, record: MyResidenceListSearchContent) =>
        dataPlaceHolder({
          data: record?.accommodationType?.title,
        }),
    },
    {
      title: "درجه کیفی",
      dataIndex: "qualityGrade",
      key: "qualityGrade",
      width: 150,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {value ? (
            <>
              <PiStarFill width={24} height={24} color="gold" />
              <span>{value}</span>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <PiStarFill width={24} height={24} color={NEUTRAL_05} />
              <span className="body-regular">فاقد درجه کیفی</span>
            </span>
          )}
        </div>
      ),
    },
    {
      title: "کسب و کار",
      dataIndex: "businessName",
      key: "businessName",
      width: 180,
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branchName",
      key: "branchName",
      width: 180,
    },
    {
      title: "استان",
      dataIndex: "provinceTitle",
      key: "provinceTitle",
      width: 180,
    },
    {
      title: "شهر",
      dataIndex: "cityTitle",
      key: "cityTitle",
      width: 150,
    },
    {
      title: "ظرفیت اسمی",
      dataIndex: "nominalCapacity",
      key: "nominalCapacity",
      width: 100,
      render: (value: number) =>
        dataPlaceHolder({
          data: value,
          isPrice: true,
        }),
    },
    {
      title: "ایجاد کننده",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 150,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
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
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      render: (_: unknown, record: MyResidenceListSearchContent) => (
        <div className="flex gap-2">
          <Link
            to={{
              pathname: DORMITORY_MY_ACTIVE_RESIDENCE_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                residenceId: record?.uuid,
                type: "myResidence",
                viewStatus: record?.visible ? "true" : "false",
                residenceTitle: record?.faTitle,
                residenceType: record?.accommodationType?.name,
              }),
            }}
          >
            <CustomButton iconPlacement="end" type="link">
              مشاهده
            </CustomButton>
          </Link>
        </div>
      ),
    },
  ];

export default MyResidenceActiveListTableModel;
