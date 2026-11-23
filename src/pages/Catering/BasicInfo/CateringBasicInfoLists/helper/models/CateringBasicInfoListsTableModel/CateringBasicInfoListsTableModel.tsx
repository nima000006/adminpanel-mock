import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { BasicInfoCategoryCount } from "@pages/Catering/BasicInfo/CateringBasicInfoLists/@types/@CateringBasicInfoLists";

const FoodBasicInfoListsTableModel = (
  handleView: (record: BasicInfoCategoryCount) => void
): CustomColumnType<BasicInfoCategoryCount>[] => [
  {
    title: "نوع اطلاعات پایه",
    dataIndex: "productCategoryTitle",
    key: "productCategoryTitle",
    render: (value: string) =>
      value ? (
        <CustomTag color="geekblue" className="w-fit">
          {value}
        </CustomTag>
      ) : (
        "-"
      ),
  },
  {
    title: "تعداد رکورد‌ها",
    dataIndex: "totalCount",
    key: "totalCount",
    width: 140,
    render: (value: number) => dataPlaceHolder({ data: value }),
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 90,
    className: "tables-sticky-column-left",
    render: (_: unknown, record: BasicInfoCategoryCount) => (
      <CustomButton type="link" onClick={() => handleView(record)}>
        مشاهده
      </CustomButton>
    ),
  },
];

export default FoodBasicInfoListsTableModel;
