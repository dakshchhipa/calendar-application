import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = () => {
  // Example data for past and upcoming communications
  const [communications, setCommunications] = useState([
    {
      date: new Date(2024, 10, 20),
      type: "LinkedIn Post",
      notes: "Initial outreach completed",
    },
    {
      date: new Date(2024, 10, 25),
      type: "Email",
      notes: "Follow-up email sent",
    },
    {
      date: new Date(2024, 11, 1),
      type: "Phone Call",
      notes: "Scheduled call to discuss details",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    type: "",
    notes: "",
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const addCommunication = () => {
    if (newCommunication.type && selectedDate) {
      setCommunications([
        ...communications,
        {
          date: selectedDate,
          type: newCommunication.type,
          notes: newCommunication.notes,
        },
      ]);
      setNewCommunication({ type: "", notes: "" });
      setSelectedDate(null);
    }
  };

  // Filter communications for the selected date
  const filteredCommunications = communications.filter(
    (comm) => comm.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Calendar View</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Calendar Component */}
        <div className="bg-white p-4 rounded shadow">
          <Calendar onClickDay={handleDateClick} />
        </div>

        {/* Communication Details */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Communication Details</h3>
          {selectedDate ? (
            <>
              <p className="text-gray-600 mb-4">
                Selected Date: {selectedDate.toDateString()}
              </p>
              <ul className="mb-4 space-y-2">
                {filteredCommunications.length > 0 ? (
                  filteredCommunications.map((comm, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded shadow">
                      <p className="text-sm">
                        <span className="font-bold">Type:</span> {comm.type}
                      </p>
                      <p className="text-sm">
                        <span className="font-bold">Notes:</span> {comm.notes}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">
                    No communications recorded for this date.
                  </p>
                )}
              </ul>

              <div>
                <h4 className="text-md font-bold mb-2">
                  Add New Communication
                </h4>
                <select
                  className="w-full mb-2 p-2 border rounded"
                  value={newCommunication.type}
                  onChange={(e) =>
                    setNewCommunication({
                      ...newCommunication,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="">Select Communication Type</option>
                  <option value="LinkedIn Post">LinkedIn Post</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Other">Other</option>
                </select>
                <textarea
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Add notes about the communication"
                  value={newCommunication.notes}
                  onChange={(e) =>
                    setNewCommunication({
                      ...newCommunication,
                      notes: e.target.value,
                    })
                  }
                ></textarea>
                <button
                  onClick={addCommunication}
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                  Add Communication
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">
              Click a date on the calendar to view or add communications.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
