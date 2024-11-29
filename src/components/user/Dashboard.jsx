import React, { useState } from "react";
import Notifications from "./Notifications";

const Dashboard = () => {
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Company A",
      lastCommunications: [
        {
          type: "LinkedIn Post",
          date: "2024-11-20",
          notes: "Initial outreach",
        },
        { type: "Email", date: "2024-11-22", notes: "Follow-up email" },
      ],
      nextCommunication: { type: "Phone Call", date: "2024-11-28" },
      overdue: true,
    },
    {
      id: 2,
      name: "Company B",
      lastCommunications: [
        {
          type: "Phone Call",
          date: "2024-11-18",
          notes: "Discussion about services",
        },
      ],
      nextCommunication: { type: "Email", date: "2024-11-28" },
      dueToday: true,
    },
  ]);

  // Notification counts
  const overdueCount = companies.filter((company) => company.overdue).length;
  const dueTodayCount = companies.filter((company) => company.dueToday).length;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Dashboard</h2>
        {/* Notification Icon with Badge */}
        <div className="relative">
          <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
            🔔
          </div>
          {overdueCount + dueTodayCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {overdueCount + dueTodayCount}
            </span>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      <Notifications companies={companies} />

      {/* Dashboard Table */}
      <table className="w-full bg-white rounded shadow table-auto mt-6">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Last Five Communications</th>
            <th className="px-4 py-2">Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={`hover:bg-gray-100 ${
                company.overdue
                  ? "bg-red-100"
                  : company.dueToday
                  ? "bg-yellow-100"
                  : ""
              }`}
            >
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">
                {company.lastCommunications.map((comm, index) => (
                  <div key={index} className="relative" title={comm.notes}>
                    <p className="text-sm">
                      {comm.type} - {new Date(comm.date).toDateString()}
                    </p>
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {company.nextCommunication.type} -{" "}
                {new Date(company.nextCommunication.date).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
