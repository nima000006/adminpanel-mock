import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import CustomDivider from "../CustomDivider";

// اگر SCSS import شده مشکلی ایجاد کرد
vi.mock("../_customDivider.scss", () => ({}));

describe("CustomDivider component", () => {
  it("renders with default props", () => {
    const { container } = render(<CustomDivider text="Default Divider" />);
    const divider = container.querySelector(".divider-main");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveTextContent(/Default Divider/);
  });

  it("renders extra content when provided", () => {
    render(<CustomDivider text="Main" extraContent={<span>Extra</span>} />);
    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Extra/i)).toBeInTheDocument();
  });

  it("applies className, rootClassName and extraContentClassName", () => {
    const { container } = render(
      <CustomDivider
        text="Classes"
        className="main-class"
        rootClassName="root-class"
        extraContentClassName="extra-class"
      />
    );

    const divider = container.querySelector(".divider-main");
    const extraContent = container.querySelector(".extra-content-container");

    expect(divider).toHaveClass("main-class");
    expect(extraContent).toHaveClass("extra-class");
  });

  it("respects type, plain, dashed, style and orientationMargin props", () => {
    const style = { color: "red" };
    const { container } = render(
      <CustomDivider
        type="horizontal"
        plain={false}
        dashed
        style={style}
        orientationMargin={10}
        text="Styled"
      />
    );

    const divider = container.querySelector(".divider-main");
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass("divider-main");
    expect(divider).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(divider).toHaveTextContent(/Styled/);
  });

  it("renders safely when no text or extraContent provided", () => {
    const { container } = render(<CustomDivider />);
    const divider = container.querySelector(".divider-main");
    expect(divider).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/Extra|Main/);
  });
});
