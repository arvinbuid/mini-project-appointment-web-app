import {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import {FaSave} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
interface Appointment {
  id: number;
  name: string;
  appointmentDate: Date;
}

interface AppointmentListProps {
  appointments: Appointment[];
  editAppointment: (id: number, name: string, appointmentDate: Date) => void;
  deleteAppointment: (id: number) => void;
  clearAppointments: () => void;
}

export default function AppointmentList({
  appointments,
  editAppointment,
  deleteAppointment,
  clearAppointments,
}: AppointmentListProps) {
  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedDate, setEditedDate] = useState<string>("");

  const handleEdit = (id: number) => {
    const appointment = appointments.find((appointment) => appointment.id === id);
    if (appointment) {
      setEditedId(id);
      setEditedName(appointment.name);
      setEditedDate(appointment.appointmentDate.toISOString().split("T")[0]);
    }
  };

  const handleSaveEdit = () => {
    if (editedId !== null) {
      editAppointment(editedId, editedName, new Date(editedDate));
      setEditedId(null);
      setEditedName("");
      setEditedDate("");
    }
  };

  const handleCancelEdit = () => {
    setEditedId(null);
    setEditedName("");
    setEditedDate("");
  };

  return (
    <div>
      <div className='w-full mt-4 mb-6 text-center text-3xl font-bold'>
        <h1>Appointments List</h1>
      </div>
      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead className='table-header-group ...'>
            <tr className='table-row bg-green-600 text-slate-100'>
              <th className='table-cell text-left px-4 py-3 border-r border-gray-400'>ID</th>
              <th className='table-cell text-left px-4 py-3 border-r border-gray-400'>Name</th>
              <th className='table-cell text-left px-4 py-3 border-r border-gray-400'>Date</th>
              <th className='table-cell text-left px-4 py-3 border-r border-gray-400'>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className='table-row odd:bg-white even:bg-slate-100'>
                <td className='table-cell px-2'>{appointment.id}</td>
                {/* Full Name */}
                <td className='table-cell px-2'>
                  {editedId === appointment.id ? (
                    <input
                      type='text'
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className='p-2 rounded-md'
                    />
                  ) : (
                    appointment.name
                  )}
                </td>

                {/* Appointment Date */}
                <td className='table-cell px-2'>
                  {editedId === appointment.id ? (
                    <input
                      type='date'
                      value={editedDate}
                      onChange={(e) => setEditedDate(e.target.value)}
                      className='p-2 rounded-md'
                    />
                  ) : (
                    appointment.appointmentDate.toISOString().split("T")[0]
                  )}
                </td>

                <td>
                  <div className='table-cell'>
                    {editedId === appointment.id ? (
                      <div className='flex gap-2 m-2'>
                        {/* Save */}
                        <button
                          onClick={handleSaveEdit}
                          className='bg-sky-600 text-slate-100 p-4 rounded-md'
                        >
                          <FaSave />
                        </button>
                        {/* Cancel */}
                        <button
                          onClick={handleCancelEdit}
                          className='bg-red-600 text-slate-100 p-4 rounded-md'
                        >
                          <MdCancel />
                        </button>
                      </div>
                    ) : (
                      <div className='flex gap-2 pl-4 p-2'>
                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(appointment.id)}
                          className='bg-green-600 text-slate-100 p-4 rounded-md'
                        >
                          <FiEdit />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => deleteAppointment(appointment.id)}
                          className='bg-red-600 text-slate-100 p-4 rounded-md'
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Clear Appointments */}
      <button
        type='submit'
        className='cursor-pointer text-lg font-bold bg-red-60 0px-4 py-2 rounded-md bg-red-600 mt-6 flex justify-end'
        value='Add Appointment'
        onClick={clearAppointments}
      >
        <p className='text-slate-100 px-4 py-1'>Clear Appointments</p>
      </button>
    </div>
  );
}
