import { dataPlaceHolder } from "@infra/helpers/utils";

const InfoBox = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-neutral-7"> {dataPlaceHolder({ data: title })} </span>
      <span className="text-neutral-11">{dataPlaceHolder({ data: value })}</span>
    </div>
  );
};
export default InfoBox;
