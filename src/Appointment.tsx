import React, { FC } from "react";

interface Props {
  customer: {
    firstName: string;
  };
}

interface IAppointmentsDayViewProps {
  appointments: { startsAt: number }[];
}

const appointmentTimeOfDay = (startsAt: number) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};
export const Appointment: FC<Props> = ({ customer: { firstName } }) => {
  return <div>{firstName}</div>;
};

export const AppointmentsDayView: FC<IAppointmentsDayViewProps> = ({
  appointments,
}) => {
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment) => (
          <li key={appointment.startsAt}>
            {appointmentTimeOfDay(appointment.startsAt)}
          </li>
        ))}
      </ol>
    </div>
  );
};
