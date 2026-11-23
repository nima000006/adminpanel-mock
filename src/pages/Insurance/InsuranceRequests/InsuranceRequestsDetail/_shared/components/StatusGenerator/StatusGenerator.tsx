import CustomTag from "@components/Renderers/CustomTag/CustomTag";

export const InsuranceRequestStatus = ({ status }: { status: number }) => {
  switch (status) {
    case 3:
      return <CustomTag color="volcano">در انتظار پرداخت</CustomTag>;
    case 4:
      return <CustomTag color="geekblue">در حال صدور</CustomTag>;
    case 5:
      return <CustomTag color="green">صادر شده</CustomTag>;
    case 8:
      return <CustomTag color="gold">تعلیق شده</CustomTag>;
    case 7:
      return <CustomTag color="red">ابطال شده</CustomTag>;
    case 6:
      return <CustomTag>منقضی شده</CustomTag>;
  }
};
