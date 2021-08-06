import React, { useState, FC } from "react";

import { ICustomer } from "./types";

const appointmentTimeOfDay = (startsAt: number) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

interface IAppointmentProps {
  customer: ICustomer;
  startsAt?: number;
  stylist?: string;
  service?: string;
  notes?: string;
}

interface IAppointmentsDayViewProps {
  appointments: { startsAt: number; customer: { firstName: string } }[];
}

export const Appointment: FC<IAppointmentProps> = ({
  customer,
  notes,
  service,

  stylist,
}) => {
  const { firstName, lastName, phoneNumber } = customer;
  return (
    <div id="apointmentView">
      <h3>Today's appointment at 09:00</h3>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {firstName} {lastName}
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{phoneNumber}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const AppointmentsDayView: FC<IAppointmentsDayViewProps> = ({
  appointments,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
