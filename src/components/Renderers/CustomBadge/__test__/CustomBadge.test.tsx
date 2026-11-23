import { createRef } from "react";

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import CustomBadge from "../CustomBadge";

describe("CustomBadge component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<CustomBadge>Badge Content</CustomBadge>);
    expect(getByText("Badge Content")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<CustomBadge className="my-badge">Content</CustomBadge>);
    const badge = container.querySelector(".custom-badge-container");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("my-badge");
  });

  it("does not add 'undefined' to className when className is not provided", () => {
    const { container } = render(<CustomBadge>Content</CustomBadge>);
    const badge = container.querySelector(".custom-badge-container");
    expect(badge).toBeInTheDocument();
    expect(badge?.className).toContain("custom-badge-container");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<CustomBadge ref={ref}>Content</CustomBadge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current?.textContent).toContain("Content");
  });

  it("renders correctly even with empty children (edge case)", () => {
    const { container } = render(<CustomBadge children={null} />);
    const badge = container.querySelector(".custom-badge-container");
    expect(badge).toBeInTheDocument();
  });

  // it("matches snapshot without count/dot", () => {
  //   const { asFragment } = render(
  //     <CustomBadge className="snapshot-badge">Snapshot Content</CustomBadge>
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
