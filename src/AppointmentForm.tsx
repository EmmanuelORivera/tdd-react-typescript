import React, { FC, useState } from "react";

interface IAppointmentFormProps {
  selectableServices: string[];
  service: string;
}
export const AppointmentForm: FC<IAppointmentFormProps> = ({
  selectableServices = [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
  service,
}) => {
  const [selectedService, setSelectedService] = useState(service);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };
  return (
    <form id="appointment">
      <label htmlFor="service">Select option</label>
      <select
        id="service"
        name="service"
        onChange={handleChange}
        value={selectedService}
      >
        <option />
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </form>
  );
};
