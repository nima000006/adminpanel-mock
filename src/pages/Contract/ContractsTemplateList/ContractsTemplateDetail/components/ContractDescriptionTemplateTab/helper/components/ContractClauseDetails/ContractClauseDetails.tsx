import { dataPlaceHolder } from "@infra/helpers/utils";

const ContractClauseDetails = ({
  title,
  desc,
}: {
  title: string | undefined;
  desc: string | undefined;
}) => {
  return (
    <div>
      <div>
        <h3 className="mb-1!">{dataPlaceHolder({ data: title })}</h3>
        <div className="bg-neutral-2 rounded-lg p-4!">
          <p className="body-regular">{dataPlaceHolder({ data: desc })}</p>
        </div>
      </div>
    </div>
  );
};
export default ContractClauseDetails;
