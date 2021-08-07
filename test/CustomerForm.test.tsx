import React from "react";
import { CustomerForm } from "../src/CustomerForm";
import { createContainer } from "./domManipulators";

describe("CustomForm", () => {
  let render: (component: JSX.Element) => void, container: HTMLDivElement;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id: string): HTMLFormElement | null =>
    container.querySelector(`form[id="${id}"]`);

  const expectToBeInputFieldOfTypeText = (formElement: HTMLInputElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const firstNameField = (): HTMLInputElement =>
    form("customer")?.elements.firstName;

  const labelFor = (formElement: string) =>
    container.querySelector(`label[for="${formElement}"]`);

  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });

  it("renders the first name field as a text box", () => {
    render(<CustomerForm />);
    expectToBeInputFieldOfTypeText(firstNameField());
  });

  it("includes the existing value for the first name", () => {
    render(<CustomerForm firstName="Ashley" />);
    expect(firstNameField().value).toEqual("Ashley");
  });

  it("renders a label for the first name field", () => {
    render(<CustomerForm />);
    expect(labelFor("firstName")).not.toBeNull();
    expect(labelFor("firstName")?.textContent).toEqual("First name");
  });

  it("assigns an id that matches the label ti to the first name field", () => {
    render(<CustomerForm />);
    expect(firstNameField().id).toEqual("firstName");
  });
});
