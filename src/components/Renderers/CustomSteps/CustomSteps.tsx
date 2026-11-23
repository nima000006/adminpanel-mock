import { useMemo } from "react";

import { GetProps, Steps } from "antd";
import { useSearchParams } from "react-router";
import "./_customSteps.scss";

type CustomStepsProps = {
  /**
   * Optional custom class name
   */
  className?: string;
  /**
   * If provided, syncs the current step index with this URL query parameter.
   * This allows users to refresh the page and stay on the same step.
   */
  queryParamKey?: string;
  /**
   * If true, restricts navigation to only previous or current steps.
   * Users cannot jump to future steps by clicking the step indicator.
   */
  restrictNavigation?: boolean;
  isClickable?: boolean;
} & GetProps<typeof Steps>;

const CustomSteps = ({
  className,
  queryParamKey,
  restrictNavigation = false,
  isClickable = false,
  current,
  onChange,
  items,
  ...props
}: CustomStepsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine the effective current step
  // Prioritizes URL param if queryParamKey is set, otherwise falls back to props.current
  const currentStep = useMemo(() => {
    if (queryParamKey && searchParams.has(queryParamKey)) {
      const paramValue = searchParams.get(queryParamKey);
      const parsed = parseInt(paramValue || "", 10);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }
    return current ?? 0;
  }, [queryParamKey, searchParams, current]);

  /**
   * Process items to handle navigation restrictions.
   * If restrictNavigation is true, future steps are marked as disabled.
   */
  const processedItems = useMemo(() => {
    if (!items) return items;

    // If we want to restrict navigation, we disable future steps
    if (restrictNavigation) {
      return items.map((item, index) => ({
        ...item,
        // Disable the step if it's beyond the current step
        // We preserve existing disabled state if explicitly set to true
        disabled: item.disabled || index > currentStep,
      }));
    }

    return items;
  }, [items, restrictNavigation, currentStep]);

  const handleStepChange = (stepIndex: number) => {
    if (!isClickable) return;

    // Safety check: specific restriction logic
    if (restrictNavigation && stepIndex > currentStep) {
      return;
    }

    // Sync with URL if key is provided
    if (queryParamKey) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(queryParamKey, stepIndex.toString());
        return newParams;
      });
    }

    // Trigger parent onChange handler
    if (onChange) {
      onChange(stepIndex);
    }
  };

  return (
    <Steps
      className={`custom-steps-container ${className || ""}`}
      current={currentStep}
      onChange={handleStepChange}
      items={processedItems}
      {...props}
    />
  );
};

export default CustomSteps;
