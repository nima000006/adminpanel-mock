import { Col, Row } from "antd";

import { useBannerManagerContext } from "../../State/useBannerManagerContext";
import "./_bannerAppItems.scss";

type BannerAppItemsProps = {
  items: {
    id: number;
    name: string;
    image: string;
  }[];
};

type BannerAppItemProp = {
  id: number;
  name: string;
  image: string;
};

// SINGLE BANNER
const BannerAppItem = ({ id, name, image }: BannerAppItemProp) => {
  const { state, addService, removeService } = useBannerManagerContext();

  // checks if item exists in state
  const isActive = state.activeApps?.id === id;

  //
  const onItemClick = (item: BannerAppItemProp) => {
    if (state.activeApps?.id === item?.id) {
      removeService(item.id, item.name, item.image);
    } else {
      addService(item.id, item.name, item.image);
    }
  };
  return (
    <Col onClick={() => onItemClick({ id, name, image })}>
      <div className={`banner-item ${isActive ? "active-item" : ""}`}>
        <div className="image">
          <img src={`images/${image}`} alt={name + id} width={24} height={24} />
        </div>
        <div className="name">{name}</div>
      </div>
    </Col>
  );
};

// EVERY BANNERS
const BannerAppItems = ({ items }: BannerAppItemsProps) => {
  return (
    <Row gutter={[16, 16]}>
      {items?.map((item) => (
        <BannerAppItem {...item} key={item?.id} />
      ))}
    </Row>
  );
};

export default BannerAppItems;
