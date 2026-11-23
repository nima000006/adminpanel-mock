import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { PlacesAroundDormitoryType } from "@pages/Dorm/Residence/DormCreateAndModify/@types/@dormCreateAndModify";
import { iconMap } from "@pages/Dorm/Residence/DormsMainDetail/utils/placesIcon";

const ResidenceReturnedDetailTableModel = () => {
  return [
    {
      title: "آیکن",
      dataIndex: "id",
      key: "id",
      width: 50,
      render: (value: number) => <span>{iconMap[value] || null}</span>,
    },

    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (value: string) => {
        return <SingleVerticalItem label="" value={value} />;
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

export default ResidenceReturnedDetailTableModel;
