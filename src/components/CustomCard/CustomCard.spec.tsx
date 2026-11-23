import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import CustomCard from "./CustomCard";

describe("CustomCard Component - Comprehensive Tests", () => {
  describe("Rendering", () => {
    test("renders CustomCard with children correctly", () => {
      render(
        <CustomCard>
          <div>Test Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    test("renders multiple children correctly", () => {
      render(
        <CustomCard>
          <div>First Child</div>
          <div>Second Child</div>
          <span>Third Child</span>
        </CustomCard>
      );

      expect(screen.getByText("First Child")).toBeInTheDocument();
      expect(screen.getByText("Second Child")).toBeInTheDocument();
      expect(screen.getByText("Third Child")).toBeInTheDocument();
    });

    test("renders with text children", () => {
      render(<CustomCard>Simple text content</CustomCard>);

      expect(screen.getByText("Simple text content")).toBeInTheDocument();
    });

    test("renders with complex JSX children", () => {
      render(
        <CustomCard>
          <div data-testid="complex">
            <h1>Title</h1>
            <p>Paragraph</p>
            <button>Button</button>
          </div>
        </CustomCard>
      );

      const complexDiv = screen.getByTestId("complex");
      expect(complexDiv).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Container Structure", () => {
    test("renders with default container class", () => {
      const { container } = render(
        <CustomCard>
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
    });

    test("applies custom className correctly", () => {
      const { container } = render(
        <CustomCard className="my-custom-class">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveClass("my-custom-class");
    });

    test("combines default and custom className", () => {
      const { container } = render(
        <CustomCard className="additional-class">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveClass("custom-card-renderer-container");
      expect(cardContainer).toHaveClass("additional-class");
    });

    test("handles empty className gracefully", () => {
      const { container } = render(
        <CustomCard className="">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
      expect(cardContainer).toHaveClass("custom-card-renderer-container");
    });

    test("handles undefined className", () => {
      const { container } = render(
        <CustomCard className={undefined}>
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
    });
  });

  describe("Padding Prop", () => {
    test("applies default padding of 1rem", () => {
      const { container } = render(
        <CustomCard>
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "1rem" });
    });

    test("applies custom padding value", () => {
      const { container } = render(
        <CustomCard padding="2rem">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "2rem" });
    });

    test("applies padding in pixels", () => {
      const { container } = render(
        <CustomCard padding="20px">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "20px" });
    });

    test("applies zero padding", () => {
      const { container } = render(
        <CustomCard padding="0">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "0" });
    });

    test("applies complex padding value", () => {
      const { container } = render(
        <CustomCard padding="1rem 2rem 3rem 4rem">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "1rem 2rem 3rem 4rem" });
    });

    test("applies padding with calc", () => {
      const { container } = render(
        <CustomCard padding="calc(100% - 50px)">
          <div>Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "calc(100% - 50px)" });
    });
  });

  describe("Loading State", () => {
    test("shows MainSpinner when loading is true", () => {
      const { container } = render(
        <CustomCard loading={true}>
          <div>Content</div>
        </CustomCard>
      );

      // Children should not be rendered
      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      // Spinner should be present
      const spinner = container.querySelector(".ant-skeleton");
      expect(spinner).toBeInTheDocument();
    });

    test("shows children when loading is false", () => {
      render(
        <CustomCard loading={false}>
          <div>Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    test("shows children when loading is undefined", () => {
      render(
        <CustomCard>
          <div>Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    test("transitions from loading to loaded", () => {
      const { rerender } = render(
        <CustomCard loading={true}>
          <div>Content</div>
        </CustomCard>
      );

      // Initially loading
      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      // After rerender without loading
      rerender(
        <CustomCard loading={false}>
          <div>Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    test("transitions from loaded to loading", () => {
      const { rerender } = render(
        <CustomCard loading={false}>
          <div>Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();

      rerender(
        <CustomCard loading={true}>
          <div>Content</div>
        </CustomCard>
      );

      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("isSkeleton Prop", () => {
    test("shows skeleton when loading and isSkeleton is true (default)", () => {
      const { container } = render(
        <CustomCard loading={true}>
          <div>Content</div>
        </CustomCard>
      );

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    test("shows skeleton when loading and isSkeleton is explicitly true", () => {
      const { container } = render(
        <CustomCard loading={true} isSkeleton={true}>
          <div>Content</div>
        </CustomCard>
      );

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    test("shows spinner when loading and isSkeleton is false", () => {
      const { container } = render(
        <CustomCard loading={true} isSkeleton={false}>
          <div>Content</div>
        </CustomCard>
      );

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toBeInTheDocument();

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();
    });

    test("isSkeleton has no effect when not loading", () => {
      render(
        <CustomCard loading={false} isSkeleton={true}>
          <div>Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Combined Props", () => {
    test("applies all props together correctly", () => {
      const { container } = render(
        <CustomCard
          padding="3rem"
          className="combined-test"
          loading={false}
          isSkeleton={false}
        >
          <div>Combined Content</div>
        </CustomCard>
      );

      const cardContainer = container.querySelector(".custom-card-renderer-container");

      expect(cardContainer).toHaveStyle({ padding: "3rem" });
      expect(cardContainer).toHaveClass("combined-test");
      expect(screen.getByText("Combined Content")).toBeInTheDocument();
    });

    test("loading overrides other display settings", () => {
      const { container } = render(
        <CustomCard
          loading={true}
          padding="5rem"
          className="will-not-show"
          isSkeleton={true}
        >
          <div>Hidden Content</div>
        </CustomCard>
      );

      expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "5rem" });
      expect(cardContainer).toHaveClass("will-not-show");
    });
  });

  describe("Edge Cases", () => {
    test("handles null children", () => {
      const { container } = render(<CustomCard>{null}</CustomCard>);

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
    });

    test("handles undefined children", () => {
      const { container } = render(<CustomCard>{undefined}</CustomCard>);

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
    });

    test("handles empty string children", () => {
      render(<CustomCard>{""}</CustomCard>);

      const cardContainer = document.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
    });

    test("handles boolean children", () => {
      const { container } = render(<CustomCard>{true}</CustomCard>);

      const cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toBeInTheDocument();
    });

    test("handles array of children", () => {
      render(
        <CustomCard>
          {["First", "Second", "Third"].map((item) => (
            <div key={item}>{item}</div>
          ))}
        </CustomCard>
      );

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();
    });

    test("handles fragments as children", () => {
      render(
        <CustomCard>
          <>
            <div>Fragment Child 1</div>
            <div>Fragment Child 2</div>
          </>
        </CustomCard>
      );

      expect(screen.getByText("Fragment Child 1")).toBeInTheDocument();
      expect(screen.getByText("Fragment Child 2")).toBeInTheDocument();
    });
  });

  describe("Content Visibility", () => {
    test("content is visible when not loading", () => {
      render(
        <CustomCard loading={false}>
          <button data-testid="interactive-btn">Click Me</button>
        </CustomCard>
      );

      const button = screen.getByTestId("interactive-btn");
      expect(button).toBeVisible();
    });

    test("content is not visible when loading", () => {
      render(
        <CustomCard loading={true}>
          <button data-testid="interactive-btn">Click Me</button>
        </CustomCard>
      );

      const button = screen.queryByTestId("interactive-btn");
      expect(button).not.toBeInTheDocument();
    });

    test("maintains accessibility when loaded", () => {
      render(
        <CustomCard>
          <button aria-label="Accessible Button">Click</button>
        </CustomCard>
      );

      const button = screen.getByRole("button", { name: "Accessible Button" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Style Inheritance", () => {
    test("children can have their own styles", () => {
      render(
        <CustomCard>
          <div style={{ color: "red", fontSize: "20px" }}>Styled Content</div>
        </CustomCard>
      );

      const styledDiv = screen.getByText("Styled Content");
      // Browser converts 'red' to 'rgb(255, 0, 0)'
      expect(styledDiv).toHaveStyle({ color: "rgb(255, 0, 0)", fontSize: "20px" });
    });

    test("children can have their own classes", () => {
      render(
        <CustomCard>
          <div className="child-class">Child with Class</div>
        </CustomCard>
      );

      const childDiv = screen.getByText("Child with Class");
      expect(childDiv).toHaveClass("child-class");
    });
  });

  describe("Re-rendering Behavior", () => {
    test("updates children when props change", () => {
      const { rerender } = render(
        <CustomCard>
          <div>Initial Content</div>
        </CustomCard>
      );

      expect(screen.getByText("Initial Content")).toBeInTheDocument();

      rerender(
        <CustomCard>
          <div>Updated Content</div>
        </CustomCard>
      );

      expect(screen.queryByText("Initial Content")).not.toBeInTheDocument();
      expect(screen.getByText("Updated Content")).toBeInTheDocument();
    });

    test("updates padding dynamically", () => {
      const { container, rerender } = render(
        <CustomCard padding="1rem">
          <div>Content</div>
        </CustomCard>
      );

      let cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "1rem" });

      rerender(
        <CustomCard padding="5rem">
          <div>Content</div>
        </CustomCard>
      );

      cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveStyle({ padding: "5rem" });
    });

    test("updates className dynamically", () => {
      const { container, rerender } = render(
        <CustomCard className="initial-class">
          <div>Content</div>
        </CustomCard>
      );

      let cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).toHaveClass("initial-class");

      rerender(
        <CustomCard className="updated-class">
          <div>Content</div>
        </CustomCard>
      );

      cardContainer = container.querySelector(".custom-card-renderer-container");
      expect(cardContainer).not.toHaveClass("initial-class");
      expect(cardContainer).toHaveClass("updated-class");
    });
  });
});
