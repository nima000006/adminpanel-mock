import React, { useState } from "react";

import CustomSteps from "./CustomSteps";

/**
 * Example usage of CustomSteps component demonstrating various features
 */
const CustomStepsExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [restrictNav, setRestrictNav] = useState(false);
  const [useUrlSync, setUseUrlSync] = useState(false);

  // Sample step items with various features
  const stepItems = [
    {
      title: "Login",
      description: "User authentication",
      icon: "👤",
    },
    {
      title: "Verification",
      description: "Email/SMS verification",
      icon: "📧",
    },
    {
      title: "Payment",
      description: "Process payment",
      icon: "💳",
    },
    {
      title: "Review",
      description: "Review order details",
      icon: "📋",
    },
    {
      title: "Complete",
      description: "Order completed",
      icon: "✅",
    },
  ];

  const handleStepChange = (step: number) => {
    console.warn(`Step changed to: ${step}`);
    setCurrentStep(step);
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">CustomSteps Component Examples</h1>

      {/* Controls */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <h2 className="mb-4 text-lg font-semibold">Configuration</h2>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={restrictNav}
              onChange={(e) => setRestrictNav(e.target.checked)}
              className="mr-2"
            />
            Restrict Navigation (can only go to previous steps)
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useUrlSync}
              onChange={(e) => setUseUrlSync(e.target.checked)}
              className="mr-2"
            />
            URL Synchronization (try refreshing the page!)
          </label>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Current Step: {currentStep}
          </label>
          <input
            type="range"
            min="0"
            max={stepItems.length - 1}
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Basic Example */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Basic Steps</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          items={stepItems}
          isClickable
          restrictNavigation={restrictNav}
          queryParamKey={useUrlSync ? "step" : undefined}
        />
      </div>

      {/* Vertical Example */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Vertical Steps</h2>
        <div className="max-w-md">
          <CustomSteps
            current={currentStep}
            onChange={handleStepChange}
            items={stepItems.map((item) => ({
              ...item,
              description: `${item.description} - Vertical layout`,
            }))}
            orientation="vertical"
            isClickable
            restrictNavigation={restrictNav}
            queryParamKey={useUrlSync ? "verticalStep" : undefined}
          />
        </div>
      </div>

      {/* Dot Style Example */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Dot Style Steps</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          items={stepItems}
          type="dot"
          isClickable
          restrictNavigation={restrictNav}
          queryParamKey={useUrlSync ? "dotStep" : undefined}
        />
      </div>

      {/* Navigation Steps */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Navigation Steps</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          items={stepItems}
          isClickable
          type="navigation"
          restrictNavigation={restrictNav}
          queryParamKey="navStep"
        />
      </div>

      {/* Inline Steps */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Inline Steps</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          items={stepItems}
          isClickable
          type="inline"
          restrictNavigation={restrictNav}
          queryParamKey={useUrlSync ? "inlineStep" : undefined}
        />
      </div>

      {/* Panel Steps */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Panel Steps</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          isClickable
          items={stepItems.map((item) => ({
            ...item,
            content: (
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  This is the content for {item.title} step. You can put any React
                  component here.
                </p>
              </div>
            ),
          }))}
          type="panel"
          restrictNavigation={restrictNav}
          queryParamKey={useUrlSync ? "panelStep" : undefined}
        />
      </div>

      {/* With Progress */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Steps with Progress</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          isClickable
          items={stepItems}
          percent={((currentStep + 1) / stepItems.length) * 100}
          restrictNavigation={restrictNav}
          queryParamKey={useUrlSync ? "progressStep" : undefined}
        />
      </div>

      {/* Error Status Example */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Steps with Error Status</h2>
        <CustomSteps
          current={currentStep}
          onChange={handleStepChange}
          items={stepItems.map((item, index) => ({
            ...item,
            status: index === 2 && currentStep >= 2 ? "error" : undefined,
          }))}
          status={currentStep === 2 ? "error" : "process"}
          restrictNavigation={restrictNav}
          queryParamKey={useUrlSync ? "errorStep" : undefined}
        />
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 rounded-lg bg-blue-50 p-4">
        <h2 className="mb-4 text-xl font-semibold">Usage Instructions</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>restrictNavigation:</strong> When true, users can only navigate to
            previous steps or the current step. Future steps are disabled.
          </p>
          <p>
            <strong>queryParamKey:</strong> Syncs the current step with a URL query
            parameter. Refresh the page to see it in action!
          </p>
          <p>
            <strong>current:</strong> Controls the active step (0-based index).
          </p>
          <p>
            <strong>onChange:</strong> Callback fired when user clicks on a step.
          </p>
          <p>
            <strong>items:</strong> Array of step objects with title, description, icon,
            etc.
          </p>
          <p>
            All other Ant Design Steps props are supported (type, direction, percent,
            status, etc.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomStepsExample;
