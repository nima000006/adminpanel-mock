import React from "react";

import { render } from "@testing-library/react";
import { GetRef } from "antd";
import { describe, it, expect } from "vitest";

import CustomRate from "../CustomRate";

describe("CustomRate component", () => {
  // ---------- Render و Wrapper ----------
  it("renders CustomRate with default class", () => {
    render(<CustomRate />);
    const wrapper = document.querySelector(".custom-rate-container");
    expect(wrapper).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CustomRate className="my-rate" />);
    const wrapper = document.querySelector(".custom-rate-container");
    expect(wrapper).toHaveClass("custom-rate-container");
    expect(wrapper).toHaveClass("my-rate");
  });

  // ---------- Props ----------
  it("renders with AntD Rate props", () => {
    render(<CustomRate count={10} disabled allowHalf />);
    const wrapper = document.querySelector(".custom-rate-container");
    expect(wrapper).toBeInTheDocument();

    // بررسی وجود ستاره‌ها
    const stars = wrapper?.querySelectorAll(".ant-rate-star");
    expect(stars?.length).toBe(10);
    // کلاس disabled
    expect(wrapper).toHaveClass("ant-rate-disabled");
  });

  // ---------- Functional behavior (ref forwarding) ----------
  it("supports ref forwarding", () => {
    const ref = React.createRef<GetRef<typeof CustomRate>>();
    render(<CustomRate ref={ref} />);
    expect(ref.current).not.toBeNull();
    // بررسی اینکه می‌توان به متدهای Rate دسترسی داشت
    expect(typeof ref.current?.focus).toBe("function");
  });
});
