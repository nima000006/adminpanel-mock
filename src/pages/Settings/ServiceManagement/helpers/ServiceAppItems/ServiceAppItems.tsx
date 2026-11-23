import { Col, Row } from "antd";

import { useServiceManagerContext } from "../../State/useServiceManagerContext";
import "./_serviceAppItems.scss";

type ServiceAppItemProps = {
  items: {
    id: number;
    name: string;
    image: string;
  }[];
};

type ServiceAppItemProp = {
  id: number;
  name: string;
  image: string;
};

const ServiceAppItem = ({ id, name, image }: ServiceAppItemProp) => {
  const { state, addService, removeService } = useServiceManagerContext();

  // checks if item exists in state
  const isActive = state.activeApps?.id === id;

  //
  const onItemClick = (item: ServiceAppItemProp) => {
    if (state.activeApps?.id === item?.id) {
      removeService(item.id, item.name, item.image);
    } else {
      addService(item.id, item.name, item.image);
    }
  };
  return (
    <Col onClick={() => onItemClick({ id, name, image })}>
      <div className={`service-item ${isActive ? "active-item" : ""}`}>
        <div className="image">
          <img src={`images/${image}`} alt={name + id} />
        </div>
        <div className="name">{name}</div>
      </div>
    </Col>
  );
};

const ServiceAppItems = ({ items }: ServiceAppItemProps) => {
  return (
    <Row gutter={[16, 16]}>
      {items?.map((item) => (
        <ServiceAppItem {...item} key={item?.id} />
      ))}
    </Row>
  );
};

export default ServiceAppItems;
