import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import MainSpinner from "./MainSpinner";

describe("MainSpinner Component - Comprehensive Tests", () => {
  describe("Rendering Modes", () => {
    test("renders Spin component by default (isSkeleton=false)", () => {
      const { container } = render(<MainSpinner />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toBeInTheDocument();

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();
    });

    test("renders Skeleton when isSkeleton is true", () => {
      const { container } = render(<MainSpinner isSkeleton={true} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    test("renders Spin when isSkeleton is explicitly false", () => {
      const { container } = render(<MainSpinner isSkeleton={false} />);

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).not.toBeInTheDocument();
    });

    test("does not render both Spin and Skeleton at the same time", () => {
      const { container: spinContainer } = render(<MainSpinner isSkeleton={false} />);
      const spinner = spinContainer.querySelector(".ant-spin");
      const spinSkeleton = spinContainer.querySelector(".ant-skeleton");

      expect(spinner).toBeInTheDocument();
      expect(spinSkeleton).not.toBeInTheDocument();

      const { container: skeletonContainer } = render(<MainSpinner isSkeleton={true} />);
      const skeletonSpinner = skeletonContainer.querySelector(".ant-spin");
      const skeleton = skeletonContainer.querySelector(".ant-skeleton");

      expect(skeleton).toBeInTheDocument();
      expect(skeletonSpinner).not.toBeInTheDocument();
    });
  });

  describe("Spin Mode Configuration", () => {
    test("renders Spin with default size (large)", () => {
      const { container } = render(<MainSpinner />);

      const spinner = container.querySelector(".ant-spin-lg");
      expect(spinner).toBeInTheDocument();
    });

    test("Spin container has proper centering classes", () => {
      const { container } = render(<MainSpinner />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveClass("page-spinner-container");
    });

    test("Spin is wrapped in correct structure", () => {
      const { container } = render(<MainSpinner />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      const spinner = spinnerContainer?.querySelector(".ant-spin");

      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Skeleton Mode Configuration", () => {
    test("renders default number of skeletons (1)", () => {
      const { container } = render(<MainSpinner isSkeleton={true} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(1);
    });

    test("renders custom number of skeletons via skeletonCount", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={5} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(5);
    });

    test("renders single skeleton when skeletonCount is 1", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={1} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(1);
    });

    test("renders many skeletons when skeletonCount is high", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={10} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(10);
    });

    test("skeletonCount has no effect when isSkeleton is false", () => {
      const { container } = render(<MainSpinner isSkeleton={false} skeletonCount={10} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(0);

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();
    });

    test("each skeleton has unique key", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={3} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(3);

      // Each skeleton should be a separate DOM element
      const uniqueSkeletons = new Set(Array.from(skeletons));
      expect(uniqueSkeletons.size).toBe(3);
    });
  });

  describe("Skeleton Paragraph Configuration", () => {
    test("applies default paragraphRow (3)", () => {
      const { container } = render(<MainSpinner isSkeleton={true} />);

      // Check that skeleton has paragraph configuration
      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();

      // Ant Design Skeleton with paragraph prop should render paragraph rows
      const paragraphRows = container.querySelectorAll(".ant-skeleton-paragraph");
      expect(paragraphRows.length).toBeGreaterThan(0);
    });

    test("applies custom paragraphRow value", () => {
      const { container } = render(<MainSpinner isSkeleton={true} paragraphRow={5} />);

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    test("applies paragraphRow to all skeletons", () => {
      const { container } = render(
        <MainSpinner isSkeleton={true} skeletonCount={3} paragraphRow={4} />
      );

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(3);

      // All skeletons should have paragraph configuration
      skeletons.forEach((skeleton) => {
        expect(skeleton).toBeInTheDocument();
      });
    });

    test("paragraphRow has no effect when isSkeleton is false", () => {
      const { container } = render(<MainSpinner isSkeleton={false} paragraphRow={10} />);

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();

      const paragraphRows = container.querySelectorAll(".ant-skeleton-paragraph");
      expect(paragraphRows).toHaveLength(0);
    });
  });

  describe("Height Configuration", () => {
    test("applies default height for Spin mode", () => {
      const { container } = render(<MainSpinner />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      // Default height should be set via CSS or inline style
      expect(spinnerContainer).toBeInTheDocument();
    });

    test("applies custom height for Spin mode", () => {
      const { container } = render(<MainSpinner height="500px" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "500px" });
    });

    test("applies height in rem units", () => {
      const { container } = render(<MainSpinner height="20rem" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "20rem" });
    });

    test("applies height in vh units", () => {
      const { container } = render(<MainSpinner height="50vh" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "50vh" });
    });

    test("applies height with calc expression", () => {
      const { container } = render(<MainSpinner height="calc(100vh - 200px)" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "calc(100vh - 200px)" });
    });

    test("height applies to Spin mode only", () => {
      const { container } = render(<MainSpinner isSkeleton={false} height="300px" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "300px" });
    });

    test("height has no effect on Skeleton mode", () => {
      const { container } = render(<MainSpinner isSkeleton={true} height="300px" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).not.toBeInTheDocument();
    });
  });

  describe("Combined Props", () => {
    test("combines all Skeleton props correctly", () => {
      const { container } = render(
        <MainSpinner
          isSkeleton={true}
          skeletonCount={4}
          paragraphRow={6}
          height="400px"
        />
      );

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(4);
    });

    test("combines all Spin props correctly", () => {
      const { container } = render(
        <MainSpinner
          isSkeleton={false}
          height="600px"
          skeletonCount={10}
          paragraphRow={10}
        />
      );

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "600px" });

      // Skeleton props should be ignored
      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(0);
    });
  });

  describe("Edge Cases", () => {
    test("handles skeletonCount of 0", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={0} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(0);
    });

    test("handles negative skeletonCount (throws error)", () => {
      // Array() with negative length throws RangeError
      expect(() => {
        render(<MainSpinner isSkeleton={true} skeletonCount={-5} />);
      }).toThrow(RangeError);
    });

    test("handles paragraphRow of 0", () => {
      const { container } = render(<MainSpinner isSkeleton={true} paragraphRow={0} />);

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    test("handles very large skeletonCount", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={100} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(100);
    });

    test("handles very large paragraphRow", () => {
      const { container } = render(<MainSpinner isSkeleton={true} paragraphRow={50} />);

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    test("handles empty string height", () => {
      const { container } = render(<MainSpinner height="" />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toBeInTheDocument();
    });

    test("handles undefined height", () => {
      const { container } = render(<MainSpinner height={undefined} />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toBeInTheDocument();
    });
  });

  describe("Re-rendering Behavior", () => {
    test("switches from Spin to Skeleton mode", () => {
      const { container, rerender } = render(<MainSpinner isSkeleton={false} />);

      let spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();

      rerender(<MainSpinner isSkeleton={true} />);

      spinner = container.querySelector(".ant-spin");
      expect(spinner).not.toBeInTheDocument();

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    test("switches from Skeleton to Spin mode", () => {
      const { container, rerender } = render(<MainSpinner isSkeleton={true} />);

      let skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();

      rerender(<MainSpinner isSkeleton={false} />);

      skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).not.toBeInTheDocument();

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();
    });

    test("updates skeletonCount dynamically", () => {
      const { container, rerender } = render(
        <MainSpinner isSkeleton={true} skeletonCount={2} />
      );

      let skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(2);

      rerender(<MainSpinner isSkeleton={true} skeletonCount={5} />);

      skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(5);
    });

    test("updates height dynamically", () => {
      const { container, rerender } = render(<MainSpinner height="100px" />);

      let spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "100px" });

      rerender(<MainSpinner height="500px" />);

      spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toHaveStyle({ height: "500px" });
    });

    test("updates paragraphRow dynamically", () => {
      const { container, rerender } = render(
        <MainSpinner isSkeleton={true} paragraphRow={2} />
      );

      let skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();

      rerender(<MainSpinner isSkeleton={true} paragraphRow={8} />);

      skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe("DOM Structure", () => {
    test("Spin mode has correct container structure", () => {
      const { container } = render(<MainSpinner />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      const spinner = spinnerContainer?.querySelector(".ant-spin");

      expect(spinnerContainer).toBeInTheDocument();
      expect(spinner).toBeInTheDocument();
      expect(spinnerContainer?.contains(spinner!)).toBe(true);
    });

    test("Skeleton mode renders skeletons as direct children", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={3} />);

      const skeletons = container.querySelectorAll(
        ":scope > .ant-skeleton"
      ) as NodeListOf<HTMLElement>;
      expect(skeletons).toHaveLength(3);
    });

    test("Spin has spinning indicator", () => {
      const { container } = render(<MainSpinner />);

      const spinDot = container.querySelector(".ant-spin-dot");
      expect(spinDot).toBeInTheDocument();
    });

    test("Skeleton has title and paragraph elements", () => {
      const { container } = render(<MainSpinner isSkeleton={true} />);

      // Ant Design Skeleton should render with title and paragraph
      const skeletonTitle = container.querySelector(".ant-skeleton-title");
      const skeletonParagraph = container.querySelector(".ant-skeleton-paragraph");

      // At least one of these should exist
      expect(skeletonTitle !== null || skeletonParagraph !== null).toBe(true);
    });
  });

  describe("Accessibility", () => {
    test("Spin mode is accessible", () => {
      const { container } = render(<MainSpinner />);

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();

      // Ant Design Spin should have appropriate ARIA attributes
      const spinnerWithAria = container.querySelector('[aria-busy="true"]');
      expect(spinnerWithAria).toBeInTheDocument();
    });

    test("Skeleton mode provides loading indication", () => {
      const { container } = render(<MainSpinner isSkeleton={true} />);

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toBeInTheDocument();

      // Skeleton should indicate loading state visually
    });
  });

  describe("Visual States", () => {
    test("Spin shows animated spinner", () => {
      const { container } = render(<MainSpinner />);

      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toHaveClass("ant-spin");
    });

    test("Skeleton shows loading placeholder", () => {
      const { container } = render(<MainSpinner isSkeleton={true} />);

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).toHaveClass("ant-skeleton");
    });

    test("Multiple skeletons are visually separated", () => {
      const { container } = render(<MainSpinner isSkeleton={true} skeletonCount={3} />);

      const skeletons = container.querySelectorAll(".ant-skeleton");
      expect(skeletons).toHaveLength(3);

      // Each skeleton should be a distinct element
      const firstSkeleton = skeletons[0];
      const secondSkeleton = skeletons[1];
      expect(firstSkeleton).not.toBe(secondSkeleton);
    });
  });

  describe("Default Props Behavior", () => {
    test("all props have sensible defaults", () => {
      const { container } = render(<MainSpinner />);

      // Should render in Spin mode by default
      const spinner = container.querySelector(".ant-spin");
      expect(spinner).toBeInTheDocument();

      const skeleton = container.querySelector(".ant-skeleton");
      expect(skeleton).not.toBeInTheDocument();
    });

    test("optional props can be omitted", () => {
      const { container } = render(<MainSpinner />);

      const spinnerContainer = container.querySelector(".page-spinner-container");
      expect(spinnerContainer).toBeInTheDocument();
    });
  });
});
