import React from "react";
import ReactDOM from "react-dom";

import { Appointment } from "../src/Appointment";
// describe defines a test suite, which is simply a set of tests.
describe("Appointment", () => {
  let customer;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component: JSX.Element) =>
    ReactDOM.render(component, container);

  // TESTS
  //it defines a single test.
  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch("Ashley");
  });

  it("renders another customer first name", () => {
    customer = { firstName: "Jordan" };
    ReactDOM.render(<Appointment customer={customer} />, container);
    expect(container.textContent).toMatch("Jordan");
  });
});
