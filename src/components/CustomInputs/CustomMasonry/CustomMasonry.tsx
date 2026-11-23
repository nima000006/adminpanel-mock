import { forwardRef, ReactNode } from "react";

import { Masonry, MasonryProps } from "antd";
import { MasonryItemType } from "antd/es/masonry/MasonryItem";
import "./CustomMasonry.scss";

export interface CustomMasonryProps<T = any> extends Omit<MasonryProps<T>, "items"> {
  /**
   * Data source for the masonry layout
   */
  data?: T[];

  /**
   * Custom render function for each item
   * @param item - The data item
   * @param index - The index of the item
   * @returns ReactNode to render
   */
  renderItem?: (item: T, index: number) => ReactNode;

  /**
   * Optional className for the masonry container
   */
  className?: string;

  /**
   * Height calculator function for items (optional)
   * If not provided, component will calculate dynamically
   */
  getItemHeight?: (item: T, index: number) => number | undefined;

  /**
   * Get unique key for each item
   */
  getItemKey?: (item: T, index: number) => string | number;

  /**
   * Enable continuous size monitoring for dynamic content
   * @default false
   */
  fresh?: boolean;
}

/**
 * CustomMasonry - A wrapper component for Ant Design Masonry (v6+)
 *
 * @example
 * ```tsx
 * // Basic usage with cards
 * <CustomMasonry
 *   columns={3}
 *   gutter={[16, 16]}
 *   data={myData}
 *   renderItem={(item) => <Card>{item.content}</Card>}
 * />
 *
 * // Responsive columns
 * <CustomMasonry
 *   columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
 *   gutter={[16, 16]}
 *   data={images}
 *   renderItem={(img) => <Image src={img.url} />}
 * />
 *
 * // With dynamic heights
 * <CustomMasonry
 *   columns={4}
 *   fresh={true}
 *   data={items}
 *   getItemHeight={(item) => item.calculatedHeight}
 *   renderItem={(item) => <div>{item.content}</div>}
 * />
 * ```
 */
const CustomMasonry = forwardRef<HTMLDivElement, CustomMasonryProps>(
  <T extends Record<string, any>>(
    {
      data = [],
      renderItem,
      className,
      getItemHeight,
      getItemKey,
      columns = 3,
      gutter = 16,
      fresh = false,
      ...masonryProps
    }: CustomMasonryProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    // Convert data to MasonryItem format
    const items: MasonryItemType<T>[] = data.map((item, index) => ({
      key: getItemKey?.(item, index) ?? index,
      data: item,
      height: getItemHeight?.(item, index),
      children: renderItem?.(item, index),
    }));

    return (
      <div ref={ref} className={`custom-masonry-wrapper ${className || ""}`}>
        <Masonry<T>
          columns={columns}
          gutter={gutter}
          fresh={fresh}
          items={items}
          {...masonryProps}
        />
      </div>
    );
  }
);

CustomMasonry.displayName = "CustomMasonry";

export default CustomMasonry;
