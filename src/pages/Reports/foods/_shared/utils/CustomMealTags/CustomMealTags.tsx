import CustomTag from "@components/Renderers/CustomTag/CustomTag";

const CustomMealTags = ({ value }: { value: string }) => {
  let color = "";
  switch (value) {
    case "صبحانه":
      color = "geekblue";
      break;
    case "ناهار":
      color = "green";
      break;
    case "شام":
      color = "red";
      break;
    case "افطاری":
      color = "cyan";
      break;
    case "سحری":
      color = "gold";
      break;

    default:
      break;
  }

  return (
    <CustomTag className="meal" color={color}>
      {value}
    </CustomTag>
  );
};

export default CustomMealTags;
