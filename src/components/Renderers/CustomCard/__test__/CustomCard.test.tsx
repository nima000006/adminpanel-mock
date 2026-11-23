import { createRef } from "react";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import CustomCard from "../CustomCard";

describe("CustomCard component", () => {
  it("renders without crashing", () => {
    render(<CustomCard>Card Content</CustomCard>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(<CustomCard className="my-card">Content</CustomCard>);
    const card = container.querySelector(".custom-card-container");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("my-card");
  });

  it("does not fail when className is undefined", () => {
    const { container } = render(<CustomCard>Content</CustomCard>);
    const card = container.querySelector(".custom-card-container");
    expect(card).toBeInTheDocument();
    expect(card).not.toHaveClass("undefined");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CustomCard ref={ref}>Content</CustomCard>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.textContent).toBe("Content");
  });

  it("passes standard Card props correctly", () => {
    const { container } = render(
      <CustomCard title="Card Title" hoverable bordered>
        Content
      </CustomCard>
    );

    // بررسی title
    expect(screen.getByText("Card Title")).toBeInTheDocument();

    const card = container.querySelector(".custom-card-container");
    expect(card).toBeInTheDocument();
    // hoverable و bordered در DOM با کلاس ها اعمال میشه
    expect(card).toHaveClass("ant-card-hoverable");
    expect(card).toHaveClass("ant-card-bordered");
  });

  it("renders correctly even with empty children (edge case)", () => {
    const { container } = render(<CustomCard />);
    const card = container.querySelector(".custom-card-container");
    expect(card).toBeInTheDocument();
    expect(card?.textContent).toBe(""); // هیچ محتوایی نباید باشد
  });

  // it("matches snapshot", () => {
  //   const { asFragment } = render(
  //     <CustomCard className="snapshot-card" title="Snapshot Title">
  //       Snapshot Content
  //     </CustomCard>
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
