import React from "react";

import { render, screen } from "@testing-library/react";
import { GetRef } from "antd";
import { describe, it, expect } from "vitest";

import CustomTag from "../CustomTag";

describe("CustomTag component", () => {
  // ---------- Basic render ----------
  it("renders CustomTag with children", () => {
    render(<CustomTag>Test Tag</CustomTag>);
    expect(screen.getByText("Test Tag")).toBeInTheDocument();
  });

  // ---------- ClassName ----------
  it("applies default and custom class names", () => {
    render(<CustomTag className="extra-class">Styled Tag</CustomTag>);
    const tag = screen.getByText("Styled Tag");
    expect(tag).toHaveClass("custom-tag-main-container");
    expect(tag).toHaveClass("extra-class");
  });

  // ---------- Static Width ----------
  it("applies staticWidth style correctly (number)", () => {
    render(<CustomTag staticWidth={120}>Width Tag</CustomTag>);
    const tag = screen.getByText("Width Tag");
    expect(tag).toHaveStyle({ width: "120px" });
  });

  it("applies staticWidth style correctly (string)", () => {
    render(<CustomTag staticWidth="50%">Width Tag</CustomTag>);
    const tag = screen.getByText("Width Tag");
    expect(tag).toHaveStyle({ width: "50%" });
  });

  // ---------- Props forwarding ----------
  it("forwards AntD Tag props correctly", () => {
    render(
      <CustomTag color="magenta" bordered={false}>
        Colored Tag
      </CustomTag>
    );
    const tag = screen.getByText("Colored Tag");
    // رنگ و کلاس AntD باید اعمال بشه
    expect(tag).toHaveClass("ant-tag");
    expect(tag).toHaveClass("ant-tag-magenta");
  });

  // ---------- Ref forwarding ----------
  it("forwards ref correctly", () => {
    const ref = React.createRef<GetRef<typeof CustomTag>>();
    render(<CustomTag ref={ref}>Ref Tag</CustomTag>);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.textContent).toBe("Ref Tag");
  });

  // ---------- Snapshot ----------
  // it("matches snapshot", () => {
  //   const { asFragment } = render(<CustomTag color="blue">Snapshot Tag</CustomTag>);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
