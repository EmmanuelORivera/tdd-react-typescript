import React, { FC } from "react";

interface Props {
  customer: {
    firstName: string;
  };
}

export const Appointment: FC<Props> = ({ customer: { firstName } }) => {
  return <div>{firstName}</div>;
};
