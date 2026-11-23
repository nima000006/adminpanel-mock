import { createRef, forwardRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import CustomTooltip from "../CustomTooltip";

import type * as Antd from "antd";

//Mock antd Tooltip to observe props
vi.mock("antd", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof Antd;
  return {
    ...actual,
    Tooltip: forwardRef<HTMLDivElement, any>(({ children, title, className }, ref) => (
      <div ref={ref} data-testid="mock-tooltip" className={className}>
        <span data-testid="tooltip-title">{title}</span>
        {children}
      </div>
    )),
  };
});

describe("CustomTooltip Component", () => {
  test("renders children correctly", () => {
    render(
      <CustomTooltip title="تست">
        <button>کلیک</button>
      </CustomTooltip>
    );

    expect(screen.getByText("کلیک")).toBeInTheDocument();
  });

  test("passes title prop to Tooltip", () => {
    render(
      <CustomTooltip title="متن تولتیپ">
        <span>Hover me</span>
      </CustomTooltip>
    );

    expect(screen.getByTestId("tooltip-title")).toHaveTextContent("متن تولتیپ");
  });

  test("applies className properly", () => {
    render(
      <CustomTooltip className="my-tooltip" title="کلاس">
        <span>Text</span>
      </CustomTooltip>
    );

    expect(screen.getByTestId("mock-tooltip")).toHaveClass("my-tooltip");
  });

  test("forwards ref to Tooltip", () => {
    const ref = createRef<any>();
    render(
      <CustomTooltip ref={ref} title="ref تست">
        <div>Child</div>
      </CustomTooltip>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.dataset.testid).toBe("mock-tooltip");
  });

  test("forwards extra props to Tooltip", () => {
    render(
      <CustomTooltip title="hover text" placement="bottomRight" trigger={["click"]}>
        <div>Click</div>
      </CustomTooltip>
    );
  });
});
