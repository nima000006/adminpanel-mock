import { dataPlaceHolder } from "@infra/helpers/utils";

import { ContractsDetailTabContentProps } from "./@types/@contractsDetailTabContentProps";

const ContractsDetailTabContent = ({
  title,
  content,
}: ContractsDetailTabContentProps) => {
  return (
    <div className="py-5">
      <div className="body-regular">
        <h3 className="mb-1!">{dataPlaceHolder({ data: title })}</h3>
        <div className="bg-neutral-2 rounded-lg p-4!">
          <p className="m-0 text-justify text-sm leading-relaxed">
            {dataPlaceHolder({ data: content })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractsDetailTabContent;
