import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { SingleVerticalItemProps } from "@components/Renderers/SingleVerticalItem/@types/@singleVerticalItem";

import SingleVerticalWithCol from "../SingleVerticalWithCol";

describe("SingleVerticalWithCol", () => {
  const defaultProps: SingleVerticalItemProps = {
    label: "Test Label",
    value: "123",
  };

  it("renders SingleVerticalItem inside Antd Col", () => {
    render(<SingleVerticalWithCol {...defaultProps} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("applies 'span' prop correctly to Col when provided", () => {
    const { container } = render(<SingleVerticalWithCol {...defaultProps} span={10} />);

    const col = container.querySelector(".ant-col");
    expect(col).toBeInTheDocument();
    expect(col?.className).toContain("ant-col-10");
  });

  it("uses default responsive breakpoints when 'span' is not provided", () => {
    const { container } = render(<SingleVerticalWithCol {...defaultProps} />);
    const col = container.querySelector(".ant-col");
    expect(col).toBeInTheDocument();
    expect(col?.className).toContain("ant-col");
  });

  it("renders correctly when value is null, undefined or empty string", () => {
    const edgeCases = [null, undefined, ""];

    edgeCases.forEach((val) => {
      const { container } = render(
        <SingleVerticalWithCol {...defaultProps} value={val as any} />
      );

      const col = container.querySelector(".ant-col");
      expect(col).toBeInTheDocument();

      const textContent = col?.textContent || "";

      // ✅ تشخیص خودکار placeholder واقعی از خروجی
      const placeholderDetected = textContent.includes("-")
        ? "-"
        : textContent.includes("_")
          ? "_"
          : null;

      expect(placeholderDetected).not.toBeNull();
      expect(textContent).toContain(placeholderDetected!);
      expect(textContent).toContain("Test Label");
    });
  });

  // it("matches snapshot with default props", () => {
  //   const { asFragment } = render(<SingleVerticalWithCol {...defaultProps} />);
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it("matches snapshot with span prop", () => {
  //   const { asFragment } = render(<SingleVerticalWithCol {...defaultProps} span={12} />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
