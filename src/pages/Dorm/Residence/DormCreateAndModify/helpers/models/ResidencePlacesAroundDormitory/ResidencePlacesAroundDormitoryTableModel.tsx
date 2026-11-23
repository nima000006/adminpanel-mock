import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";

import { PlacesAroundDormitoryType } from "../../../@types/@dormCreateAndModify";

const ResidencePlacesAroundDormitoryTableModel = () => {
  //todo[Atefeh]: uncomment when icons got ready
  // const IconMapper = {
  //   1: Saman,
  //   2: Akbar,
  //   3:Atefeh
  // }
  return [
    // {
    //   title: "آیکن",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 50,
    //   render: (value: string) => {
    //     return <>{IconMapper?.[value]}</>;
    //   },
    // },
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (value: string) => {
        return <SingleVerticalItem value={value} />;
      },
    },
    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: 250,
      render: (value: string, records: PlacesAroundDormitoryType) => {
        return <CustomInput name={`description${records?.id}`} placeholder={value} />;
      },
    },
  ];
};

export default ResidencePlacesAroundDormitoryTableModel;
