import React from "react";

import { render, screen } from "@testing-library/react";
import { AlertRef } from "antd/es/alert/Alert";
import { describe, it, expect } from "vitest";

import CustomAlert from "../CustomAlert";

describe("CustomAlert component", () => {
  it("renders CustomAlert with default class", () => {
    render(<CustomAlert message="Hello World" />);
    const alert = screen.getByText("Hello World");
    expect(alert).toBeInTheDocument();
    const wrapper = alert.closest(".custom-alert-container");
    expect(wrapper).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CustomAlert message="Test Alert" className="my-alert" />);
    const wrapper = screen.getByText("Test Alert").closest(".custom-alert-container");
    expect(wrapper).toHaveClass("custom-alert-container");
    expect(wrapper).toHaveClass("my-alert");
  });

  it("renders with different AntD props", () => {
    render(<CustomAlert message="Warning!" type="warning" showIcon />);
    const alert = screen.getByText("Warning!");
    expect(alert).toBeInTheDocument();

    const wrapper = alert.closest(".custom-alert-container");
    expect(wrapper).toHaveClass("custom-alert-container");
    // بررسی کلاس type از AntD
    expect(wrapper).toHaveClass("ant-alert-warning");
    // بررسی آیکون
    expect(wrapper?.querySelector(".ant-alert-icon")).toBeInTheDocument();
  });

  it("supports ref forwarding", () => {
    const ref = React.createRef<AlertRef>();
    render(<CustomAlert message="Ref Test" ref={ref} />);

    // ref باید بعد از render تنظیم شده باشد
    expect(ref.current).not.toBeNull();
    // بررسی اینکه nativeElement موجود است
    expect(ref.current?.nativeElement).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.nativeElement.textContent).toBe("Ref Test");
  });
});
