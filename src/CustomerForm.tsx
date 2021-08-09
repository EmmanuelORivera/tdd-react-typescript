import React, { FC, useState } from "react";
import { ICustomer } from "./types";

interface ICustomerFormProps {
  firstName: string;
  onSubmit: (customer: { firstName: string }) => void;
}

export const CustomerForm: FC<ICustomerFormProps> = ({
  firstName,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({ firstName });

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      firstName: e.target.value,
    }));

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={handleChangeFirstName}
        type="text"
        value={firstName}
      />
    </form>
  );
};
