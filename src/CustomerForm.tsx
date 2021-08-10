import React, { FC, useState } from "react";
import { ICustomer } from "./types";

interface ICustomerFormProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  onSubmit: (customer: { firstName: string }) => void;
}

export const CustomerForm: FC<ICustomerFormProps> = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCustomer((prevCustomer) => {
      const { name, value } = e.target;
      const newCustomer = {
        ...prevCustomer,
        [name]: value,
      };
      return newCustomer;
    });

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={handleInputChange}
        type="text"
        value={customer.firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={handleInputChange}
        value={customer.lastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        onChange={handleInputChange}
        value={customer.phoneNumber}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
