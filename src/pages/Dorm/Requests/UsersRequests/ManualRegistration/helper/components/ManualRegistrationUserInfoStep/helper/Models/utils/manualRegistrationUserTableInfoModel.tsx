import CustomTag from "@components/Renderers/CustomTag/CustomTag";

export const firstName = {
  title: "نام",
  dataIndex: "firstName",
  key: "firstName",
  width: 130,
};
export const lastName = {
  title: "نام خانوادگی",
  dataIndex: "lastName",
  key: "lastName",
  width: 130,
};
export const genderName = {
  title: "جنسیت",
  dataIndex: "genderName",
  key: "genderName",
  width: 100,
  render: (value: string) => {
    return (
      <CustomTag color={value === "مرد" ? "purple" : value === "زن" ? "volcano" : ""}>
        {value}
      </CustomTag>
    );
  },
};
//Todo[Atefeh]: uncomment when api got ready
// {
//   title: "گروه کاربری",
//   dataIndex: "userGroup",
//   key: "userGroup",
//   width: 150,
//   render: (value: number) => {
//     return (
//       <CustomTag color={value === 0 ? "geekblue" : value === 1 ? "cyan" : "red"}>
//         {value === 0 ? "دانشجو" : value === 1 ? "استاد" : "کارکنان"}
//       </CustomTag>
//     );
//   },
// },
export const studentNumber = {
  title: "شماره دانشجویی / شماره پرسنلی",
  dataIndex: "studentNumber",
  key: "studentNumber",
  width: 200,
};
export const nationalCode = {
  title: "کدملی / اتباع",
  dataIndex: "nationalCode",
  key: "nationalCode",
  width: 130,
};
export const branchName = {
  title: "واحد دانشگاهی",
  dataIndex: "branchName",
  key: "branchName",
  width: 130,
};
export const levelName = {
  title: "مقطع تحصیلی",
  dataIndex: "levelName",
  key: "levelName",
  width: 130,
};
export const fieldName = {
  title: "رشته تحصیلی",
  dataIndex: "fieldName",
  key: "fieldName",
  width: 130,
};
//Todo[Atefeh]: uncomment when api got ready
// {
//   title: "سال ورود",
//   dataIndex: "entranceYear",
//   key: "entranceYear",
//   width: 130,
// },
// {
//   title: "ترم",
//   dataIndex: "term",
//   key: "term",
//   width: 130,
// },
