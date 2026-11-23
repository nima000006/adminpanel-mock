/* eslint-disable @typescript-eslint/no-namespace */
import "./commands"; // Your custom commands, if any
import { mount } from "cypress/react";
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
