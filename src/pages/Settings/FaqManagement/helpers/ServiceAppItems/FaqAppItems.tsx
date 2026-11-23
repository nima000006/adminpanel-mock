import { Col, Row } from "antd";

import { useFaqManagerContext } from "../../State/useFaqManagerContext";
import "./_faqAppItems.scss";

type FaqAppItemsProps = {
  items: {
    id: number;
    name: string;
    image: string;
  }[];
};

type FaqAppItemProp = {
  id: number;
  name: string;
  image: string;
};

// SINGLE FAQ
const FaqAppItem = ({ id, name, image }: FaqAppItemProp) => {
  const { state, addService, removeService } = useFaqManagerContext();

  // checks if item exists in state
  const isActive = state.activeApps?.id === id;

  //
  const onItemClick = (item: FaqAppItemProp) => {
    if (state.activeApps?.id === item?.id) {
      removeService(item.id, item.name, item.image);
    } else {
      addService(item.id, item.name, item.image);
    }
  };
  return (
    <Col onClick={() => onItemClick({ id, name, image })}>
      <div className={`faq-item ${isActive ? "active-item" : ""}`}>
        <div className="image">
          <img src={`images/${image}`} alt={name + id} width={24} height={24} />
        </div>
        <div className="name">{name}</div>
      </div>
    </Col>
  );
};

// EVERY FAQS
const FaqAppItems = ({ items }: FaqAppItemsProps) => {
  return (
    <Row gutter={[16, 16]}>
      {items?.map((item) => (
        <FaqAppItem {...item} key={item?.id} />
      ))}
    </Row>
  );
};

export default FaqAppItems;
