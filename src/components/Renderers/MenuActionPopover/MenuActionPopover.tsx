import { useState } from "react";

import { IconType } from "react-icons";
import { HiOutlineDotsVertical } from "react-icons/hi";

import CustomPopover from "@components/Renderers/CustomPopover/CustomPopover";

// Example
// const contentItems = [
//   {
//     id: 1,
//     Icon: BsEye,
//     title: "مشاهده",
//     onclick: () => {},
//   },
//   {
//     id: 2,
//     Icon: BsEye,
//     title: "مشاهده طبقات",
//     onclick: () => {},
//   },
//   {
//     id: 3,
//     Icon: BsEye,
//     title: "غیرفعالسازی (انتقال به آرشیو)",
//     onclick: () => {},
//   },
// ];

const MenuActionPopover = ({
  contentItems,
}: {
  contentItems: {
    id: number;
    Icon: IconType;
    title: string;
    onclick: () => void;
  }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <CustomPopover
      placement="bottomRight"
      arrow={false}
      content={
        <div>
          {contentItems?.map(({ Icon, title, id, onclick }) => (
            <div
              key={id}
              onClick={onclick}
              className="hover:bg-primary-1 bod-regular flex items-center gap-2 rounded-xl px-2 py-1 hover:cursor-pointer"
            >
              <Icon />
              <span>{title}</span>
            </div>
          ))}
        </div>
      }
      onOpenChange={setOpen}
    >
      <div
        className={`border-neutral-5 flex h-8 w-8 items-center justify-center rounded-md border p-1 ${open ? "border-primary-5" : ""}`}
      >
        <HiOutlineDotsVertical
          color={open ? "blue" : ""}
          className={`open ? "text-primary-5" : ""`}
        />
      </div>
    </CustomPopover>
  );
};

export default MenuActionPopover;
