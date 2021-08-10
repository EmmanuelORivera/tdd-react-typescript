import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { CustomerForm } from "../src/CustomerForm";
import { createContainer } from "./domManipulators";

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const PHONE_NUMBER = "phoneNumber";

describe("CustomForm", () => {
  let render: (component: JSX.Element) => void;
  let container: HTMLDivElement;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id: string): HTMLFormElement | null =>
    container.querySelector(`form[id="${id}"]`);

  const field = (name: string): HTMLInputElement =>
    form("customer")?.elements[name];

  const labelFor = (formElement: string) =>
    container.querySelector(`label[for="${formElement}"]`);

  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });

  it("has a submit button", () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

  const expectToBeInputFieldOfTypeText = (formElement: HTMLInputElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const itRendersAsATextBox = (fieldName: string) => {
    it("renders as a text box", () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  };

  const itIncluedesTheExistingValue = (fieldName: string) => {
    it("includes the existing value", () => {
      render(<CustomerForm {...{ [fieldName]: "value" }} />);
      expect(field(fieldName).value).toEqual("value");
    });
  };

  const itRendersALabel = (fieldName: string, text: string) => {
    it("renders a label", () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName)?.textContent).toEqual(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName: string) => {
    it("assigns an id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName: string, value: string) => {
    it("saves existing value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );
      await ReactTestUtils.Simulate.submit(form("customer") as Element);
    });
  };

  const itSubmitsNewValue = (fieldName: string, value: string) => {
    it("saves new value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: "existingValue" }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );

      await ReactTestUtils.Simulate.change(field(FIRST_NAME), {
        target: { name: fieldName, value },
      });

      await ReactTestUtils.Simulate.submit(form("customer") as Element);
    });
  };

  describe("first name field", () => {
    itRendersAsATextBox(FIRST_NAME);
    itIncluedesTheExistingValue(FIRST_NAME);
    itRendersALabel(FIRST_NAME, "First name");
    itAssignsAnIdThatMatchesTheLabelId(FIRST_NAME);
    itSubmitsExistingValue(FIRST_NAME, FIRST_NAME);
    itSubmitsNewValue(FIRST_NAME, "anotherFirstName");
  });

  describe("last name field", () => {
    itRendersAsATextBox(LAST_NAME);
    itIncluedesTheExistingValue(LAST_NAME);
    itRendersALabel(LAST_NAME, "Last name");
    itAssignsAnIdThatMatchesTheLabelId(LAST_NAME);
    itSubmitsExistingValue(LAST_NAME, LAST_NAME);
    itSubmitsNewValue(LAST_NAME, "anotherLastName");
  });

  describe("phone number field", () => {
    itRendersAsATextBox(PHONE_NUMBER);
    itIncluedesTheExistingValue(PHONE_NUMBER);
    itRendersALabel(PHONE_NUMBER, "Phone number");
    itAssignsAnIdThatMatchesTheLabelId(PHONE_NUMBER);
    itSubmitsExistingValue(PHONE_NUMBER, PHONE_NUMBER);
    itSubmitsNewValue(PHONE_NUMBER, "anotherPhoneNumber");
  });
});
