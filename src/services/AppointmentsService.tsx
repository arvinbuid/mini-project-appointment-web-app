import {useState} from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";
import {toast} from "react-toastify";

interface Appointment {
  id: number;
  name: string;
  appointmentDate: Date;
}

export default function AppointmentsService() {
  const [appointments, setAppoinments] = useState<Appointment[]>([]);

  // POST
  const addAppointment = (appointment: Appointment) => {
    setAppoinments([...appointments, appointment]);
    return toast.success("Appointment added succesfully.", {
      theme: "colored",
    });
  };

  // DELETE/id
  const deleteAppointment = (id: number) => {
    const deletedAppointment = appointments.filter((appointment) => appointment.id !== id);
    setAppoinments(deletedAppointment);
    return toast.error("Appointment deleted.", {
      theme: "colored",
    });
  };

  // PUT
  const editAppointment = (id: number, name: string, date: Date) => {
    const updatedAppointment = appointments.map((appointment) =>
      appointment.id === id ? {...appointment, name, date} : appointment
    );
    setAppoinments(updatedAppointment);
    return toast.info("Appointment edited successfully.", {
      theme: "colored",
    });
  };

  // CLEAR
  const clearAppointments = () => {
    
    setAppoinments([]);
    return toast.error("Appointments all cleared.", {
      theme: "colored",
    });
  };

  return (
    <section>
      <h1 className='text-3xl font-bold mt-10 mb-6 text-center'>Appointment Management System</h1>
      <div className='flex flex-col mx-auto w-[350px] md:w-[500px] lg:w-[780px] bg-gray-200 px-6 py-4 rounded-md'>
        <AppointmentForm addAppointment={addAppointment} />
        <AppointmentList
          appointments={appointments}
          deleteAppointment={deleteAppointment}
          editAppointment={editAppointment}
          clearAppointments={clearAppointments}
        />
      </div>
    </section>
  );
}
