import { Collapse } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { AssociationGeneralBuildingType } from "../../../@types/@buildingDetailDrawerContent";

const rulesItem = [
  {
    title: "قوانین و مقررات عمومی ساختمان",
    id: 1,
  },
  {
    title: "قوانین و مقررات مالی ساختمان",
    id: 2,
  },
  {
    title: "قوانین و مقررات انضباطی ساختمان",
    id: 3,
  },
  {
    title: "قوانین و مقررات کنسلی",
    id: 4,
  },
  {
    title: "قوانین و مقررات اقساط",
    id: 6,
  },
];

const BuildingDetailBuildingRules = ({
  data,
  loading,
}: {
  data: AssociationGeneralBuildingType[] | undefined;
  loading: boolean;
}) => {
  //* ================================ Util Functions ================================
  const rulesItemGenerator = (data: AssociationGeneralBuildingType[]) => {
    if (data?.length === 0) return "-";
    return data?.map(
      (item, index) =>
        item?.title && (
          <div key={item?.id} className="building-rules-item">
            <span>{index + 1}- </span>
            <span>{item?.title}</span>
          </div>
        )
    );
  };

  return (
    <Div loading={loading} className="building-rules-container">
      <CustomDivider text="قوانین و مقررات" />
      {data &&
        rulesItem?.map((rule) => {
          const filteredData = data?.filter((item) => item?.typeId === rule?.id);
          return (
            <Collapse
              key={rule.id}
              items={[
                {
                  key: rule.id.toString(),
                  label: rule.title,
                  children: (
                    <>
                      {dataPlaceHolder({
                        data: data,
                        callBack: () => rulesItemGenerator(filteredData),
                      })}
                    </>
                  ),
                },
              ]}
            />
          );
        })}
    </Div>
  );
};

export default BuildingDetailBuildingRules;
