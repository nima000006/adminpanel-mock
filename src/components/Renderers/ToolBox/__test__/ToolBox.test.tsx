import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import ToolBox from "../ToolBox";

describe("ToolBox Component", () => {
  it("renders all sides (left, center, right) correctly", () => {
    render(
      <ToolBox
        leftSide={<div>Left Content</div>}
        centerSide={<div>Center Content</div>}
        rightSide={<div>Right Content</div>}
      />
    );

    expect(screen.getByText("Left Content")).toBeInTheDocument();
    expect(screen.getByText("Center Content")).toBeInTheDocument();
    expect(screen.getByText("Right Content")).toBeInTheDocument();
  });

  it("renders correctly with only leftSide", () => {
    render(<ToolBox leftSide={<div>Only Left</div>} />);
    expect(screen.getByText("Only Left")).toBeInTheDocument();
    expect(document.querySelector(".right-side")?.textContent).toBe("");
    expect(document.querySelector(".center-side")?.textContent).toBe("");
  });

  it("renders correctly with only centerSide", () => {
    render(<ToolBox centerSide={<span>Only Center</span>} />);
    expect(screen.getByText("Only Center")).toBeInTheDocument();
    expect(document.querySelector(".left-side")?.textContent).toBe("");
    expect(document.querySelector(".right-side")?.textContent).toBe("");
  });

  it("renders correctly with only rightSide", () => {
    render(<ToolBox rightSide={<span>Only Right</span>} />);
    expect(screen.getByText("Only Right")).toBeInTheDocument();
    expect(document.querySelector(".left-side")?.textContent).toBe("");
    expect(document.querySelector(".center-side")?.textContent).toBe("");
  });

  it("handles null and undefined children safely", () => {
    const { container } = render(
      <ToolBox leftSide={null} centerSide={undefined} rightSide={<div>R</div>} />
    );
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(container.querySelector(".left-side")?.textContent).toBe("");
    expect(container.querySelector(".center-side")?.textContent).toBe("");
  });

  it("handles multiple JSX elements correctly", () => {
    render(
      <ToolBox
        leftSide={
          <>
            <span>L1</span>
            <span>L2</span>
          </>
        }
        centerSide={<strong>Middle</strong>}
      />
    );

    expect(screen.getByText("L1")).toBeInTheDocument();
    expect(screen.getByText("L2")).toBeInTheDocument();
    expect(screen.getByText("Middle")).toBeInTheDocument();
  });

  it("applies custom className correctly", () => {
    const { container } = render(
      <ToolBox
        className="custom-class"
        leftSide={<div>Left</div>}
        rightSide={<div>Right</div>}
      />
    );
    const wrapper = container.querySelector(".toolbox-container");
    expect(wrapper).toHaveClass("custom-class");
  });

  it("preserves className with multiple tokens", () => {
    const { container } = render(<ToolBox className="extra wide big" />);
    const wrapper = container.querySelector(".toolbox-container");
    expect(wrapper?.className).toContain("extra");
    expect(wrapper?.className).toContain("wide");
    expect(wrapper?.className).toContain("big");
  });

  it("renders empty sections gracefully when no props are provided", () => {
    const { container } = render(<ToolBox />);
    expect(container.querySelector(".left-side")?.textContent).toBe("");
    expect(container.querySelector(".center-side")?.textContent).toBe("");
    expect(container.querySelector(".right-side")?.textContent).toBe("");
  });

  // it("matches snapshot (full content)", () => {
  //   const { asFragment } = render(
  //     <ToolBox
  //       leftSide={<div>Left</div>}
  //       centerSide={<div>Center</div>}
  //       rightSide={<div>Right</div>}
  //       className="snapshot-test"
  //     />
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it("matches snapshot (empty)", () => {
  //   const { asFragment } = render(<ToolBox />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
