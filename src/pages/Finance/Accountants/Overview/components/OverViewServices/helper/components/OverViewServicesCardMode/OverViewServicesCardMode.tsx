import { Col } from "antd";

import CustomCard from "@components/CustomCard/CustomCard";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { PADDING_24 } from "@infra/VARS/globalStyles/globalStyles";

const OverViewServicesCardMode = ({ item }: { item: any }) => {
  return (
    <Col key={item.id} xs={24} sm={12} md={12} lg={8}>
      <CustomCard className="body-regular flex flex-col gap-6" padding={PADDING_24}>
        <SamimServiceTag service={item?.service} />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <p className="flex gap-2">
              <span>مانده ابتدای دوره</span>
              <CustomTag className="w-fit" color="red">
                {"بستانکار"}
              </CustomTag>
            </p>
            <p className="text-neutral-12 font-bold!">
              {dataPlaceHolder({ data: item.indebtedness, isPrice: true })} تومان
            </p>
          </div>

          <div className="flex flex-col">
            <p>مطالبات ذینفعان (بستانکاری)</p>
            <p className="text-neutral-12 font-bold!">
              {dataPlaceHolder({ data: item.creditor, isPrice: true })} تومان
            </p>
          </div>

          <div className="flex flex-col">
            <p>تعهدات ذینفعان (بدهکاری)</p>
            <p className="text-neutral-12 font-bold!">
              {dataPlaceHolder({ data: item.beginningBalance, isPrice: true })} تومان
            </p>
          </div>

          <div className="flex flex-col">
            <p className="flex gap-2">
              <span>مانده انتهای دوره</span>
              <CustomTag className="w-fit" color="red">
                {"بستانکار"}
              </CustomTag>
            </p>
            <p className="text-neutral-12 font-bold!">
              {dataPlaceHolder({ data: item.beginningBalance, isPrice: true })} تومان
            </p>
          </div>
        </div>
      </CustomCard>
    </Col>
  );
};
export default OverViewServicesCardMode;
