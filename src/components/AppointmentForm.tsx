import {useState} from "react";

interface AppointmentFormProps {
  addAppointment: (appointment: {id: number; name: string; appointmentDate: Date}) => void;
}

export default function AppointmentForm({addAppointment}: AppointmentFormProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !date) {
      setErrorMessage("Please fill up the name and date fields.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    const newAppointment = {
      id: Date.now(), // create unique id
      name,
      appointmentDate: new Date(date),
    };

    addAppointment(newAppointment);
    setName("");
    setDate("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col lg:flex-row w-full gap-2 px-4 py-2 mt-0 lg:mt-4 justify-between items-center'>
          {/* Full Name Input Form */}
          <div className='text-2xl lg:text-lg font-bold mb-2 justify-center items-center'>
            <label htmlFor='fname'>Full Name</label>
          </div>
          <div>
            <input
              type='text'
              id='fname'
              name='fullName'
              placeholder='Your Name...'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-[300px] md:w-[430px] lg:w-[530px] px-2 py-3 rounded-md'
            />
          </div>
        </div>
        {/* Appointment Date */}
        <div className='flex flex-col lg:flex-row w-full gap-2 px-4 py-2 mt-0 lg:mt-4 justify-between'>
          <div className='text-2xl lg:text-lg font-bold mb-2 flex justify-center items-center'>
            <label htmlFor='fname'>Appointment Date:</label>
          </div>
          <div>
            <input
              type='date'
              id='fname'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-[300px] md:w-[430px] lg:w-[530px] px-2 py-3 rounded-md'
            />
          </div>
        </div>
        {/* Error message */}
        {errorMessage && (
          <div className='mt-4 pl-4'>
            <p style={{color: "red"}}>{errorMessage}</p>
          </div>
        )}
        <div className='flex justify-end w-full px-4 my-4 md:mt-2'>
          <button
            type='submit'
            className='cursor-pointer text-lg font-bold bg-green-600 px-4 py-2 rounded-md'
            value='Add Appointment'
          >
            <p className='text-slate-100'>Add Appointment</p>
          </button>
        </div>
      </form>
    </section>
  );
}
