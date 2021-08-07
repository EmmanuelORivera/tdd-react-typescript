import React, { FC } from "react";

interface ICustomerFormProps {
  firstName?: string;
}

export const CustomerForm: FC<ICustomerFormProps> = ({ firstName }) => {
  return (
    <form id="customer">
      <label htmlFor="firstName">First name</label>
      <input
        readOnly
        id="firstName"
        name="firstName"
        type="text"
        value={firstName}
      />
    </form>
  );
};
