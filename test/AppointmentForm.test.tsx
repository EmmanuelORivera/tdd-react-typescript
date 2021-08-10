import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { createContainer } from "./domManipulators";
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
  let render: (component: JSX.Element) => void;
  let container: HTMLDivElement;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id: string): HTMLFormElement | null =>
    container.querySelector(`form[id=${id}]`);

  const field = (name: string): HTMLSelectElement =>
    form("appointment")?.elements[name];

  it("renders a form", () => {
    render(<AppointmentForm />);
    expect(form("appointment")).not.toBeNull();
  });

  describe("service field", () => {
    const findOption = (
      dropdownNode: HTMLSelectElement,
      textContent: string
    ) => {
      const options = Array.from(dropdownNode.childNodes);
      return options.find((option) => option.textContent === textContent);
    };

    it("renders as a select box", () => {
      render(<AppointmentForm />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("initially has a blank value chosen", () => {
      render(<AppointmentForm />);
      const firstNode = field("service").childNodes[0] as HTMLOptionElement;
      expect(firstNode.value).toEqual("");
      expect(firstNode.selected).toBeTruthy();
    });

    it("lists all salon services", () => {
      const selectableServices = ["Cut", "Blow-dry"];

      render(<AppointmentForm selectableServices={selectableServices} />);

      const optionNodes = Array.from(field("service").childNodes);

      const renderedServices = optionNodes.map((node) => node.textContent);

      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it("pre-selects the existing value", () => {
      const services = ["Cut", "Blow-dry"];

      render(
        <AppointmentForm selectableServices={services} service="Blow-dry" />
      );

      const option = findOption(
        field("service"),
        "Blow-dry"
      ) as HTMLOptionElement;

      expect(option.selected).toBeTruthy();
    });

    it("renders a label", () => {
      const services = ["Cut", "Blow-dry"];

      render(
        <AppointmentForm selectableServices={services} service="Blow-dry" />
      );
      expect(container.querySelector("label")).not.toBeNull();
      expect(container.querySelector("label")?.textContent).toEqual(
        "Select option"
      );
    });

    it("assings an id that matches the label id", () => {
      render(<AppointmentForm />);
      expect(field("service").id).toEqual("service");
    });

    it("saves existing value when submitted", async () => {
      const services = ["Cut", "Blow-dry"];
      render(
        <AppointmentForm selectableServices={services} service="Blow-dry" />
      );

      await ReactTestUtils.Simulate.submit(form("appointment") as Element);
    });

    it("saves new value when submitted", async () => {
      const services = ["Cut", "Blow-dry"];
      render(
        <AppointmentForm selectableServices={services} service="Blow-dry" />
      );
      await ReactTestUtils.Simulate.change(field("service"), {
        target: { name: "service", value: "Cut" },
      });

      await ReactTestUtils.Simulate.submit(form("appointment") as Element);
    });
  });
});
