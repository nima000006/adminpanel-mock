import { Link } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { DormitoryBasicInfoType } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoList/@types/@dormitoryBasicInfoList";
import { basicInfoDetailRouteMap } from "@pages/Dormitory/BasicInfo/DormitoryBasicInfoList/helper/models/DormitoryBasicInfoListTableModel/helper/utils";

const DormitoryBasicInfoListTableModel =
  (): CustomColumnType<DormitoryBasicInfoType>[] => {
    return [
      {
        title: "نوع اطلاعات پایه",
        dataIndex: "type",
        key: "type",
        width: 940,
        render: (value: IdTitleName) => dataPlaceHolder({ data: value?.title }),
      },
      {
        title: "تعداد رکورد‌ها",
        dataIndex: "count",
        key: "count",
        width: 100,
        render: (value: number) => dataPlaceHolder({ data: value }),
      },
      {
        title: "",
        dataIndex: "id",
        key: "id",
        fixed: "right" as FixedType,
        width: 100,
        className: "tables-sticky-column-left",
        render: (_: unknown, record: DormitoryBasicInfoType) => (
          <div>
            <CustomButton type="link">
              <Link
                to={{
                  pathname: basicInfoDetailRouteMap[record?.type?.name],
                }}
              >
                مشاهده
              </Link>
            </CustomButton>
          </div>
        ),
      },
    ];
  };
export default DormitoryBasicInfoListTableModel;
