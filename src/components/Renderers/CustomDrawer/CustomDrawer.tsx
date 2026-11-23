import { Drawer, GetProps } from "antd";
import "./_customDrawer.scss";

type CustomDrawerProps = {
  className?: string;
  content: React.ReactNode;
  size?: "default" | "large";
} & GetProps<typeof Drawer>;

const CustomDrawer = ({
  className,
  content,
  size = "large",
  ...props
}: CustomDrawerProps) => {
  return (
    <Drawer
      className={`custom-drawer-container ${className}`}
      size={size}
      rootClassName="custom-drawer-root-class"
      {...props}
    >
      {content}
    </Drawer>
  );
};
export default CustomDrawer;
