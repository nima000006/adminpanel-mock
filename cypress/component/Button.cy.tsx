// cypress/component/Button.cy.tsx

import { mount } from "cypress/react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";

describe("Button component", () => {
  it("renders correctly", () => {
    mount(<CustomButton>Click me</CustomButton>);
    cy.contains("Click me").should("exist");
  });

  it("can be clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<CustomButton onClick={onClickSpy}>Click me</CustomButton>);
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
